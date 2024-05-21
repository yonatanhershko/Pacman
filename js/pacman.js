'use strict'

const PACMAN = '<img src="pacman.gif"/>'
var gPacman

function createPacman(board) {
    // initialize gPacman...
    gPacman = {
        location: {
            i: 6,
            j: 6
        },
        isSuper: false,
        deg: 0
    }

    board[gPacman.location.i][gPacman.location.j] = PACMAN
}

function onMovePacman(ev) {
    if (!gGame.isOn) return

    // use getNextLocation(), nextCell
    var nextLocation = getNextLocation(ev)
    // console.log('nextLocation:', nextLocation)

    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    // console.log('nextCell:', nextCell)

    //  return if cannot move
    if (nextCell === WALL) return
    //  hitting a ghost? call gameOver
    if (nextCell === GHOST) {
        if (gPacman.isSuper) {
            killGhost(nextLocation)
        } else {
            gameOver()
            return
        }
    }

    if (nextCell === FOOD) {
        updateScore(1)
        gGame.foodCount--
        if (gGame.foodCount === 0) {
            console.log('win', gGame.foodCount)
            checkVictory()
        }
    }

    if (nextCell === SFOOD) {
        if(gPacman.isSuper){
            return
        }
        gPacman.isSuper = true
    
        // console.log('work',isSuper);
        setTimeout(() => {
            gPacman.isSuper = false
            resetGhost()
        }, 5000)
    }

    if (nextCell === Cherry) {
        updateScore(10)
        
    }

    // moving from current location:
    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    // update the DOM
    renderCell(gPacman.location, EMPTY)

    // Move the pacman to new location:
    // update the model
    gPacman.location = nextLocation
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN
    // update the DOM
    renderCell(gPacman.location, getPacmanHTML())
}

function getNextLocation(eventKeyboard) {
    const nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    switch (eventKeyboard.code) {
        case 'ArrowUp':
            gPacman.deg = -90
            nextLocation.i--
            break;
        case 'ArrowRight':
            gPacman.deg = 0
            nextLocation.j++
            break;
        case 'ArrowDown':
            gPacman.deg = 90
            nextLocation.i++
            break;
        case 'ArrowLeft':
            gPacman.deg = 180
            nextLocation.j--
            break;
    }
    return nextLocation
}

function getPacmanHTML() {
    return `<div style="transform: rotate(${gPacman.deg}deg)">${PACMAN}</div>`
}

