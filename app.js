require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();

// Config JSON response
app.use(express.json());

// Models
const User = require('./models/User');

// Public route
app.get('/', (req, res) => {
    res.status(200).json({ msg: 'Hello word - I am the NodeJs JWT Authentication API' });
});

// Middleware to check if the request have a token and it is valid
function checkToken(req, res, next) {
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
}

// Private route
app.get('/user/:id', checkToken, async (req, res) => {
    const id = req.params.id;

    try {
        const user = await User.findById(id, '-password'); // '-password' remove the password from response
        if (!user) return res.status(404).json({ msg: 'Usuário não encontrado!' });
    
        res.status(200).json({ user });
    } catch(err) {
        console.log(err);
        res.status(500).json({ msg: 'Erro interno de servidor' });
    } 
});

// Register User
app.post('/auth/register', async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;

    if (!name) return res.status(422).json({ msg: 'O nome é obrigatório!' });
    if (!email) return res.status(422).json({ msg: 'O e-mail é obrigatório!' });
    if (!password) return res.status(422).json({ msg: 'A senha é obrigatória!' });
    if (password !== confirmPassword) return res.status(422).json({ msg: 'As senhas não conferem!' });
    
    const userExists = await User.findOne({ email: email });
    if (userExists) return res.status(422).json({ msg: 'Por favor, utilizar outro e-mail!' });

    // create pasword with safety
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    // create user
    const user = new User({ name, email, password: passwordHash });

    try {
        await user.save(); // save user in database
        res.status(201).json({ msg: 'Usuário criado com sucesso!' });
    } catch(err) {
        console.log(err);
        res.status(500).json({ msg: 'Erro interno de servidor' });
    }
});

// Login User
app.post('/auth/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email) return res.status(422).json({ msg: 'O e-mail é obrigatório!' });
    if (!password) return res.status(422).json({ msg: 'A senha é obrigatória!' });

    const user = await User.findOne({ email: email });
    if (!user) return res.status(404).json({ msg: 'Usuário não encontrado!' });

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) return res.status(422).json({ msg: 'Senha inválida!' });

    try {
        // create token
        const secret = process.env.SECRET;
        const token = jwt.sign({ id: user._id }, secret);
        res.status(200).json({ msg: 'Autenticação realizada com sucesso!', token });
    } catch(err) {
        console.log(err);
        res.status(500).json({ msg: 'Erro interno de servidor' });
    }
});


const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;
const urlConnection = `mongodb://${dbUser}:${dbPassword}@localhost:27017/`;

mongoose
    .connect(urlConnection)
    .then(() => {
        app.listen(3000);
        console.log('Conectou ao banco!');
    })
    .catch(err => console.log(err));