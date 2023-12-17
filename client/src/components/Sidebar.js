import React from 'react';
import '../utils/css/Sidebar.css';
import measuringCup from '../assets/images/measuringcup.jpeg'
import { useQuery, } from '@apollo/client';
import { GET_USER_BY_ID } from '../utils/queries';
import Auth from '../utils/auth';

const Sidebar = () => {
    const { loading: userLoading, error: userError, data: userData } = useQuery(GET_USER_BY_ID, {
        variables: { userId: Auth.getProfile().data._id },
      });

      const handleLogout = async () => {
        Auth.logout();
        
      };
  
      if (userLoading) return <p>Loading...</p>;
      if (userError) return <p>Error: {userError.message}</p>;
      console.log(userData)
      const firstInitial = userData.user.firstname[0]
    

    return (
        <div className="sidebar-component">
            <div className="sidebar-icon top">
                <img src={measuringCup} alt="Icon" className="icon-image" />
                New Experiment
            </div>
            <div className="sidebar-icon bottom">
                <span className="icon-initials">{firstInitial}</span>
                Profile
            </div>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Sidebar;
