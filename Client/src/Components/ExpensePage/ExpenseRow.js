import React from "react";
import './Expenses.css';

const ExpenseRow = ({expense}) => {
    return(
        <tr key={expense.expense_id}>
            <td className="expense-name"> <h5 className="p-0 m-0">{expense.expense_name}</h5><span className="note">This is note</span></td>
            <td>{expense.category_name}</td>
            <td>{expense.expense_date}</td>
            <td>
                {expense.expense_type === 'credit' ? (<p className="status credit"  >{expense.expense_type}</p>): (<p className="status debit"  >{expense.expense_type}</p>)}
            </td>
            <td><strong>₹{expense.amount}</strong></td>
        </tr>
    );
}

export default ExpenseRow;