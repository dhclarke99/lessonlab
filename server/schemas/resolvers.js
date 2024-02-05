const { AuthenticationError } = require('apollo-server-express');
const { User, Experiment } = require('../models');
const { signToken } = require('../utils/auth');
const mongoose = require('mongoose');

const resolvers = {
  Query: {
    users: async (_parent, _args, context) => {


      return await User.find().populate('experiments.experiment')
    },
    experiments: async (_parent, _args, context) => {


      return await Experiment.find()
    },
    user: async (_parent, { id }) => {

      return await User.findOne({ _id: id }).populate('experiments.experiment')
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
       
        return {
          token,
          user
        }

      } catch (err) {
        console.log(err);
        throw new Error('Failed to create user');
      }
    },
    createExperiment: async (_parent, { input }, context) => {
      try {
        // Check if the user is logged in (context should have user info if logged in)
        if (!context.user) {
          throw new AuthenticationError('You must be logged in to create an experiment');
        }
        console.log("Context:", context)
        console.log("creating experiment...");
        const { title } = input;

        // Create the experiment
        const experiment = await Experiment.create({
          title
        });
console.log("seconcContext: ", context)

        // Find the logged-in user and add the experiment to their experiments array
        await User.findByIdAndUpdate(
          context.user._id,
          { $push: { experiments: { experiment: experiment._id } } },
          { new: true }
        );

        return experiment;

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
        // If 'experiments' field is present in the input, handle its update
        if (input.experiments) {
          // Convert experiment string IDs to ObjectId, if necessary
          input.experiments = input.experiments.map(experimentId => {
            return { experiment: mongoose.Types.ObjectId(experimentId) };
          });
        }

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
        ).populate('experiments.experiment'); // Populate experiments to return their details

        console.log(updatedUser); // Debugging: log the updated user
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

    updateExperiment: async (_, { experimentId, input }) => {
      try {
        const updateOperations = {};
    
        // Handle updating the conversation array
        if (input.conversation && Array.isArray(input.conversation) && input.conversation.length > 0) {
          updateOperations.$push = { conversation: { $each: input.conversation } };
        }
    
        // Handle updating other fields like title
        const otherUpdates = Object.fromEntries(
          Object.entries(input).filter(([key, value]) => value != null && key !== 'conversation')
        );
    
        if (Object.keys(otherUpdates).length > 0) {
          updateOperations.$set = otherUpdates;
        }
    
        // Perform the update with the constructed operations
        const updatedExperiment = await Experiment.findByIdAndUpdate(
          experimentId,
          updateOperations,
          { new: true, runValidators: true }
        );
    
        if (!updatedExperiment) {
          throw new Error('Experiment not found');
        }
    
        return updatedExperiment;
      } catch (error) {
        console.error("Error in updating Experiment:", error);
        throw new Error("Failed to update Experiment");
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
    deleteExperiment: async (_, { experimentId, userId }) => {
      try {
        // Find the user
        const user = await User.findById(userId);
        if (!user) {
          throw new Error('User not found');
        }
    
        // Manually update the experiments array
        user.experiments = user.experiments.filter(exp => exp.experiment.toString() !== experimentId);
        await user.save();
    
        // Delete the experiment
        const experiment = await Experiment.findByIdAndDelete(experimentId);
        if (!experiment) {
          throw new Error('Experiment not found');
        }
    
        return user; // Or any other appropriate response
      } catch (error) {
        console.error("Error in deleteExperiment:", error);
        throw new Error("Failed to delete Experiment");
      }
    },
    
    
  }
}

module.exports = resolvers;