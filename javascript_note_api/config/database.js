const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// a partir do mongoose 6, as 3 opções abaixo vêm true por padrão, não precisa mais colocá-las na configuração
// deixei aqui só pra lembrar

/*
useNewUrlParser, useUnifiedTopology, useFindAndModify, and useCreateIndex are no longer supported options. 
Mongoose 6 always behaves as if useNewUrlParser, useUnifiedTopology, and useCreateIndex are true, and useFindAndModify is false. 
Please remove these options from your code.
*/

// mongoose.connect(
//   'mongodb://localhost/javascriptNote',
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true
//   }
// )
//   .then(() => console.log("Conectado ao MongoDB"))
//   .catch((err) => (console.log(err)));

mongoose.connect('mongodb://localhost/javascriptNote')
  .then(() => console.log("Conectado ao MongoDB"))
  .catch((err) => (console.log(err)));