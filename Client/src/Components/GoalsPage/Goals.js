import React, { useEffect , useState } from 'react';
import Sidebar from '../Navigationbars/Sidebar';
import TopNav from '../Navigationbars/TopNav';
import './Goals.css';
import GoalsModal from './GoalsModal';
import GoalsCard from './GoalsCard';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Goals = ({ userId , loggedIn }) => {
    const [goals, setGoals] = useState([]);
    const navigate = useNavigate();
    

    const fetchGoals = async () => {
        try {
          const response = await axios.get(`http://localhost:3001/goals?userId=${userId}`);
          setGoals(response.data);
        } catch (error) {
          console.error('Error fetching goals:', error);
        }
      };

    useEffect(() => {
        fetchGoals();
      });

    useEffect(() => {
        if (!loggedIn) {
          navigate('/signin', { replace: true });
        }
      }, [loggedIn, navigate]);
    
      if (!loggedIn) {
        return null;
      }

      
    return (
        <div className="main-container d-flex">
            <Sidebar activePage="goals" />
            <div className="content main-content ">
                <TopNav userId = {userId}/>
                <div className="container-fluid p-2 goals-content ">
                    <div className="container-fluid goals-header d-flex justify-content-between py-2">
                        <h1>Goals</h1>
                        <div className="input-group d-flex justify-content-end align-items-center">
                            <button className="add-expense-btn" id="" data-toggle="modal" data-target="#goals-modal">Set New Goal</button>
                        </div>
                    </div>
                    <div className='goals-list'>
                    <div className="container-fluid  row d-flex m-0 g-3">
                      
                      {goals.map((goal) => (
                      <GoalsCard key={goal.goal_id} goal={goal} userId = {userId} fetchGoals={fetchGoals}/>))}
                      {/* <GoalsCard goalper = {50}/>
                      <GoalsCard goalper = {90}/>
                      <GoalsCard goalper = {70}/> */}
                  </div>

                    </div>
                    
                </div>
                <GoalsModal userId = {userId} fetchGoals={fetchGoals}/>
            </div>
        </div>
    );
} 

export default Goals;