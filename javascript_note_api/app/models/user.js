const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

// Criptografa a senha antes de mandar pro banco de dados
// Função que será executada antes do user ser salvo
// O bcrypt não funciona com arrow function, não esqueça
// O bcrypt naõ deveria estra em uma async function? <<< buscar
userSchema.pre('save', function (next) { // o next faz passa pro próximo middleware, sem o next não para de processar a requisição, não esqueça do next()
  // this.isNew vefifica se o registro é novo no banco de dados, this.isModified verifica se houve mudança no password
  // Só será executado uma vez por senha quando criada ou modificada
  if (this.isNew || this.isModified('password')) {
    bcrypt.hash(this.password, 10, (err, hashedPassowrd) => {
      if (err) {
        next(err);
      } else {
        this.password = hashedPassowrd;
        // O next passa pro próximo middleware do mongoose e pra salvar o user no banco de dados
        next();
      }
    });
  }
});

// O mongoose nos permite criar métodos auxiliares nos models
// método que checa se a senha passada no login é igual a do banco de dados
userSchema.methods.isCorrectPassword = function (password, callback) {
  // this é o usuário encontrado na rota de login
  bcrypt.compare(password, this.password, function (err, same) {
    if (err)
      callback(err);
    else
      callback(err, same);
  });
};

module.exports = mongoose.model('User', userSchema);