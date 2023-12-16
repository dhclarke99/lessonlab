import React from 'react';
import '../utils/css/ChatBox.css';

const ChatBox = () => {
    return (
        <div className="chat-container">
            <input type="text" className="chat-input" placeholder="Type your message here..." />
            <button className="send-button">Send</button>
        </div>
    );
}

export default ChatBox;
