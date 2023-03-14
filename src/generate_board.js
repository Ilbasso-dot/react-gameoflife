



function generateZeroBoard(index1,index2) {
    // generate a board index1 x index2 filled with 0s
    let board = [];
    for (let i = 0; i < index1; i++) {
        board.push([]);
        for (let j = 0; j < index2; j++) {
            board[i].push(0);
        }
    }
    return board;
}

function generateBoard(index1,index2) {
    let board = generateZeroBoard(index1,index2);
    let probability = 0.5; // probability of 1
    // fill the board with 1s and 0s random generated
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            board[i][j] = Math.round(Math.random()-(0.5-probability));
        }
    }
    return board;
}

function countNeighbors(board,i,j) {
    // count the number of neighbors of a cell
    let neighbors = 0;
    for (let k = -1; k <= 1; k++) {
        for (let l = -1; l <= 1; l++) {
            if (k === 0 && l === 0) {
                continue;
            }
            if (board[i+k] !== undefined && board[i+k][j+l] !== undefined) {
                neighbors += board[i+k][j+l];
            }
        }
    }
    return neighbors;
}


function nextIt(board) {
    // for every cell, count the number of neighbors
    // if the cell is alive, and has 2 or 3 neighbors, it stays alive
    // if the cell is dead, and has 3 neighbors, it becomes alive
    // otherwise, it dies
    let newBoard = generateZeroBoard(board.length,board[0].length);
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            let neighbors = countNeighbors(board,i,j);
            if (board[i][j] === 1) {
                if (neighbors === 2 || neighbors === 3) {
                    newBoard[i][j] = 1;
                }
            } else {
                if (neighbors === 3) {
                    newBoard[i][j] = 1;
                }
            }
        }
    }
    return newBoard;
}

function printGrid(board) {
    for (let i = 0; i < board.length; i++) {
        for(let k = 0; k < board[i].length; k++) {
            console.log(board[i][k]);
        }
        console.log('\n');
    }
}

let board = generateBoard(4,10);
console.log(board);
console.log(nextIt(board));

// export generateBoard;
export {generateBoard, nextIt};

