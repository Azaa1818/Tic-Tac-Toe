const cells = document.querySelectorAll('.box'); 
const resBtn = document.querySelector('.restart');
const statusText = document.getElementById('status');
const winCondition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let options = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let running = false;
initializeGame();

function initializeGame() {
    cells.forEach(cell => cell.addEventListener('click', cellClicked));
    resBtn.addEventListener('click', restartGame);
    statusText.textContent = `${currentPlayer}'s Turn`; 
    running = true;
}
function cellClicked() {
    const cellIndex = this.getAttribute('cell-index');
    if (options[cellIndex] != '' || !running) {
        return;
    }
    updateCell(this, cellIndex);
    checkWinner();
}
function updateCell(cell, index) {
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}
function changePlayer() {
    currentPlayer = (currentPlayer == 'X') ? 'O': 'X';
    statusText.textContent = `${currentPlayer}'s turn`; 
}
function checkWinner() {
    let roundWon = false;
    for (let i = 0; i < winCondition.length; i++) {
        let condition = winCondition[i];
        let cellA = options[condition[0]];
        let cellB = options[condition[1]];
        let cellC = options[condition[2]];

        if (cellA == '' || cellB == '' || cellC == '') {
            continue;
        }
        if (cellA == cellB && cellB == cellC) {
            roundWon = true;
            break;
        }
    }
    if (roundWon) {
        statusText.textContent = `${currentPlayer} wins!`;
        running = false;
    } else if (!options.includes('')) {
        statusText.textContent = 'Draw!';
        running = false;
    } else {
        changePlayer();
    }
}
function restartGame() {
    currentPlayer = 'X';
    options = ['', '', '', '', '', '', '', '', ''];
    statusText.textContent = `${currentPlayer}'s Turn`;
    cells.forEach(cell => cell.textContent = '');
    running = true;
}



