// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create our typeDefs
const typeDefs = gql`
    type Query {
        me: User
    }
    type Mutation {
        login (email: String!, password: String!) Auth 
            //Accepts an email and password as parameters; returns an Auth type.
        addUser (username: String!, email: String!, password: String!): Auth
            //Accepts a username, email, and password as parameters; returns an Auth type.
        saveBook: (authors: [String!], description: String!, title: String!, bookId: String!, image: String!, link: String!): User
            //Accepts a book author's array, description, title, bookId, image, and link as parameters; returns a User type. (Look into creating what's known as an input type to handle all of these parameters!)
        removeBook (bookId: String!): User
            //Accepts a book's bookId as a parameter; returns a User type.
    }
    type User {
        _id: ID
        username: String
        email: String
        bookcount:
        saveBooks: [Book]
    }
    type Book {
        authors: [String]
        description: String
        bookId: String
        image: String
        link: String
        title: String
    }
    type Auth {
        token:
        user: User
    }
`;

// export the typeDefs
module.exports = typeDefs;