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
    schools: async () => {
      return await School.find({});
    },
    school: async (_, { apiId }) => {
      return await School.findOne({ apiId });
    },
    school: async (_, { name }) => {
      return await School.findOne({ name });
    },
    
    metricsBySchool: async (_, { name }) => {
      const metricsData = await Metrics.findOne({ name: name }).exec();
    
      if (!metricsData) {
        throw new Error(`Metrics data for school ${name} not found`);
      }
    
      // Convert the sportsData Map to a plain object for easier processing
      const sportsDataMap = metricsData.sportsData;
    
      // Debugging log
      console.log("sportsDataMap:", sportsDataMap);
    
      let sportsDataArray = [];
    
      sportsDataMap.forEach((value, key) => {
        // Debugging log
        console.log(`Processing year: ${key}, data:`, value);
    
        if (value && value.men && value.women) {
          sportsDataArray.push({
            year: key,
            men: value.men,
            women: value.women
          });
        } else {
          // Log an error if the expected structure is not found
          console.error(`Unexpected structure for year ${key}:`, value);
        }
      });
    
      console.log("sportsDataArray after processing:", sportsDataArray);
    
      return {
        id: metricsData._id.toString(),
        name: metricsData.name,
        sportsData: sportsDataArray
      };
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
          password,
          topSchools,
          sport,
          graduationYear,
          rating,
          academicInterests,
          personalStatement,
          athleticAchievements,
          position,


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
        console.log("trying to login")
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
    addSchool: async (_, args) => {
      const newSchool = new School(args);
      await newSchool.save();
      return newSchool;
    },
  }
}

module.exports = resolvers;