const gameBoard = document.getElementById("game-board")

let board = new Board();
let turns = 0;

const generateBoard = () => {
    for (let index_Y = 0; index_Y < board.grid.length; index_Y++) {
        let row = document.createElement("div")
        row.classList.add("boardRow")
        for (let index_X = 0; index_X < board.grid[index_Y].length; index_X++) {
            let tile = document.createElement("div")
            tile.classList.add("tile")
            // tile.ondrop = (event) => {
            //     console.log(event.target)
            // }
            tile.id = `${index_X}-${index_Y}`
            row.appendChild(tile)
        }
        gameBoard.appendChild(row)
    }
}

const player1TokenHolder = document.getElementById("player1-token-holder")
let player1TokenCount = 32
const player2TokenHolder = document.getElementById("player2-token-holder")
let player2TokenCount = 32
const fillTokens = () => {
    for (let index = 0; index < (board.grid.length * board.grid[0].length); index++) {
        let token = document.createElement("div")
        token.classList.add("token-sideways")
        if (index % 2 === 0) {
            token.id = index
            player1TokenHolder.appendChild(token)
        } else {
            token.id = index
            player2TokenHolder.appendChild(token)
        }
        console.log(index)
    }
}

// This function alternates between player 1 and player 2
// Should add a check to see if the player can make a move
// If not, the turn should be skipped, turn++
// Should also add a check to see if the player has any tokens left
// If not, have them take tokens from the other players holder
const tokenClickDrag = (isPlayer1) => {
    let token;
    if (isPlayer1) {
        token = player1TokenHolder.firstElementChild
    } else {
        token = player2TokenHolder.firstElementChild
    }
    console.log(token)
    let windowX = window.event.clientX
    let windowY = window.event.clientY
    token.classList.remove("token-sideways")
    token.classList.add("token")
    token.style.left = `${windowX - 35}px`
    token.style.top = `${windowY - 35}px`
    if (isPlayer1) {
        token.style.backgroundColor = "black"
        player1TokenHolder.removeChild(token)
    } else {
        token.style.backgroundColor = "white"
        player2TokenHolder.removeChild(token)
    }
    document.body.appendChild(token)
    const moveToken = () => {
        windowX = window.event.clientX
        windowY = window.event.clientY
        token.style.left = `${windowX - 35}px`
        token.style.top = `${windowY - 35}px`
    }
    token.addEventListener("mousemove", moveToken)
    document.body.addEventListener("mouseup", (event) => {
        token.removeEventListener("mousemove", moveToken)
        document.body.removeChild(token)
        let tokenSlot = document.elementFromPoint(windowX, windowY)
        if (tokenSlot.classList.contains("tile")) {
            console.log(tokenSlot)
            tokenSlot.appendChild(token)
            token.style.position = "static"
            if (isPlayer1) {
                player1TokenCount--
            } else {
                player2TokenCount--
            }
            turns++
        } else {
            console.log("Nope")
            token.classList.remove("token")
            token.classList.add("token-sideways")
            if (isPlayer1) {
                player1TokenHolder.appendChild(token)
            } else {
                player2TokenHolder.appendChild(token)
            }
            
        }
    }, {once: true})
}

player1TokenHolder.addEventListener("mousedown", () => {
    if (turns % 2 === 0) {
        isPlayer1 = true
    } else {
        isPlayer1 = false
    }
    tokenClickDrag(isPlayer1)
})
player2TokenHolder.addEventListener("mousedown", () => {
    if (turns % 2 === 0) {
        isPlayer1 = true
    } else {
        isPlayer1 = false
    }
    tokenClickDrag(isPlayer1)
})


/**
 * checks if there is a diagonal capture and returns the number of tiles captured
 * call this function four times each time with a different direction
 * do not call this function when placing a tile, use placeDiagonal instead
 * 
 * @param {boolean} team 
 * should be true for player 1 and false for player 2
 * @param {int} x
 * x coordinate of the placed tile 
 * @param {int} y
 * y coordinate of the placed tile 
 * @param {boolean} dirX
 * true for right and false for left 
 * @param {boolean} dirY 
 * true for down and false for up
 */
function checkDiagonal(team, x, y, dirX, dirY) {
    let xPath = 1
    let yPath = 1

    let xLoops = 0
    if(!dirX) {
        xPath = -1
        xLoops = x
    } else xLoops = board.grid.length - x - 1

    let yLoops = 0
    if(!dirY) {
        yPath = -1
        yLoops = y
    } else yLoops = board.grid.length - y - 1

    let loops = xLoops
    if (yLoops < xLoops) loops = yLoops

    let count = 0
    let capture = false
    for (i = 1; i < loops; i++) {
        if (board.grid[x + i * xPath][y + i * yPath] !== team && board.grid[x + i * xPath][y + i * yPath] !== null) {
            count++
        } else if (board.grid[x + i * xPath][y + i * yPath] === team) {
            capture = true
            break
        } else break
    }
    if(capture) return count
    else return 0

}

/**
 * checks for and places a diagonal capture
 * call this function when placing a tile
 * 
 * @param {boolean} team
 * should be true for player 1 and false for player 2
 * @param {int} x
 * x coordinate of the placed tile
 * @param {int} y
 * y coordinate of the placed tile
*/
function placeDiagonal(team, x, y) {
    let countUL = checkDiagonal(team, x, y, false, false)
    let countUR = checkDiagonal(team, x, y, true, false)
    let countDL = checkDiagonal(team, x, y, false, true)
    let countDR = checkDiagonal(team, x, y, true, true)

    if (countUL > 0) {
        for (i = 1; i <= countUL; i++) {
            board.grid[x - i][y - i] = team
        }
    }

    if (countUR > 0) {
        for (i = 1; i <= countUR; i++) {
            board.grid[x + i][y - i] = team
        }
    }

    if (countDL > 0) {
        for (i = 1; i <= countDL; i++) {
            board.grid[x - i][y + i] = team
        }
    }

    if (countDR > 0) {
        for (i = 1; i <= countDR; i++) {
            board.grid[x + i][y + i] = team
        }
    }
 }

window.onload = generateBoard()
window.onload = fillTokens()