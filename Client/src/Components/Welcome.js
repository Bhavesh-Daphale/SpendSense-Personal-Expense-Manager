import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Welcome = ({ loggedIn }) => {
    const navigate = useNavigate();
    console.log(loggedIn)

    useEffect(() => {
        if (!loggedIn) {
          navigate('/signin', { replace: true });
        }
      }, [loggedIn, navigate]);
    
      if (!loggedIn) {
        return null;
      }

  return (
    <div>
      {/* <h2>Welcome, {user.firstName}!</h2> */}
      <p>You have successfully logged in.</p>
      <div>
        <h2>logout</h2>
        <button onClick={() => { navigate("/");}}>logout</button>
    </div>
    </div>
    
  );
};

export default Welcome;
