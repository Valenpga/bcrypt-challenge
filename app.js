const express = require('express');
const session = require('express-session');
const { secret, hashedSecret } = require('./crypto/config');
const authMiddleware = require('./middlewares/authMiddleware');
const userRoutes = require('./routes/users');

const app = express();

app.use(express.json());
app.use(session({
    secret: hashedSecret,
    resave: false,
    saveUninitialized: true
}));


app.use(authMiddleware);


app.use('/api/users', userRoutes);


app.get('/', (req, res) => {
    if (req.session && req.session.authenticated) {
        res.send(`<a href="/dashboard">Dashboard</a><br><form action="/logout" method="post"><button type="submit">Logout</button></form>`);
    } else {
        res.send(`<form action="/login" method="post"><input type="text" name="username" placeholder="Username"><input type="password" name="password" placeholder="Password"><button type="submit">Login</button></form>`);
    }
});


app.get('/dashboard', (req, res) => {
    if (req.session && req.session.authenticated) {
        res.send('Dashboard - Acceso validando token');
    } else {
        res.redirect('/');
    }
});


app.post('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
