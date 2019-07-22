export const canPieceBeMoved = (direction,activePiece,field,state) => {
    switch(direction) {
        case 'left': 
            for (let y = 0; y < activePiece.length; y++) {
                for (let x = 0; x < activePiece[y].length; x++) {
                    if (activePiece[y][x] && (field[state.y+y][state.x+x-1] === undefined || field[state.y+y][state.x+x-1]!==0)) {
                        return false;
                    }
                }
            } return true;
        case 'right': 
            for (let y = 0; y < activePiece.length; y++) {
                for (let x = 0; x < activePiece[y].length; x++) {
                    if (activePiece[y][x] && (field[state.y+y][state.x+x+1] === undefined || field[state.y+y][state.x+x+1]!==0)) {
                        return false;
                    }
                }
            } return true;
        case 'down':
            for (let y = 0; y < activePiece.length; y++) {
                for (let x = 0; x < activePiece[y].length; x++) {
                    if (activePiece[y][x] && (field[state.y+y+1] === undefined || field[state.y+y+1][state.x+x]!==0)) {
                        return false;
                    }
                }
            } return true;
        default: return true;
    }
};
export const pieceHasCollisions = (temp,field,state) => {
    for (let y = 0; y < temp.length; y++) {
        for (let x = 0; x < temp[y].length; x++) {
            if (temp[y][x] && (field[state.y+y] === undefined || field[state.y+y][state.x+x]!==0)) {
                return false;
            }
        }
    } return true;
};
export const lockPiece = (activePiece,field,state) => {
    for (let y = 0; y < activePiece.length; y++) {
        for (let x = 0; x < activePiece[y].length; x++) {
            if (activePiece[y][x]) {
                field[state.y+y][state.x+x] = activePiece[y][x];
            }
        }
    }
};
export const rotatePiece = (state) => {
    let length = state.length;
    let temp = [];
    for (let i=0; i<length; i ++) {
        temp[i] = new Array(length).fill(0);
    };
    for (let y = 0; y < length; y++) {
        for (let x = 0; x < length; x++) {
            temp[x][y] = state[length - 1 - y][x];
        }
    }
    return temp;
};
export const pieces = [
    [
        [0,1,0],
        [1,1,1],
        [0,0,0],
    ],
    [
        [0,0,0,0],
        [2,2,2,2],
        [0,0,0,0],
        [0,0,0,0]
    ],
    [
        [0,0,0],
        [3,3,3],
        [0,0,3],
    ],
    [
        [0,0,0],
        [4,4,4],
        [4,0,0],
    ],
    [
        [0,0,0,0],
        [0,5,5,0],
        [0,5,5,0],
        [0,0,0,0]
    ],
    [
        [0,0,0],
        [0,6,6],
        [6,6,0],
    ],
    [
        [0,0,0],
        [7,7,0],
        [0,7,7],
    ]
];