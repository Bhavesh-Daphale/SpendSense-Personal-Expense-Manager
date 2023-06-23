show databases;
drop database spendsense;
create database spendsense;

use spendsense;

create table users(
	user_id int primary key auto_increment not null,
    first_name varchar(20) unique not null,
	last_name varchar(20) unique not null,
    email varchar(30) unique not null,
    password varchar(100) unique not null,
    total_income decimal(10,3),
    total_expenses decimal(10,3),
    total_balance decimal(10,3),
    total_savings decimal(10,3)
);
desc users;
update users set total_balance = 67150 where user_id=1;
select * from users;
insert into users values
(1, 'Khushi', 'Batra', 'khushi@gmail.com', 'Khushi@123', 800000, 29000, 273892, 74637);
drop table users;

select * from categories;

SELECT * FROM users WHERE email = 'bhavesh@gmail.com';

SELECT category_id, 
UPPER(LEFT(SUBSTRING_INDEX(category_name, ' ', 1), 1)) AS category_initials, 
category_name,spent,budget,DATE_FORMAT(created_on, '%e %b, %Y') AS created_on ,
concat(floor((spent / budget) * 100),'%') AS percentage FROM categories where user_id = 1;

SELECT category_id, UPPER(LEFT(SUBSTRING_INDEX(category_name, ' ', 1), 1)) AS category_initials, category_name,spent,budget,DATE_FORMAT(created_on, '%e %b, %Y') AS created_on ,concat(((spent / budget) * 100),'%') AS percentage FROM categories where user_id = 1;

SELECT
  category_id, UPPER(LEFT(SUBSTRING_INDEX(category_name, ' ', 1), 1)) AS category_initials,
  category_name
FROM categories;

create table categories(
	category_id int primary key auto_increment not null,
    category_name varchar(50) not null,
    created_on date not null,
    spent float default 0 ,
    budget float default 0,
    user_id int not null,
    foreign key(user_id) references users(user_id)
);
desc categories;
drop table categories;

ALTER TABLE categories ADD CONSTRAINT uc_category_user UNIQUE (category_name, user_id);
ALTER TABLE categories MODIFY budget FLOAT;



ALTER TABLE categories
ADD CONSTRAINT category_name UNIQUE (category_name);

DROP TRIGGER IF EXISTS check_spent_budget;
-- DELIMITER //
-- CREATE TRIGGER check_spent_budget
-- BEFORE UPDATE ON categories
-- FOR EACH ROW
-- BEGIN
--     IF NEW.spent >= NEW.budget THEN
--         SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Spend exceeds budget.';
--     END IF;
-- END //
-- DELIMITER ;

DELIMITER //

CREATE TRIGGER check_spent_budget
BEFORE UPDATE ON categories
FOR EACH ROW
BEGIN
    IF NEW.budget IS NOT NULL AND NEW.spent > NEW.budget THEN
        SET @message = CONCAT('Spend exceeds budget....you cannot spend more on ', NEW.category_name);
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = @message;
    END IF;
END//

DELIMITER ;


CREATE EVENT reset_spent_value
ON SCHEDULE
    EVERY 1 MONTH
    STARTS DATE_FORMAT(NOW(), '%Y-%m-01 00:00:00')
DO
    UPDATE categories SET spent = 0;





create table expenses(
	expense_id int primary key auto_increment not null,
    expense_name varchar(25) not null unique,
    category_id int,
    expense_date date not null,
    expense_type varchar(6) not null,
    amount decimal(10,2) not null,
    user_id int not null,
    foreign key(category_id) references categories(category_id),
    foreign key(user_id) references users(user_id)
);
desc expenses;
select * from expenses;
ALTER TABLE categories DROP INDEX category_name;

select expenses.expense_id , expenses.expense_name , categories.category_name ,
DATE_FORMAT(expenses.expense_date, '%e %b, %Y') AS  expense_date ,expenses.expense_type,
expenses.amount from expenses 
left join categories on categories.category_id = expenses.category_id
where expenses.user_id = 1; 


DELIMITER //

CREATE TRIGGER check_total_balance
BEFORE UPDATE ON expenses
FOR EACH ROW
BEGIN
	DECLARE current_balance DECIMAL(10,3);
    DECLARE min_balance DECIMAL(10,3);
    SET min_balance = 1000; -- Set the minimum balance threshold
    
    -- Check only when expense_type is 'debit'
    IF NEW.expense_type = 'debit' THEN
        -- Retrieve the current total_balance for the user
        
        SELECT total_balance INTO current_balance
        FROM users
        WHERE user_id = NEW.user_id;
        
        -- Check if the total_balance is greater than min_balance + amount
        IF current_balance <= min_balance + NEW.amount THEN
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Insufficient balance';
        END IF;
    END IF;
END //

DELIMITER ;


DELIMITER //

CREATE TRIGGER update_category_spent AFTER INSERT ON expenses
FOR EACH ROW
BEGIN
    IF NEW.expense_type = 'debit' THEN
        UPDATE categories
        SET spent = spent + NEW.amount
        WHERE category_id = NEW.category_id;
    END IF;
END//

DELIMITER ;

drop trigger if exists update_user_totals_debit;
-- DELIMITER //

-- CREATE TRIGGER update_user_totals AFTER INSERT ON expenses
-- FOR EACH ROW
-- BEGIN
--     DECLARE total_income DECIMAL(10,3);
--     DECLARE total_expenses DECIMAL(10,3);
--     
--     SELECT total_income, total_expenses INTO total_income, total_expenses
--     FROM users
--     WHERE user_id = NEW.user_id;
--     
--     IF NEW.expense_type = 'credit' THEN
--         SET total_income = total_income + NEW.amount;
--     ELSEIF NEW.expense_type = 'debit' THEN
--         SET total_expenses = total_expenses + NEW.amount;
--     END IF;
--     
--     UPDATE users
--     SET total_income = total_income,
--         total_expenses = total_expenses,
--         total_balance = total_income - total_expenses
--     WHERE user_id = NEW.user_id;
-- END//

-- DELIMITER ;

drop trigger if exists update_user_totals_credit;
DELIMITER //

CREATE TRIGGER update_user_totals_credit AFTER INSERT ON expenses
FOR EACH ROW
BEGIN
    DECLARE income_total DECIMAL(10,3);
    
    SELECT total_income INTO income_total
    FROM users
    WHERE user_id = NEW.user_id;
    
    IF NEW.expense_type = 'credit' THEN
        SET income_total = income_total + NEW.amount;
    END IF;
    
    UPDATE users
    SET total_income = income_total,
        total_balance = income_total - (total_expenses + total_savings)
    WHERE user_id = NEW.user_id;
END//

DELIMITER ;

drop trigger if exists update_user_totals_debit;
DELIMITER //

CREATE TRIGGER update_user_totals_debit AFTER INSERT ON expenses
FOR EACH ROW
BEGIN
    DECLARE expenses_total DECIMAL(10,3);
    
    SELECT total_expenses INTO expenses_total
    FROM users
    WHERE user_id = NEW.user_id;
    
    IF NEW.expense_type = 'debit' THEN
        SET expenses_total = expenses_total + NEW.amount;
    END IF;
    
    UPDATE users
    SET total_expenses = expenses_total,
        total_balance = total_income - (expenses_total + total_savings)
    WHERE user_id = NEW.user_id;
END//

DELIMITER ;


DELIMITER //

CREATE TRIGGER check_spent_budget
BEFORE UPDATE ON categories
FOR EACH ROW
BEGIN
    IF NEW.budget IS NOT NULL AND NEW.spent > NEW.budget THEN
        SET @message = CONCAT('Spend exceeds budget....you cannot spend more on ', NEW.category_name);
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = @message;
    END IF;
END//

DELIMITER ;

update users set total_income = 70000 , total_expenses = 1349 ,total_balance = 68651 where user_id = 1;

select * from users;






create table budget(
	budget_id int primary key auto_increment not null,
    amount decimal(15,3) not null,
    start_date date not null,
    end_date date not null,
    amount_spent decimal(15,3) not null default 0.0,
    amount_left decimal(15,3) as (amount-amount_spent) not null,
    description varchar(80),
    category_id int,
    foreign key(category_id) references categories(category_id),
	user_id int not null,
    foreign key(user_id) references users(user_id)
);
desc budget;

create table goals(
	goal_id int primary key auto_increment not null,
    goal_name varchar(20) not null unique,
    goal_amount decimal(15,3) not null,
    created_on date not null,
    current_savings decimal(15,3) not null default 0,
	user_id int not null,
    foreign key(user_id) references users(user_id)
);
desc goals;
select * from goals;


SELECT goal_id, UPPER(LEFT(SUBSTRING_INDEX(goal_name, ' ', 1), 1)) AS goal_initials, goal_name,current_savings,goal_amount,DATE_FORMAT(created_on, '%e %b, %Y') AS created_on ,((current_savings / goal_amount) * 100) AS percentage FROM goals where user_id = 1;

SELECT goal_id, 
       UPPER(LEFT(SUBSTRING_INDEX(goal_name, ' ', 1), 1)) AS goal_initials, 
       goal_name,
       current_savings,
       goal_amount,
       DATE_FORMAT(created_on, '%e %b, %Y') AS created_on,
       CONCAT(FLOOR((current_savings / goal_amount) * 100), '') AS percentage
FROM goals
WHERE user_id = 1;


DELIMITER //

CREATE TRIGGER check_savings_balance
BEFORE UPDATE ON goals
FOR EACH ROW
BEGIN
	DECLARE current_balance DECIMAL(10,3);
	DECLARE savings_diff DECIMAL(10,3);
    DECLARE min_balance DECIMAL(10,3);
    SET min_balance = 1000; -- Set the minimum balance threshold
    
    -- Calculate the difference between new.current_savings and old.current_savings
    SET savings_diff = NEW.current_savings - OLD.current_savings;
    
    -- Fetch the total_balance from the users table
    
    SELECT total_balance INTO current_balance
    FROM users
    WHERE user_id = NEW.user_id;
    
    -- Check if min_balance + savings_diff is greater than total_balance
    IF min_balance + savings_diff > current_balance THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Insufficient balance';
    END IF;
END //

DELIMITER ;


DELIMITER //

CREATE TRIGGER update_goal
BEFORE UPDATE ON goals
FOR EACH ROW
BEGIN
    -- DECLARE remaining_balance DECIMAL(15,3);
    -- DECLARE adjusted_amount DECIMAL(15,3);
    DECLARE new_amount DECIMAL(15,3);
    
    -- Calculate the remaining balance needed to achieve the goal
    -- SET remaining_balance = NEW.goal_amount - NEW.current_savings;
    SET new_amount = NEW.current_savings - OLD.current_savings;
    
    -- Check if the amount is greater than the remaining balance
    IF OLD.current_savings + new_amount > NEW.goal_amount THEN
        SET NEW.current_savings = NEW.goal_amount;
    END IF;
END//

DELIMITER ;
select * from Expenses;
DELIMITER //
drop trigger if exists update_users_after_update;
CREATE TRIGGER update_users_after_update
AFTER UPDATE ON goals
FOR EACH ROW
BEGIN
    DECLARE adjusted_amount DECIMAL(15,3);
    
    -- Set the increment amount based on the updated valueDECLARE increment_amount DECIMAL(15,3);
    
    -- Set the increment amount based on the updated value
    
    -- Get the adjusted amount from the updated row
    SET adjusted_amount = NEW.current_savings - OLD.current_savings;
    
    -- Update the total savings and total balance in the users table
    UPDATE users
    SET total_savings = total_savings + adjusted_amount,
        total_balance = total_income - (total_expenses + total_savings)
    WHERE user_id = NEW.user_id;
END//

DELIMITER ;


DELIMITER //

CREATE TRIGGER insert_expense_before_delete
BEFORE DELETE ON goals
FOR EACH ROW
BEGIN
    INSERT INTO expenses (expense_name, expense_date, expense_type, amount, user_id)
    VALUES (OLD.goal_name, CURDATE(), 'debit', OLD.goal_amount, OLD.user_id);
END //

DELIMITER ;


DELIMITER //
drop trigger if exists update_users_after_delete;
CREATE TRIGGER update_users_after_delete
AFTER DELETE ON goals
FOR EACH ROW
BEGIN
    UPDATE users
    SET total_expenses = total_expenses + OLD.goal_amount,
        total_savings = total_savings - OLD.goal_amount,
        total_balance = total_income - (total_expenses + total_savings)
    WHERE user_id = OLD.user_id;
END //

DELIMITER ;


select user_id,total_income,total_expenses,total_balance,total_savings from users where user_id = 1;

select CONCAT(UPPER(LEFT(SUBSTRING_INDEX(First_name, ' ', 1), 1)),UPPER(LEFT(SUBSTRING_INDEX(last_name, ' ', 1), 1))) as initials from users where user_id =1;

select * from categories where user_id = 2;




-- signin


-- signup
insert into users (first_name, last_name, email, password) values ('Khushi','Batra','khushi@gmail.com','Khushi@123');