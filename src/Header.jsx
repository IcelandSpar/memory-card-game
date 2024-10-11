import { useEffect } from 'react'
import  eldenLogo  from './elden-ring-logo.png';
import { ScoreBoard } from './ScoreBoard';

export function Header({score, highScore, gameStarted}) {


    return (
        <header className='header'>
            <img src={eldenLogo} alt="Elden Ring Logo" width='400px'/>
            <h1>Memory Game</h1>
            {gameStarted ? <ScoreBoard score={score} highScore={highScore}/> : null}

        </header>
    )
}