const jwt = require('jsonwebtoken');

require('dotenv').config();
const secret = process.env.JWT_TOKEN;

const User = require('../models/user');

// middleware para requisições com autenticação
function WithAuth(req, res, next) {
  // o token será passado no header da requisição, o header contém metainformações da requisição
  const token = req.headers['x-access-token']; // o token pode ter qualquer nome, aqui chamaremos de x-access-token
  if (token) {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        res.status(401).json({ error: "Unauthorized: invalid token" });
      } else {
        req.email = decoded.email; // atribuímos um email à requisição que só tinha title e body, desnecessário, não precisa de email aqui, deixer só pra ficar registrado
        User.findOne({ email: decoded.email }).then(user => { // buscamos o usuário pelo email que veio com o token criado em routes/login
          req.user = user; // a requisição da nota só tinha title e body, estamos atribuindo um user para atribuir um autor a ela
          next();
        }).catch(err => {
          res.status(401).json({ error: err });
        });
      }
    });
  } else {
    res.status(401).json({ error: "Unauthorized: no token provided" });
  }
}

module.exports = WithAuth;