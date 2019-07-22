import React, { useContext } from 'react';
import {GameContext} from './GameContext';
import {formView} from './formView';

function FieldSection () {
    const {field, activePiece, activePiecePosition, gameState, reset} = useContext(GameContext);
    function startGame () {
        gameState[1]('game');
    }
    switch (gameState[0]) {
        case 'intro' :
            let title = "< Tetters />";
            return (
                <div className="Intro-Section">
                    <div className="Intro-Portrait"></div>
                    <div className="Intro-Top">
                        <h2>Oh, hello there!</h2>
                        <p>Welcome to the game of {title}<span>*</span></p>
                    </div>
                    <div className="Intro-Mid">
                        <div className="Intro-Mid-Button" onClick={()=> startGame()}>Click here to start</div>
                    </div>
                    <div className="Intro-Bottom">
                        <div className="FAQ">
                            <span>?</span>
                            <p>
                                This game was made by a pleb, so don't get angry if you find any bugs. Thanks for trying it out, I appreciate it.
                            </p>
                            <p>
                                By the way, bugs can be reported... nowhere, I guess, as they are unlikely to be fixed anyway.
                            </p>
                        </div>
                    </div>
                    <div className="Intro-Add">
                            <p>Any resemblence to existing games is purely coincidential.</p>
                            <span>*</span>
                    </div>
                </div>
            )
        case 'game' :
            let view = formView(activePiece, activePiecePosition, field);
            return ( 
                <div className="Field-Section" id="Field">
                    {view.filter((item,index)=>index>2)
                        .map((item,y) => (
                        item.map((value,x) => 
                            <FieldPiece 
                                id={`${y}${x}`}
                                key={`${y}${x}`}
                                value={value}
                            />)
                    ))}
                </div>
            )
        case 'lost' :
            return ( 
                <div className="Lost-Section">
                    <div className="Lost-Top">
                        <div className="Lost-Portrait"></div>
                        <h2>Seems like you lost</h2>
                        <p>Better luck next time!</p>
                        <div className="Restart-Button" onClick={()=> reset()}>Try again </div>
                    </div>
                    <div className="Lost-Bottom">
                        <p>Leaderboard and scores storage are not implemented. To share your results take a screenshot.</p>
                        <div className="Okay-Portrait"></div>
                    </div>
                </div>
            )
        default :
            throw new Error('woooops, something is wrong with the game state :(');
    }
};

export const FieldPiece = (props) => {
    let value = props.value;
    let color = '';
    switch (value) {
        case 1:
            color = 'one';
            break;
        case 2:
            color = 'two';
            break;
        case 3:
            color = 'three';
            break;
        case 4:
            color = 'four';
            break;
        case 5:
            color = 'five';
            break;
        case 6:
            color = 'six';
            break;
        case 7:
            color = 'seven';
            break;
        default:
            color = 'zero';
            break;
    }
    return (
        <div 
            className={color}
            id={props.id}
        >
        
        </div>
    )
};
export default FieldSection;