const express = require('express');
const socket = require('socket.io');


const app = express();

const server = app.listen(3000);
const io = socket(server);

io.on('connection', (socket) => {
    socket.on('post', (move) => {
        io.emit('add', move);
    })
});

app.get('/', (req, res, next) => {
    res.sendFile(__dirname + '/index.html');
});