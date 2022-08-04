import gameBoard from './gameboard';

export default () => {
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
      case "Cruiser":
        length = 3;
        break;
      case "Submarine":
        length = 3;
        break;
      case "Destroyer":
        length = 2;
        break;
      default:
        length = 3;
        break;
    }
    let empty = true;
    let end = [];
    if (orientation === 'H') {
      end[0] = start[0] + length - 1;
      end[1] = start[1];
      for (let i = start[0]; i <= end[0]; i++) {
        if (board.getGameBoard()[start[1]][i] === 1) {
          empty = false;
        }
        if (board.getGameBoard()[start[1]][i] == null) {
          empty = false;
        }
      }
    }
    if (orientation === 'V') {
      end[0] = start[0];
      end[1] = start[1] + length - 1;
      for (let i = start[1]; i <= end[1]; i++) {
        if (board.getGameBoard()[i][start[0]] === 1) {
          empty = false;
        }
        if (board.getGameBoard()[start[1]][i] == null) {
          empty = false;
        }
      }
    }
    if (empty === true) {
      ships[type] = {start, end, "sunk": false}
      board.placeShip(start, end);
    } else {
      console.log('overlap')
      return 'No Overlap'
    }
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

  const getPlacedShips = () => {
    const placedShips = [];
    Object.keys(ships).forEach ( ship => {
      placedShips.push(ship)
    })
    return placedShips
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

  return { getGameBoard, placeShip, getHit, getSunkShips, getPlacedShips }
};

