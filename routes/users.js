const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { hashedSecret } = require('../crypto/config');
const users = require('../data/users');

const router = express.Router();


router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(user => user.username === username);

    if (user && bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({ username: user.username }, hashedSecret);
        req.session.authenticated = true;
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Error en el inicio de sesion' });
    }
});

module.exports = router;
