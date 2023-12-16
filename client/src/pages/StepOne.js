import React from 'react';
import Intro from '../components/Intro'
import ChatBox from '../components/ChatBox'
import '../utils/css/StepOne.css';

const StepOne = () => {
    return (
        <div className="step-one-container">
            <Intro />
            <div classname='secondary-container'>
            <div classname='step-one-content'>
                <header>Lesson Lab</header>
                <h1>Step 1: Describe an objective that matters to you.</h1>
                <p>What is a skill that your students find difficult to attain?</p>
                <p>Which academic standard do students struggle to meet?</p>
                <button>See examples</button>
            </div>
            <ChatBox />
            </div>
           
        </div>
    );
}

export default StepOne;