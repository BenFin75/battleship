import React from "react";
import PropTypes from 'prop-types';
import Board from './Board';

const DrawBoards = ({ gameState, currentPlayer, selectedShip, setSelectedCoords, currentStage }) => {
  
  const getCoords = (e) => {
    const coords = e.target.getAttribute("data-coords");
    const rawCoords = coords.split(',');
    const cell = rawCoords.map(value => { return parseInt(value)});
    setSelectedCoords(cell)
  }

  const handleHover = (player, cell) => {
    if ( player === currentPlayer && selectedShip ) {
      const start = cell;
      const length = selectedShip.length;
      const orientation = selectedShip.orientation;
      if (orientation === 'H') {
        for (let i = start[0]; i < start[0] + length; i++) {
          const coord = `${i},${start[1]}`;
          if(document.querySelector(`[data-coords="${coord}"]`)) {
            const highlighted = document.querySelector(`[data-coords="${coord}"][data-player="${player}"]`);
            highlighted.classList.add('hoverboat')
          }
        }
      }
      if (orientation === 'V') {
        for (let i = start[1]; i < start[1] + length; i++) {
          const coord = `${start[0]},${i}`;
          if(document.querySelector(`[data-coords="${coord}"`)) {
            const highlighted = document.querySelector(`[data-coords="${coord}"][data-player="${player}"]`);
            highlighted.classList.add('hoverboat')
          }
        }
      }
    }
  }

  const removeHover = () => {
    if ( selectedShip ) {
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
      { currentPlayer === 1 && <Board id='one' currentPlayer={currentPlayer} player={1} gameState={gameState} getCoords={getCoords} handleHover={handleHover} removeHover={removeHover} /> }
      { currentPlayer === 2 && <Board id='two' currentPlayer={currentPlayer} player={2} gameState={gameState} getCoords={getCoords} handleHover={handleHover} removeHover={removeHover} /> }
      { currentStage === 3 && <Board id='Selection' currentPlayer={currentPlayer} player={3} gameState={gameState} getCoords={getCoords} handleHover={handleHover} removeHover={removeHover} /> }
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
    setSelectedCoords: PropTypes.func,
    currentStage: PropTypes.number,
};

export default DrawBoards;