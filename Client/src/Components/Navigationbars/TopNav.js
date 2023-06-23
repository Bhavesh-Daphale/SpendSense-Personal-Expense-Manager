import React , { useState , useEffect } from 'react';
import axios from 'axios';

const TopNav = ({userId}) => {
    const [initials,setInitials] = useState([]);
    const handleOpenSidebar = () => {
      document.querySelector('.sidebar').classList.add('active');
    };
  const fetchUserData = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/userdata?userId=${userId}`);
      setInitials(response.data[0].initials);
    //   console.log("TOPNAV INITIALS " + response.data[0].initials )
    } catch (error) {
      console.error('Error fetching initials', error);
    }
  };

useEffect(() => {
    fetchUserData();
  });

   
  
    return (
        <nav className="navbar topnav navbar-expand-lg d-flex align-items-center p-0">
            <div className="container-fluid d-flex justify-content-sm-between justify-content-md-end">
                <div className="d-flex justify-content-between d-md-none d-block">
                    <a className="navbar-brand"  href="/">$pend$ense</a> 
                </div>
                <div className="d-flex justify-content-end" id="navbarSupportedContent">
                    <button className="btn navbar-icons d-flex justify-content-center align-items-center py-2 mx-2 open-btn d-md-none" onClick={handleOpenSidebar}>
                        <i className="fa-solid fa-bars"></i>
                    </button>
                    <button className="btn navbar-icons d-flex justify-content-center align-items-center py-2 mx-1">
                        <i className="fa-solid fa-bell"></i>
                    </button>
                    <div className="navbar-icons d-flex justify-content-center align-items-center  ">{initials}</div>
                </div>
            </div>
        </nav>
    );
}

export default TopNav;