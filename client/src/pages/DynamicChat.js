import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER_BY_ID } from '../utils/queries';
import StepFour from './StepFour';
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

    // Get the last two items from the conversation array
    const lastTwoConversations = experiment.conversation.slice(-2);
console.log(lastTwoConversations)
    return (
        <div className="dynamic-chat-container">
            <StepFour activeExperimentId={activeExperimentId} />

            {lastTwoConversations.length >= 2 && (
                <div className='conversation-content'>
                    <div className='conversation-item'>
                        <p>{lastTwoConversations[0]}</p>
                    </div>
                    <div className='conversation-item'>
                        <p>{lastTwoConversations[1]}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DynamicChat;
