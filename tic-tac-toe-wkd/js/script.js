/*----- constants -----*/

// const colors = null;

const playerOne = 'x';
const playerTwo = 'circle';

const winning_combos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
const cellEl = document.querySelectorAll('[data]');
const board = document.getElementById('board');
const winningMessageEl = document.getElementById('winningMessage')
const winningMessageText = document.querySelector('[data-winning-message-text]')
let circleTurn;

startGame();

//check for win
//check for draw

//init click- determine turn, place x||o, check for win or draw

function startGame () {
    circleTurn = false;
    cellEl.forEach(cell => {
        cell.addEventListener('click', handleClick, {once : true})
        })
    setBoardHover()
    }

function handleClick(e) {
    // console.log('clicked')
    const cell = e.target
    const currentClass = circleTurn ? playerTwo : playerOne
    placePiece(cell, currentClass)
    if(checkWin(currentClass)) {
        endGame(false)
    } else if (isDraw()) {
        endGame(true)
    } else {
        switchTurn()
        setBoardHover()
    }

}

function endGame(draw) {
    if (draw) {
        winningMessageEl.innerText = "Draw!"
    } else {
        winningMessageText.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
    }
    winningMessageEl.classList.add('show')
 }

function isDraw() {
    return [...cellEl].every(cell => {
        return cellEl.classList.contains(playerOne) || 
        cellEl.classList.contains(playerTwo)
    })
}

//place the mark
function placePiece(cell, currentClass) {
cell.classList.add(currentClass)
}

//switch turns
function switchTurn() {
    circleTurn = !circleTurn
}

function setBoardHover() {
    board.classList.remove(playerOne)
    board.classList.remove(playerTwo)
    if (circleTurn) {
        board.classList.add(playerTwo)
}    else {
    board.classList.add(playerOne)
    }
}

function checkWin(currentClass) {
    return winning_combos.some(combos => {
        return combos.every(idx => {
            return cellEl[idx].classList.contains(currentClass)
        })
    })
}
