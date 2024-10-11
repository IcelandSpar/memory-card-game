export function ScoreBoard({score, highScore}) {
    return (
    <div className='score-board'>
        <p>Score: {score}</p>
        <p>Personal Best: {highScore}</p>
    </div>
    )
}