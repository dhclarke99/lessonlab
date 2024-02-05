import React, { createContext, useState, useContext, useEffect } from 'react';

const ExperimentContext = createContext();

export const useExperiment = () => useContext(ExperimentContext);

// In ExperimentContext.js
export const ExperimentProvider = ({ children }) => {
    const [activeExperimentId, setActiveExperimentId] = useState(null);
    const [chatInput, setChatInput] = useState("");
    const [submitFlag, setSubmitFlag] = useState(false); // New state to trigger submission

    // Function to handle setting input and triggering submission
    const submitChatInput = (input) => {
        setChatInput(input);
        setSubmitFlag(true); // Set flag to true to indicate submission should happen
    };

    // Reset the submit flag after it has been used
    useEffect(() => {
        if (submitFlag) setSubmitFlag(false);
    }, [submitFlag]);

    const value = {
        activeExperimentId,
        setActiveExperimentId,
        chatInput,
        submitChatInput,
        submitFlag,
    };

    return (
        <ExperimentContext.Provider value={value}>
            {children}
        </ExperimentContext.Provider>
    );
};
