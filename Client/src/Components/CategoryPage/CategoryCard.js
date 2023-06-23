import React from "react";
import './Category.css';

const CategoryCard = ({ category }) => {

    return (  
        <div key={category.category_id} className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-xs-12 ">
            <div className=" category p-2">
                <div className="w-100 ">
                    <div className="d-flex">
                        <div className="category-initials d-flex justify-content-center align-items-center">{category.category_initials}</div>
                        <div className="mt-1">
                            <div className="category-name ">{category.category_name}</div>
                            <div className="category-date ">{category.created_on}</div>
                        </div>
                    </div>  
                </div>

                <div className="d-flex justify-content-between mt-2">
                    <div className="px-2 category-total">
                        <div className="category-total-heading">Total Spend</div>
                        <div>₹{category.spent}</div>
                    </div>
                    <div className="px-2 category-total">
                        <div className="category-total-heading">Total budget</div>
                        <div>₹{category.budget}</div>
                    </div>
                    <div className="px-2 category-total d-flex align-items-end"> 
                        <div>{category.percentage}</div>
                    </div>
                </div>

                <div className="progress mx-2 rounded-pill mt-1" style={{height: '12px', backgroundColor:'var(--white)'}}>
                    <div className="progress-bar rounded-pill" role="progressbar" style={{width: category.percentage, backgroundColor:'var(--medium)'}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
            </div>
        </div>
    );
}

export default CategoryCard;