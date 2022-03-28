const express = require('express');
const { Socket } = require('socket.io');
const app = express();
const server = require('http').Server(app); //built-in - servidor embutido
const io = require('socket.io')(server)
const { v4: uuidv4} = require('uuid');

app.set('view engine', 'ejs');
app.use(express.static('public')); //informa ao servidor onde está os arquivo públicos

app.get('/', (req, res) => {
    res.redirect(`/${uuidv4()}`); //gerando ids
})

app.get('/:room', (req,res) => {
    res.render('room', { roomId: req.params.room })
})

io.on('connection', socket => {
    socket.on('join-room', () => {
        console.log("joined room");
    })
})

server.listen(3030); //escutando servidor - webrtc


 