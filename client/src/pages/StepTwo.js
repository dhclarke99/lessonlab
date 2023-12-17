import React from 'react';
import StepOne from './StepOne'
import measuringCup from '../assets/images/measuringcup.jpeg';
import '../utils/css/StepTwo.css';

const StepTwo = () => {
    return (
        <div className="step-two-container">
            <StepOne />

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