import React, { useState }from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER_BY_ID } from '../utils/queries';
import StepTwo from './StepTwo'
import measuringCup from '../assets/images/measuringcup.jpeg';
import '../utils/css/StepThree.css';
import Auth from '../utils/auth';

const StepThree = () => {
    const { loading: userLoading, error: userError, data: userData } = useQuery(GET_USER_BY_ID, {
        variables: { userId: Auth.getProfile().data._id },
    });

    if (userLoading) return <p>Loading...</p>;
    if (userError) return <p>Error: {userError.message}</p>;
    const firstInitial = userData.user.firstname[0];
    console.log(userData)
    return (
        <div className="step-three-container">
            <StepTwo />
            <div className='step-three-content'>
            <div className='step-three-header'>
            <span className="icon-initials">{firstInitial}</span>

                </div>
            <header>{userData.user.firstname}</header>
            <p>{userData.user.getStartedPrompts[1]}</p>
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