const { User, Book } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
              const userData = await User.findOne({ _id: context.user._id })
                .select('-__v -password')
                // .populate('thoughts')
                // .populate('friends');
          
              return userData;
            }
          
            throw new AuthenticationError('Not logged in');
        },
        // thoughts: async (parent, { username }) => {
        //   const params = username ? { username } : {};
        //   return Thought.find(params).sort({ createdAt: -1 });
        // },
        // thought: async (parent, { _id }) => {
        //      return Thought.findOne({ _id });
        // },
        // //get all users
        // users: async () => {
        //     return User.find()
        //         .select('-__v -password')
        //         .populate('friends')
        //         .populate('thoughts');
        // },
        // // get a user by username
        // user: async (parent, { username }) => {
        //     return User.findOne({ username })
        //         .select('-__v -password')
        //         .populate('friends')
        //         .populate('thoughts');
        // },
    },
    Mutation: {
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
          
            if (!user) {
              throw new AuthenticationError('Incorrect credentials');
            }
          
            const correctPw = await user.isCorrectPassword(password);
          
            if (!correctPw) {
              throw new AuthenticationError('Incorrect credentials');
            }
          
            const token = signToken(user);
            return { token, user };
        },
        addUser: async () => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        saveBook: async () => {
    
        },
        removeBook: async () => {
    
        }
    }
};

module.exports = resolvers;