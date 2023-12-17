const { AuthenticationError } = require('apollo-server-express');
const { User} = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async (_parent, _args, context) => {


      return await User.find()
    },
    user: async (_parent, { id }) => {

      return await User.findOne({ _id: id })
    },
  },
  Mutation: { 
    createUser: async (_parent, { input }) => {
        try {
          const { firstname, lastname, email, password, topSchools, sport, graduationYear, rating, academicInterests, personalStatement, athleticAchievements, position } = input;
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