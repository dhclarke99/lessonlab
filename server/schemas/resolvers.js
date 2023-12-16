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
   
  }
}

module.exports = resolvers;