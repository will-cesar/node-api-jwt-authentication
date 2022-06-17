const express = require('express'); 
const bcrypt = require('bcrypt');
const User = require('../models/User');
const checkToken = require('../middlewares/check-token.middleware');

const router = express.Router();

// Create User
router.post('/', async (req, res) => {
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

// Get user by ID
router.get('/:id', checkToken, async (req, res) => {
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

module.exports = router;