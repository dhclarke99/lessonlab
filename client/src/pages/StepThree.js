import React, { useState }from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER_BY_ID } from '../utils/queries';
import StepTwo from './StepTwo'
import measuringCup from '../assets/images/measuringcup-2.jpg';
import '../utils/css/StepThree.css';
import Auth from '../utils/auth';

const StepThree = (props) => {
    const userId = Auth.getProfile().data._id;
    const { activeExperimentId } = props; 

    const { loading: userLoading, error: userError, data: userData } = useQuery(GET_USER_BY_ID, {
        variables: { userId },
    });

    if (userLoading) return <p>Loading...</p>;
    if (userError) return <p>Error: {userError.message}</p>;
    const experiment = userData.user.experiments.find(exp => exp.experiment._id === activeExperimentId)?.experiment;

    if (!experiment) return <p>Experiment not found</p>;

    const firstInitial = userData.user.firstname[0];

    return (
        <div className="step-three-container">
            <StepTwo activeExperimentId={activeExperimentId}/>
            <div className='user-response'>
            <div className='user-response-header'>
            <span className="icon-initials">{firstInitial}</span>
            </div>
            <div>
            <header>{userData.user.firstname}</header>
            <h1>{experiment.conversation[3]}</h1>
            </div>
            
            </div>
            <div className='step-three-content'>
                <div className='step-three-header'>
                    <img src={measuringCup} alt="Icon" className="icon-image" />
                   
                </div>
                <div>
                <header>Lesson Lab</header>
                <h1>Step 3: Describe the students' needs</h1>
                <p>What is one reason that some students find the objective challenging?</p>
                <p>What types of knowledge are they missing?</p>
                <p>Do the characteristics of the learner or their learning environment impact their needs?</p>
                
                </div>
            </div>


        </div>
    );
}

export default StepThree;