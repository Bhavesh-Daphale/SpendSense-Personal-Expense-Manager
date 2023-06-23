import React from "react";
import './Dashboard';

const Activity = ({}) => {
    return(
        <div style={{ height: "29vh" ,overflow: "scroll"}}>
                    
                    
                    <div className="w-100 ">
                        <div className="activity-text mb-1">Today    </div>
                        <div className="dashboard-item p-2 mb-2">
                            <div className="activity-text">$2000 debited, spent on Movies</div>
                            <div className="activity-date">31 Dec, 2023</div>

                        </div>
                       
                        
                    </div>
                    <div className="w-100 ">
                        <div className="activity-text mx-1">History    </div>
                        <div className="dashboard-item p-2 mb-2">
                            <div className="activity-text">$2000 debited, spent on Movies</div>
                            <div className="activity-date">31 Dec, 2023</div>

                        </div>
                        <div className="dashboard-item p-2 mb-2">
                            <div className="activity-text">This is a Activity section this is a very </div>
                            <div className="activity-date">31 Dec, 2023</div>

                        </div>
                        <div className="dashboard-item p-2 mb-2">
                            <div className="activity-text">This is notification section this is a very long activity section</div>
                            <div className="activity-date">31 Dec, 2023</div>

                        </div>
                       
                        
                    </div>
                  </div>
    );
}

export default Activity;