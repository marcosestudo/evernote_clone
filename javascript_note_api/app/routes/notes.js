// importando express
const express = require('express');
const router = express.Router();
// importando os models
const Note = require('../models/note');
const User = require('../models/user');
// importando o middleware de autentiicação
const withAuth = require('../middlewares/auth');
const user = require('../models/user');

// função pra checar se o usuário logado é dono da nota
function isOwner(user, note) {
  // tarnsformando an=mbosem string antes de comparar pra não termos problemas tentando comparara uma strong com uma não string
  return (JSON.stringify(user._id) === JSON.stringify(note.author));
}

// o withAuth é executado e atrubui um user a requisição para atribuir um autor à nota
// withAuth foi criada em app/middlewares
// rota pra criar nota
router.post('/', withAuth, async (req, res) => {
  const { title, body } = req.body;

  try {
    let note = new Note({ title: title, body: body, author: req.user._id }); // req.user._id vem pelo withAuth
    await note.save();
    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ error: "Proplem creating new note" });
  }
});

// rota pra visualizar lista de notas
router.get('/', withAuth, async (req, res) => {
  try {
    let notes = await Note.find({ author: req.user._id });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// rota de busca de notas
// deixe antes das requests que usam /:id para que o search depois da barra não seja considerado como um id
router.get('/search', withAuth, async (req, res) => {
  // const { query } = req.query; // query é um péssimo nome pra uma query na url, a atribuição sem desestruturar ficaria >>> const query = req.query.query
  const { query } = req.query;
  
  try {
    let notes = await Note
      .find({ author: req.user._id }) // podemos encadear buscas
      .find({ $text: { $search: query } }); // o operador $text fará a busca acontecer em todos os textos tanto no title ou no body das notas
      console.log(notes)
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// rota para visualizar uma nota
router.get('/:id', withAuth, async (req, res) => {
  const { id } = req.params;

  try {
    let note = await Note.findById(id);
    // o user é acrescentado à na requisição no middleware de autenticação withAuth
    if (isOwner(req.user, note))
      res.json(note);
    else
      res.status(403).json({ error: "Forbidden: you don't have permission to see this note" });
  } catch (error) {
    res.status(500).json({ error: "Proplem getting the note" });
  }
});

// rota para atualizar uma nota
router.put('/:id', withAuth, async (req, res) => {
  const { title, body } = req.body;
  const { id } = req.params;

  try {
    let note = await Note.findById(id);

    if (isOwner(req.user, note)) {
      note = await Note.findOneAndUpdate({ _id: id },
        { $set: { title: title, body: body } },
        { "upsert": true, "new": true } // upsert:true cria o objeto se não existir e new:true mostra a nota atualizada, sem eles seria mostrada a nota antiga
      );
      res.status(200).json(note);
    } else {
      res.status(403).json({ error: "Forbidden: you don't have permission to update this note" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Problem updating the note" });
  }
});

// rota para deletar uma nota
router.delete('/:id', withAuth, async (req, res) => {
  const { id } = req.params;

  try {
    let note = await Note.findById(id);
    if (isOwner(req.user, note)) {
      await note.delete();
      res.json({ message: "OK" }).status(204);
    } else {
      res.status(403).json({ error: "Forbidden: you don't have permission to delete this note" });
    }

  } catch (error) {
    res.status(500).json({ error: "Proplem deleting the note" });
  }
});

module.exports = router;