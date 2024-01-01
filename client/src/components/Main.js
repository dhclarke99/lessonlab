import React, { useState } from 'react';
import '../utils/css/Main.css';
import GetStarted from '../pages/GetStarted.js';
import StepOne from '../pages/StepOne.js';
import StepTwo from '../pages/StepTwo.js';
import StepThree from '../pages/StepThree.js';
import StepFour from '../pages/StepFour.js';
import ChatBox from './ChatBox.js';
import Intro from './Intro.js';

const Main = () => {
    const [currentPage, setCurrentPage] = useState('getStarted'); // Initial state set to 'getStarted'

    const handleGetStartedClick = () => {
        setCurrentPage('stepOne'); // Function to update state to 'stepOne'
    };
    const handleStepOneClick = () => {
        if (currentPage === 'stepOne') {
            setCurrentPage('stepTwo');
        }
       else if (currentPage === 'stepTwo') {
            setCurrentPage('stepThree')
        } 
        else if (currentPage === 'stepThree') {
            setCurrentPage('stepFour')
        }
        
    };
  

    return (
        <div className="main">
            <header className="main-header">
                <h1>ChatGPT</h1>
                <h1 id='for-teachers'>for teachers</h1>
            </header>
           

            {currentPage === 'getStarted' || currentPage === 'stepOne' && <Intro />}
            {currentPage === 'getStarted' && <GetStarted onGetStartedClick={handleGetStartedClick} />}
            <div className='scrollable'>
            {currentPage === 'stepOne' && <StepOne />}
            {currentPage === 'stepTwo' && <StepTwo />}
            {currentPage === 'stepThree' && <StepThree />}
            {currentPage === 'stepFour' && <StepFour />}
            </div>
           
    
            {currentPage !== 'getStarted' && <ChatBox onStepOneClick={handleStepOneClick}/>}
            <footer className="main-footer">
                <p> Lesson Lab is developed at the Stanford University Graduate School of Education. For questions, <a href='hey'>contact us.</a></p>
            </footer>
        </div>
    );
}

export default Main;
