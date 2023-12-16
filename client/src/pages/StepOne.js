import React from 'react';
import '../utils/css/StepOne.css';
import Intro from '../components/Intro'
import ChatBox from '../components/ChatBox'
const StepOne = () => {
    return (
        <div className="step-one-container">
            <Intro />
            <ChatBox />
           
        </div>
    );
}

export default StepOne;