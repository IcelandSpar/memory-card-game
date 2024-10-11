import { useEffect } from "react";

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
  gameOptions
}) {

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const url = `https://eldenring.fanapis.com/api/${gameOptions.cardType}?limit=${translateDiff()}`;

    const response = await fetch(url);
    const json = await response.json();

    setEldenImages(json.data);
    console.log(eldenImages);
  };

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

    console.log(newEldenObjArr);
    console.log(shuffledArr);
    setEldenImages(shuffledArr);
  };

  const translateDiff = (difficulty) => {
    if(difficulty == 'easy') {
        return '10'
    } else if (difficulty == 'medium') {
        return '20'
    } else {
        return '30'
    }
  }

  return (
    <>
    {console.log(gameOptions)}
      <div className={`game-over-modal ${gameOver ? "visible" : "hidden"}`}>
        <button
          onClick={(e) => {
            setGameOver((prev) => false);
            setCardsSelected((prev) => []);
          }}
        >
          Retry
        </button>
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
                  setScore(0);
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
