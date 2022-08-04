import React, { useEffect, useState } from 'react';
import { gameStart, gameState, gamePlay } from '../gameLogic/gameController'
import PlaceShips from './PlaceShips';
import DrawBoards from './DrawBords';

const Game = () => {
  const [currentStage, setCurrentStage] = useState(0); // 0 = start, 1 = place ships, 2 = play, 3 = gmae has been won
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [selectedShip, setSelectedShip] = useState(null)
  const [selectedCoords, setSelectedCoords] = useState(null);

  if (setCurrentPlayer) { 'test' }
  useEffect(() => {
    console.log('here')
    if (currentStage === 0) {
      console.log('starting')
      gameStart();
      setCurrentStage(1);
    }
  }, [currentStage])

  useEffect(() => {
    if (currentStage === 1) {
      console.log('place' + selectedCoords)
      const shipToPlace = selectedShip;
      shipToPlace.start = selectedCoords;
      console.log(shipToPlace.start)
      gamePlay.placeShip(1, shipToPlace);
      console.log(gameState.boardState())
      setCurrentPlayer(currentPlayer + 1);
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