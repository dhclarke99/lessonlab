import React from 'react';
import Intro from '../components/Intro'
import measuringCup from '../assets/images/measuringcup.jpeg';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USER_BY_ID } from '../utils/queries';
import { UPDATE_EXPERIMENT } from '../utils/mutations';
import Auth from '../utils/auth';
import '../utils/css/StepOne.css';

const StepOne = ({ onExampleClick }) => {
    
    return (
        <div className="step-one-container">
          

            <div className='step-one-content'>
                <div className='step-one-header'>
                    <img src={measuringCup} alt="Icon" className="icon-image" />
                   
                </div>
                <div>
                <header>Lesson Lab</header>
                <h1>Step 1: Describe an objective that matters to you.</h1>
                <p>What is a skill that your students find difficult to attain?</p>
                <p>Which academic standard do students struggle to meet?</p>
                <button onClick={onExampleClick}>See examples</button>
                </div>
            </div>


        </div>
    );
}

export default StepOne;