import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Header } from './Header.jsx'
import gameOver from './game-over.png';

function App() {
  const [eldenImages, setEldenImages] = useState([]);
  const [score, setScore] = useState(0);
  const [highScore, sethighScore] = useState(0);
  const [cardsSelected, setCardsSelected] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  let gameOverModal = document.querySelector('.game-over-modal');

useEffect(() => {

  getData()
}, []);



const getData = async () => {
  const url = 'https://eldenring.fanapis.com/api/npcs?limit=20';

  const response = await fetch(url);
  const json = await response.json();
  
  setEldenImages(json.data)
  console.log(eldenImages)
}

const shuffleCards = () => {

  

  let newEldenObjArr = [...eldenImages];
  let shuffledArr = [];

  while(newEldenObjArr.length !== 0) {
    shuffledArr = [...shuffledArr, ...newEldenObjArr.splice((Math.floor(Math.random() * newEldenObjArr.length - 1)), 1)]
  }

  console.log(newEldenObjArr)
  console.log(shuffledArr)
  setEldenImages(shuffledArr)
}


  return (
    <>
      <div className={`game-over-modal ${gameOver ? 'visible' : 'hidden'}`}  >
        <button onClick={(e) => {
          setGameOver(prev => false);
          setCardsSelected(prev => []);
          
        }}>Retry</button>
      </div>
    <Header score={score} highScore={highScore}/>

      <section className='npc-cards-container'>
        {eldenImages.map((npcInfo, index) => {
          return (<button key={index} className='npc-cards' onClick={(e) => {
            e.preventDefault()




            if(!cardsSelected.includes(`${npcInfo.name}`)) {
              let cardsSelectedArr = [...cardsSelected]
              setCardsSelected(prev => [...prev, npcInfo.name])
              setScore(prev => prev + 1)
              
              shuffleCards()
              console.log()
            }

            if(cardsSelected.includes(`${npcInfo.name}`)) {
              score > highScore ? sethighScore((prevScore) => score) : null;
              setScore(0)
              setGameOver(prev => true);
            }
            

          }}>
            
            <img src={npcInfo.image} alt={npcInfo.name} style={{width: '100%', height:'170px', objectFit: 'contain', objectPosition: 'center'}} />
            <p>{npcInfo.name}</p>
          </button>)
        })}
      </section>
    </>
  )
}

export default App
