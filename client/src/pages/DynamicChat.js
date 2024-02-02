import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER_BY_ID } from '../utils/queries';
import StepFour from './StepFour'; // Re-import StepFour
import '../utils/css/DynamicChat.css';
import measuringCup from '../assets/images/measuringcup.jpeg';
import Auth from '../utils/auth';

const DynamicChat = ({ activeExperimentId }) => {
    const userId = Auth.getProfile().data._id;

    const { loading: userLoading, error: userError, data: userData } = useQuery(GET_USER_BY_ID, {
        variables: { userId },
    });

    if (userLoading) return <p>Loading...</p>;
    if (userError) return <p>Error: {userError.message}</p>;

    const experiment = userData.user.experiments.find(exp => exp.experiment._id === activeExperimentId)?.experiment;
    const firstInitial = userData.user.firstname[0];
    if (!experiment) return <p>Experiment not found</p>;

    // Get all items from the conversation array after the 8th position
    const conversationAfterEighth = experiment.conversation.slice(7);

    return (
        <div className="dynamic-chat-container">
            <StepFour activeExperimentId={activeExperimentId} /> {/* Keep StepFour included */}
    
            {conversationAfterEighth.length > 0 && (
                <div className='conversation-content'>
                    {conversationAfterEighth.map((message, index) => {
                        // Determine if the message is from the user or GPT based on the index
                        const isUserMessage = index % 2 === 0;
                        return (
                            <div key={index} className={isUserMessage ? 'user-response' : 'gpt-response'}>
                                {isUserMessage ? (
                                    // User message layout
                                    <>
                                        <div className='user-response-header'>
                                            <span className="icon-initials">{firstInitial}</span>
                                        </div>
                                        <div>
                                            <header>{userData.user.firstname}</header>
                                            <h1>{message}</h1>
                                        </div>
                                    </>
                                ) : (
                                    // GPT response layout
                                    <div className='gpt-response-content'>
                                        <div className='gpt-response-header'>
                                            <img src={measuringCup} alt="Icon" className="icon-image" />
                                        </div>
                                        <div>
                                            <header>Lesson Lab</header>
                                            <h1>{message}</h1>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
    
}

export default DynamicChat;
