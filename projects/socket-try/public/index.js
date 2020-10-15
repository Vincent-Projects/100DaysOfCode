const GAME = [[null, null, null], [null, null, null], [null, null, null]];
let myTurn = false;
let myPion = "X";
let myName;

let MOVE_INDEX = {
    0: [0, 0],
    1: [0, 1],
    2: [0, 2],
    3: [1, 0],
    4: [1, 1],
    5: [1, 2],
    6: [2, 0],
    7: [2, 1],
    8: [2, 2],
};

let socket;
let btn = document.getElementById('name-btn');
btn.addEventListener('click', addPlayer);


function addPlayer() {
    socket = io();

    let playerName = document.getElementById('name-input').value;
    myName = playerName;
    socket.emit('newPlayer', playerName);

    lockName();
    socketInitialization();
}

function lockName() {
    let btn = document.getElementById('name-btn');
    let playerInput = document.getElementById('name-input');
    let playerName = playerInput.value;
    btn.remove();
    playerInput.remove();

    let info = document.getElementById('info');
    let name = document.createElement('h1');
    name.innerHTML = playerName;
    info.appendChild(name);

}

function socketInitialization() {
    socket.on('add', id => {
        let list = document.getElementById('list');
        let newEntry = document.createElement('li');
        newEntry.innerHTML = id;
        list.appendChild(newEntry);
    });

    // Initialization of new Players
    socket.on('newPlayerInfo', (newPlayerInfo) => {
        if (newPlayerInfo[0].socketId.toString() !== socket.id.toString()) {
            console.log(socket.id);
            let list = document.getElementById('player-list');
            let newEntry = document.createElement('button');
            newEntry.innerHTML = newPlayerInfo[0].name;
            newEntry.addEventListener('click', () => {
                socket.emit('bind', newPlayerInfo[0].socketId);
            });
            list.appendChild(newEntry);
        } else {
            let list = document.getElementById('player-list');
            for (let i = 0; i < newPlayerInfo[1].length; i++) {
                let newEntry = document.createElement('button');
                newEntry.innerHTML = newPlayerInfo[1][i].name;
                newEntry.addEventListener('click', () => {
                    socket.emit('bind', newPlayerInfo[1][i].socketId);
                });
                list.appendChild(newEntry);
            }
        }
    });

    // Initialization when two player join each other
    socket.on('newGame', game => {
        let avaiblePlayers = document.getElementById('avaible-players');


        if (socket.id.toString() === game[0].player1[0].socketId.toString()) { // For the player one
            avaiblePlayers.firstElementChild.innerHTML = "Current Player :";
            avaiblePlayers.lastElementChild.innerHTML = game[0].player1[0].name;
            myTurn = true;
            let buttons = document.getElementsByTagName('button');
            for (let i = 0; i < buttons.length; i++) {
                buttons[i].addEventListener('click', function () {
                    socket.emit('playMove', [{ move: i, playerId: socket.id }]);
                });
            }
        }

        if (socket.id.toString() === game[0].player2[0].socketId.toString()) { // For the player two
            avaiblePlayers.firstElementChild.innerHTML = "Current Player :";
            avaiblePlayers.lastElementChild.innerHTML = game[0].player1[0].name;
            myTurn = false;
            let buttons = document.getElementsByTagName('button');
            for (let i = 0; i < buttons.length; i++) {
                buttons[i].addEventListener('click', function () {
                    socket.emit('playMove', [{ move: i, playerId: socket.id }]);
                });
            }
        }
    });

    socket.on('drawMove', moveInfo => {
        let avaiblePlayers = document.getElementById('avaible-players');
        let buttons = document.getElementsByTagName('button');
        for (let i = 0; i < buttons.length; i++) {
            if (i == moveInfo[0]) {
                let moveDraw;
                if (moveInfo[1] == socket.id) {
                    moveDraw = myPion;
                    GAME[MOVE_INDEX[moveInfo[0]][0]][MOVE_INDEX[moveInfo[0]][1]] = moveDraw;
                } else {
                    moveDraw = "0";
                    GAME[MOVE_INDEX[moveInfo[0]][0]][MOVE_INDEX[moveInfo[0]][1]] = moveDraw;
                }

                buttons[i].innerHTML = moveDraw;
            }
        }
        let winInfo = isWin();
        if (winInfo.isWin) {
            if (winInfo.winner == myPion) {
                avaiblePlayers.firstElementChild.innerHTML = "Winner : " + myName;
            } else {
                avaiblePlayers.firstElementChild.innerHTML = "Votre adversaire à gagné";
            }
        }
    });
}
// For the game

function isWin() {
    let win = false;
    let winner;

    for (let i = 0; i < 3; i++) {
        if (GAME[i][0] != null && GAME[i][0] == GAME[i][1] && GAME[i][1] == GAME[i][2]) {
            win = true;
            if (GAME[i][0].toString() === "X") {
                winner = "X";
            } else {
                winner = "O";
            }
            break;
        }
    }

    for (let i = 0; i < 3; i++) {
        if (GAME[0][i] != null && GAME[0][i] == GAME[1][i] && GAME[1][i] == GAME[2][i]) {
            win = true;
            if (GAME[i][0].toString() === "X") {
                winner = "X";
            } else {
                winner = "O";
            }
            break;
        }
    }

    return {
        isWin: win,
        winner
    };
}