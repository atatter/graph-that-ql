const { gql } = require('apollo-server');
// Repositories
const booksRepository = require('../repositories/booksRepository');
const authorsRepository = require('../repositories/authorsRepository');

const schema = gql`
    type Query {
        author(id: ID!): Author
        authors: [Author]
        book(id: ID!): Book,
        books: [Book],
    }
    type Mutation {
        addAuthor(name: String!, age: Int!): Author,
        addBook(name: String!, genre: String!, authorId: ID!): Book
    }
    type Author {
        id: ID!
        name: String
        age: Int
        books: [Book]
    }
    type Book {
        id: ID!
        name: String
        genre: String
        author: Author
    }
`;

const resolvers = {
    Query: {
        author: (_, args) => {
            return authorsRepository.findOne(args.id);
        },
        authors: () => {
            return authorsRepository.findAll();
        },
        book: (parent) => {
            return booksRepository.findOne(parent.id);
        },
        books: (parent) => {
            return booksRepository.findAll();
        },
    },
    Mutation: {
      addAuthor: (_, args) => {
        return authorsRepository.create(args);
      },
      addBook: (_, args) => {
        return booksRepository.create(args);
      },
    },
    Book: {
        author: parent => {
            return authorsRepository.findOne(parent.authorId);
        },
    },
    Author: {
        books: parent => {
            return booksRepository.findByAuthorId(parent.id);
        },
    },
};

module.exports = {
    schema,
    resolvers,
};