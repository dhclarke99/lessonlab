import React from 'react';
import '../utils/css/Signup.css';

const Signup = () => {
    return (
        <div className="signup-container">
            <header className="signup-header">
                <h1>ChatGPT for teachers</h1>
            </header>
            <div className="signup-body">
                <div className="icon-container">
                    {/* Replace with your icon */}
                </div>
                <h2>Welcome to Lesson Lab!</h2>
                <p>We're used to being told how to use edtech, but ChatGPT is different.</p>
                <p>There are no definitive answers and so many possibilities</p>
                <p>Use this tool to explore ChatGPT and design how you want to make it work for your classroom.</p>
                <p>Through guided experiments, you can test out what ChatGPT can do for your unique needs, get familiar with crafting prompts, and contribute to a community of knowledge</p>
                <div className="input-group">
                    <label>I teach</label>
                    <input type="text" placeholder="Grade Level" />
                    <input type="email" placeholder="Subject Area" />
                </div>
                <button>Get Started</button>
            </div>
            <footer className="signup-footer">
                <p>&copy; 2023 Your Company Name</p>
            </footer>
        </div>
    );
}

export default Signup;
