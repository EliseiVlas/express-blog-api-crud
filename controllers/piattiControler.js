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

    // Creiamo un nuovo id incrementando l'ultimo id presente
    const ultimoPiatto = dataPiatti[dataPiatti.length - 1];
    const idUltimoPiatto = ultimoPiatto.id;
    const newId = idUltimoPiatto + 1;

    // Creiamo un nuovo oggetto pizza
    const nuovoPiatto = {
        id: newId,
        title: req.body.title,
        content: req.body.content,
        image: req.body.image,
        tags: req.body.tags
    }

    // Aggiungiamo la nuova pizza al menu
    dataPiatti.push(nuovoPiatto);

    // controlliamo
    console.log(dataPiatti);
    
    // Restituiamo lo status corretto e la pizza appena creata
    res.status(201);
    res.json(nuovoPiatto);
};
// update
function update(req, res) {

   // recuperiamo l'id dall' URL e trasformiamolo in numero
    const id = parseInt(req.params.id);

    // cerchiamo la pizza tramite id
    const piatto = dataPiatti.find(pizza => pizza.id === id);

    // Facciamo il controllo
    if (!piatto) {
        // ritorno lo stato di errore 404, non trovato
        res.status(404);
        // ritorno un messaggio di errore (formato json)
        return res.json({
            error: "Not Found",
            message: "Pizza non trovata"
        })
    }
    //  modifichiamo i dati della pizza trovata
    piatto.title = req.body.title;
    piatto.content = req.body.content;
    piatto.image = req.body.image;
    piatto.tags = req.body.tags;

    // stampiamo in console il menu
    console.log(dataPiatti);

    // ritorniamo l'oggetto modificato
    res.json(piatto);

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