import React , {useEffect , useState} from "react";
import './Goals.css';
import axios from "axios";

const GoalsCard = ({ userId , goal ,fetchGoals}) => {
    const [addMoney, setAddMoney] = useState();
    const [goalper,setGoalper] = useState(goal.percentage);
    console.log(goalper)
    
    useEffect(() => {
        const numbers = document.querySelectorAll('.number');
        const svgEl = document.querySelectorAll('svg circle');
        const counters = Array(numbers.length);
        const intervals = Array(counters.length);
        counters.fill(0);
    
        numbers.forEach((number, index) => {
          clearInterval(intervals[index]);
          counters[index] = 0;
          intervals[index] = setInterval(() => {
            if (counters[index] === parseInt(number.dataset.num)) {
              clearInterval(intervals[index]);
            } else {
              counters[index] += 1;
              number.innerHTML = counters[index] + "%";
              svgEl[index].style.strokeDashoffset = Math.floor(236 - 220 * parseFloat(number.dataset.num / 100));
            }
          }, 25);
        });
      }, [goal.percentage]);

      const handleSpend = async () =>{
        try {
          const response = await axios.post("http://localhost:3001/deletegoals", {
            userId,
            goal_id: goal.goal_id
          });
          if (response.data.success) {
            fetchGoals();
    
          } else {
            alert(response.data.message);
            console.log(response.data.message);
          }
        } catch (error) {
            alert(error);
          console.log(error);
        }

      }

      const handleAddMoney = async (e) => {
        e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/updategoals", {
        addMoney,
        userId,
        goal_id: goal.goal_id
      });
      if (response.data.success) {
        setAddMoney("");
        fetchGoals();

      } else {
        alert(response.data.message);
        console.log(response.data.message);
      }
    } catch (error) {
        alert(error);
      console.log(error);
    }
  };

    return (  
        <div key={goal.goal_id} className="col-lg-4 col-md-6 col-sm-12 ">
                    <div className=" goals p-2 ">
                        <div className="row">
                            <div className="skill  col-4 d-flex justify-content-center align-items-center" >
                                <div className="outer">
                                    <div className="inner">
                                        <div className="number" data-num={goal.percentage}>0%
                                        </div>
                                    </div>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="160px" height="160px">
                                    <defs>
                                        <linearGradient id="GradientColor">
                                            <stop offset="0%" stop-color="#e91e63" />
                                            <stop offset="100%" stop-color="#673ab7" />
                                        </linearGradient>
                                    </defs>
                                    <circle cx="80" cy="80" r="35" stroke-linecap="round" />
                                </svg>
                            </div>
                            <div className="col-8">
                                <div className="w-100 ">
                                    <div className="d-flex">
                                      <div className="goals-initials d-flex justify-content-center align-items-center">GT</div>
                                      <div className="mt-1">
                                        <div className="goals-name ">{goal.goal_name}</div>
                                        <div className="goals-date ">{goal.created_on}</div>
                                      </div>
                                    </div>
                                </div>
                                <div className="w-100 d-flex justify-content-between ">
                                    <div className="px-2 goals-total">
                                        <div className="goals-total-heading">Saving</div>
                                        <div>₹{goal.current_savings}</div>
                                    </div>
                                    <div className="px-2 goals-total">
                                        <div className="goals-total-heading">Goal</div>
                                        <div>₹{goal.goal_amount}</div>
                                    </div>
                                </div>    
                            </div>
                            { goal.current_savings === goal.goal_amount ? (
                            <div className="w-100 d-flex justify-content-center">
                            <button onClick={handleSpend} className="w-100 border rounded-3 m-2 p-1 spend-btn">
                              Spend
                            </button>
                          </div>

                            ) : (
                            <form onSubmit={handleAddMoney} className="w-100 d-flex justify-content-center add-money" >
                                <input 
                                class="col-10 px-2 py-1 my-2" 
                                type="number" 
                                value = {addMoney}
                                onChange={(e) => {setAddMoney(e.target.value)}}
                                placeholder="Enter amount to add here..."/>
                                <button type="submit" class="p-2 my-2 bg-white category-name d-flex justify-content-center align-items-center"><i class="fa-solid fa-plus"></i></button>
                            </form>
                            )

                            }
                        </div>
                    </div>
                </div>
    );
}

export default GoalsCard;