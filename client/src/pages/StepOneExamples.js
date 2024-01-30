import React from 'react';
import Intro from '../components/Intro'; // Ensure this is used or remove if not needed
import measuringCup from '../assets/images/measuringcup.jpeg';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USER_BY_ID } from '../utils/queries';
import Auth from '../utils/auth';
import '../utils/css/StepOneExamples.css';

const StepOneExamples = ({isLoading, exampleList }) => {
    const { loading: userLoading, error: userError, data: userData } = useQuery(GET_USER_BY_ID, {
        variables: { userId: Auth.getProfile().data._id },
        fetchPolicy: "network-only"
    });

    const userGrade = userData?.user?.gradeLevel || 'Default Grade'; 
    const userSubject = userData?.user?.subject || 'Default Subject';

    return (
        <div className="step-one-container">
            <div className='step-one-content'>
                <div className='step-one-header'>
                    <img src={measuringCup} alt="Measuring Cup" className="icon-image" />
                </div>
                <div>
                    <header>Lesson Lab</header>
                    <h1>Step 1: Describe an objective that matters to you.</h1>
                    <p>What is a skill that your students find difficult to attain?</p>
                    <p>Which academic standard do students struggle to meet?</p>
                    <div className='examples'>
                    <p>Some examples of skills and standards for a {userGrade} {userSubject} class may be: </p>
                    {isLoading ? (
                        <div>Loading examples...</div> // Loading message
                    ) : (
                        <ul>
                            {exampleList.map((example, index) => (
                                <li key={index}>{example}</li>
                            ))}
                        </ul>
                    )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StepOneExamples;
