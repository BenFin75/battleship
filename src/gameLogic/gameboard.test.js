import gameBoard from "./gameboard"

test('creates gameboard', () => {
  const testBoard = gameBoard();
  testBoard.createGameBoard();
  expect(testBoard.getGameBoard().length).toBe(10);
  expect(testBoard.getGameBoard()[0].length).toBe(10);
});

test('hit and miss', () => {
  const testBoard = gameBoard();
  testBoard.createGameBoard();
  testBoard.getHit(0,0);
  expect(testBoard.getGameBoard()[0][0]).toBe(2);
});

test('place ship horizontally', () => {
  const testBoard = gameBoard();
  testBoard.createGameBoard();
  testBoard.placeShip([0,0], [0,3])
  for (let i = 0; i < 4; i++) {
    expect(testBoard.getGameBoard()[0][i]).toBe(1); // check it changed
    expect(testBoard.getGameBoard()[1][i]).toBe(0); // check nothing else changed
  }
})

test('place ship vertically', () => {
  const testBoard = gameBoard();
  testBoard.createGameBoard();
  testBoard.placeShip([0,1], [3,1]);
  for (let i = 0; i < 4; i++) {
    expect(testBoard.getGameBoard()[i][1]).toBe(1); // check it changed
    expect(testBoard.getGameBoard()[i][0]).toBe(0); // check nothing else changed
  }
})