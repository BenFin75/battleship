import React, { useEffect, useState } from 'react';
import { gameStart, gameState, gamePlay } from '../gameLogic/gameController'
import PlaceShips from './PlaceShips';
import DrawBoards from './DrawBords';

const Game = () => {
  const [currentStage, setCurrentStage] = useState(0); // 0 = start, 1 = place ships, 2 = play, 3 = gmae has been won
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [selectedShip, setSelectedShip] = useState(null)
  const [selectedCoords, setSelectedCoords] = useState(null);

  useEffect(() => {
    if (currentStage === 0) {
      console.log('starting');
      gameStart();
      setCurrentPlayer(1);
      setCurrentStage(1);
      setSelectedShip({
        type: "Carrier",
        length: 5,
        orientation: 'H',
        start: null,
      })
    }
  }, [currentStage])

  useEffect(() => {
    if (currentStage === 1) {
      if (selectedShip) {
        const shipToPlace = selectedShip;
        shipToPlace.start = selectedCoords;
        gamePlay.placeShip(currentPlayer, shipToPlace);
        currentPlayer === 1 ? setCurrentPlayer(2) : setCurrentPlayer(1);
        console.log(currentPlayer)
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
  },[selectedCoords])

  return (
    <div id="game">
      {
        currentStage === 1 && 
        <PlaceShips gamePlay={gamePlay} setCurrentStage={setCurrentStage} selectedShip={selectedShip} setSelectedShip={setSelectedShip} />
      }
      {
        currentStage > 0 &&
        <DrawBoards gameState={gameState} currentPlayer={currentPlayer} selectedShip={selectedShip} setSelectedCoords={setSelectedCoords} />
      }
      {
        currentStage === 2 && 
        <PlaceShips gamePlay={gamePlay} />
      }
    </div>
  );
}
 
export default Game;