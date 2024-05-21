'use strict'

const WALL = '🧱'
const FOOD = '.'
const EMPTY = ''
const SFOOD = '🦸‍♂️'
const Cherry = '🥮'

//regular vars
var cherryInterval
var elBtn = document.querySelector('button')

const gGame = {
    score: 0,
    isOn: false,
    foodCount: 56
}
var gBoard


function onInit() {
    gBoard = buildBoard()
    createPacman(gBoard)
    createGhosts(gBoard)
    renderBoard(gBoard)
    cherryInterval = setInterval(addCherry, 15000)
    gGame.score = 0/// make it 0 at the start?
    gGame.isOn = true
    elBtn.style.display = 'none'
    gGame.foodCount = 56

}

function buildBoard() {
    const size = 10
    var board = []

    for (var i = 0; i < size; i++) {
        board.push([])

        for (var j = 0; j < size; j++) {
            board[i][j] = FOOD

            if (i === 0 || i === size - 1 ||
                j === 0 || j === size - 1 ||
                (j === 3 && i > 4 && i < size - 2)) {
                board[i][j] = WALL
            }
        }
    }



    board[1][8] = SFOOD
    board[1][1] = SFOOD
    board[8][1] = SFOOD
    board[8][8] = SFOOD
    console.log('board:', board)
    return board
}

function renderBoard(board) {
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {

            const cell = board[i][j]
            const className = `cell cell-${i}-${j}`

            strHTML += `<td class="${className}">${cell}</td>`
        }
        strHTML += '</tr>'
    }
    const elContainer = document.querySelector('.board')
    elContainer.innerHTML = strHTML
}

// location is an object like this - { i: 2, j: 7 } , ''
function renderCell(location, value) {
    // Select the elCell and set the value
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.innerHTML = value
}

function updateScore(diff) {
    // update model and dom
    gGame.score += diff
    document.querySelector('h2 span').innerText = gGame.score
}

function gameOver() {
    console.log('Game Over')
    gGame.isOn = false
    clearInterval(gIntervalGhosts)
    clearInterval(cherryInterval)
    renderCell(gPacman.location, EMPTY)
    elBtn.style.display = 'block'
    elBtn.innerText = 'Play Again?!'

}

function checkVictory() {
    console.log('win')
    gGame.isOn = false
    clearInterval(gIntervalGhosts)
    clearInterval(cherryInterval)
    // renderCell(gPacman.location, EMPTY)
    elBtn.style.display = 'block'
    elBtn.innerText = 'Victory!'

}


function addCherry() {
    var pos = findEmptyPos()
    if (!pos) return
    //modal
    gBoard[pos.i][pos.j] = Cherry// ?
    //dom
    renderCell(pos, Cherry)
}


function findEmptyPos() {
    var emptyPoss = []
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard.length; j++) {
            var cell = gBoard[i][j]
            if (cell === EMPTY) {
                var pos = { i: i, j: j }
                emptyPoss.push(pos)
            }
        }
    }

    var randIdx = getRandomIntInclusive(0, emptyPoss.length - 1)
    // console.log('randIdx:', randIdx)
    var randPos = emptyPoss[randIdx] //{}
    return randPos
}
