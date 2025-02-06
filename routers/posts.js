// Importiamo express e utilizziamo la parte di routing

    // importa il framework Express.js
    const express = require('express')
    // Crea un'istanza di router
    const router = express.Router();

// importiamo il roputer dei piatti
const dataPiatti = require('../data/posts');

// rotte di CRUD dei piatti
// index
router.get('/', function (req, res) {
    res.send(dataPiatti);
});
// show
router.get('/:id', function (req, res) {
    res.send(dataPiatti[req.params.id]);
});
// store
router.post('/', function (req, res) {
    res.send('Creazione di un nuovo piatto');
});
// update
router.put('/:id', function (req, res) {
    res.send('Modifica integrale dell piatto ' + req.params.id);
});
// modify
router.patch('/:id', function (req, res) {
    res.send('Modifica parziale dell piatto' + req.params.id);
});
// destroy
router.delete('/:id', function (req, res) {
    res.send('Eliminazione dell piatto ' + req.params.id);
});
// esportiamo il modulo del router
module.exports = router;