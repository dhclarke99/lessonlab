# Lesson Lab

## Project Overview

Lesson Lab is an interactive web application designed to assist teachers in planning and enhancing their instructional materials, classroom activities, and student learning tools through the integration of AI-driven insights. The application guides users through a series of steps, culminating in dynamic interactions with an AI to generate tailored educational content.

## Application Structure

The application is structured around a series of steps (StepOne through StepFour), leading to a dynamic chat interface (DynamicChat) that facilitates real-time interaction with an AI service. The `Main` component orchestrates the navigation between different steps, while the `Sidebar` component allows users to access their experiment history and create new experiments.

### Key Components

- **GetStarted**: Entry point for new users to begin creating their first experiment.
- **StepOne to StepFour**: Sequential steps guiding the user through the experiment setup process.
- **DynamicChat**: Enables interaction with the AI to generate and refine instructional content.
- **ChatBox**: Facilitates the submission of user input and displays AI responses.
- **Sidebar**: Provides access to past experiments and the creation of new ones.

## Technologies Used

- **React**: Frontend library for building the user interface.
- **Apollo Client**: Manages data fetching, caching, and state management of GraphQL queries.
- **GraphQL**: A query language for APIs used for data exchange between the client and server.
- **Node.js and Express**: Backend environment and framework for handling API requests.
- **MongoDB**: Database for storing user experiments and generated content.

## Required Installation

Before starting the application, ensure that Node.js and npm (Node Package Manager) are installed on your system. Clone the project repository, then navigate to the project directory and install the required dependencies:

```bash
git clone [project-repository-url]
cd lessonlab
npm install
```

## Available Scripts

In the project directory, you can run the following scripts:

### `npm run develop`

Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser. The page will reload if you make edits.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

## Environment Setup

Create a `.env` file in the root directory to store environment variables such as database connection strings, API keys, and any other sensitive information required by the application.

## Handoff Notes

- **Context Providers**: The application utilizes React context providers (`ExperimentContext`) to manage global state, such as the active experiment ID and chat inputs.
- **Dynamic Interaction**: The `DynamicChat` component and `ChatBox` component handle the real-time interaction with the AI. Familiarize yourself with the logic for sending and receiving messages to the AI service.
- **Styling**: CSS modules and inline styles are used throughout the application for styling components. The `:active` pseudo-class is used in some components for visual feedback during interactions.

## Contributing

New contributors should familiarize themselves with the project structure and component hierarchy. Check the `issues` tab in the project repository for open issues or feature requests.

---

For any additional information or access requirements, please contact the project administrator.
