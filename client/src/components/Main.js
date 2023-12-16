import React from 'react';
import '../utils/css/Main.css';
import Signup from './Signup';

const Main = () => {
    return (
        <div className="main">
            <header className="signup-header">
                <h1>ChatGPT</h1>
                <h1 id='for-teachers'>for teachers</h1>
            </header>
            <Signup />
            <footer className="signup-footer">
                <p> Lesson Lab is developed at the Stanford University Graduate School of Education. For questions, contact us.</p>
            </footer>
        </div>
    );
}

export default Main;
