import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '../utils/mutations';
import '../utils/css/ChatBox.css';

const ChatBox = ({ onStepOneClick }) => {
    const [inputValue, setInputValue] = useState('');
    const id = localStorage.getItem('userId')
    const [formData, setFormData] = useState({
        getStartedPrompts: [],

    });

    const handleChange = (e) => {
        setInputValue(e.target.value); // Update the inputValue state
  
    };

    const [updateUser] = useMutation(UPDATE_USER);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            // Update formData.getStartedPrompts with the current inputValue
            const updatedPrompts = [...formData.getStartedPrompts, inputValue];

            const { data } = await updateUser({
                variables: { userId: id, input: { ...formData, getStartedPrompts: updatedPrompts } },
            });
            console.log(data);

            // Clear the input field
            setInputValue("");

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
                    placeholder="Type your message here..."
                    value={inputValue}  // Control the input with inputValue
                />
                <button className="send-button" onClick={handleFormSubmit}></button>
            </div>
        </div>
    );
}

export default ChatBox;
