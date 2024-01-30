const bcrypt = require('bcrypt');

const users = [
    {
        id: 1,
        username: 'user1',
        password: bcrypt.hashSync('password1', 10),
        name: 'Usuario uno'
    },
    {
        id: 2,
        username: 'user2',
        password: bcrypt.hashSync('password2', 10),
        name: 'Usuario dos'
    }
];

module.exports = users;
