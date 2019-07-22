import React, {useContext} from 'react';
import {GameContext} from './GameContext';

function ControlsSection () {
    return (
        <div className="Controls-Section">
            <p className="Controls-Label">Controls</p>
            <div className="Controls-Container">
                <span className="eye"></span>
                <MoveLeftButton/>
                <MoveRightButton />
                <MoveDownButton />
                <RotateRightButton />
            </div>
        </div>
    )
};

function MoveLeftButton () {
    const {activePiecePosition, gameState} = useContext(GameContext);
    return (
        <div className="Button" id="Left-Button" onClick={()=> {if(gameState[0]==='game'){activePiecePosition[1]({type:'moveLeft'})}}}>
            <span className="Button-Title">Left</span>
            <span id="Button-Key">A</span>
        </div>
    )
};
function MoveRightButton () {
    const {activePiecePosition, gameState} = useContext(GameContext);
    return (
        <div className="Button" id="Right-Button" onClick={()=> {if(gameState[0]==='game'){activePiecePosition[1]({type:'moveRight'})}}}>
            <span className="Button-Title">Right</span>
            <span id="Button-Key">D</span>
        </div>
    )
};
function MoveDownButton () {
    const {activePiecePosition, gameState} = useContext(GameContext);
    return (
        <div className="Button" id="Down-Button" onClick={()=> {if(gameState[0]==='game'){activePiecePosition[1]({type:'moveDown'})}}}>
            <span className="Button-Title">Down</span>
            <span id="Button-Key">S</span>
        </div>
    )
};
function RotateRightButton () {
    const  {activePiecePosition, gameState} = useContext(GameContext);
    return (
        <div className="Button" id="Rotate-Button" onClick={()=> {if(gameState[0]==='game'){activePiecePosition[1]({type:'rotate'})}}}>
            <span className="Button-Title">Rotate</span>
            <span id="Button-Key">W</span>
         </div>
    )
};
export default ControlsSection;