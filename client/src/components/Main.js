import React, { useState, useRef, useEffect } from 'react';
import '../utils/css/Main.css';
import GetStarted from '../pages/GetStarted.js';
import StepOne from '../pages/StepOne.js';
import StepOneExamples from '../pages/StepOneExamples.js'
import StepTwo from '../pages/StepTwo.js';
import StepThree from '../pages/StepThree.js';
import StepFour from '../pages/StepFour.js';
import ChatBox from './ChatBox.js';
import Intro from './Intro.js';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USER_BY_ID } from '../utils/queries';
import { CREATE_EXPERIMENT } from '../utils/mutations.js';
import Auth from '../utils/auth';

const Main = () => {
    const [currentPage, setCurrentPage] = useState('getStarted'); // Initial state set to 'getStarted'
    const scrollableRef = useRef(null);
    const { loading: userLoading, error: userError, data: userData } = useQuery(GET_USER_BY_ID, {
        variables: { userId: Auth.getProfile().data._id },
        fetchPolicy: "network-only"
    });
    const [createExperiment] = useMutation(CREATE_EXPERIMENT)
    const [isLoading, setIsLoading] = useState(false);
   
    const [apiResponse, setApiResponse] = useState([]); // Add this state

    useEffect(() => {
        if (userData && userData.user && userData.user.experiments && userData.user.experiments.length > 0) {
            // Sort experiments by updatedAt in descending order
            const sortedExperiments = [...userData.user.experiments].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
            console.log(sortedExperiments)
            // Get the most recently updated experiment
            const mostRecentExperiment = sortedExperiments[0];
    
            // Store the most recent experiment's ID in local storage
            localStorage.setItem('experimentId', mostRecentExperiment.experiment._id);
    
            setCurrentPage('stepOne');
        } else {
            setCurrentPage('getStarted');
        }
    }, [userData]);
    

    const userGrade = userData?.user?.gradeLevel || 'Default Grade'; 
    const userSubject = userData?.user?.subject || 'Default Subject';


    const scrollToBottom = () => {
        // Scroll the div to the bottom
        console.log('scrolling')
        const scrollable = scrollableRef.current;
        if (scrollable) {
            scrollable.scrollTop = scrollable.scrollHeight;
        }
    };
    const handleGetStartedClick = () => {
        try {
            setCurrentPage('stepOne'); // Function to update state to 'stepOne'
            const input = {
                title: "New Experiment"
            };
            console.log(input)
            createExperiment({ variables: { input } });


        } catch (err) {
            console.error(err);
        }


    };

    const handleExampleClick = async () => {
        if (currentPage === 'stepOne') {
            setCurrentPage('stepOneExamples');
            setIsLoading(true); // Start loading before the API call
            
    
            try {
                const response = await fetch('/api/openai', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        messages: [
                            { role: "system", content: `I teach ${userGrade} ${userSubject}. What are some skills, standards, and objectives that my students might struggle with? Format your answer as 10 unique bullet points, with each point being no longer than 10 words. Do not number the bullet points.` }
                        ]
                    })
                });
    
                const data = await response.json();
                console.log(data)
                setApiResponse(data.message.content.split('\n')); 
                setIsLoading(false);
            } catch (error) {
                console.error("Error making OpenAI request:", error);
                setIsLoading(false);
            }
        }
    }
    

    const handleStepOneClick = () => {
        if (currentPage === 'stepOne') {
            setCurrentPage('stepTwo');
        }
        else if (currentPage === 'stepOneExamples') {
            setCurrentPage('stepTwo')
        }
        else if (currentPage === 'stepTwo') {
            setCurrentPage('stepThree')
        }
        else if (currentPage === 'stepThree') {
            setCurrentPage('stepFour')
        }
        scrollToBottom();
    };

    useEffect(() => {
        scrollToBottom();
    }, [currentPage]);



    return (
        <div className="main">
            <header className="main-header">
                <h1>ChatGPT</h1>
                <h1 id='for-teachers'>for teachers</h1>
            </header>


            {currentPage === 'getStarted' || currentPage === 'stepOne' && <Intro />}
            {currentPage === 'getStarted' && <GetStarted onGetStartedClick={handleGetStartedClick} />}
            <div className='scrollable' ref={scrollableRef}>
                {currentPage === 'stepOne' && <StepOne onExampleClick={handleExampleClick} />}
                {currentPage === 'stepOneExamples' && <StepOneExamples isLoading={isLoading} exampleList={apiResponse} />}
                {currentPage === 'stepTwo' && <StepTwo />}
                {currentPage === 'stepThree' && <StepThree />}
                {currentPage === 'stepFour' && <StepFour />}
            </div>


            {currentPage !== 'getStarted' && <ChatBox currentPage={currentPage} onStepOneClick={handleStepOneClick} />}
            <footer className="main-footer">
                <p> Lesson Lab is developed at the Stanford University Graduate School of Education. For questions, <a href='hey'>contact us.</a></p>
            </footer>
        </div>
    );
}

export default Main;
