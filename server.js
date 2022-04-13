const express = require('express');
//const { Socket } = require('socket.io');
const app = express();
const server = require('http').Server(app); //built-in - servidor embutido
const io = require('socket.io')(server)
const { v4: uuidv4} = require('uuid');
const {ExpressPeerServer } = require('peer');
const peerServer = ExpressPeerServer(server, {
    debug: true
});
app.set('view engine', 'ejs');
app.use(express.static('public')); //informa ao servidor onde está os arquivo públicos

app.use('/peerjs', peerServer);
app.get('/', (req, res) => {
    res.redirect(`/${uuidv4()}`); //gerando ids
})

app.get('/:room', (req,res) => {
    res.render('room', { roomId: req.params.room })
})

io.on('connection', socket => {
    socket.on('join-room', (roomId, userId) => {
        socket.join(roomId);
        socket.to(roomId).emit('user-connected', userId); //irá transmitir o usuário conectado
    })
})

server.listen(3030); //escutando servidor - webrtc


 