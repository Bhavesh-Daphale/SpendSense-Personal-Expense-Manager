import React from "react";
import './Dashboard';

const TotalsCard = ({record}) => {
    return(
        <div class="col-lg-3 col-md-3 col-sm-3 col-6">
            <div class="category totals p-2 ratio ratio-16x9 d-flex justify-content-center align-itens-center" style={{backgroundColor : record.bgColor }}>
                <div className="totals p-3 d-flex flex-column justify-content-center align-items-left">
                        <div className="totals-heading mb-1">{record.totalHeading}</div>
                        <div className="totals-amount">₹ {record.totalAmount}</div> 
                </div>
            </div>
        </div>
    );
}

export default TotalsCard;