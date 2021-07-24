// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create our typeDefs
const typeDefs = gql`
    type Query {
        hello: String
        me: User
    }
    type Book {
        authors: [String]
        description: String
        bookId: String
        image: String
        link: String
        title: String
    }
    type BookInput{
        userId: ID
        book: Book
    }
    type Mutation {
        login (email: String!, password: String!): Auth 
        addUser (username: String!, email: String!, password: String!): Auth
        saveBook (authors: [String!], description: String!, title: String!, bookId: String!, image: String!, link: String!): User
        saveBookWithUser (userId: String, authors: [String], description: String, title: String, bookId: String, image: String, link: String): User
        removeBook (bookId: String!): User
        test (value: String): String
    }
    type User {
        _id: ID
        username: String
        email: String
        bookcount: Int
        saveBooks: [Book]
    }
    type Auth {
        token: String
        user: User
    }
`;

module.exports = typeDefs;