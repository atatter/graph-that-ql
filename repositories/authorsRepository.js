const authors = [
    { name: 'Patrick Rothfuss', age: 44, id: '1' },
    { name: 'Brandon Sanderson', age: 42, id: '2' },
    { name: 'Terry Pratchett', age: 66, id: '3' },
];

function findAll () {
    return authors;
}

function findOne (id) {
    return authors.find(x => x.id === id);
};

module.exports = {
    findAll,
    findOne,
};