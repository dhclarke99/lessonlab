import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '../utils/mutations';
import '../utils/css/GetStarted.css';
import Intro from '../components/Intro.js'
import Auth from '../utils/auth';


const GetStarted = ({ onGetStartedClick }) => {
    const id = localStorage.getItem('userId')
    const [formData, setFormData] = useState({
        gradeLevel: '',
        subject: '',
        
    });

    const [updateUser, { error, data }] = useMutation(UPDATE_USER);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            console.log(formData)
          const { data } = await updateUser({
            variables: { userId: id, input: { ...formData } },
          });
    console.log(data)
    onGetStartedClick();
        } catch (e) {
          console.error(e);
        }
    
    
      };

    return (
        <div className="signup-container">
            <div className="signup-body">
            <Intro />
                <div className="input-group">
                    <label>I teach</label>
                    <select type="text"
                name="gradeLevel"
                placeholder='grade level'
                onChange={handleChange}
                
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
                    <input type="text" name='subject' onChange={handleChange} placeholder="subject area" />
                    <p>.</p>
                </div>
                <button onClick={handleFormSubmit}>Get Started</button>
            </div>
            
        </div>
    );
}

export default GetStarted;
