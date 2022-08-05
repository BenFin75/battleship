import React, { useEffect, useState } from 'react';
import { gameStart, gameState, gamePlay } from '../gameLogic/gameController'
import PlaceShips from './PlaceShips';
import DrawBoards from './DrawBords';

const Game = () => {
  const [currentStage, setCurrentStage] = useState(0); // 0 = start, 1 = transition between players, 2 = place ships, 3 = play, 4 = switch between players, 5 = gmae has been won
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [selectedShip, setSelectedShip] = useState(null)
  const [selectedCoords, setSelectedCoords] = useState(null);

  useEffect(() => {
    if (currentStage === 0) {
      console.log('starting');
      gameStart();
      setCurrentPlayer(1);
      setCurrentStage(2);
      setSelectedShip({
        type: "Carrier",
        length: 5,
        orientation: 'H',
        start: null,
      })
    }
  }, [currentStage])

  useEffect(() => {
    if (currentStage === 2) {
      if (selectedShip) {
        const shipToPlace = selectedShip;
        shipToPlace.start = selectedCoords;
        gamePlay.placeShip(currentPlayer, shipToPlace);
        const PlacedShips =  gameState.shipState();
        if (PlacedShips[1].includes("Destroyer")) {
          console.log('finished')
          setCurrentPlayer(1);
          setCurrentStage(3);
        }
        else if (PlacedShips[currentPlayer - 1].includes(selectedShip.type)) {
          setCurrentStage(1);
          if (currentPlayer === 2) {
            switch (selectedShip.type) {
              case "Carrier":
                setSelectedShip({
                  type: "Battleship",
                  length: 4,
                  orientation: 'H',
                  start: null,
                });
                break;
              case "Battleship":
                setSelectedShip({
                  type: "Crusier",
                  length: 3,
                  orientation: 'H',
                  start: null,
                });
                break;
              case "Crusier":
                setSelectedShip({
                  type: "Submarine",
                  length: 3,
                  orientation: 'H',
                  start: null,
                });
                break;
              case "Submarine":
                setSelectedShip({
                  type: "Destroyer",
                  length: 2,
                  orientation: 'H',
                  start: null,
                });
                break;
              default:
                setSelectedShip(null);
            }
          }
        }
      }
    }
    else if (currentStage === 3) {
      gamePlay.shoot(currentPlayer, selectedCoords);
      setCurrentStage(4);
    }
  },[selectedCoords]);

  const switchPlayer = (stage) => {
    if (stage === 1) {
      currentPlayer === 1 ? setCurrentPlayer(2) : setCurrentPlayer(1);
      setCurrentStage(2);
    }
    if (stage === 4) {
      currentPlayer === 1 ? setCurrentPlayer(2) : setCurrentPlayer(1);
      setCurrentStage(3);
    }
  }

  return (
    <div id="game">
      <div className="test">{"Player: " + currentPlayer}</div>
      <div className="test">{"Stage: " + currentStage}</div>
      {
        currentStage === 2 && 
        <PlaceShips currentPlayer={currentPlayer} selectedShip={selectedShip} />
      }
      {
        currentStage === 1 &&
        <button className="switch" onClick={() => {switchPlayer(1)}}>Switch Player</button>
      }
      {
        currentStage === 4 &&
        <button className="switch" onClick={() => {switchPlayer(4)}}>Switch Player</button>
      }
      {
        currentStage > 1 && currentStage < 4 &&
        <DrawBoards gameState={gameState} currentPlayer={currentPlayer} selectedShip={selectedShip} setSelectedCoords={setSelectedCoords} currentStage={currentStage} />
      }
      {
        currentStage === 3 && 
        <div className="test">play time</div>
      }
    </div>
  );
}
 
export default Game;