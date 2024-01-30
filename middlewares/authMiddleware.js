const jwt = require('jsonwebtoken');
const { hashedSecret } = require('../crypto/config');

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    jwt.verify(token, hashedSecret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Fallo en la autenticacion' });
        }
        req.user = decoded;
        next();
    });
};

module.exports = authMiddleware;
