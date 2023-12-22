import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '../utils/mutations';
import '../utils/css/ChatBox.css';

const ChatBox = ({ onStepOneClick }) => {
    const id = localStorage.getItem('userId')
    const [formData, setFormData] = useState({
        getStartedPrompts: [],
        
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: [e.target.value] });
    };

    const [updateUser] = useMutation(UPDATE_USER);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            console.log(formData)
          const { data } = await updateUser({
            variables: { userId: id, input: { ...formData } },
          });
    console.log(data)
    onStepOneClick();
        } catch (e) {
          console.error(e);
        }
    
    
      };

    return (
        <div className="chat-container">
            <div className="input-container">
                <input type="text" className="chat-input" name='getStartedPrompts' onChange={handleChange} placeholder="Type your message here..." />
                <button className="send-button"  onClick={handleFormSubmit}></button>
            </div>
        </div>
    );
}

export default ChatBox;
