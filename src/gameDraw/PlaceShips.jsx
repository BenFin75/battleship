import React, { useEffect } from "react";
import PropTypes from 'prop-types';

const PlaceShips = ({ gamePlay, setCurrentStage, selectedShip, setSelectedShip }) => {
  if (gamePlay && setCurrentStage) { 'boing' }

  // const keepType = selectedShip.type;
  // const keepOrientation = selectedShip.orientation;
  // setSelectedShip(
  //   {
  //     type: keepType,
  //     orientation: keepOrientation,
  //     start: cell,
  //   }
  // )

  const handleShipSelection = (e) => {
    if (!e.target.classList.contains('placed')){
      const clickedShip = {
        type: e.target.alt,
        length: parseInt(e.target.getAttribute('data-length')),
        orientation: 'H',
        start: null,
      }
      setSelectedShip(clickedShip);
      e.target.className += ' placed';
    }
  }

  useEffect(() => {
    const ships = document.querySelectorAll('.ship');
    ships.forEach(ship => {
      ship.addEventListener('click', handleShipSelection, true);
    })
  }, [])
  
  const hnadleRoatation = () => {
    if (selectedShip.orientation === 'H') {
      selectedShip.orientation = "V";
    } else {
      selectedShip.orientation = "H";
    }
  }


  return (
    <div className="choices">
      <div className="row">
        <img src="" alt="Carrier" data-length="5" className="ship" />
        <img src="" alt="Battleship" data-length="4" className="ship" />
        <img src="" alt="Crusier" data-length="3" className="ship" />
      </div>
      <div className="row">
        <img src="" alt="Submarine" data-length="3" className="ship" />
        <img src="" alt="Destroyer" data-length="2" className="ship" />
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
  selectedShip: PropTypes.shape({
    type: PropTypes.string,
    length: PropTypes.number,
    orientation: PropTypes.string,
    start: PropTypes.arrayOf(
      PropTypes.number,
    ),
    }),
  setSelectedShip: PropTypes.func.isRequired,
};
 
export default PlaceShips;