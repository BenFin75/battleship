import React from "react";
import PropTypes from 'prop-types';
import Board from './Board';

const DrawBoards = ({ gameState, currentPlayer, selectedShip, setSelectedShip }) => {
  if (currentPlayer) { 1+1 }
  const getCoords = (e) => {
    const coords = e.target.getAttribute("data-coords");
    const rawCoords = coords.split(',');
    let cell = rawCoords.map(value => { return parseInt(value)});
    cell = [5,4]
    console.log(cell)
    const keepType = selectedShip.type;
    const keepOrientation = selectedShip.orientation;
    setSelectedShip(
      {
        type: keepType,
        orientation: keepOrientation,
        start: cell,
      }
    )
    console.log(selectedShip)
  }

  //gameState === 1 && 

  const handleHover = (player, cell) => {
    if ( player === 1 && selectedShip ) {
      const start = cell;
      const length = selectedShip.length;
      const orientation = selectedShip.orientation;
      if (orientation === 'H') {
        for (let i = start[0]; i < start[0] + length; i++) {
          const coord = `${i},${start[1]}`;
          if(document.querySelector(`[data-coords="${coord}"`)) {
            const highlighted = document.querySelector(`[data-coords="${coord}"`);
            highlighted.classList.add('hoverboat')
          }
        }
      }
      if (orientation === 'V') {
        for (let i = start[1]; i < start[1] + length; i++) {
          const coord = `${start[0]},${i}`;
          if(document.querySelector(`[data-coords="${coord}"`)) {
            const highlighted = document.querySelector(`[data-coords="${coord}"`);
            highlighted.classList.add('hoverboat')
          }
        }
      }
    }
  }

  const removeHover = (player) => {
    if ( player === 1 && selectedShip ) {
      const highlighted = document.querySelectorAll('.hoverboat')
      if (highlighted) {
        highlighted.forEach(cell => {
          cell.classList.remove('hoverboat')
        })
      }
    }
  }

  return (
    <div className="board-container">
      <Board id='one' player={1} gameState={gameState} getCoords={getCoords} handleHover={handleHover} removeHover={removeHover} />
      <Board id='two' player={2} gameState={gameState} getCoords={getCoords} handleHover={handleHover} removeHover={removeHover} />
    </div>
  );
}
 
DrawBoards.propTypes = {
  gameState: PropTypes.objectOf(
    PropTypes.func,
  ).isRequired,
  currentPlayer: PropTypes.number,
  selectedShip: PropTypes.shape({
    type: PropTypes.string,
    length: PropTypes.number,
    orientation: PropTypes.string,
    start: PropTypes.arrayOf(
      PropTypes.number,
    ),
    }),
  setSelectedShip: PropTypes.func
};

export default DrawBoards;