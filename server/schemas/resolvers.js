const { AuthenticationError } = require('apollo-server-express');
const { User, Experiment} = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async (_parent, _args, context) => {


      return await User.find()
    },
    experiments: async (_parent, _args, context) => {


      return await Experiment.find()
    },
    user: async (_parent, { id }) => {

      return await User.findOne({ _id: id })
    },
    experiment: async (_parent, { id }) => {

      return await Experiment.findOne({ _id: id })
    },
  },
  Mutation: { 
    createUser: async (_parent, { input }) => {
      
        try {
          console.log("creating user...")
          const { firstname, lastname, email, password } = input;
          const user = await User.create({
  
            firstname,
            lastname,
            email,
            password
        
          });
          await user.save();
  
          const token = signToken(user);
          console.log(token, user)
          return {
            token,
            user
          }
          
        } catch (err) {
          console.log(err);
          throw new Error('Failed to create user');
        }
      },
      createExperiment: async (_parent, { input }) => {
      
        try {
          console.log("creating experiment...")
          const { title } = input;
          const experiment = await Experiment.create({ 
            title
          });
        

          return {
            experiment
          }
          
        } catch (err) {
          console.log(err);
          throw new Error('Failed to create experiment');
        }
      },
      login: async (_parent, { email, password }) => {
        
        try {
          const user = await User.findOne({ email });
          if (!user) {
            throw new AuthenticationError('Invalid email');
          }
          
  
          const correctPassword = await user.isCorrectPassword(password);
  
          
  
          if (!correctPassword) {
            throw new AuthenticationError('Invalid password');
          }
          const token = signToken(user);
          return { token, user };
        } catch (err) {
          console.log(err);
          throw new Error('Failed to login');
        }
      },
      logout: (_, __, context) => {
        // If using cookies
        context.res.clearCookie('token');
        
        // Additional server-side logic if needed
        
        return true;
      },
      updateUser: async (_, { userId, input }) => {
        try {
          // Filter out any fields that are null or undefined
          const updateFields = Object.fromEntries(
            Object.entries(input).filter(([_, value]) => value != null)
          );
          // Find the user by ID and update it
          const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: updateFields },
            { 
              new: true, 
              runValidators: true, 
              context: 'query'  // This ensures that the pre-save middleware runs
            }
          );
          
    
          // If the user doesn't exist, throw an error
          if (!updatedUser) {
            throw new Error('User not found');
          }
    
          return updatedUser;
        } catch (error) {
          console.error("Error in updateUser:", error);
          throw new Error("Failed to update user");
        }
      },
      deleteUser: async (_, { userId }) => {
        try {
          return await User.findByIdAndDelete(userId);
        } catch (error) {
          console.error("Error in deleteUser:", error);
          throw new Error("Failed to delete User");
        }
      },
  }
}

module.exports = resolvers;