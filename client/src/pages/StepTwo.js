import React, { useState }from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER_BY_ID } from '../utils/queries';
import StepOne from './StepOne'
import measuringCup from '../assets/images/measuringcup.jpeg';
import '../utils/css/StepTwo.css';
import Auth from '../utils/auth';

const StepTwo = () => {
    const { loading: userLoading, error: userError, data: userData } = useQuery(GET_USER_BY_ID, {
        variables: { userId: Auth.getProfile().data._id },
    });

    if (userLoading) return <p>Loading...</p>;
    if (userError) return <p>Error: {userError.message}</p>;
    const firstInitial = userData.user.firstname[0];
    console.log(userData)
    return (
        <div className="step-two-container">
            <StepOne />
            <div className='step-two-content'>
            <div className='step-two-header'>
            <span className="icon-initials">{firstInitial}</span>

                </div>
            <header>{userData.user.firstname}</header>
            <p>{userData.user.getStartedPrompts[0]}</p>
            </div>
            <div className='step-two-content'>
                <div className='step-two-header'>
                    <img src={measuringCup} alt="Icon" className="icon-image" />
                   
                </div>
                <div>
                <header>Lesson Lab</header>
                <h1>Step 2: Describe the instructional goals of an activity related to this objective.</h1>
                <p>What kind iof assignment or activity are students working on for this objective?</p>
                <p>What is the assignment about?</p>
                <p>What kind of instructions or content are the students using to do the assignment or activity?</p>
                <p>What are the instructional goals of the assignment or activity?</p>
                
                </div>
            </div>


        </div>
    );
}

export default StepTwo;