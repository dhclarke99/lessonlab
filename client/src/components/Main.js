import React from 'react';
import '../utils/css/Main.css';
import GetStarted from '../pages/GetStarted.js';

const Main = () => {
    return (
        <div className="main">
            <header className="main-header">
                <h1>ChatGPT</h1>
                <h1 id='for-teachers'>for teachers</h1>
            </header>
            <GetStarted />
            <footer className="main-footer">
                <p> Lesson Lab is developed at the Stanford University Graduate School of Education. For questions, <a href=''>contact us.</a></p>
            </footer>
        </div>
    );
}

export default Main;
