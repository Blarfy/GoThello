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

window.onload = generateBoard()
window.onload = fillTokens()