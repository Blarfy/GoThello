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
            if (true) { //canPlace(isPlayer1, x, y)
                board.grid[x][y] = isPlayer1
                renderBoard()
                placeDiagonal(isPlayer1, x, y)
                placeHorVert(isPlayer1, x, y)
                turns++
            } else {
                console.log("Nope")
                token.classList.remove("token")
                token.classList.add("token-sideways")
                tokenHolder.appendChild(token)
            }
        } else {
            console.log("Nope")
            token.classList.remove("token")
            token.classList.add("token-sideways")
            tokenHolder.appendChild(token)
            
        }
    }, {once: true})
}

const canPlace = (isPlayer1, x, y) => {
    let count = checkDiagonal(isPlayer1, x, y, false, false)
    console.log(count + ": 1")
    count += checkDiagonal(isPlayer1, x, y, true, false)
    console.log(count + ": 2")
    count += checkDiagonal(isPlayer1, x, y, false, true)
    console.log(count + ": 3")
    count += checkDiagonal(isPlayer1, x, y, true, true)
    console.log(count + ": 4")
    count += checkHorVert(isPlayer1, x, y, null, false)
    console.log(count + ": 5")
    count += checkHorVert(isPlayer1, x, y, null, true)
    console.log(count + ": 6")
    count += checkHorVert(isPlayer1, x, y, false, null)
    console.log(count + ": 7")
    count += checkHorVert(isPlayer1, x, y, true, null)
    console.log(count + ": 8")


    if (count > 0) {
        return true
    } else {
        return false
    }
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
 * @returns {int}
 * returns the number of tiles captured
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
    for (i = 1; i <= loops; i++) {
        console.log("Diagonal -----------------")
        console.log("xPath: " + xPath)
        console.log("yPath: " + yPath)
        console.log("I: " + i)
        console.log("Loops: " + loops)
        if (board.grid[x + i * xPath][y + i * yPath] !== team && board.grid[x + i * xPath][y + i * yPath] !== null) {
            count++
        } else if (board.grid[x + i * xPath][y + i * yPath] === team) {
            capture = true
            console.log("CAPTURE")
            break
        } else break
    }
    if(capture) return count
    else return 0

}

/**
 * checks if there is a horizontal or vertical capture and returns the number of tiles captured
 * call this function four times each time with a different direction
 * do not call this function when placing a tile, use placeHorVert instead
 * 
 * @param {boolean} team
 * should be true for player 1 and false for player 2
 * @param {int} x
 * x coordinate of the placed tile
 * @param {int} y
 * y coordinate of the placed tile
 * @param {boolean | null} dirX
 * true for right, false for left and null for no direction
 * @param {boolean | null} dirY
 * true for down, false for up and null for no direction
 * @returns {int}
 * number of tiles captured
*/
function checkHorVert(team, x, y, dirX, dirY) {
    let xPath = 1
    let yPath = 1
    let loops = 0

    if (dirX === null) {
        if(!dirY) {
            yPath = -1
            loops = y
        } else loops = board.grid.length - y - 1
        let count = 0
        let capture = false
        for (i = 1; i <= loops; i++) {
            console.log("Vertical -----------------")
            console.log("xPath: " + xPath)
            console.log("yPath: " + yPath)
            console.log("I: " + i)
            console.log("Loops: " + loops)
            if (board.grid[x][y + i * yPath] !== team && board.grid[x][y + i * yPath] !== null) {
                count++
            } else if (board.grid[x][y + i * yPath] === team) {
                capture = true
                break
            } else break
        }
        if (capture) return count
        else return 0
    } else if (dirY === null) {
        if(!dirX) {
            xPath = -1
            loops = x
        } else loops = board.grid.length - x - 1
        let count = 0
        let capture = false
        for (i = 1; i <= loops; i++) {
            console.log("Horizontal -----------------")
            console.log("xPath: " + xPath)
            console.log("yPath: " + yPath)
            console.log("I: " + i)
            console.log("Loops: " + loops)
            if (board.grid[x + i * xPath][y] !== team && board.grid[x + i * xPath][y] !== null) {
                count++
            } else if (board.grid[x + i * xPath][y] === team) {
                capture = true
                break
            } else break
        }
        if (capture) return count
        else return 0
    }
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
            // board.grid[x - i][y - i] = team
            let adjust = i;
            setTimeout(() => {flipToken(x - adjust, y - adjust)}, 50 * i)
            
        }
    }

    if (countUR > 0) {
        for (i = 1; i <= countUR; i++) {
            // board.grid[x + i][y - i] = team
            let adjust = i;
            setTimeout(() => {flipToken(x + adjust, y - adjust)}, 50 * i)
        }
    }

    if (countDL > 0) {
        for (i = 1; i <= countDL; i++) {
            // board.grid[x - i][y + i] = team
            let adjust = i;
            setTimeout(() => {flipToken(x - adjust, y + adjust)}, 50 * i)
        }
    }

    if (countDR > 0) {
        for (i = 1; i <= countDR; i++) {
            // board.grid[x + i][y + i] = team
            let adjust = i;
            setTimeout(() => {flipToken(x + adjust, y + adjust)}, 50 * i)
        }
    }
}



//two-dimentional array
let array = [];

//8 rows
for (let i = 0; i < 8; i++) {
    array[i] = [];
    //8 columns
    for (let j = 0; j < 8; j++) {
    array[i][j] = false;
    }
}
// Set some values to true
array[1][1] = true;
array[2][0] = true;


let player1TotalTokens = 0;
let player2TotalTokens = 0;

  // Get a reference to the div element
// const start_container = document.getElementById('start_container');

  // Attach a click event listener to the div element
// start_container.addEventListener('click', function() {
//     // Call your function here
//     checkWin(array);
// });




// Print the array
// console.log(array);

function checkWin(array) {
    // Loop through the rows of the array
for (let i = 0; i < array.length; i++) {
    // Loop through the columns of the current row
    for (let j = 0; j < array[i].length; j++) {
      // Check if the current element is false
            if (array[i][j] === false) {
            player2TotalTokens++;
            } else {
                player1TotalTokens++;
            }
        }
    }
    console.log("player 1 total token(true/black)");
    console.log(player1TotalTokens);
    console.log("player 2 total token(white/black)");
    console.log(player2TotalTokens);
}


/**
 * checks for and places a horizontal or vertical capture
 * call this function when placing a tile
 * 
 * @param {boolean} team
 * should be true for player 1 and false for player 2
 * @param {int} x
 * x coordinate of the placed tile
 * @param {int} y
 * y coordinate of the placed tile
*/
function placeHorVert(team, x, y) {
    let countL = checkHorVert(team, x, y, null, false)
    let countR = checkHorVert(team, x, y, null, true)
    let countU = checkHorVert(team, x, y, false, null)
    let countD = checkHorVert(team, x, y, true, null)

    if (countL > 0) {
        for (i = 1; i <= countL; i++) {
            // board.grid[x][y - i] = team
            let adjust = i;
            setTimeout(() => {flipToken(x, y - adjust)}, 100 * i)
        }
    }

    if (countR > 0) {
        for (i = 1; i <= countR; i++) {
            // board.grid[x][y + i] = team
            let adjust = i;
            setTimeout(() => {flipToken(x, y + adjust)}, 100 * i)
        }
    }

    if (countU > 0) {
        for (i = 1; i <= countU; i++) {
            // board.grid[x - i][y] = team
            let adjust = i;
            setTimeout(() => {flipToken(x - adjust, y)}, 100 * i)
        }
    }

    if (countD > 0) {
        for (i = 1; i <= countD; i++) {
            // board.grid[x + i][y] = team
            let adjust = i;
            setTimeout(() => {flipToken(x + adjust, y)}, 100 * i)
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
    let randChance = 0.75

    for (x = 0; x < board.grid.length; x++) {
        for (y = 0; y < board.grid.length; y++) {
            if (board.grid[x][y] === null) {
                let count = 0
                count += checkDiagonal(false, x, y, false, false)
                count += checkDiagonal(false, x, y, true, false)
                count += checkDiagonal(false, x, y, false, true)
                count += checkDiagonal(false, x, y, true, true)
                count += checkHorVert(false, x, y, null, false)
                count += checkHorVert(false, x, y, null, true)
                count += checkHorVert(false, x, y, false, null)
                count += checkHorVert(false, x, y, true, null)
                if (count > bestCount) {
                    bestCount = count
                    bestX = x
                    bestY = y
                    randChance = 0.75
                } else if (count === bestCount) {
                    if (Math.random() > randChance) {
                        bestX = x
                        bestY = y
                    } else {
                        randChance -= 0.15
                    }
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

window.onload = generateBoard()
window.onload = fillTokens()