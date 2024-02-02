import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER_BY_ID } from '../utils/queries';
import StepFour from './StepFour'; // Re-import StepFour
import '../utils/css/StepFour.css';
import Auth from '../utils/auth';

const DynamicChat = ({ activeExperimentId }) => {
    const userId = Auth.getProfile().data._id;

    const { loading: userLoading, error: userError, data: userData } = useQuery(GET_USER_BY_ID, {
        variables: { userId },
    });

    if (userLoading) return <p>Loading...</p>;
    if (userError) return <p>Error: {userError.message}</p>;

    const experiment = userData.user.experiments.find(exp => exp.experiment._id === activeExperimentId)?.experiment;

    if (!experiment) return <p>Experiment not found</p>;

    // Get all items from the conversation array after the 8th position
    const conversationAfterEighth = experiment.conversation.slice(7);

    return (
        <div className="dynamic-chat-container">
            <StepFour activeExperimentId={activeExperimentId} /> {/* Ensure StepFour is included */}

            {conversationAfterEighth.length > 0 && (
                <div className='conversation-content'>
                    {conversationAfterEighth.map((message, index) => (
                        <div key={index} className='conversation-item'>
                            <p>{message}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default DynamicChat;
