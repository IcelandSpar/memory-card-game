import { useState } from 'react';

export function GameStartOptions({setGameOptions, setGameStarted, translateDiff, setGameOver}) {
    const [difficulty, setDifficulty] = useState('easy');
    const [cardType, setCardType] = useState('npcs');



    return (
        <form action="" className="game-start-opt-form">
            <h2>Choose Your options!</h2>

            <h3>Difficulty: {difficulty.slice(0, 1).toUpperCase() + difficulty.slice(1)} ({translateDiff(difficulty) + ' cards'})</h3>
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
            <h3>Type of Card: {cardType.slice(0, 1).toUpperCase() + cardType.slice(1)}</h3>
            <label htmlFor="type-of-card">
                <select name="type-of-card" id="type-of-card" onChange={(e) => {
                    e.preventDefault();
                    setCardType(e.target.value);
                }}>
                    <option value="npcs">NPCs</option>
                    <option value="bosses">Bosses</option>
                    <option value="spirits">Spirits</option>
                </select>
            </label>
            <button className="form-start-game-btn" onClick={(e) => {
                    e.preventDefault();
                    setGameOptions({
                        difficulty,
                        cardType,
                    })
                    setGameStarted(true)
                    setGameOver(false)
                }}>Traverse the mist</button>
        </form>
    )
}