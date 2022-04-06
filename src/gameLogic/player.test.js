import player from "./player";

test('place horizontal ships', () => {
  const playerOne = player(1);
  playerOne.placeShip('battleship', 'H', [2,3]);
  for (let i = 3; i <= 6; i++) {
    expect(playerOne.getGameBoard()[2][i]).toBe(1);
    expect(playerOne.getGameBoard()[3][i]).toBe(0);
  }
})

test('place vertical ships', () => {
  const playerOne = player(1);
  playerOne.placeShip('battleship', 'V', [2,3]);
  for (let i = 2; i <= 5; i++) {
    expect(playerOne.getGameBoard()[i][3]).toBe(1);
    expect(playerOne.getGameBoard()[i][4]).toBe(0);
  }
})

test('place two ships', () => {
  const playerOne = player(1);
  playerOne.placeShip('battleship', 'V', [2,3]);
  playerOne.placeShip('submarine', 'H', [5,6]);
  for (let i = 2; i <= 5; i++) {
    expect(playerOne.getGameBoard()[i][3]).toBe(1);
    expect(playerOne.getGameBoard()[i][4]).toBe(0);
  }
  for (let i = 6; i <= 9; i++) {
    expect(playerOne.getGameBoard()[5][i]).toBe(1);
    expect(playerOne.getGameBoard()[6][i]).toBe(0);
  }
})

test('get hit and missed', () => {
  const playerOne = player(1);
  playerOne.getHit(3,6);
  expect(playerOne.getGameBoard()[3][6]).toBe(2);
})

test('get hit big', () => {
  const playerOne = player(1);
  playerOne.placeShip('battleship', 'V', [2,3]);
  playerOne.getHit(2,3);
  expect(playerOne.getGameBoard()[2][3]).toBe(3);
})

test('check ships with all alive', () => {
  const playerOne = player(1);
  playerOne.placeShip('battleship', 'V', [2,3]);
  playerOne.placeShip('submarine', 'H', [5,6]);
  expect(playerOne.getSunkShips()).toMatchObject({})
})

test('check ships with one sunk', () => {
  const playerOne = player(1);
  playerOne.placeShip('battleship', 'V', [2,3]);
  playerOne.placeShip('submarine', 'H', [5,6]);
  playerOne.getHit(5,6);
  playerOne.getHit(5,7);
  playerOne.getHit(5,8);
  playerOne.getHit(5,9);
  expect(playerOne.getSunkShips()).toMatchObject({submarine: { start: [ 5, 6 ], end: [ 5, 9 ], sunk: true }})
})