import React, { useEffect } from "react";
import PropTypes from 'prop-types';

const PlaceShips = ({ gamePlay, setCurrentStage, SelectedShip, setSelectedShip }) => {
  if (gamePlay && setCurrentStage) { 'boing' }
  const handleShipSelection = (e) => {
    const shipType = e.alt;
    setSelectedShip(
      {
        type: shipType,
        orientation: 'H'
      }
    )
  }

  const hnadleRoatation = () => {
    if (SelectedShip.orientation === 'H') {
      SelectedShip.orientation = 'V'
    } else {
      SelectedShip.orientation = 'H'
    }
  }

  useEffect(() => {
    const ships = document.querySelectorAll('.ship');
    ships.forEach(ship => {
      ship.removeEventListener('click', handleShipSelection);
      if (ship.classList.contains('placed')) {
        ship.addEventListener('click', handleShipSelection);
      }
    })

  }, [])
  
  return (
    <div className="choices">
      <div className="row">
        <img src="" alt="Crusier" className="ship" />
        <img src="" alt="Submarine" className="ship" />
        <img src="" alt="Destoryer" className="ship" />
      </div>
      <div className="row">
        <img src="" alt="Barrier" className="ship" />
        <img src="" alt="Battleship" className="ship" />
      </div>
      <button className="rotate" type="button" onClick={hnadleRoatation} >Rotate</button>
    </div>
  );
}

PlaceShips.propTypes = {
  gamePlay: PropTypes.objectOf(
    PropTypes.func,
  ).isRequired,
  setCurrentStage: PropTypes.func.isRequired,
  SelectedShip: PropTypes.objectOf(PropTypes.shape({
    type: PropTypes.string,
    orientation: PropTypes.string,
    start: PropTypes.arrayOf(
      PropTypes.string
    ),
  })),
  setSelectedShip: PropTypes.func.isRequired,
};
 
export default PlaceShips;