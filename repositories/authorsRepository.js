const Author = require('../models/author');

function findAll () {
    return Author.find();
}

function findOne (id) {
    return Author.findById(id);
};

function create ({ name, age }) {
    author = new Author({ name, age });
    return author.save();
}

module.exports = {
    findAll,
    findOne,
    create,
};