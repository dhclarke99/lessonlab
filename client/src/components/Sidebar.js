import React from 'react';
import '../utils/css/Sidebar.css';
import measuringCup from '../assets/images/measuringcup.jpeg'

const Sidebar = () => {
    const userInitials = "M"; // Replace with logic to get logged-in user's initials

    return (
        <div className="sidebar-component">
            <div className="sidebar-icon top">
                <img src={measuringCup} alt="Icon" className="icon-image" />
                New Experiment
            </div>
            <div className="sidebar-icon bottom">
                <span className="icon-initials">{userInitials}</span>
                Profile
            </div>
        </div>
    );
}

export default Sidebar;
