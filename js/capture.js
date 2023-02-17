// Sorry for bad function name
function checkHorVertCapture(board, row, col) {
    // Grab position of the placed piece
    const placedPiece = board[row][col];

    // Check all directions using step system (Horizontal and Vertical)
    const stepDirection = [
        { row: 0, col: -1 }, // Step towards the left (West)
        { row: 0, col: 1 }, // Step towards the right (East)
        { row: -1, col: 0 }, // Step up (North)
        { row: 1, col: 0 } // Step down (South)
    ];
    // Remember dumbass, negatives are left and down, positives are rights and ups

    for (const step of stepDirection) {
        // An array which holds all the captured pieces
        const capturedPieces = [];

        // Steps once just to move off of the placePiece's position
        let r = row + step.row;
        let c = col + step.col;

        // While 'r' and 'c' are within the confines of the board grid, the following code is performed
        while (r >= 0 && r < board.grid.length 
            && c >= 0 && c < board.grid.length) {
            // Grab position of next piece
            const currentPiece = board.grid[r][c];

            // If 'currentPiece' is null, then just break the loop, no captured pieces
            if (currentPiece === null) {
                break;
            }

            // If 'currentPiece' is same color/value of 'placedPiece', we have reached the end of the capture
            if (currentPiece === placedPiece) {
                // Loop through all stored positions of captured pieces and change their color/value on the board
                capturedPieces.forEach(position => {
                    board.grid[position.row][position.col] = placedPiece;
                });
                break;
            }

            // Add the current piece to the captured pieces list
            capturedPieces.push({ row: r, col: c });

            // Take another step
            r += step.row;
            c += step.col;
        }
    }
}