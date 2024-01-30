import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_USER, UPDATE_EXPERIMENT } from '../utils/mutations';
import '../utils/css/ChatBox.css';

const ChatBox = ({currentPage, onStepOneClick }) => {
    const [inputValue, setInputValue] = useState('');
    const [step, setStep] = useState(1);
    const id = localStorage.getItem('userId')
    const [formData, setFormData] = useState({
        getStartedPrompts: [],

    });

    const handleChange = (e) => {
        setInputValue(e.target.value); // Update the inputValue state
  
    };

    const [updateUser] = useMutation(UPDATE_USER);
    const [updateExperiment] = useMutation(UPDATE_EXPERIMENT); 

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            // Update formData.getStartedPrompts with the current inputValue
            const updatedPrompts = [...formData.getStartedPrompts, inputValue];

            setFormData({
                ...formData,
                getStartedPrompts: updatedPrompts
            });
            
            if (currentPage === 'stepOne' || currentPage === 'stepOneExamples') {
                // Prepare the input object for UPDATE_EXPERIMENT mutation
                const experimentInput = { title: inputValue }; // Adjust this based on your schema requirements
    
                // Assume experimentId is available in the local storage or state
                const experimentId = "65af6bda1b04490f9dd644dc" // Replace this with actual source of experimentId
    
                // Call UPDATE_EXPERIMENT mutation
                const { data } = await updateExperiment({
                    variables: { experimentId, input: experimentInput },
                });
                console.log(data);
            } else {
                // Call UPDATE_USER mutation
                const { data } = await updateUser({
                    variables: { userId: id, input: { ...formData, getStartedPrompts: updatedPrompts } },
                });
                console.log(data);
            }

            // Clear the input field
            setInputValue("");
 // Increment the step
 setStep(prevStep => prevStep + 1);
            onStepOneClick();

        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="chat-container">
            <div className="input-container">
                <input
                    type="text"
                    className="chat-input"
                    name='getStartedPrompts'
                    onChange={handleChange}
                    placeholder="Type your response here..."
                    value={inputValue}
                />
                <button className="send-button" onClick={handleFormSubmit}></button>
            </div>
        </div>
    );
}

export default ChatBox;
