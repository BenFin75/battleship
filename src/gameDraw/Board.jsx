import React from "react";
import PropTypes from "prop-types";

const Board = ({ player, gameState, getCoords, handleHover, removeHover }) => {
  if (getCoords) { 1+1 }
  const gameBoard = gameState.boardState()[player - 1];
  let j = 0;

  const enter = (e) => {
    const coords = e.target.getAttribute("data-coords");
    const rawCoords = coords.split(',');
    const cell = rawCoords.map(value => { return parseInt(value)});
    handleHover(player, cell)
  }

  const leave = () => {
    // const coords = e.target.getAttribute("data-coords");
    // const rawCoords = coords.split(',');
    // const cell = rawCoords.map(value => { return value -= 1 });
    removeHover(player)
  }

  
  return (
    <div className="board">
      {
        gameBoard.map(row => {
          let i=0;
          ++j;
          return (
            <div className="row" key = {j} >
              {
                row.map(() => {
                  ++i;
                  return (
                    <button 
                      type="button" 
                      className="cell" 
                      key={i} 
                      data-coords={`${i-1},${j-1}`}
                      onClick={getCoords} 
                      onMouseEnter={enter}
                      onMouseLeave={leave}
                    />
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
  getCoords: PropTypes.func,
  handleHover: PropTypes.func,
  removeHover: PropTypes.func,
};
 
export default Board;