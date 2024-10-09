import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Header } from './Header.jsx'

function App() {
  const [eldenImages, setEldenImages] = useState([]);
  const [score, setScore] = useState(0);
  const [highScore, sethighScore] = useState(0);
  const [cardsSelected, setCardsSelected] = useState([]);



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
    <Header score={score} highScore={highScore}/>
      <section className='npc-cards-container'>
        {eldenImages.map((npcInfo, index) => {
          return (<button key={index} className='npc-cards' onClick={(e) => {
            e.preventDefault()


            if(!cardsSelected.includes(`${npcInfo.name}`)) {
              let cardsSelectedArr = [...cardsSelected]
              setCardsSelected(prev => [...prev, npcInfo.name])
              setScore(prevScore => cardsSelectedArr.length)
              shuffleCards()
              console.log(score)
            }


          }}>
            
            <img src={npcInfo.image} alt={npcInfo.name} style={{width: '300px', height:'160px', objectFit: 'contain', objectPosition: 'center'}} />
            <p>{npcInfo.name}</p>
          </button>)
        })}
      </section>
    </>
  )
}

export default App
