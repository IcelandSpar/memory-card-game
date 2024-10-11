import { useState } from 'react';

export function GameStartOptions({gameOptions, setGameOptions, setGameStarted}) {
    const [difficulty, setDifficulty] = useState('easy');
    const [cardType, setCardType] = useState('npcs');



    return (
        <form action="" className="game-start-opt-form">
            <h2>Choose Your options!</h2>

            <h3>Difficulty</h3>
            <div className="difficulty-btns">
                <button onClick={(e) => {
                    e.preventDefault();
                    setDifficulty('easy')
                }}>Easy</button>
                <button onClick={(e) => {
                    e.preventDefault();
                    setDifficulty('medium');
                }}>Medium</button>
                <button onClick={(e) => {
                    e.preventDefault();
                    setDifficulty('hard');
                }}>Hard</button>
            </div>
            <h3>Type of Card</h3>
            <label htmlFor="type-of-card">
                <select name="type-of-card" id="type-of-card" onChange={(e) => {
                    e.preventDefault();
                    setCardType(e.target.value);
                }}>
                    <option value="npcs">NPCs</option>
                    <option value="bosses">Bosses</option>
                </select>
            </label>
            <button className="form-start-game-btn" onClick={(e) => {
                    e.preventDefault();
                    setGameOptions({
                        difficulty,
                        cardType,
                    })
                    setGameStarted(true)
                }}>Start Game!</button>
        </form>
    )
}