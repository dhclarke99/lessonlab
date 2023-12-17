import React from 'react';
import '../utils/css/GetStarted.css';
import Intro from '../components/Intro.js'


const GetStarted = ({ onGetStartedClick }) => {

    return (
        <div className="signup-container">
            <div className="signup-body">
            <Intro />
                <div className="input-group">
                    <label>I teach</label>
                    <select type="text"
                name="gradeLevel"
                placeholder='grade level'
                
                >
                  <option value='' disabled>Select One</option>
                <option value="1st Grade">1st Grade</option>
                <option value="1st Grade">2nd Grade</option>
                <option value="1st Grade">3rd Grade</option>
                <option value="1st Grade">4th Grade</option>
                <option value="1st Grade">5th Grade</option>
                <option value="1st Grade">6th Grade</option>
                <option value="1st Grade">7th Grade</option>
                <option value="1st Grade">8th Grade</option>
                <option value="1st Grade">9th Grade</option>
                <option value="1st Grade">10th Grade</option>
                <option value="1st Grade">11th Grade</option>
                <option value="1st Grade">12th Grade</option>
              </select>
                    <input type="text" placeholder="subject area" />
                    <p>.</p>
                </div>
                <button onClick={onGetStartedClick}>Get Started</button>
            </div>
            
        </div>
    );
}

export default GetStarted;
