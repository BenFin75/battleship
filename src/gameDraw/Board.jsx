import React from "react";
import PropTypes from "prop-types";

const Board = ({ player, gameState, setCoords }) => {
  if (setCoords) { 1+1 }
  const gameBoard = gameState.boardState()[player - 1];
  let j = 0;
  return (
    <div className="board">
      {
        gameBoard.map(row => {
          let i=0;
          ++j
          return (
          <div className="row" key ={j} >
            {
              row.map(() => {
                ++i
                return (
                <div className="cell" key={i} >
                  cell
                </div>
                )
              })
            }
          </div>
          )
        })
      }
    </div>
  );
}

Board.propTypes = {
  player: PropTypes.number.isRequired,
  gameState: PropTypes.objectOf(
    PropTypes.func,
  ).isRequired,
  setCoords: PropTypes.arrayOf(
    PropTypes.number
  ),
};
 
export default Board;