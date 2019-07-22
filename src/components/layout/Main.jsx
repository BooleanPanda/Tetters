import React from 'react';
import {GameProvider} from './../Game/GameContext';
import NextSection from '../Game/Next';
import FieldSection from '../Game/Field';
import ProgressSection from '../Game/Progress';
import ControlsSection from '../Game/Controls';


function Main () {
    return (
        <GameProvider>
            <main className="Main">
                    <FieldSection />
                <div className="Section-Right">
                    <NextSection />
                    <ProgressSection />
                    <ControlsSection />
                </div>
            </main>
        </GameProvider>
    )
};

export default Main;