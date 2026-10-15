// TIC TAC TOE
let gameState = false;

const players = ["playerX", "playerO"];
let firstPlayer = players[Math.floor(Math.random() * 2)];
let winner = null;




/* Kurde no caly czas zostaje player win po kliknieciu start game i musze to rozwiazac jakos */
const startButton = document.querySelector('#start-btn');
const gameGrid = document.querySelector('.grid');
const idField = /^field-\d-\d+$/;

const startMatrix =    [[null, null, null],
                        [null, null, null], 
                        [null, null, null]];
let matrix = structuredClone(startMatrix);

function playGame() {
    gameState = true;
    startButton.hidden = true;
    gameGrid.querySelectorAll('div').forEach(div => div.textContent = null);
    document.querySelector('.game-output').textContent = null;
    matrix = structuredClone(startMatrix);
    winner = null;
    console.log(`Aktualny winner: ${winner}`);
    console.log(matrix);
    console.log(startMatrix);
}

function startButtonDisplay() {
    switch(gameState) {
        case true:
            startButton.hidden = true;
            break
        case false:
            startButton.hidden = false;
    }
}

function currentPlayerCharacter(currentPlayer) {
    switch(currentPlayer) {
        case 'playerX':
            return 'X';
        case 'playerO':
            return 'O';
    }
}

function checkGameCondition(matrix) {
    // same code for colCondition as in rowCondition is valid for transposed matrix
    const matrixTransposed =    matrix[0].map((_, columnIndex) =>
                                matrix.map(row => row[columnIndex]));

    const diagonals =  [[matrix[0][0], matrix[1][1], matrix[2][2]],
                        [matrix[0][2], matrix[1][1], matrix[2][0]]]

    const rowCondition =    matrix.some(row =>
                            row.every(field =>
                            field === row[0] && row[0] !== null));
    
    const colCondition =    matrixTransposed.some(row =>
                            row.every(field =>
                            field === row[0] && row[0] !== null));

    const diagCondition =   diagonals.some(diag =>
                            diag.every(field => field === diag[0] && diag[0] !== null));

    const tieCondition =    matrix.every(row => row.every(field => field !== null));

    if (rowCondition || colCondition || diagCondition) {
        gameState = false;
        winner = currentPlayerCharacter(currentPlayer);
        gameOutputDisplay(winner);
        console.log(`Winner: ${winner}`);
        matrix = structuredClone(startMatrix);
    } 
    if (tieCondition) {
        gameState = false;
        gameOutputDisplay(winner);
    }
    
    startButtonDisplay();
    console.log(`Warunek po rzędach: ${rowCondition}`);
    console.log(`Warunek po kolumnach: ${colCondition}`);
    console.log(`Warunek po przekątnych: ${diagCondition}`);
}

function gameOutputDisplay (winner) {
    if (winner !== null) {
        document.querySelector('.game-output').textContent = `PLAYER ${winner} WIN!`;
    } else {
        document.querySelector('.game-output').textContent = `IT'S A TIE!`;
    }
}

function switchPlayers(Player) {
    if (gameState === true) {
        switch(Player) {
            case 'playerX':
                currentPlayer = 'playerO';
                break
            case 'playerO':
                currentPlayer = 'playerX';
                break
        }
    }
}

function displayPlayerCharacter(chosenField, Player) {
    if (chosenField.querySelector('img') || gameState === false) {
        return;
    }
    const idMatrixElement = chosenField.id.replace(/^field-(\d)-(\d)$/, "$1$2").split("");
    matrix[Number(idMatrixElement[0])][Number(idMatrixElement[1])] = currentPlayerCharacter(currentPlayer);
    console.log(matrix);
    switch(Player) {
        case 'playerX':
            const ximg = document.createElement('img');
            ximg.src = `./images/xmark.png`;
            chosenField.append(ximg);
            // chosenField.textContent = 'X';
            break
        case 'playerO':
            // chosenField.textContent = 'O';
            const oimg = document.createElement('img');
            oimg.src = `./images/omark.png`;
            chosenField.append(oimg);
            break
    }
}
let currentPlayer = firstPlayer

gameGrid.addEventListener('click', function(event) {
    if (idField.test(event.target.id)) {
        displayPlayerCharacter(event.target, currentPlayer);
        checkGameCondition(matrix);
        switchPlayers(currentPlayer);
        console.log(`Aktualny winner: ${winner}`);
    }
});