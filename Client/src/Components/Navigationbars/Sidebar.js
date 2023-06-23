// import React , {useState} from 'react';
// import '../CategoryPage/Category.css';
// import { Link } from "react-router-dom";

// const SideBar = () => {
//     const [activeItem, setActiveItem] = useState(null);
  
//     const handleItemClick = (item) => {
//         console.log("item " + item)
//         console.log(activeItem);
//       setActiveItem(item);
//       console.log(activeItem);
      
//     };
    
//     const handleCloseSidebar = () => {
//         document.querySelector('.sidebar').classList.remove('active');
//     };

//     return(
//         <div className="sidebar" id="side_nav">
//             <div className="header-box px-2 pb-4 pt-3 d-flex justify-content-between">
//                 <h1 className="fs-4"><span className="text-white">$pend$ense</span></h1>
//                 <button className="btn d-md-none d-block close-btn px-1 py-0 text-white" onClick={handleCloseSidebar}>
//                     <i className="fa-solid fa-x"></i>
//                 </button>
//             </div>

//             <ul className="list-unstyled px-2">
//                 <Link className='link' to="/dashboard">
//                     <li className={activeItem === 'item1' ? 'active' : ''} onClick={() => handleItemClick('item1')}>
//                         <a href="/dashboard" className="text-decoration-none px-3 py-2 d-block link">Dashboard</a>
//                     </li>
//                 </Link>
//                 <Link className='link' to="/expense">
//                     <li className={activeItem === 'item2' ? 'active' : ''} onClick={() => handleItemClick('item2')}>
//                         <a href="/expenses" className="text-decoration-none px-3 py-2 d-block link">Expenses</a>
//                     </li>
//                 </Link>    
//                 <Link className='link' to="/category">
//                     <li className={activeItem === 'item3' ? 'active' : ''} onClick={() => handleItemClick('item3')}>
//                         <a href="/category" className="text-decoration-none px-3 py-2 d-block link" >Categories</a>
//                     </li>
//                 </Link>
//                 <Link className='link' to="/goals">
//                     <li className={activeItem === 'item4' ? 'active' : ''} onClick={() => handleItemClick('item4')}>
//                         <a href="/goals" className="text-decoration-none px-3 py-2 d-block link">Goals</a>
//                     </li>
//                 </Link>
                
//             </ul>
            
//             <hr className="h-color mx-2" />
            
//             <ul className="list-unstyled px-2">
//                 <li className={activeItem === 'item5' ? 'active' : ''} onClick={() => handleItemClick('item5')}>
//                     <a href="/" className="text-decoration-none px-3 py-2 d-block link">Log out</a>
//                 </li> 
//             </ul>
//       </div>
//     );
// }

// export default SideBar;









// import React , {useState} from 'react';
// import '../CategoryPage/Category.css';
// import { Link } from "react-router-dom";
// import { NavLink } from 'react-router-dom';

// const SideBar = ({ activeLink }) => {
//     // const [activeItem, setActiveItem] = useState(null);
  
//     // const handleItemClick = (item) => {
//     //   setActiveItem(item);
//     // };
    
//     const handleCloseSidebar = () => {
//         document.querySelector('.sidebar').classList.remove('active');
//     };

//     return(
//         <div className="sidebar" id="side_nav">
//             <div className="header-box px-2 pb-4 pt-3 d-flex justify-content-between">
//                 <h1 className="fs-4"><span className="text-white">$pend$ense</span></h1>
//                 <button className="btn d-md-none d-block close-btn px-1 py-0 text-white" onClick={handleCloseSidebar}>
//                     <i className="fa-solid fa-x"></i>
//                 </button>
//             </div>

//             <ul className="list-unstyled px-2">
//                 <li className="text-decoration-none px-3 py-2 d-block link">
//                     <NavLink to="/dashboard" activeClassName="active">
//                         Dashboard
//                     </NavLink>
//                 </li>
//                 <NavLink className='link' to="/dashboard">
//                     <li className="">
//                         <a href="/dashboard" className="text-decoration-none px-3 py-2 d-block link">Dashboard</a>
//                     </li>
//                 </NavLink>
//                 <NavLink className='link' to="/expense">
//                     <li className="">
//                         <a href="/expenses" className="text-decoration-none px-3 py-2 d-block link">Expenses</a>
//                     </li>
//                 </NavLink>    
//                 <NavLink className='link' to="/category">
//                     <li className="">
//                         <a href="/category" className="text-decoration-none px-3 py-2 d-block link" >Categories</a>
//                     </li>
//                 </NavLink>
//                 <NavLink className='link' to="/goals">
//                     <li className="">
//                         <a href="/goals" className="text-decoration-none px-3 py-2 d-block link">Goals</a>
//                     </li>
//                 </NavLink>
                
//             </ul>
            
//             <hr className="h-color mx-2" />
            
//             <ul className="list-unstyled px-2">
//                 <li className="">
//                     <a href="/" className="text-decoration-none px-3 py-2 d-block link">Log out</a>
//                 </li> 
//             </ul>
//       </div>
//     );
// }

// export default SideBar;







import React, { useState } from 'react';
import '../Navigationbars/Navigationbar.css';
import { Link} from 'react-router-dom';

const Sidebar = ({ activePage }) => {
  const [activeItem, setActiveItem] = useState(activePage);

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  const handleCloseSidebar = () => {
    document.querySelector('.sidebar').classList.remove('active');
  };

  return (
    <div className="sidebar" id="side_nav">
      <div className="header-box px-2 pb-4 pt-3 d-flex justify-content-between">
        <h1 className="fs-4">
          <span className="logo-text">$pend$ense</span>
        </h1>
        <button
          className="btn d-md-none d-block close-btn px-1 py-0 text-white"
          onClick={handleCloseSidebar}
        >
          <i className="fa-solid fa-x"></i>
        </button>
      </div>

      <ul className="list-unstyled px-2">
        <Link className="link" to="/dashboard">
          <li
            className={activeItem === 'dashboard' ? 'active' : ''}
            onClick={() => handleItemClick('dashboard')}
          >
            <a href="#" className="text-decoration-none px-3 py-2 d-block link">
              Dashboard
            </a>
          </li>
        </Link>
        <Link className="link" to="/expenses">
          <li
            className={activeItem === 'expenses' ? 'active' : ''}
            onClick={() => handleItemClick('expenses')}
          >
            <a href="#" className="text-decoration-none px-3 py-2 d-block link">
              Expenses
            </a>
          </li>
        </Link>
        <Link className="link" to="/category">
          <li
            className={activeItem === 'category' ? 'active' : ''}
            onClick={() => handleItemClick('category')}
          >
            <a href="#" className="text-decoration-none px-3 py-2 d-block link">
              Categories
            </a>
          </li>
        </Link>
        <Link className="link" to="/goals">
          <li
            className={activeItem === 'goals' ? 'active' : ''}
            onClick={() => handleItemClick('goals')}
          >
            <a href="#" className="text-decoration-none px-3 py-2 d-block link">
              Goals
            </a>
          </li>
        </Link>
      </ul>

      <hr className="h-color mx-2" />

      <ul className="list-unstyled px-2">
        <li
          className={activeItem === 'logout' ? 'active' : ''}
          onClick={() => handleItemClick('logout')}
        >
          <a href="/" className="text-decoration-none px-3 py-2 d-block link">
            Log out
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;


