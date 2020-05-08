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
const board = document.getElementById('gameboard');
const winningMessageEl = document.getElementById('winningMessage')
const restart = document.getElementById('restartButton')
const winningMessageText = document.querySelector('[data-winning-message-text]')
let circleTurn;

startGame();

restart.addEventListener('click', startGame)

//init click- determine turn, place x||o, check for win or draw, show msg, and restart
function startGame () {
    circleTurn = false;
    cellEl.forEach(cell => {
        cell.classList.remove(playerOne)
        cell.classList.remove(playerTwo)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, {once : true})
        })
    setBoardHover()
    winningMessageEl.classList.remove('show')
    }

function handleClick(e) {
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

//display win or draw
function endGame(draw) {
    if (draw) {
        winningMessageText.innerText = 'Draw!'
    } else {
        winningMessageText.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
    }
    winningMessageEl.classList.add('show')
 }

 
function isDraw() {
    return [...cellEl].every(cell => {
        return cell.classList.contains(playerOne) || 
        cell.classList.contains(playerTwo)
    })
}

//place current player's x or o in cell
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

//check array for win
function checkWin(currentClass) {
    return winning_combos.some(combos => {
        return combos.every(idx => {
            return cellEl[idx].classList.contains(currentClass)
        })
    })
}
