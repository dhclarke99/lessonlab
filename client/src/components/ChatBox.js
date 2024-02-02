import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { GET_USER_BY_ID } from '../utils/queries';
import { UPDATE_USER, UPDATE_EXPERIMENT } from '../utils/mutations';
import Auth from '../utils/auth';
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
    const { loading: userLoading, error: userError, data: userData } = useQuery(GET_USER_BY_ID, {
        variables: { userId: Auth.getProfile().data._id },
        fetchPolicy: "network-only"
    });
    
    const userGrade = userData?.user?.gradeLevel || 'Default Grade'; 
    const userSubject = userData?.user?.subject || 'Default Subject';
   
    // Move the experiment-related logic inside the condition
    let experiment;
    if (!userLoading && !userError) {
        experiment = userData.user.experiments.find(exp => exp.experiment._id === activeExperimentId)?.experiment;
    }

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
                } else if (currentPage === 'stepFour') {
                    const experimentId = activeExperimentId
                    const prompt = `To help students with ${experiment.title}, ChatGPT can help in several ways. Select one of the following for this experiment, but later there will be an opportunity to test all options.`
                    await updateExperiment({
                        variables: { experimentId, input: { conversation: [`${prompt}` ,`${inputValue}`] } },
                    });
                } else if (currentPage === 'dynamicChat') {
                    // Prepare the messages payload with the system message as the first entry
                    const systemMessage = { role: "system", content: `You are a teaching assistant helping a ${userGrade} school teacher understand how ChatGPT can assist them in their job.` };

                    const dynamicConversation = experiment.conversation.slice(7).map((content, index) => {
                        // Log for debugging
                        console.log(`Content: ${content}, Role: ${index % 2 === 0 ? "assistant" : "user"}`);
                        return {
                            role: index % 2 === 0 ? "assistant" : "user",
                            content
                        };
                    });
                    
                    const latestUserInput = { role: "user", content: inputValue };
                    
                    const messagesPayload = [systemMessage, ...dynamicConversation, latestUserInput];
                    
                    // Log the entire payload for review
                    console.log(messagesPayload);
                    
                
                    const chatGptResponse = await fetch('/api/openai', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ messages: messagesPayload })
                    });
                    console.log("all messages sent:", messagesPayload)
                    const chatGptData = await chatGptResponse.json();
                    console.log("Chat response: ", chatGptData);
                
                    // Append the ChatGPT response back to the experiment's conversation
                    // This assumes chatGptData contains the conversation in a format you can append directly
                    const newConversationPart = chatGptData.message.content // Adjust based on actual response
                    await updateExperiment({
                        variables: {
                            experimentId: activeExperimentId,
                            input: { 
                                conversation: [newConversationPart]
                            },
                        },
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

    if (userLoading) return <p>Loading...</p>;
    if (userError) return <p>Error: {userError.message}</p>;
   

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
