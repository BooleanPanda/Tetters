import React, {useState, createContext, useReducer, useEffect} from 'react';
import {canPieceBeMoved, pieceHasCollisions, lockPiece, rotatePiece, pieces} from './Active Piece';
export const GameContext = createContext();

export const GameProvider = (props) => {
    const [gameState, setGameState] = useState('intro');
    const [field,setField] = useState([
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0]
    ]);
    const [level,setLevel] = useState (0);
    const [score,setScore] = useState (0);
    const [lines,setLines] = useState (0);

    function clearLines () {
        const rows = 23;
        const columns = 10;
        let lns = [];

        for (let y = rows-1;y>=0; y--) {
            if (!(field[y].includes(0))) {
                lns.unshift(y);
            }
        };
        for (let index of lns) {
            field.splice(index,1);
            field.unshift(new Array(columns).fill(0));
        };
        if (lns.length>0) {
            setScore(score+lns.length*(10+level));
            setLines(lines+lns.length);
            setLevel(Math.floor(lines/10));
        }
    };
    function checkIfLost () {
        if (field[2].every((element)=> element===0)) {
            return false;
        } else {
            return true;
        }
    };

    function createPiece () {
        const index = Math.floor(Math.random()*7);
        return pieces[index];
    };

    const [nextPiece, setNextPiece] = useState(createPiece());
    const [pieceMediator,setPieceMediator] = useState();
    const [activePiece, activePieceDispatch] = useReducer(activePieceReducer, createPiece());
    function activePieceReducer (state,action) {
        switch(action.type) {
            case 'rotate' :
                return rotatePiece(state);
            case 'reset' :
                return createPiece ();
            case 'next' :
                return pieceMediator;
            default: 
                return state;
        };
    };

    const [activePiecePosition, activePositionDispatch] = useReducer(activePositionReducer, {y:0,x:3});
    function activePositionReducer (state,action) {
        switch(action.type) {
            case 'reset' :
                return {y:0,x:3};
            case 'rotate' :
                if(pieceHasCollisions(rotatePiece(activePiece),field,state)) {
                    activePieceDispatch({type:'rotate'});
                }
                return state;
            case 'moveLeft':
                if (canPieceBeMoved('left',activePiece,field,state)) {
                    return { ...state, x: state.x - 1 };
                }
                else {return state};
            case 'moveRight':
                if (canPieceBeMoved ('right',activePiece,field,state)) {
                    return { ...state, x: state.x + 1 };
                }
                else {return state};
            case 'moveDown':
                if (canPieceBeMoved ('down',activePiece,field,state)) {
                    return { ...state, y: state.y + 1 };
                }
                else {
                    lockPiece(activePiece,field,state);
                    if(checkIfLost()) {
                        setGameState('lost');
                    } else {
                        clearLines();
                        activePieceDispatch({type:'next'});
                        setPieceMediator(nextPiece);
                        setNextPiece(createPiece());
                        return {y:0,x:3};
                    }
                };
                break;
            default:
                return state;
        };
    };
    function handleKeyPress (event) {
        switch(event.keyCode) {
            case 65:
                activePositionDispatch({type:'moveLeft'});
                break;
            case 87:
                activePositionDispatch({type:'rotate'});
                break;
            case 68:
                activePositionDispatch({type:'moveRight'});
                break;
            case 83:
                activePositionDispatch({type:'moveDown'});
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        if(gameState==='game') {
            window.addEventListener('keydown',handleKeyPress);
            return () => {
                window.removeEventListener('keydown', handleKeyPress);
            }
        }
    },[gameState]);

    useEffect(() => {
        if(gameState==='game') {
            let moveDownTimer = setInterval(() => activePositionDispatch({type:'moveDown'}), (1000-level*50));
            return () => {
                clearInterval(moveDownTimer);
            }
        }
    },[gameState,level]);
    
    function reset () {
        setLevel(0);
        setScore(0);
        setLines(0);
        activePieceDispatch({type:'reset'});
        activePositionDispatch({type:'reset'});
        setNextPiece(createPiece());
        setField([
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0]
        ]);
        setGameState('game');
    };

    return (
        <GameContext.Provider 
            value={{
                gameState: [gameState, setGameState],
                field : field,
                level : level,
                score : score,
                lines : lines,
                activePiece : [activePiece,activePieceDispatch,activePieceReducer],
                activePiecePosition : [activePiecePosition, activePositionDispatch, activePositionReducer],
                nextPiece : nextPiece,
                reset: reset
            }}
        >
            {props.children}
        </GameContext.Provider>
    );
};