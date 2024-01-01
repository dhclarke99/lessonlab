import React, { useState }from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER_BY_ID } from '../utils/queries';
import StepThree from './StepThree'
import measuringCup from '../assets/images/measuringcup.jpeg';
import '../utils/css/StepFour.css';
import Auth from '../utils/auth';

const StepFour = () => {
    const { loading: userLoading, error: userError, data: userData } = useQuery(GET_USER_BY_ID, {
        variables: { userId: Auth.getProfile().data._id },
    });

    if (userLoading) return <p>Loading...</p>;
    if (userError) return <p>Error: {userError.message}</p>;
    const firstInitial = userData.user.firstname[0];
    console.log(userData)
    return (
        <div className="step-four-container">
            <StepThree />
            <div className='step-four-content'>
            <div className='step-four-header'>
            <span className="icon-initials">{firstInitial}</span>

                </div>
            <header>{userData.user.firstname}</header>
            <p>{userData.user.getStartedPrompts[2]}</p>
            </div>
            <div className='step-four-content'>
                <div className='step-four-header'>
                    <img src={measuringCup} alt="Icon" className="icon-image" />
                   
                </div>
                <div>
                <header>Lesson Lab</header>
                <h1>To help students develop stronger arguments when connecting evidence to their claims, ChatGPT can help in several ways. Select one of the following for this experiment, but later there will be an opportunity to test all options.</h1>
                <div>
                    <h1>Help me prepare instructional materials</h1>
                <p>What is one reason that some students find the objective challenging?</p>
                </div>
                <div>
                    <h1>Help me plan classroom activities</h1>
                <p>What is one reason that some students find the objective challenging?</p>
                </div>
                <div>
                    <h1>Help me design a student learning tool</h1>
                <p>What is one reason that some students find the objective challenging?</p>
                </div>
                
                </div>
            </div>


        </div>
    );
}

export default StepFour;