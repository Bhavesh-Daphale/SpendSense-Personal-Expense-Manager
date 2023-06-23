// import React from "react";
// import './Expenses.css';
// import axios from "axios";

// const ExpenseModal = () => {
//     return (
//         <div className="modal fade" id="expense-modal" tabindex="-1" role="dialog" aria-labelledby="expense-modal-label" aria-hidden="true">
//             <div className="modal-dialog" role="document">
//                 <div className="modal-content">
//                     <div className="modal-header">
//                         <h5 className="modal-title" id="expense-modal-label">Add Expense</h5>
//                         <button type="button" className="close btn border" data-dismiss="modal" aria-label="Close">
//                             <span aria-hidden="true">&times;</span>
//                         </button>
//                     </div>
//                     <div className="modal-body">
//                         <form id="expense-form-fields">
//                             <div className="form-group " id="radio-input">
//                                 <div className="mydict">
//                                     <div>
//                                         <label>
//                                             <input type="radio" name="radio"    />
//                                             <span>Credit</span>
//                                         </label>
//                                         <label>
//                                             <input type="radio" name="radio" defaultChecked />
//                                             <span>Debit</span>
//                                         </label>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="form-group my-2">
//                                 <label for="expense-name">Expense Name</label>
//                                 <input type="text" className="form-control" id="expense-name" required />
//                             </div>
//                             <div className="form-group my-2">
//                                 <label for="expense-amount">Expense Amount</label>
//                                 <input type="number" className="form-control" id="expense-amount" required />
//                             </div>
//                             <div className="form-group my-2">
//                                 <label for="expense-category">Category</label>
//                                 <select className="form-control" id="expense-category">
//                                     <option value="option1">Option 1</option>
//                                     <option value="option2">Option 2</option>
//                                     <option value="option3">Option 3</option>
//                                     <option value="option4">Option 4</option>
//                                     <option value="option5">Option 5</option>
//                                 </select>
//                             </div>
//                             <button type="submit " className="btn btn-primary">Submit</button>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default ExpenseModal;







import React, { useState, useEffect } from 'react';
import './Expenses.css';
import axios from 'axios';

const ExpenseModal = ({userId , fetchExpenses}) => {
  const [categories, setCategories] = useState([]);

  

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/allcategory?userId=${userId}`);
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    // Fetch categories from the server
    fetchCategories();
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const expense = {
      expense_type: form.radio.value,
      expense_name: form['expense-name'].value,
      amount: parseFloat(form['expense-amount'].value),
      category: form['expense-category'].value,
      user_id: userId
    };
    console.log("expense" + expense);

    try {
      // Send expense data to the server to insert into the expenses table
      const response = await axios.post('http://localhost:3001/expenses', expense);
      // Reset form fields after successful submission
      
    if (response.data.success) {
        console.log("expense inserted successfully")
      form.reset();
      fetchExpenses();
      } else {
        alert(response.data.message + expense.category)
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
    
    // catch (error) {
    //     alert(error);
    //   console.error('Error adding expense:', error);
    // }
  };

  return (
    <div className="modal fade" id="expense-modal" tabindex="-1" role="dialog" aria-labelledby="expense-modal-label" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="expense-modal-label">Add Expense</h5>
            <button type="button" className="close btn border" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form id="expense-form-fields" onSubmit={handleSubmit}>
              <div className="form-group " id="radio-input">
                <div className="mydict">
                  <div>
                    <label>
                      <input type="radio" name="radio" value="credit" />
                      <span>Credit</span>
                    </label>
                    <label>
                      <input type="radio" name="radio" value="debit" defaultChecked />
                      <span>Debit</span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="form-group my-2">
                <label htmlFor="expense-name">Expense Name</label>
                <input type="text" className="form-control" id="expense-name" required />
              </div>
              <div className="form-group my-2">
                <label htmlFor="expense-amount">Expense Amount</label>
                <input type="number" className="form-control" id="expense-amount" required />
              </div>
              <div className="form-group my-2">
                <label htmlFor="expense-category">Category</label>
                <select className="form-control" id="expense-category" >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category.category_id} value={category.category_id}>{category.category_name}</option>
                  ))}
                </select>
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseModal;
