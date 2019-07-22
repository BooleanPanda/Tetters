import React, {useContext} from 'react';
import {GameContext} from './GameContext';
import {FieldPiece} from './Field';

function NextSection () {
    const {nextPiece, gameState} = useContext(GameContext);
    switch (gameState[0]) {
        case 'intro' :
            return (
                <div className="Next-Section">
                    <p className="Next-Label">Next piece</p>
                    <p className="Next-Intro">will be displayed right here</p>
                </div>
            )
        case 'game' :
            let size = 'Next-Piece-Container-'+nextPiece.length;
            return (
                <div className="Next-Section">
                    <p className="Next-Label">Next piece</p>
                    <div className={size}>
                        {nextPiece.map((item,y) => (
                            item.map((value,x) => 
                                <FieldPiece 
                                    id={`${y}${x}`}
                                    key={`${y}${x}`}
                                    value={value}
                                />)
                        ))}
                    </div>
                </div>
            )
        case 'lost' :
            return(
                <div className="Next-Section">
                    <p className="Next-Label">Next piece</p>
                    <p className="Next-Lost">will not appear bacuse you lost</p>
                </div>
            )
        default :
            throw new Error ('woooops, something is wrong with the game state :(');
    }
};

export default NextSection;