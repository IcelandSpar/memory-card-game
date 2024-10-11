import { useEffect, useState } from "react";
import gameOverGif from './game-over-gif.gif';
import victoryGif from './alb-victory-gif.gif';

export function Game({
  setGameOver,
  gameOver,
  eldenImages,
  setEldenImages,
  cardsSelected,
  setCardsSelected,
  setScore,
  score,
  highScore,
  setHighScore,
  gameOptions,
  translateDiff,
  setGameStarted,
}) {
    
    const [imgSrc, setImgSrc] = useState('')
    

    

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const url = `https://eldenring.fanapis.com/api/${gameOptions.cardType}?limit=${translateDiff(gameOptions.difficulty)}`;

    const response = await fetch(url);
    const json = await response.json();

    setEldenImages(json.data);

  };

  // const getGif = async () => {
  //   try {
  //     let response = await fetch('', {mode: 'no-cors'})
  //     let imgData = response;
  
  //       setImgSrc(imgData);
  //   } catch (error) {
  //     console.log(error)
  //   }

      
  // }

  // useEffect(() => {

  //   getGif();
  // }, [])



  const shuffleCards = () => {
    let newEldenObjArr = [...eldenImages];
    let shuffledArr = [];

    while (newEldenObjArr.length !== 0) {
      shuffledArr = [
        ...shuffledArr,
        ...newEldenObjArr.splice(
          Math.floor(Math.random() * newEldenObjArr.length - 1),
          1
        ),
      ];
    }


    setEldenImages(shuffledArr);
  };



  return (
    <>

      <div className={`game-over-modal ${gameOver || score ==  translateDiff(gameOptions.difficulty) ? "visible" : "hidden"} ${score == translateDiff(gameOptions.difficulty) ? 'victory-background' : null}`}>
        <img src={score == translateDiff(gameOptions.difficulty) ? victoryGif: gameOverGif} alt="elden gif" className='game-over-gif'/>
        <div className="game-over-modal-btns">
            <button
              onClick={(e) => {
                setScore(0);
                setGameOver((prev) => false);
                setCardsSelected((prev) => []);
              }}
            >
              Retry
            </button>
            <button onClick={(e) => {
                e.preventDefault();
                setGameStarted(false)
            }}>Change Settings</button>
        </div>
      </div>
      <section className="npc-cards-container">
        {eldenImages.map((npcInfo, index) => {
          return (
            <button
              key={index}
              className="npc-cards"
              onClick={(e) => {
                e.preventDefault();

                if (!cardsSelected.includes(`${npcInfo.name}`)) {
                  let cardsSelectedArr = [...cardsSelected];
                  setCardsSelected((prev) => [...prev, npcInfo.name]);
                  setScore((prev) => prev + 1);

                  shuffleCards();
                  console.log();
                }

                if (cardsSelected.includes(`${npcInfo.name}`)) {
                  score > highScore ? setHighScore((prevScore) => score) : null;
                  
                  setGameOver((prev) => true);
                }
              }}
            >
              <img
                src={npcInfo.image}
                alt={npcInfo.name}
                style={{
                  width: "100%",
                  height: "170px",
                  objectFit: "contain",
                  objectPosition: "center",
                }}
              />
              <p>{npcInfo.name}</p>
            </button>
          );
        })}
      </section>
    </>
  );
}
