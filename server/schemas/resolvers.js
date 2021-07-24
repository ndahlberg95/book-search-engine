const { User, Book } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        hello: () => "whatever you want",
        me: async (parent, args, context) => {
          console.log("hit it!");
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
        test: async (_, {temp}) => "string" + temp,
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
        saveBookWithUser: async (_, book, context) => {
          console.log(_, book);
          console.log("CONTEST", context)
          //   const updatedUser = await User.findByIdAndUpdate(
          //     { _id: book.userId  },
          //     { $addToSet: { savedBooks: {
          //   title: book.title
          //   authors: book.authors
          // } } },
          //     { new: true }
          //   );
          //  return updatedUser
          return {
            _id: 'asdf'
          }
        },
        saveBook: async (_, book) => {
          console.log(book)
          return {}
          // if (context.user) {
          //   const updatedUser = await User.findByIdAndUpdate(
          //     { _id: book.userId  },
          //     { $addToSet: { savedBooks: input } },
          //     { new: true }
          //   );
          //   return updatedUser;
          // }
          // throw new AuthenticationError('You need to be logged in!')
        },
        removeBook: async () => {
          if (context.user) {
            const updatedUser = await User.findOneAndUpdate(
              { _id: context.user._id },
              { $pull: { savedBooks: { bookId: args.bookId } } },
              { new: true }
            );
            return updatedUser;
          }
          throw new AuthenticationError('You need to be logged in!')
        }
    }
};

module.exports = resolvers;