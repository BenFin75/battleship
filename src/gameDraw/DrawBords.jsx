import React from "react";
import PropTypes from 'prop-types';
import Board from './Board';

const DrawBoards = ({ gameState, currentPlayer }) => {
  if (currentPlayer === 1) {
    1+1;
  }
  return (
    <div className="board-container">
      <Board id='one' player={1} gameState={gameState} />
      <Board id='two' player={2} gameState={gameState} />
    </div>
  );
}
 
DrawBoards.propTypes = {
  gameState: PropTypes.objectOf(
    PropTypes.func,
  ).isRequired,
  currentPlayer: PropTypes.number,
};

export default DrawBoards;