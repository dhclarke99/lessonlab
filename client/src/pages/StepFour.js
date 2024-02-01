import React, { useState }from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER_BY_ID } from '../utils/queries';
import StepThree from './StepThree'
import measuringCup from '../assets/images/measuringcup.jpeg';
import '../utils/css/StepFour.css';
import Auth from '../utils/auth';

const StepFour = (props) => {
    const { activeExperimentId } = props; 
    const userId = Auth.getProfile().data._id;

    const { loading: userLoading, error: userError, data: userData } = useQuery(GET_USER_BY_ID, {
        variables: { userId },
    });

    if (userLoading) return <p>Loading...</p>;
    if (userError) return <p>Error: {userError.message}</p>;

    // Find the experiment using the extracted activeExperimentId
    const experiment = userData.user.experiments.find(exp => exp.experiment._id === activeExperimentId)?.experiment;

    if (!experiment) return <p>Experiment not found</p>;

    const firstInitial = userData.user.firstname[0];
    console.log(userData);

    return (
        <div className="step-four-container">
            <StepThree />
            <div className='user-response'>
            <div className='user-response-header'>
            <span className="icon-initials">{firstInitial}</span>
            </div>
            <div>
            <header>{userData.user.firstname}</header>
            <h1>{experiment.conversation[5]}</h1>
            </div>
            
            </div>
            <div className='step-four-content'>
                <div className='step-four-header'>
                    <img src={measuringCup} alt="Icon" className="icon-image" />
                   
                </div>
                <div>
                <header>Lesson Lab</header>
                <h1>To help students with {experiment.title}, ChatGPT can help in several ways. Select one of the following for this experiment, but later there will be an opportunity to test all options.</h1>
                <div className='buttons'>
                <button className='experiment-btn'>
                    <h1>Help me prepare instructional materials</h1>
                <p>What is one reason that some students find the objective challenging?</p>
                </button>
                <button className='experiment-btn'>
                    <h1>Help me plan classroom activities</h1>
                <p>What is one reason that some students find the objective challenging?</p>
                </button>
                <button className='experiment-btn'>
                    <h1>Help me design a student learning tool</h1>
                <p>What is one reason that some students find the objective challenging?</p>
                </button>
                </div>
               
                
                </div>
            </div>


        </div>
    );
}

export default StepFour;