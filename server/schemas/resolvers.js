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
  }
}

module.exports = resolvers;