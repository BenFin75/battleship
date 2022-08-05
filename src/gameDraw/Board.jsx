import React from "react";
import PropTypes from "prop-types";

const Board = ({ currentPlayer, player, gameState, getCoords, handleHover, removeHover }) => {
  let gameBoard;
  if (player <= 2) {
    gameBoard = gameState.boardState()[player - 1];
  }
  if (player === 3) {
    gameBoard = [];
    let playerBoard;
    if (currentPlayer === 1){
      playerBoard = gameState.boardState()[1]
    }
    if (currentPlayer === 2){
      playerBoard = gameState.boardState()[0]
    }
    playerBoard.forEach(row => {
      const newRow = [];
      row.forEach(cell => {
        let newCell;
        if (cell === 1) {
          cell = 0;
        }
        else {
          newCell = cell;
        }
        newRow.push(newCell);
      })
      gameBoard.push(newRow);
    });
  }
  let j = 0;

  const enter = (e) => {
    const coords = e.target.getAttribute("data-coords");
    const rawCoords = coords.split(',');
    const cell = rawCoords.map(value => { return parseInt(value)});
    handleHover(player, cell)
  }

  const leave = () => {
    removeHover()
  }

  const getCoordinants = (e) => {
    if (currentPlayer === player || player === 3) {
      getCoords(e)
    }
  }
  
  return (
    <div className="board-area">
      {
        player <= 2 && <div className="title">Your Board</div>
      }
      {
        player === 3 && <div className="title">Opponents Board</div>
      }
      <div className="board">
        {
          gameBoard.map(row => {
            let i=0;
            ++j;
            return (
              <div className="row" key = {j} >
                {
                  row.map(status => {
                    ++i;
                    return (
                      <button 
                        type="button" 
                        className="cell" 
                        key={i} 
                        data-coords={`${i-1},${j-1}`}
                        data-status={status}
                        data-player={player}
                        onClick={getCoordinants} 
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
    </div>
  );
}

Board.propTypes = {
  currentPlayer: PropTypes.number.isRequired,
  player: PropTypes.number.isRequired,
  gameState: PropTypes.objectOf(
    PropTypes.func,
  ).isRequired,
  getCoords: PropTypes.func,
  handleHover: PropTypes.func,
  removeHover: PropTypes.func,
};
 
export default Board;