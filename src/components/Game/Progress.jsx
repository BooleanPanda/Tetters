import React, { useContext } from 'react';
import {GameContext} from './GameContext';

function ProgressSection () {
    return (
        <div className="Progress-Section">
            <LevelSection />
            <ScoreSection />
            <LinesSection />
        </div>
    )
};

function LevelSection () {
    const {level} = useContext(GameContext);
    return (
        <div className="Level-Section Progress-Subsection">
            <p>Level</p>
            <p>{level}</p>
        </div>
    )
};

function ScoreSection () {
    const {score} = useContext(GameContext);
    return (
        <div className="Score-Section Progress-Subsection">
            <p>Score</p>
            <p>{score}</p>
        </div>
    )
};

function LinesSection () {
    const {lines} = useContext(GameContext);
    return (
        <div className="Lines-Section Progress-Subsection">
            <p>Lines</p>
            <p>{lines}</p>
        </div>
    )
};


export default ProgressSection;