const gameBoard = () => {
  let gameBoard = [];

  const createGameBoard = () => {
    for (let row = 0; row < 10; row++) {
      let columns = [];
      for (let column = 0; column < 10; column++) {
        columns.push(0)
      }
      gameBoard.push(columns)
    }
  }

  const placeShip = (start, end) => {
    if (start[1] === end[1]) { //place horizontally
      for (let i = start[0]; i <= end[0]; i++) {
        gameBoard[start[1]][i] = 1;
      }
    } else { // place vertically
      for (let i = start[1]; i <= end[1]; i++) {
        gameBoard[i][start[0]] = 1;
      }
    }
  }

  const getHit = (x, y) => {
    if (gameBoard[x][y] === 1) {
      gameBoard[x][y] = 3;
    } else {
      gameBoard[x][y] = 2;
    }
  }

  const getGameBoard = () => {
    const gameBoardState = JSON.parse(JSON.stringify(gameBoard))
    return gameBoardState
  }

  return { createGameBoard, placeShip, getHit, getGameBoard }
}

module.exports = gameBoard;
