const Book = require('../models/book');

function findAll () {
    return Book.find();
}

function findOne (id) {
    return Book.findById(id);
};

function findByAuthorId (authorId) {
    return Book.find({ authorId });
};

function create ({ name, genre, authorId }) {
    const book = new Book({ name, genre, authorId });
    return book.save();
};

module.exports = {
    findAll,
    findOne,
    findByAuthorId,
    create,
};