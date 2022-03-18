const express = require('express');
const app = express();
const server = require('http').Server(app); //built-in - servidor embutido
const { v4: uuidv4} = require('uuid');

app.set('view engine', 'ejs');
app.use(express.static('public')); //informa ao servidor onde está os arquivo públicos

app.get('/', (req, res) => {
    res.redirect(`/${uuidv4()}`); //gerando ids
})

app.get('/:room', (req,res) => {
    res.render('room', { roomId: req.params.room })
})

server.listen(3030); //escutando servidor - webrtc


 