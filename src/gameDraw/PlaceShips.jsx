import React from "react";
import PropTypes from 'prop-types';

const PlaceShips = ({ currentPlayer, selectedShip }) => {
  
  const hnadleRoatation = () => {
    if (selectedShip.orientation === 'H') {
      selectedShip.orientation = "V";
    } else {
      selectedShip.orientation = "H";
    }
  }


  return (
    <div className="choices">
      <div className="current-ship">
        {selectedShip && selectedShip.type}
      </div>
      <div className="player">
        {currentPlayer && "Player: " + currentPlayer}
      </div>
      <button className="rotate" type="button" onClick={hnadleRoatation} >Rotate</button>
    </div>
  );
}

PlaceShips.propTypes = {
  currentPlayer: PropTypes.number,
  selectedShip: PropTypes.shape({
    type: PropTypes.string,
    length: PropTypes.number,
    orientation: PropTypes.string,
    start: PropTypes.arrayOf(
      PropTypes.number,
    ),
    }),
};
 
export default PlaceShips;