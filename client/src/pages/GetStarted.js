import React from 'react';
import '../utils/css/GetStarted.css';
import measuringCup from '../assets/images/measuringcup.jpeg';
import Intro from '../components/Intro.js'


const GetStarted = ({ onGetStartedClick }) => {
    return (
        <div className="signup-container">
            <div className="signup-body">
            <Intro />
                <div className="input-group">
                    <label>I teach</label>
                    <input type="text" placeholder="grade level" />
                    <input type="text" placeholder="subject area" />
                    <p>.</p>
                </div>
                <button onClick={onGetStartedClick}>Get Started</button>
            </div>
            
        </div>
    );
}

export default GetStarted;
