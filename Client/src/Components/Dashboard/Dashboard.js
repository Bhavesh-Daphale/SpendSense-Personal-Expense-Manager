import React, { useEffect, useState } from "react";
import Sidebar from "../Navigationbars/Sidebar";
import TopNav from "../Navigationbars/TopNav";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ExpenseChart from "./ExpenseChart";
import CategoryChart from "./CategoryChart";
import Activity from "./Activity";
import TotalsCard from "./TotalsCard";

const Dashboard = ({ userId, loggedIn }) => {
  const [totalsRecord, setTotalsRecord] = useState([]);
  const navigate = useNavigate();

  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/userdata?userId=${userId}`
      );
      setTotalsRecord([
        {
          totalHeading: "Total Credit",
          totalAmount: response.data[0].total_income,
          bgColor: "#e5d6fb",
        },
        {
          totalHeading: "Total Debit",
          totalAmount: response.data[0].total_expenses,
          bgColor: "#fbd3f5",
        },
        {
          totalHeading: "Total Balance",
          totalAmount: response.data[0].total_balance,
          bgColor: "#d5e4fa",
        },
        {
          totalHeading: "Total Savings",
          totalAmount: response.data[0].total_savings,
          bgColor: "#fffdc8",
        },
      ]);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  });

  useEffect(() => {
    if (!loggedIn) {
      navigate("/signin", { replace: true });
    }
  }, [loggedIn, navigate]);

  if (!loggedIn) {
    return null;
  }

  return (
    <div className="main-container d-flex">
      <Sidebar activePage="dashboard" />
      <div className="content main-content ">
        <TopNav userId={userId} />
        <div className="container-fluid p-2 dashboard-content ">
          <div className="container-fluid dashboard-header d-flex justify-content-between ">
            <h1>Dashboard</h1>
          </div>
          <div className="container-fluid dashboard-list row d-flex justify-content-center p-0 m-0 g-2">
            <div class="row h-100 col-lg-8 col-sm-12 g-2 mt-0">
              {totalsRecord.map((record) => (
                <TotalsCard record={record} />
              ))}

              <div class="col-lg-12 col-sm-12 ">
                <div class=" dashboard-item p-2" >
                  <div style={{ height: "45vh", overflow: "scroll" }}>
                    <ExpenseChart userId={userId} />
                  </div>
                </div>
              </div>

              <div class="col-6">
                <div class=" dashboard-item p-2">
                  <div class="p-2" >
                    <div className="w-100 mb-2 dashboard-item-heading">Goal Achieved</div>
                    <div className="w-100 dashboard-item-text d-flex justify-content-between">
                        <div>₹ 30000</div>
                        <div>₹ 80000</div>
                    </div>
                    <div className="progress rounded-pill mt-1" style={{height: '12px'}}>
                        <div className="progress-bar rounded-pill" role="progressbar" style={{width: "60%", backgroundColor:'#76C3E8'}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-6">
                <div class=" dashboard-item p-2">
                  <div class="p-2" >
                    <div className="w-100 mb-2 dashboard-item-heading">Budget</div>
                    <div className="w-100 dashboard-item-text d-flex justify-content-between">
                        <div>₹ 30000</div>
                        <div>₹ 80000</div>
                    </div>
                    <div className="progress rounded-pill mt-1" style={{height: '12px'}}>
                        <div className="progress-bar rounded-pill" role="progressbar" style={{width: "60%", backgroundColor:'#D976E8'}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* <div class="col-lg-12 col-sm-12 ">
                    <div class="row d-flex g-2 m-0" style={{ height: "12vh" }}>
                        <div class="col-6" style={{ height: "100%" }}>
                            <div class=" dashboard-item p-2" style={{ height: "100%" }}>
                                <div ></div>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class=" dashboard-item p-2" style={{ height: "100%" }}>
                                <div ></div>
                            </div>
                        </div>

                    </div>

                    

              </div> */}
            </div>

            <div class="row h-100 col-lg-4 col-12 g-2 mt-0">
              <div class="col-12 ">
                <div class=" dashboard-item p-2 " >
                  <div style={{ height: "40vh" }}>
                    <CategoryChart userId={userId} />
                  </div>
                </div>
              </div>

              <div class="col-12">
                <div class="  p-2">
                <div className="dashboard-item-text mb-1">Recent Activity    </div>
                <Activity />
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
