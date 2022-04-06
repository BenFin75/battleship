import gameBoard from './gameboard';

const player = () => {
  const board = gameBoard();
  board.createGameBoard();
  let ships = {}

  const placeShip = (type, orientation, start) => {
    let length;
    switch (type) {
      case "Carrier":
        length = 5;
        break;
      case "Battleship":
        length = 4;
        break;
      case "Destroyer":
        length = 2;
        break;
      default:
        length = 3;
        break;
    }
    let end = []
    if (orientation === 'H') {
      end[0] = start[0];
      end[1] = start[1] + length;
    }
    if (orientation === 'V') {
      end[0] = start[0] + length;
      end[1] = start[1];
    }
    ships[type] = {start, end, "sunk": false}
    board.placeShip(start, end);
  }

  const getGameBoard = () => {
    return board.getGameBoard()
  }

  const getHit = (x,y) => {
    board.getHit(x,y);
    checkForSunkShips();
  }

  const checkForSunkShips = () => {
    Object.entries(ships).forEach( ship => {
      let sunk = true;
      if (ship[1].start[0] === ship[1].end[0]){ // horizzontal
        for (let i = ship[1].start[1]; i <= ship[1].end[1]; i++) {
          if (getGameBoard()[ship[1].start[0]][i] === 1) {
            sunk = false;
          }
        }
      }
      if (ship[1].start[1] === ship[1].end[1]){ // horizzontal
        for (let i = ship[1].start[0]; i <= ship[1].end[0]; i++) {
          if (getGameBoard()[ship[1].start[1]][i] === 1) {
            sunk = false;
          }
        }
      }
      ships[ship[0]].sunk = sunk;
    })
  }

  const getSunkShips = () => {
    let sunkShips = {}
    Object.entries(ships).forEach( ship => {
      if (ship[1].sunk) {
        sunkShips[ship[0]] = ship[1];
      }
    })
    return sunkShips;
  }

  return { getGameBoard, placeShip, getHit, getSunkShips }
};

module.exports = player;