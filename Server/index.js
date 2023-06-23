var express = require('express');
var app = express();
app.use(express.json());

const bcrypt = require('bcrypt');
const cors = require('cors');
app.use(cors());

// app.set('view engine','ejs');
var bodyparser = require('body-parser');
// app.use(express.static(__dirname + '/assets'));
app.use(bodyparser.urlencoded({extended: true}));

var connection = require('./database');




// Login endpoint
app.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    console.log(email);
    console.log(password);
  
    try {
      await connection.query('SELECT * FROM users WHERE email = ?', [email], async function (err, results, fields) {
        if (results.length === 0) {
          res.json({ success: false, message: 'Email not registered' });
          return;
        }
  
        console.log("result" + results);
        console.log("result[0]" + results[0]);
        console.log("result[0].user_id " + results[0].user_id);
        console.log("result[0].email" + results[0].email);
        const user = results[0];
        console.log("user " + user);
  
        const match = await bcrypt.compare(password, user.password);
        if (match) {
          res.json({ success: true, message: 'Login successful', user_id: results[0].user_id });
          console.log("SignIn successful");
        } else {
          res.json({ success: false, message: 'Invalid email or password' });
        }
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  });
  
  
  // Register endpoint
  app.post('/signup', async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    console.log(firstName);
    console.log(lastName);
    console.log(email);
    console.log(password);
  
    try {

        await connection.query('SELECT * FROM users WHERE email = ?', [email], async function (err, results, fields) {
            if (results.length > 0) {
              res.json({ success: false, message: 'User with the email already exists' });
              return;
            }

      const hashedPassword = await bcrypt.hash(password, 10);
      console.log(hashedPassword)
      await connection.query('INSERT INTO users (first_name, last_name, email, password, total_income, total_expenses, total_balance, total_savings) VALUES (?, ?, ?, ?, 0, 0, 0, 0)', [
        firstName,
        lastName,
        email,
        hashedPassword,
      ]);
  
      res.json({ success: true, message: 'Registration successful' });
    //   alert("SignUp Successful");
      console.log("SignUp successful");
        });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  });


  //get user Data
  app.get('/userdata', (req, res) => {
    // Retrieve all categories from the database
    const userId = req.query.userId;
    // console.log("user " + userId);

    try{
        q= "select user_id,  CONCAT(UPPER(LEFT(SUBSTRING_INDEX(First_name, ' ', 1), 1)),UPPER(LEFT(SUBSTRING_INDEX(last_name, ' ', 1), 1))) as initials, total_income, total_expenses, total_balance, total_savings from users where user_id = ?"
        connection.query(q,userId ,(err, results) => {
            // if(results.length === 0 ){
            //     res.json({ success: false, message: 'No Categories Added Yet' });
            //     return ;
            // }
            // else{
            //     res.json(results);
            // }
            if(err){
                throw err;
            }
            res.json(results);
            
        });

    }
    catch (error) {
        console.error('Error retrieving user data:', err);
        res.status(500).json({ error: 'An error occurred while retrieving user data'});
      }
   
    
  });

// get all cateories
app.get('/allcategory', (req, res) => {
    // Retrieve all categories from the database
    const userId = req.query.userId;

    try{
        q= "SELECT category_id, UPPER(LEFT(SUBSTRING_INDEX(category_name, ' ', 1), 1)) AS category_initials, category_name,spent,budget,DATE_FORMAT(created_on, '%e %b, %Y') AS created_on ,concat(((spent / budget) * 100),'%') AS percentage FROM categories where user_id = ?"
        connection.query(q,userId ,(err, results) => {
            // if(results.length === 0 ){
            //     res.json({ success: false, message: 'No Categories Added Yet' });
            //     return ;
            // }
            // else{
            //     res.json(results);
            // }
            if(err){
                throw err;
            }
            res.json(results);
            
        });

    }
    catch (error) {
        console.error('Error retrieving categories:', err);
        res.status(500).json({ error: 'An error occurred while retrieving categories'});
      }
   
    
  });




  //display categories
  app.get('/category', (req, res) => {
    // Retrieve all categories from the database
    const userId = req.query.userId;

    try{
        q= "SELECT category_id, UPPER(LEFT(SUBSTRING_INDEX(category_name, ' ', 1), 1)) AS category_initials, category_name,spent,budget,DATE_FORMAT(created_on, '%e %b, %Y') AS created_on ,concat(floor((spent / budget) * 100),'%') AS percentage FROM categories where budget IS NOT NULL and user_id = ?"
        connection.query(q,userId ,(err, results) => {
            // if(results.length === 0 ){
            //     res.json({ success: false, message: 'No Categories Added Yet' });
            //     return ;
            // }
            // else{
            //     res.json(results);
            // }
            if(err){
                throw err;
            }
            res.json(results);
            
        });

    }
    catch (error) {
        console.error('Error retrieving categories:', err);
        res.status(500).json({ error: 'An error occurred while retrieving categories'});
      }
   
    
  });

//add new category
  app.post('/category', async (req, res) => {
    const { categoryName, budget , userId } = req.body;

    console.log(categoryName);
    console.log(budget);
    console.log(userId);
  
    try {
      connection.query('INSERT INTO categories (category_name,budget,user_id,created_on) VALUES (?, ?, ?,CURDATE())', [
        categoryName,
        budget,
        userId,
      ]);
  
      res.json({ success: true, message: 'New Category Added Successfully' });
      console.log("New Category Added Successfully");
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  });


 // Retrieve all categories from the database
  app.get('/expenses', (req, res) => {
   
    const userId = req.query.userId;
//  console.log("expense user "+userId)
    try{
        q= "select expenses.expense_id , expenses.expense_name , categories.category_name ,DATE_FORMAT(expenses.expense_date, '%e %b, %Y') AS  expense_date, expenses.expense_type, expenses.amount from expenses left join categories on categories.category_id = expenses.category_id where expenses.user_id = ?"
        connection.query(q,userId ,(err, results) => {
            // if(results.length === 0 ){
            //     res.json({ success: false, message: 'No Categories Added Yet' });
            //     return ;
            // }
            // else{
            //     res.json(results);
            // }
            if(err){
                console.log("err :" + err)
                throw err;
            }
            // console.log("results:" + results)
            res.json(results);
            
        });

    }
    catch (error) {
        console.error('Error retrieving expenses:', err);
        res.status(500).json({ error: 'An error occurred while retrieving expenses'});
      }
   
    
  });


  app.post('/expenses', (req, res) => {
    const { expense_type, expense_name, amount, category ,user_id} = req.body;
    const query = 'INSERT INTO expenses (expense_type, expense_name, amount, category_id , user_id, expense_date) VALUES (?, ?, ?, ?, ?, CURDATE())';
  
    connection.query(query, [expense_type, expense_name, amount, category,user_id], (err, result) => {
        if(err && err.sqlState == '45000'){
            console.error('Error inserting expense:', err.sqlMessage);
            res.json({ success: false, message: err.sqlMessage });

        }
      
      else if (err) {
        console.error('Error inserting expense:', err);
        res.status(500).json({ error: 'Failed to insert expense' });
        return;
      }
    else{
    res.json({ success: true, message: 'Expense added Successfully' });

    }
      
    });
  });




  //add new goal
  app.post('/goals', async (req, res) => {
    const { goalName, goalAmount , userId } = req.body;

  
    try {
      connection.query('INSERT INTO goals (goal_name,goal_amount,user_id,created_on) VALUES (?, ?, ?,CURDATE())', [
        goalName,
        goalAmount,
        userId,
      ]);
  
      res.json({ success: true, message: 'New Goal Added Successfully' });
      console.log("New Goal Added Successfully");
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  });



  app.get('/goals', (req, res) => {
    // Retrieve all categories from the database
    const userId = req.query.userId;

    try{
        q= "SELECT goal_id, UPPER(LEFT(SUBSTRING_INDEX(goal_name, ' ', 1), 1)) AS goal_initials, goal_name,current_savings,goal_amount,DATE_FORMAT(created_on, '%e %b, %Y') AS created_on, CONCAT(FLOOR((current_savings / goal_amount) * 100), '') AS percentage FROM goals where user_id = ?"
        connection.query(q,userId ,(err, results) => {
            // if(results.length === 0 ){
            //     res.json({ success: false, message: 'No Categories Added Yet' });
            //     return ;
            // }
            // else{
            //     res.json(results);
            // }
            if(err){
                throw err;
            }
            res.json(results);
            
        });

    }
    catch (error) {
        console.error('Error retrieving goals:', err);
        res.status(500).json({ error: 'An error occurred while retrieving goals'});
      }
   
    
  });

  //update goal
  app.post('/updategoals', async (req, res) => {
    const { addMoney, userId, goal_id } = req.body;

    const query = 'UPDATE goals SET current_savings = current_savings + ? WHERE user_id = ? and goal_id = ?';
  
    connection.query(query, [addMoney, userId, goal_id], (err, result) => {
        if(err && err.sqlState == '45000'){
            console.error('Error adding money :', err.sqlMessage);
            res.json({ success: false, message: err.sqlMessage });

        }
      
      else if (err) {
        console.error('Error inserting expense:', err);
        res.status(500).json({ error: 'Error Adding Money' });
        return;
      }
    else{
    res.json({ success: true , message: 'Expense added Successfully' });

    }
      
    });

  
  });

  //delete goal
  app.post('/deletegoals', async (req, res) => {
    const {  userId, goal_id } = req.body;

    const query = 'DELETE FROM goals WHERE user_id = ? AND goal_id = ?';
  
    connection.query(query, [ userId, goal_id], (err, result) => {
    if (err) {
        console.error('Error spending:', err);
        res.status(500).json({ error: 'Failed to spend' });
        return;
      }
    else{
    res.json({ success: true, message: 'Spend Successfully' });

    }
      
    });

  
  });



app.listen(3001,function(){
    console.log("App Listening");
    connection.connect(function(err){
        if(err) throw err;
        console.log("Database Connected!");
    })
});