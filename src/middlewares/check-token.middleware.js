const jwt = require('jsonwebtoken');

// Middleware to check if the request have a token and it is valid
checkToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ msg: 'Acesso negado!' });

    try {
        const secret = process.env.SECRET;
        jwt.verify(token, secret); // verify if token is valid or not
        next(); // if is valid token, go to next action
    } catch(err) {
        res.status(400).json({ msg: 'Token inválido!' });
    }
};

module.exports = checkToken;