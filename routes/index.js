const express = require('express'); 
const authenticationRouter = require('./authentication.routes');
const usersRouter = require('./users.routes');

const routes = express.Router();

routes.use('/auth', authenticationRouter);
routes.use('/users', usersRouter);

// Public route
routes.get('/', (req, res) => {
    res.status(200).json({ msg: 'Hello word - I am the NodeJs JWT Authentication API' });
});

module.exports = routes;