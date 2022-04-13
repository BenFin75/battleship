import React, { useEffect, useState } from 'react';
import { gameStart, gameState, gamePlay } from '../gameLogic/gameController'
import PlaceShips from './PlaceShips';
import DrawBoards from './DrawBords';

const Game = () => {
  const [currentStage, setCurrentStage] = useState(0); // 0 = start, 1 = place shipd, 2 = play, 3 = gmae has been won
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [selectedShip, setSelectedShip] = useState(null)
  if (setCurrentPlayer) { 'test' }
  useEffect(() => {
    console.log('here')
    if (currentStage === 0) {
      console.log('starting')
      gameStart();
      setCurrentStage(1);
    }
  }, [currentStage])

  return (
    <div id="game">
      {
        currentStage === 1 && 
        <PlaceShips gamePlay={gamePlay} setCurrentStage={setCurrentStage} setSelectedShip={setSelectedShip} />
      }
      {
        currentStage > 0 &&
        <DrawBoards gameState={gameState} currentPlayer={currentPlayer} selectedShip={selectedShip}  />
      }
      {
        currentStage === 2 && 
        <PlaceShips gamePlay={gamePlay} />
      }
    </div>
  );
}
 
export default Game;