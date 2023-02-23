const gameBoard = document.getElementById("game-board")

let board = new Board();

const generateBoard = () => {
    for (let index_Y = 0; index_Y < board.grid.length; index_Y++) {
        let row = document.createElement("div")
        row.classList.add("boardRow")
        for (let index_X = 0; index_X < board.grid[index_Y].length; index_X++) {
            let tile = document.createElement("div")
            tile.classList.add("tile")
            tile.id = `${index_X}-${index_Y}`
            row.appendChild(tile)
        }
        gameBoard.appendChild(row)
    }
}

const fillTokens = () => {
    const player1TokenHolder = document.getElementById("player1-token-holder")
    const player2TokenHolder = document.getElementById("player2-token-holder")
    for (let index = 0; index < (board.grid.length * board.grid[0].length); index++) {
        let token = document.createElement("div")
        token.classList.add("token-sideways")
        if (index % 2 === 0) {
            player1TokenHolder.appendChild(token)
        } else {
            player2TokenHolder.appendChild(token)
        }
        console.log(index)
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
const start_container = document.getElementById('start_container');

  // Attach a click event listener to the div element
start_container.addEventListener('click', function() {
    // Call your function here
    checkWin(array);
});




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


window.onload = generateBoard()
window.onload = fillTokens()