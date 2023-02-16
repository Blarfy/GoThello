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

window.onload = generateBoard()
window.onload = fillTokens()