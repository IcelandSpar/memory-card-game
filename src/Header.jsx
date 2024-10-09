import { useEffect } from 'react'
import  eldenLogo  from './elden-ring-logo.png'

export function Header({score, highScore}) {


    return (
        <header className='header'>
            <img src={eldenLogo} alt="Elden Ring Logo" width='400px'/>
            <h1>Memory Game</h1>
            <div className='score-board'>
                <p>Score: {score}</p>
                <p>Personal Best: {highScore}</p>
            </div>
        </header>
    )
}