import React from 'react';
import '../utils/css/Sidebar.css';

const Sidebar = () => {
    return (
        <div className="sidebar-component">
            <div className="sidebar-icon top">New Message</div>
            <div className="sidebar-icon bottom">Profile</div>
        </div>
    );
}

export default Sidebar;
