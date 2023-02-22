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
            tile.id = `${index_X}-${index_Y}`
            row.appendChild(tile)
            if (index_X === 3 && index_Y === 3) {
                let token = document.createElement("div")
                token.classList.add("token")
                token.style.backgroundColor = "white"
                tile.appendChild(token)
                board.grid[index_X][index_Y] = false
            } else if (index_X === 4 && index_Y === 4) {
                let token = document.createElement("div")
                token.classList.add("token")
                token.style.backgroundColor = "white"
                tile.appendChild(token)
                board.grid[index_X][index_Y] = false
            } if (index_X === 3 && index_Y === 4) {
                let token = document.createElement("div")
                token.classList.add("token")
                token.style.backgroundColor = "black"
                tile.appendChild(token)
                board.grid[index_X][index_Y] = true
            } else if (index_X === 4 && index_Y === 3) {
                let token = document.createElement("div")
                token.classList.add("token")
                token.style.backgroundColor = "black"
                tile.appendChild(token)
                board.grid[index_X][index_Y] = true
            }
        }
        gameBoard.appendChild(row)
    }
}

const player1TokenHolder = document.getElementById("player1-token-holder")
let player1TokenCount = 30
const player2TokenHolder = document.getElementById("player2-token-holder")
let player2TokenCount = 30
const fillTokens = () => {
    for (let index = 0; index < (player1TokenCount + player2TokenCount); index++) {
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
// isPlayer1 is a boolean that is essentially the token value
// true = black, false = white
const tokenClickDrag = (isPlayer1, token_in) => {
    let token;
    token = token_in
    let tokenHolder = token.parentElement
    let windowX = window.event.clientX
    let windowY = window.event.clientY
    token.classList.remove("token-sideways")
    token.classList.add("token")
    token.style.left = `${windowX - 35}px`
    token.style.top = `${windowY - 35}px`
    if (isPlayer1) {
        token.style.backgroundColor = "black"
    } else {
        token.style.backgroundColor = "white"
    }
    tokenHolder.removeChild(token)
    document.body.appendChild(token)
    const moveToken = () => {
        windowX = window.event.clientX
        windowY = window.event.clientY
        token.style.left = `${windowX - 35}px`
        token.style.top = `${windowY - 35}px`
    }
    document.body.addEventListener("mousemove", moveToken)
    document.body.addEventListener("mouseup", (event) => {
        document.body.removeEventListener("mousemove", moveToken)
        document.body.removeChild(token)
        let tokenSlot = document.elementFromPoint(windowX, windowY)
        if (tokenSlot.classList.contains("tile")) {
            console.log(tokenSlot)
            // UPDATE TOKEN ARRAY HERE
            let coordinates = tokenSlot.id
            let x = parseInt(coordinates[0])
            let y = parseInt(coordinates[2])
            board.grid[x][y] = isPlayer1
            renderBoard()
            turns++
        } else {
            console.log("Nope")
            token.classList.remove("token")
            token.classList.add("token-sideways")
            if (isPlayer1) {
                tokenHolder.appendChild(token)
            } else {
                tokenHolder.appendChild(token)
            }
            
        }
    }, {once: true})
}

player1TokenHolder.addEventListener("mousedown", (event) => {
    if (turns % 2 === 0) {
        isPlayer1 = true
    } else {
        isPlayer1 = false
    }
    console.log(event.target)
    console.log(player1TokenHolder)
    if (event.target != player1TokenHolder && event.target != player2TokenHolder) {
        tokenClickDrag(isPlayer1, event.target)
    }
})
player2TokenHolder.addEventListener("mousedown", (event) => {
    if (turns % 2 === 0) {
        isPlayer1 = true
    } else {
        isPlayer1 = false
    }
    console.log(event.target)
    console.log(player2TokenHolder)
    if (event.target != player1TokenHolder && event.target != player2TokenHolder) {
        tokenClickDrag(isPlayer1, event.target)
    }
})

const skipTurn = () => {
    popupConfirm("Are you sure you want to skip your turn?", () => { turns++} )
}

const renderBoard = () => {
    for (let index_Y = 0; index_Y < board.grid.length; index_Y++) {
        for (let index_X = 0; index_X < board.grid[index_Y].length; index_X++) {
            let tile = document.getElementById(`${index_X}-${index_Y}`)
            tile.innerHTML = ""
            if (board.grid[index_X][index_Y] === true) {
                let token = document.createElement("div")
                token.classList.add("token")
                token.style.backgroundColor = "black"
                tile.appendChild(token)
            } else if (board.grid[index_X][index_Y] === false) {
                let token = document.createElement("div")
                token.classList.add("token")
                token.style.backgroundColor = "white"
                tile.appendChild(token)
            }
        }
    }
}

// Flips the token at the given coordinates
// This function is all that should be needed to change the board state
// It updates the board.grid array and applies the animation to the token
// If necesarry it can be modified to not update the board.grid array
const flipToken = (x, y) => {
    let tile = document.getElementById(`${x}-${y}`)
    if (board.grid[x][y] === true) {
        tile.firstChild.style.animation = "token-black-flip-white 0.6s forwards"
    } else if (board.grid[x][y] === false) {
        tile.firstChild.style.animation = "token-white-flip-black 0.6s forwards"
    }
    board.grid[x][y] = !board.grid[x][y]
} 

// This function is only called from the console for developement purposes
// Applies the flipToken function to all tiles as a click event listener
const applyEventListeners = () => {
    for (let index_Y = 0; index_Y < board.grid.length; index_Y++) {
        for (let index_X = 0; index_X < board.grid[index_Y].length; index_X++) {
            let tile = document.getElementById(`${index_X}-${index_Y}`)
            if (tile.firstElementChild != null) {
                tile.firstChild.addEventListener("click", () => {
                    flipToken(index_X, index_Y)
                })
            }
        }
    }
}



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

/**
 * ai checks for which spot would capture the most tiles.
 * 
 * NOTE: currently does not check if board is full. check if game is over before calling this function, or add a check within.
*/
function aiTurn() {
    let bestX = 0
    let bestY = 0
    let bestCount = 0

    for (x = 0; x < board.grid.length; x++) {
        for (y = 0; y < board.grid.length; y++) {
            if (board.grid[x][y] === null) {
                let count = 0
                count += checkDiagonal(false, x, y, false, false)
                count += checkDiagonal(false, x, y, true, false)
                count += checkDiagonal(false, x, y, false, true)
                count += checkDiagonal(false, x, y, true, true)
                if(checkHorVertCapture(false, x, y) !== null) count += checkHorVertCapture(false, x, y).length
                if (count > bestCount) {
                    bestCount = count
                    bestX = x
                    bestY = y
                }
            }
        }
    }

    if (bestCount > 0) {
        //place tile
        board.grid[bestX][bestY] = false
        placeDiagonal(false, bestX, bestY)
        checkHorVertCapture(false, bestX, bestY)
        turns++
    } else {
        //no moves, skip turn
        turns++
    }
}

/**
 * Checks for horizontal and vertical captures on the board corresponding
 * to the position of a placed piece
 * 
 * @param { boolean } team
 * Should be true for player 1 and false for player 2
 * @param { int } row 
 * The row coordinate for the placed piece (x)
 * @param { int } col 
 * The column coordinate for the placed piece (y)
 * @returns { (Array<{ row: x, col: y }> | null) } 
 * Returns an array of captured pieces if a capture is found, 
 * if no capture is found, returns null
 */
function checkHorVertCapture(team, row, col) {
    // Not the position of the placed piece, the value of the placed piece my bad
    const placedPiece = team;

    // An array which holds all the captured pieces
    const capturedPieces = [];

    // Check all directions using step system (Horizontal and Vertical)
    const stepDirection = [
        { row: 0, col: -1 }, // Step towards the left (West)
        { row: 0, col: 1 }, // Step towards the right (East)
        { row: -1, col: 0 }, // Step up (North)
        { row: 1, col: 0 } // Step down (South)
    ];
    // Remember dumbass, negatives are left and down, positives are rights and ups (Personal note)

    // NOTE: this function looks like it will end early, as once it reaches a null tile or another of the same team when moving left, it will return. 
    // This may need to be changed. (June)

    for (const step of stepDirection) {
        // Steps once just to move off of the placed piece's position
        let r = row + step.row;
        let c = col + step.col;

        // While 'r' and 'c' are within the confines of the board grid, the following code is performed
        while (r >= 0 && r < board.grid.length 
            && c >= 0 && c < board.grid.length) {
            // Grab position of next piece
            const currentPiece = board.grid[r][c];

            // If 'currentPiece' is null, then just return null, no captured pieces
            if (currentPiece === null) {
                return null;
            }

            // If 'currentPiece' is same color/value of 'placedPiece', we have reached the end of the capture
            if (currentPiece === placedPiece) {
                return capturedPieces;
            }

            // Add the current piece to the captured pieces list
            capturedPieces.push({ row: r, col: c });

            // Take another step
            r += step.row;
            c += step.col;
        }
    }
}

/**
 * Flips pieces on the board according to an array with
 * coordinates of captured pieces
 * 
 * @param { Board } board 
 * A board class object
 * @param { { row: x, col: y } } capturedPieces 
 * An array with coordinates of captured pieces
 * @param { boolean } pieceValue 
 * The value/color of the piece you want to change captured pieces to
 */
function flipCapturedPieces(board, capturedPieces, pieceValue) {
    // Loop through all stored positions of captured pieces and change their color/value on the board
    capturedPieces.forEach(position => {
        board.grid[position.row][position.col] = pieceValue;
    });
}

window.onload = generateBoard()
window.onload = fillTokens()