import React, { useState } from 'react';
import '../utils/css/Main.css';
import GetStarted from '../pages/GetStarted.js';
import StepOne from '../pages/StepOne.js';
import StepTwo from '../pages/StepTwo.js';
import ChatBox from './ChatBox.js';
import Intro from './Intro.js';

const Main = () => {
    const [currentPage, setCurrentPage] = useState('getStarted'); // Initial state set to 'getStarted'

    const handleGetStartedClick = () => {
        setCurrentPage('stepOne'); // Function to update state to 'stepOne'
    };
    const handleStepOneClick = () => {
        setCurrentPage('stepTwo'); // Function to update state to 'stepOne'
    };

    return (
        <div className="main">
            <header className="main-header">
                <h1>ChatGPT</h1>
                <h1 id='for-teachers'>for teachers</h1>
            </header>
            {currentPage === 'getStarted' || currentPage === 'stepOne' && <Intro />}
            {currentPage === 'getStarted' && <GetStarted onGetStartedClick={handleGetStartedClick} />}
            {currentPage === 'stepOne' && <StepOne onStepOneClick={handleStepOneClick}/>}
            {currentPage === 'stepTwo' && <StepTwo />}
            {currentPage !== 'getStarted' && <ChatBox onStepOneClick={handleStepOneClick}/>}
            <footer className="main-footer">
                <p> Lesson Lab is developed at the Stanford University Graduate School of Education. For questions, <a href='hey'>contact us.</a></p>
            </footer>
        </div>
    );
}

export default Main;
