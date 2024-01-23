const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
require('dotenv').config({ path: '../.env' });
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');
const { authMiddleware } = require('./utils/auth');

const PORT = process.env.PORT || 3001;
const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Serve image assets
app.use('/images', express.static(path.join(__dirname, '../client/images')));



// Initialize Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    // Use authMiddleware to process the incoming request
    const auth = authMiddleware({ req });
    console.log("auth user: ", auth.user)
    return {
      user: auth.user
    };
  },
});

// Start Apollo Server
const startApolloServer = async () => {
  await server.start();
  // Apply Apollo GraphQL middleware and set the path to /graphql
  server.applyMiddleware({ app });

  // Serve static files from the React app
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
  }

  // All other GET requests not handled before will return the React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });

  // Start the MongoDB connection
  db.once('open', () => {
    // Start the Express server
    app.listen(PORT, () => {
      console.log('Successfully connected to the database');
      console.log(`API server running on port ${PORT}!`);
      console.log(`GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    });
  });
};

// Call the async function to start the server
startApolloServer();
