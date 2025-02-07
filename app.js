// importiamo express una volta che lo instaliamo
  // Importa il framework Express.js
  const express = require('express')
  // Crea un'istanza dell'applicazione Express
  const app = express()
  // Definisce la porta su cui il server ascolterà le richieste
  const port = 3000

// importiamo il roputer dei piatti
const piattiRouter = require('./routers/posts');

// definiamo la cartella per i file statici (le immagini)
app.use(express.static("./public/imgs/posts/"));

// registro il body-parser per "application/json"
app.use(express.json());

// progetto base con rotta "/"
app.get('/', (req, res) => {
   res.send("Ciao sono la rotta Home, dell mio locale!!!");
});

// utilizziamo la rotta dei piatti andando a definire la parte iniziale delle rotte
app.use("/piatti", piattiRouter)

  // avvio del server sulla porta specificata
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})