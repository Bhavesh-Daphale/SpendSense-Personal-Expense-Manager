
import React, {useEffect , useState} from "react";
import Sidebar from '../Navigationbars/Sidebar';
import TopNav from '../Navigationbars/TopNav';
import ExpenseTable from "./ExpenseTable";
import ExpenseModal from "./ExpenseModal";
import { useNavigate } from 'react-router-dom';
import './Expenses.css';
import axios from 'axios';

const Expenses = ({ userId , loggedIn }) => {
    const [expenses, setExpenses] = useState([]);
    const navigate = useNavigate();
    

    const fetchExpenses = async () => {
        try {
            // console.log("fetchExpense is called")
          const response = await axios.get(`http://localhost:3001/expenses?userId=${userId}`);
          setExpenses(response.data);
        //   console.log("Expense is updated")
        } catch (error) {
          console.error('Error fetching categories:', error);
        }
      };

    useEffect(() => {
        fetchExpenses();
      });

    useEffect(() => {
        if (!loggedIn) {
          navigate('/signin', { replace: true });
        }
      }, [loggedIn, navigate]);
    
      if (!loggedIn) {
        return null;
      }


    return(
        <div className="main-container d-flex">   
            <Sidebar activePage="expenses" />
            <div className="content main-content">
                <TopNav userId = {userId}/>

                <div className="container">
                    <div className="container expenses-header d-flex justify-content-between py-2">
                        <h1>Expenses</h1>
                        <div className="input-group d-flex justify-content-end align-items-center">
                            <button className="add-expense-btn" id="" data-toggle="modal" data-target="#expense-modal">Add Expenses</button>
                        </div>
                    </div>
                </div>

                <ExpenseTable expenses = {expenses}/>
                <ExpenseModal userId = {userId} fetchExpenses={fetchExpenses}/>
            </div>
        </div>
    );
}

export default Expenses;