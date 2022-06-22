const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const router = express.Router();

// Login user
router.post('/login', async (req, res) => {
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

module.exports = router;