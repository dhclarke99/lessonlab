import React from 'react';
import '../utils/css/Intro.css';
import measuringCup from '../assets/images/measuringcup.jpeg'

const Intro = () => {
    return (
        <div className='intro-container'>
            <div className="icon-container">
                <img src={measuringCup} alt="Logo" />
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
        </div>
    );
}

export default Intro