import React, { useState } from 'react';
import '../utils/css/Sidebar.css';
import measuringCup from '../assets/images/measuringcup.jpeg';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USER_BY_ID, } from '../utils/queries';
import { CREATE_EXPERIMENT } from '../utils/mutations'
import Auth from '../utils/auth';
import { useExperiment } from '../ExperimentContext'; 

const Sidebar = () => {
    const { activeExperimentId, setActiveExperimentId } = useExperiment();
    const [showLogout, setShowLogout] = useState(false);
    const { loading: userLoading, error: userError, data: userData } = useQuery(GET_USER_BY_ID, {
        variables: { userId: Auth.getProfile().data._id },
        fetchPolicy: "network-only"
    });
    const [createExperiment] = useMutation(CREATE_EXPERIMENT)

    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const handleLogout = async () => {
        Auth.logout();
    };

    const handleCreateNewExperiment = async () => {
        try {
            const { data } = await createExperiment({ variables: { input: { title: "New Experiment" } } });
            setActiveExperimentId(data.createExperiment._id);
            // Additional actions if needed
        } catch (err) {
            console.error("Error creating new experiment:", err);
        }
    };

    const selectExperiment = (experimentId) => {
        setActiveExperimentId(experimentId);
        // Additional actions...
    };

    if (userLoading) return <p>Loading...</p>;
    if (userError) return <p>Error: {userError.message}</p>;
    const firstInitial = userData.user.firstname[0];
console.log(userData)
console.log(activeExperimentId)
    return (
        <div className="sidebar-component">
            <div className="sidebar-icon top">
                <div className='new-experiment' onClick={handleCreateNewExperiment}>
                <img src={measuringCup} alt="Icon" className="icon-image" />
                New Experiment
                </div>
                

                <div className='existing-experiments'>
                <h3>Previous Tests</h3>
                {userData.user.experiments.map((experiment) => (
                    <div
                        className='experiment-title'
                        key={experiment.experiment._id} // Adjust according to your data structure
                        onClick={() => selectExperiment(experiment.experiment._id)} // Set the experiment ID on click
                    >
                        {experiment.experiment.title}
                    </div>
                ))}
            </div>
            </div>
            
            <div>
            {showMenu && (
                    <div className="profile-menu">
                        <div className="menu-item">Settings</div>
                        <div className="menu-item" onClick={handleLogout}>Logout</div>
                    </div>
                )}
            <div className="sidebar-icon bottom" onClick={toggleMenu}>
                <span className="icon-initials">{firstInitial}</span>
                Profile
                
            </div>
            </div>
            
        </div>
    );
}

export default Sidebar;
