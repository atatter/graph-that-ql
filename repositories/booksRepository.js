const books = [
    { name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorId: '1' },
    { name: 'The Final Empire', genre: 'Fantasy', id: '2', authorId: '2' },
    { name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorId: '3' },
    { name: 'Kodu ja linn', genre: 'normal', id: '4', authorId: '2' },
];

function findAll () {
    return books;
}

function findOne (id) {
    return books.find(x => x.id === id);
};

function findByAuthorId (authorId) {
    return books.filter(x => x.authorId === authorId);
};

module.exports = {
    findAll,
    findOne,
    findByAuthorId,
};