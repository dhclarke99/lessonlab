import React from 'react';
import '../utils/css/ChatBox.css';

const ChatBox = ({ onStepOneClick }) => {
    return (
        <div className="chat-container">
            <div className="input-container">
                <input type="text" className="chat-input" placeholder="Type your message here..." />
                <button className="send-button" onClick={onStepOneClick}></button>
            </div>
        </div>
    );
}

export default ChatBox;
