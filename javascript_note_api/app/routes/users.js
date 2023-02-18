// importando express
const express = require('express');
const router = express.Router();
// importando os models
const User = require('../models/user');
// importando o jwt
const jwt = require('jsonwebtoken');
const user = require('../models/user');
const { findOne } = require('../models/user');
// importando os middlewares
const withAuth = require('../middlewares/auth');
// configurando as variáveis de ambiente
require('dotenv').config();
const secret = process.env.JWT_TOKEN; // poderíamos passar a string direto aqui, mas ela iria pro github e devemos mantê-la em segredo

// rota de registro de usuário
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  const user = new User({ name, email, password });

  try {
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ "error": "Error registering new user" });
  }
});

// rota de login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ error: "Incorrect email" });
    } else {
      // passamos email e senha na requisição (login), encontramos um usuário pelo email 
      // agora vamos checar se a senha passada no login confere com a senha do usuário encontrado
      user.isCorrectPassword(password, function (err, same) { // passamos uma função callback que usa o err e same que retornam do método do model
        if (same) {
          const token = jwt.sign({ email }, secret, { expiresIn: '30d' }); // criação do token de autenticação
          res.json({ user: user, token: token });
        } else {
          res.status(401).json({ error: "Incorrect password" });
        }
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal error: please try again" });
  }
});

// rota de atualizacao do nome de usuario ou email
router.put('/', withAuth, async function (req, res) {
  const { email, name } = req.body;

  try {
    let user = await User.findOneAndUpdate(
      { _id: req.user._id },
      { $set: { name: name, email: email } },
      { upsert: true, new: true }
    )
    res.json(user);
  } catch (error) {
    res.status(401).json({ error: error });
  }
});

// rota de atualizacao da senha
router.put('/password', withAuth, async function (req, res) {
  const { password } = req.body;

  try {
    let user = await User.findOne({ _id: req.user._id });
    user.password = password;
    user.save();
    res.json(user);
  } catch (error) {
    res.status(401).json({ error: error });
  }
});

// rota de delecao de usuario
router.delete('/', withAuth, async function (req, res) {
  try {
    let user = await User.findOne({ _id: req.user._id });
    await user.delete();
    res.json({ message: 'OK' }).status(201);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = router;