// Board information
const ROWS = 6;
const COLS = 7;
const GAME = [];

const PLAYER_A = 'X';
const PLAYER_B = 'O';
const PLAYER_IA = "A";

const IA_MODES = {
    random: 'RANDOM',
    minmax: 'MINMAX'
}


// Initial values
let iaMode = 0;
let currentPlayer = PLAYER_A;



// Functions

function initiateGame() {
    GAME.splice(0, GAME.length);
    currentPlayer = PLAYER_A;

    let row;

    for (let i = 0; i < ROWS; i++) {
        row = [];
        for (let j = 0; j < COLS; j++) {
            row.push(' ');
        }
        GAME.push(row);
    }

    drawGame();
    paintCurrentPlayer();
    paintCurrentMode();
}

function paintCurrentMode() {
    let modeText = document.getElementById('ia-text');

    switch (iaMode) {
        case 0:
            modeText.innerHTML = "Off";
            break;
        case 1:
            modeText.innerHTML = "Random IA ( easy )";
            break;
        case 2:
            modeText.innerHTML = "MinMax IA ( hard )";
            break;
        default:
            return false;
    }
}

function drawGame() {
    let game = document.getElementById('game');
    let row = [];

    for (let i = 0; i < ROWS; i++) {
        row.push('<div class="row">');
        for (let j = 0; j < COLS; j++) {
            let playerColor = GAME[i][j] == 'X' ? 'red' : (GAME[i][j] == 'O' || GAME[i][j] == 'A' ? 'green' : null);
            row.push(`<div class="square ${playerColor}" data-row='${i}' data-col='${j}'>${playerColor ? 'O' : ' '}</div>`);
        }
        row.push('</div>');
    }

    game.innerHTML = row.join('');

    let squares = document.getElementsByClassName('square');

    for (let i = 0; i < squares.length; i++) {
        squares[i].addEventListener('click', compareMove);
    }
}

function compareMove(event) {
    if (currentPlayer.toString() !== PLAYER_IA) {
        let squareCol = event.target.getAttribute('data-col');
        playMove(squareCol);
    }

    drawGame();
    let win = isWin();

    if (win)
        return true;

    switchPlayer();

    if (iaMode !== 0 && currentPlayer.toString() === PLAYER_IA.toString()) {
        if (iaMode === 1)
            playIaMove(IA_MODES.random);

        if (iaMode === 2)
            playIaMove(IA_MODES.minmax);

        drawGame();
        let win = isWin();

        if (win)
            return true;

        switchPlayer();
    }
}

function isWin(game) {
    let win = false;
    let rowWinA = 0;
    let rowWinB = 0;
    let colWinA = 0;
    let colWinB = 0;

    let col = 0;
    let grid = game ? game : GAME;
    // Rows and Cols validation
    for (let i = 0; i < ROWS; i++) {
        for (let j = 0; j < COLS; j++) {
            if (grid[i][j].toString() !== ' ') {
                if (grid[i][j].toString() === 'X') {
                    rowWinA++;
                    rowWinB = 0;
                } else {
                    rowWinA = 0;
                    rowWinB++;
                }

                if (rowWinA == 4 || rowWinB == 4) {
                    win = true;
                    break;
                }
            } else {
                rowWinA = 0;
                rowWinB = 0;
            }
        }

    }

    for (let i = 0; i < COLS; i++) {
        for (let j = 0; j < ROWS; j++) {
            if (grid[j][i].toString() !== ' ') {
                if (grid[j][i].toString() === 'X') {
                    colWinA++;
                    colWinB = 0;
                } else {
                    colWinA = 0;
                    colWinB++;
                }

                if (colWinA == 4 || colWinB == 4) {
                    win = true;
                    break;
                }
            }
        }
        colWinA = 0;
        colWinB = 0;
    }

    // Diagonals validation 1
    for (let i = 0; i < ROWS - 3; i++) {
        for (let j = 0; j < COLS - 3; j++) {
            if (grid[i][j].toString() !== ' ' &&
                grid[i][j].toString() === grid[i + 1][j + 1].toString() &&
                grid[i][j].toString() === grid[i + 2][j + 2].toString() &&
                grid[i][j].toString() === grid[i + 3][j + 3].toString()) {
                win = true;
            }
        }
    }

    // Diagonals validation 2
    for (let i = 0; i < ROWS - 3; i++) {
        for (let j = 3; j < COLS; j++) {
            if (grid[i][j].toString() !== ' ' &&
                grid[i][j].toString() === grid[i + 1][j - 1].toString() &&
                grid[i][j].toString() === grid[i + 2][j - 2].toString() &&
                grid[i][j].toString() === grid[i + 3][j - 3].toString()) {
                win = true;
            }
        }
    }

    if (!win) {
        return false;
    } else {
        let piece = document.getElementById('piece');
        piece.innerHTML = `Winner : Player_${currentPlayer == PLAYER_A ? 1 : 2}`;
        let squares = document.getElementsByClassName('square');

        for (let i = 0; i < squares.length; i++) {
            squares[i].removeEventListener('click', compareMove);
            squares[i].style.cursor = 'default';
        }
        return true;
    }
}

function switchPlayer() {
    if (currentPlayer.toString() === PLAYER_A.toString() && !iaMode) {
        currentPlayer = PLAYER_B;
    } else if (iaMode && currentPlayer.toString() === PLAYER_A.toString()) {
        currentPlayer = PLAYER_IA;
    } else {
        currentPlayer = PLAYER_A;
    }

    paintCurrentPlayer();
}

function paintCurrentPlayer() {
    let piece = document.getElementById('piece');
    let player;
    let color;

    if (currentPlayer == PLAYER_A) {
        player = 'Player_1';
        color = 'red';
        piece.classList.remove('green');
    } else if (iaMode) {
        player = 'IA';
        color = 'green';
        piece.classList.remove('red');
    } else {
        player = 'Player_2';
        color = 'green';
        piece.classList.remove('red');
    }

    piece.innerHTML = player;
    piece.classList.add(color)
}

function switchIaMode() {
    switch (iaMode) {
        case 0:
            iaMode = 1;
            break;
        case 1:
            iaMode = 2;
            break;
        case 2:
            iaMode = 0;
            break;
        default:
            iaMode = 0;
    }

    paintCurrentMode();
}

function playMove(col) {
    let row = ROWS - 1;

    do {
        if (GAME[row][col].toString() === ' ') {
            GAME[row][col] = currentPlayer;
            break;
        } else {
            row--;
        }
    } while (row >= 0);
}

function playIaMove(mode) {

    if (mode === IA_MODES.random) { // This is the random IA
        let randomMove = Math.floor(Math.random() * 7);

        playMove(randomMove);
    } else if (mode === IA_MODES.minmax) {
        fetch('http://localhost:3000/minmax', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: {
                game: GAME,
            }
        }).then(response => response.json())
            .then(result => {
                console.log(result);
            }).catch(err => console.log(err));
    }
}

function minmax(grid, depth, isMax) {
    let score = evaluate(grid);

    if (score == 10) {
        return score;
    }

    if (score == -10) {
        return score;
    }

    if (isMax) {
        let best = -1000;

        for (let i = 0; i < COLS; i++) {
            let row = ROWS - 1;
            let undo = {
                row: -1,
                col: -1
            };
            do {
                if (grid[row][i].toString() === ' ') {
                    grid[row][i] = currentPlayer;
                    undo.row = row;
                    undo.col = i;
                    break;
                } else {
                    row--;
                }
            } while (row >= 0);

            best = Math.max(best, minmax(grid, depth + 1, !isMax));

            grid[undo.row][undo.col] = " ";
        }

        return best;
    } else {
        let best = 1000;

        for (let i = 0; i < COLS; i++) {
            let row = ROWS - 1;
            let undo = {
                row: -1,
                col: -1
            };
            do {
                if (grid[row][i].toString() === ' ') {
                    grid[row][i] = PLAYER_A;
                    undo.row = row;
                    undo.col = i;
                    break;
                } else {
                    row--;
                }
            } while (row >= 0);

            best = Math.max(best, minmax(grid, depth + 1, !isMax));

            grid[undo.row][undo.col] = " ";
        }
        return best;
    }

}

function evaluate(grid) {
    if (isWin(grid)) {
        if (currentPlayer.toString() === PLAYER_A) {
            return -10;
        } else {
            return +10;
        }
    } else {
        return 0;
    }
}

function findBestMove() {
    let bestCol = -1;
    let bestVal = -1000;
    let gameCopy = GAME;

    let undo = {
        row: -1,
        col: -1
    };

    for (let i = 0; i < COLS; i++) {
        let row = ROWS - 1;
        do {
            if (gameCopy[row][i].toString() === ' ') {
                gameCopy[row][i] = currentPlayer;
                undo.row = row;
                undo.col = i;
                break;
            } else {
                row--;
            }
        } while (row >= 0);

        //let moveEval = minmax(gameCopy, 0, false);




        // Here fetch to the server
        gameCopy[undo.row][undo.col] = " ";

        if (moveEval > bestVal) {
            bestCol = undo.col;
            bestVal = moveEval;
        }
    }

    return bestCol;
}


let start = document.getElementById('start');
let iaBtn = document.getElementById('ia-btn');

start.addEventListener('click', initiateGame);

iaBtn.addEventListener('click', switchIaMode);