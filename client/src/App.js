import './App.css';
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink, ApolloLink } from '@apollo/client';
import React from 'react';
import Sidebar from './components/Sidebar.js';
import Main from './components/Main.js';
import SignUp from './pages/SignUp'; 
import AuthService from './utils/auth.js'; 
import { ExperimentProvider } from './ExperimentContext'; // Adjust the import path

function App() {
    // Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
    uri: '/graphql',
  });
  
  // Construct request middleware that will attach the JWT token to every request as an `authorization` header
  const authLink = new ApolloLink((operation, forward) => {
    // Get the authentication token from local storage if it exists
    const token = localStorage.getItem('token');
    const refreshtoken = localStorage.getItem('refreshToken');
    const authorizationToken = localStorage.getItem('id_token'); // Assuming 'id_token' is the key where you store the authorization token
  
    // Use the setContext method to set the HTTP headers.
    operation.setContext({
      headers: {
        'x-token': token ? token : "",
        'x-refresh-token': refreshtoken ? refreshtoken : "",
        'authorization': authorizationToken ? `Bearer ${authorizationToken}` : ""
      }
    });
  
    return forward(operation);
  });
  
  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
    // Check if the user is logged in
    const isLoggedIn = AuthService.loggedIn();

    return (
      <ApolloProvider client={client}>
          <ExperimentProvider>
              <div className="App">
                  {!isLoggedIn ? (
                      <SignUp />
                  ) : (
                      <>
                          <div className="sidebar">
                              <Sidebar />
                          </div>
                          <div className="main">
                              <Main />
                          </div>
                      </>
                  )}
              </div>
          </ExperimentProvider>
      </ApolloProvider>
  );
}

export default App;
