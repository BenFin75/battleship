import player from "./player";

const possibleShips = [
  "Carrier",
  "Battleship",
  "Cruser",
  "Submarine",
  "Destroyer",
]

let playerOne;
let playerTwo;

const gameStart = () => {
  playerOne = player();
  playerTwo = player();
}

const gameState = (() => {
  
  const checkForWin = () => {
    if (Object.keys(playerOne.getSunkShips()).length === possibleShips.length) {
      return 2;
    } else if  (Object.keys(playerTwo.getSunkShips()).length === possibleShips.length) {
      return 1;
    } else {
      return 0;
    }
  }

  const boardState = () => {
    let currentBoardState = [];
    currentBoardState.push(playerOne.getGameBoard());
    currentBoardState.push(playerTwo.getGameBoard());
    return currentBoardState;
  }

  const shipState = () => {
    let currentShipState = [];
    currentShipState.push(playerOne.getPlacedShips());
    currentShipState.push(playerTwo.getPlacedShips());
    return currentShipState;
  }

  return { checkForWin, boardState, shipState };
})()

const gamePlay = (()=> {
  const placeShip = (player, shipInfo) => {
    const {type, orientation, start} = shipInfo;
    if (player === 1) {
      playerOne.placeShip(type, orientation, start);
    } else {
      playerTwo.placeShip(type, orientation, start);
    }
  }

  const shoot = (playerShootin, x, y) => {
    if (playerShootin === 1) {
      playerTwo.getHit(x,y)
    } else {
      playerOne.getHit(x,y)
    }
  }

  return { placeShip, shoot }
})()

export { possibleShips, gameStart, gameState, gamePlay }