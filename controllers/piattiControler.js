// importiamo il roputer dei piatti
const dataPiatti = require('../data/posts');

// gruppo delle funzione della logica relativa alle rotte delle pizze
// index
function index(req, res) {

    //Inizialmente, il menu filtrato corrisponde a quello originale
    let filteredMenu = dataPiatti;

    // Se la richiesta contiene un filtro, allora filtriamo il menu
    if (req.query.tag) {
        filteredMenu = dataPiatti.filter(
            piatti => piatti.tags.includes(req.query.tag)
        );
    }

    // restituiamo la variabile filteredMenu
    // potrebbe essere stata filtrata o contenere il menu originale
    res.json(filteredMenu);
};
// show
function show(req, res) {

    // recuperiamo l'id dall' URL e trasformiamolo in numero
    const id = parseInt(req.params.id)

    // cerchiamo il pizza tramite id
    const piatti = dataPiatti.find(pizza => pizza.id === id);

    // Facciamo il controllo
    if (!piatti) {

        // ritorno lo stato di errore 404, non trovato
        res.status(404);

        // ritorno un messaggio di errore (formato json)
        return res.json({
            error: "Not Found",
            message: "Pizza non trovata"
        })
    }

    // Restituiamolo sotto forma di JSON   
    res.json(piatti);
};
// store
function store(req, res) {
    res.send('Creazione di un nuovo piatto');
};
// update
function update(req, res) {
    res.send('Modifica integrale dell piatto ' + req.params.id);
};
// modify
function modify (req, res){
    res.send('Modifica parziale dell piatto' + req.params.id);
};
// destroy
function destroy(req, res) {
    // recuperiamo l'id dall' URL e trasformiamolo in numero
    const id = parseInt(req.params.id)
    // cerchiamo il pizza tramite id
    const piatti = dataPiatti.find(pizza => pizza.id === id);
    // Facciamo il controllo
    if (!piatti) {
        // ritorno lo stato di errore 404, non trovato
        res.status(404);
        // ritorno un messaggio di errore (formato json)
        return res.json({
            error: "Not Found",
            message: "Pizza non trovata"
        })
    }
    // cancello la pizza trovata
    dataPiatti.splice(dataPiatti.indexOf(piatti), 1);
    // log di riscontro di check su aggiornamento dati
    console.log(dataPiatti);
    // ritorno la risposta positiva di avvenuta cancellazione
    res.sendStatus(204);
};
module.exports = { index, show, store, update, modify, destroy }