const express = require('express');
const socket = require('socket.io');

const names = [];
const binds = []


const app = express();

app.set('view engine', 'ejs');
app.set('views', 'src/views');
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res, next) => {
    /*res.render('home', {
        pageTitle: 'TicTacToe'
    });*/

    res.sendFile(__dirname + '/public/l.html');
});

const server = app.listen(3000);
const io = socket(server);

io.on('connection', (socket) => {
    socket.on('post', (move) => {
        io.emit('add', move);
    });

    socket.on('playMove', moveInfo => {
        let move = moveInfo[0].move;
        let playerId = moveInfo[0].playerId;
        io.emit('drawMove', [move, playerId]);
    });

    socket.on('newPlayer', playerName => {
        let newPlayerInfo = {
            socketId: socket.id,
            name: playerName
        };
        let otherPlayer = [...names];
        names.push(newPlayerInfo);
        io.emit('newPlayerInfo', [newPlayerInfo, otherPlayer]);
    });

    socket.on('bind', playerId => {
        let player1 = names.filter(player => player.socketId === socket.id);
        let player2 = names.filter(player => player.socketId === playerId);
        let game = {
            player1,
            player2
        };
        binds.push(game);
        io.emit('newGame', [game]);
    });
});