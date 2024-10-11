import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Header } from "./Header.jsx";
import { Game } from "./Game.jsx";
import gameOver from "./game-over.png";
import { GameStartOptions } from "./GameStartOptions.jsx";

function App() {
  const [eldenImages, setEldenImages] = useState([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [cardsSelected, setCardsSelected] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOptions, setGameOptions] = useState({
    difficulty: 'easy',
    cardType: 'npcs',
  })

  const translateDiff = (difficulty) => {
    if(difficulty == 'easy') {
        return '10'
    } else if (difficulty == 'medium') {
        return '20'
    } else {
        return '30'
    }
  }

  let gameOverModal = document.querySelector(".game-over-modal");

  return (
    <>
      <Header score={score} highScore={highScore} gameStarted={gameStarted} />
      {gameStarted ? (
        <Game
          setGameOver={setGameOver}
          gameOver={gameOver}
          eldenImages={eldenImages}
          setEldenImages={setEldenImages}
          setCardsSelected={setCardsSelected}
          cardsSelected={cardsSelected}
          setScore={setScore}
          score={score}
          highScore={highScore}
          setHighScore={setHighScore}
          gameOptions={gameOptions}
          translateDiff={translateDiff}
          setGameStarted={setGameStarted}
        />
      ) : <GameStartOptions setGameOptions={setGameOptions} setGameStarted={setGameStarted} translateDiff={translateDiff} setGameOver={setGameOver}/>}
    </>
  );
}

export default App;
