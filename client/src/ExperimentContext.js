import React, { createContext, useState, useContext } from 'react';

const ExperimentContext = createContext();

export const useExperiment = () => useContext(ExperimentContext);

export const ExperimentProvider = ({ children }) => {
    const [activeExperimentId, setActiveExperimentId] = useState(null);

    return (
        <ExperimentContext.Provider value={{ activeExperimentId, setActiveExperimentId }}>
            {children}
        </ExperimentContext.Provider>
    );
};
