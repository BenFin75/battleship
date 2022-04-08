import { gameStart, gameState, gamePlay } from "./gameController";

test('test for win wile not won', () => {
  gameStart();
  expect(gameState.checkForWin()).toBe(0);
})

test ('get board state', () => {
  gameStart();
  expect(gameState.boardState()[0][0][0]).toBe(0);
  expect(gameState.boardState()[1][0][0]).toBe(0);
})

test ('place PlayerOne Ships', () => {
  gameStart();
  gamePlay.placeShip(1, {type: 'Cruiser', orientation: 'V', start: [0,0]});
  expect(gameState.boardState()[0][0][0]).toBe(1);
  expect(gameState.boardState()[0][2][0]).toBe(1);
  expect(gameState.boardState()[0][4][0]).toBe(0);
  expect(gameState.boardState()[0][0][1]).toBe(0);
})

test ('place PlayerTwo Ships', () => {
  gameStart();
  gamePlay.placeShip(2, {type: 'Cruiser', orientation: 'V', start: [0,0]});
  expect(gameState.boardState()[1][0][0]).toBe(1);
  expect(gameState.boardState()[1][2][0]).toBe(1);
  expect(gameState.boardState()[1][4][0]).toBe(0);
  expect(gameState.boardState()[1][0][1]).toBe(0);
  expect(gameState.boardState()[0][0][0]).toBe(0);
})

test ('place one ship for both', () => {
  gameStart();
  gamePlay.placeShip(1, {type: 'Cruiser', orientation: 'V', start: [0,0]});
  gamePlay.placeShip(2, {type: 'Cruiser', orientation: 'V', start: [0,0]});
  expect(gameState.boardState()[1][0][0]).toBe(1);
  expect(gameState.boardState()[1][2][0]).toBe(1);
  expect(gameState.boardState()[1][4][0]).toBe(0);
  expect(gameState.boardState()[1][0][1]).toBe(0);
  expect(gameState.boardState()[0][0][0]).toBe(1);
  expect(gameState.boardState()[0][2][0]).toBe(1);
})

test ('shoot your shot and miss', () => {
  gameStart();
  gamePlay.shoot(1, 1, 1);
  expect(gameState.boardState()[1][1][1]).toBe(2);
})

test ('shoot your shot and hit', () => {
  gameStart();
  gamePlay.placeShip(2, {type: 'Cruiser', orientation: 'H', start: [0,0]})
  gamePlay.shoot(1, 0, 1);
  expect(gameState.boardState()[1][0][1]).toBe(3);
})

test ('shoot two players shots', () => {
  gameStart();
  gamePlay.placeShip(2, {type: 'Cruiser', orientation: 'H', start: [0,0]})
  gamePlay.shoot(1, 0, 1);
  gamePlay.shoot(2, 0, 0);
  expect(gameState.boardState()[1][0][1]).toBe(3);
  expect(gameState.boardState()[0][0][0]).toBe(2);
})

test('test for win wile player one won', () => {
  gameStart();
  gamePlay.placeShip(2, {type: 'Carrier', orientation: 'V', start: [0,0]})
  gamePlay.placeShip(2, {type: 'Battleship', orientation: 'V', start: [0,1]})
  gamePlay.placeShip(2, {type: 'Submarine', orientation: 'V', start: [0,2]})
  gamePlay.placeShip(2, {type: 'Cruiser', orientation: 'V', start: [0,3]})
  gamePlay.placeShip(2, {type: 'Destroyer', orientation: 'V', start: [0,4]})
  // hit carrier
  gamePlay.shoot(1, 0, 0);
  gamePlay.shoot(1, 0, 1);
  gamePlay.shoot(1, 0, 2);
  gamePlay.shoot(1, 0, 3);
  gamePlay.shoot(1, 0, 4);
  // hit battleship
  gamePlay.shoot(1, 1, 0);
  gamePlay.shoot(1, 1, 1);
  gamePlay.shoot(1, 1, 2);
  gamePlay.shoot(1, 1, 3);
  //hit sub
  gamePlay.shoot(1, 2, 0);
  gamePlay.shoot(1, 2, 1);
  gamePlay.shoot(1, 2, 2);
  //hit cruiser
  gamePlay.shoot(1, 3, 0);
  gamePlay.shoot(1, 3, 1);
  gamePlay.shoot(1, 3, 2);
  //hit destroyer
  gamePlay.shoot(1, 4, 0);
  gamePlay.shoot(1, 4, 1);
  expect(gameState.checkForWin()).toBe(1);
})

test('test for win wile player two won', () => {
  gameStart();
  gamePlay.placeShip(1, {type: 'Carrier', orientation: 'V', start: [0,0]})
  gamePlay.placeShip(1, {type: 'Battleship', orientation: 'V', start: [0,1]})
  gamePlay.placeShip(1, {type: 'Submarine', orientation: 'V', start: [0,2]})
  gamePlay.placeShip(1, {type: 'Cruiser', orientation: 'V', start: [0,3]})
  gamePlay.placeShip(1, {type: 'Destroyer', orientation: 'V', start: [0,4]})
  // hit carrier
  gamePlay.shoot(2, 0, 0);
  gamePlay.shoot(2, 0, 1);
  gamePlay.shoot(2, 0, 2);
  gamePlay.shoot(2, 0, 3);
  gamePlay.shoot(2, 0, 4);
  // hit battleship
  gamePlay.shoot(2, 1, 0);
  gamePlay.shoot(2, 1, 1);
  gamePlay.shoot(2, 1, 2);
  gamePlay.shoot(2, 1, 3);
  //hit sub
  gamePlay.shoot(2, 2, 0);
  gamePlay.shoot(2, 2, 1);
  gamePlay.shoot(2, 2, 2);
  //hit cruiser
  gamePlay.shoot(2, 3, 0);
  gamePlay.shoot(2, 3, 1);
  gamePlay.shoot(2, 3, 2);
  //hit destroyer
  gamePlay.shoot(2, 4, 0);
  gamePlay.shoot(2, 4, 1);
  expect(gameState.checkForWin()).toBe(2);
})
