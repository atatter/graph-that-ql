const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLNonNull,
    GraphQLInt,
    GraphQLList,
} = require('graphql');

// Repositories
const booksRepository = require('../repositories/booksRepository');
const authorsRepository = require('../repositories/authorsRepository');

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                return authorsRepository.findOne(parent.authorId);
            },
        },
    }),
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: GraphQLList(BookType),
            resolve(parent, args) {
                return booksRepository.findByAuthorId(parent.id);
            },
        }
    }),
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) },
            },
            resolve (parent, args) {
                return booksRepository.findOne(args.id);
            },
        },
        books: {
            type: GraphQLList(BookType),
            resolve () {
                return booksRepository.findAll();
            },
        },
        author: {
            type: AuthorType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) },
            },
            resolve (parent, args) {
                return authorsRepository.findOne(args.id);
            },
        },
        authors: {
            type: GraphQLList(AuthorType),
            resolve () {
                return authorsRepository.findAll();
            },
        },
    },
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: GraphQLString },
                age: { type: GraphQLInt },
            },
            resolve(parent, args) {
                return authorsRepository.create(args);
            },
        },
        addBook: {
            type: BookType,
            args: {
                name: { type: GraphQLString },
                genre: { type: GraphQLString },
                authorId: { type: GraphQLID },
            },
            resolve(parent, args) {
                return booksRepository.create(args);
            },
        },
    },
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
});