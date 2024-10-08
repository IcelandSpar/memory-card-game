import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [eldenImages, setEldenImages] = useState([]);



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
      <section className='npc-cards-container' onClick={shuffleCards}>
        {eldenImages.map((npcInfo, index) => {
          return (<button key={index} className='npc-cards' >
            
            <img src={npcInfo.image} alt={npcInfo.name} style={{width: '300px', height:'160px', objectFit: 'contain', objectPosition: 'center'}}/>
            <p>{npcInfo.name}</p>
          </button>)
        })}
      </section>
    </>
  )
}

export default App
