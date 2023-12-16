import React from 'react';
import '../utils/css/Signup.css';
import measuringCup from '../assets/images/measuringcup.jpeg'
const Signup = () => {
    return (
        <div className="signup-container">
            <div className="signup-body">
                <div className="icon-container">
                    <img src={measuringCup} alt="Logo"/>
                    {/* Replace with your icon */}
                </div>
                <div className="header-container">
                <h2>Welcome to Lesson Lab!</h2>
                </div>
                <div className='sentence-container'>
                <div className="intro-sentence-container">
                <p>We're used to being told how to use edtech, but ChatGPT is different.</p>
                <p>There are no definitive answers and so many possibilities.</p>
                </div>
                <div className="body-sentence-container">
                <p>Use this tool to explore ChatGPT and design how you want to make it work for your classroom.</p>
                <p>Through guided experiments, you can test out what ChatGPT can do for your unique needs, get familiar with crafting prompts, and contribute to a community of knowledge.</p>
                </div>
                </div>
                <div className="input-group">
                    <label>I teach</label>
                    <input type="text" placeholder="grade level" />
                    <input type="text" placeholder="subject area" />
                    <p>.</p>
                </div>
                <button>Get Started</button>
            </div>
            
        </div>
    );
}

export default Signup;
