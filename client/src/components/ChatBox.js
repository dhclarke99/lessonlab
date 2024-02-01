import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_USER, UPDATE_EXPERIMENT } from '../utils/mutations';
import '../utils/css/ChatBox.css';

const ChatBox = ({ currentPage, onStepOneClick, activeExperimentId }) => {
    const [inputValue, setInputValue] = useState('');
    const [step, setStep] = useState(1);
    const id = localStorage.getItem('userId')
    const [formData, setFormData] = useState({
        getStartedPrompts: [],

    });
    const [updateUser] = useMutation(UPDATE_USER);
    const [updateExperiment] = useMutation(UPDATE_EXPERIMENT);

    const handleChange = (e) => {
        setInputValue(e.target.value); // Update the inputValue state

    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        // Update formData.getStartedPrompts with the current inputValue
        const updatedPrompts = [...formData.getStartedPrompts, inputValue];
        setFormData({
            ...formData,
            getStartedPrompts: updatedPrompts
        });

        try {
            if (currentPage === 'stepOne' || currentPage === 'stepOneExamples') {
                // Call OpenAI ChatGPT API
                const chatGptResponse = await fetch('/api/openai', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        messages: [
                            { role: "system", content: 'You are assisting me in setting a concise title for this conversation thread based on the following examples and user input ' },
                            { role: "user", content: 'prompt: Describe an objective that matters to you. User input: My students find it difficult to support their claims with logical reasoning and relevant evidence. Title: Supporting claims with reasoning and evidence.'  },
                            { role: "user", content: 'prompt: Describe an objective that matters to you. User input: My students find it difficult to remember the steps in solving linear algebra problems. Title: Remebering steps for linear algebra problems.'  },
                            { role: "user", content: `Please come up with a title for the following prompt based on the users answer. prompt: Describe an objective that matters to you. User input: ${inputValue}`  },
                    ]
                    })
                });

                const chatGptData = await chatGptResponse.json();
                console.log(chatGptData)
                const experimentTitle = chatGptData.message.content.replace(/title:\s*/i, '').trim();
              
                // Assume experimentId is available
                const experimentId = activeExperimentId
                const prompt = "Describe an objective that matters to you"
                // Call UPDATE_EXPERIMENT mutation
                await updateExperiment({
                    variables: { experimentId, input: { title: experimentTitle, conversation: [`${prompt}`, `${inputValue}`] } },
                });
            } else {
                if (currentPage === 'stepTwo') {
                    const experimentId = activeExperimentId
                    const prompt = "Describe the instructional goals of an activity related to this objective."
                    await updateExperiment({
                        variables: { experimentId, input: { conversation: [`${prompt}` ,`${inputValue}`] } },
                    });
                } else if (currentPage === 'stepThree') {
                    const experimentId = activeExperimentId
                    const prompt = "Describe the students needs."
                    await updateExperiment({
                        variables: { experimentId, input: { conversation: [`${prompt}` ,`${inputValue}`] } },
                    });
                }
                
            }

            // Clear the input field and increment the step
            setInputValue("");
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
