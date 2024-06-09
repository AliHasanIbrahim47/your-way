import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import './EditLine.css';
import Popup from '../../components/Popup';

const EditLine = ({ data, updateLines }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = data.find(user => user.id.toString() === id);

  const [dPlace, setDPlace] = useState(user ? user.DeparturePlace : '');
  const [aPlace, setAPlace] = useState(user ? user.ArrivalPlace : '');
  const [isPopupVisible, setIsPopuoVisble] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsPopuoVisble(true);
  };

  const confirmDelete = () => {
    const updatedUser = { id: user.id, DeparturePlace: dPlace, ArrivalPlace: aPlace};
    updateLines(updatedUser);
    console.log(updatedUser);
    navigate("/lines");
  }

  const cancelDelete = () => {
    setIsPopuoVisble(false);
    console.log('cancel');
  }

  if (!user) {
    return (
      <div className="edituser">
        <Sidebar />
        <div className="container">
          <h1>Line not found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="edituser">
      <Sidebar />
      <div className="container">
        <h1>Edit Line</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="dPlace">Departure Place</label>
          <input
            id="dPlace"
            type="text"
            placeholder="Departure Place"
            value={dPlace}
            onChange={(event) => setDPlace(event.target.value)}
          />

          <label htmlFor="aPlace">Arrival Place</label>
          <input
            id="aPlace"
            type="text"
            placeholder="Arrival Place"
            value={aPlace}
            onChange={(event) => setAPlace(event.target.value)}
          />

          <input type="submit" value="Save Changes" />
        </form>
      </div>
      {isPopupVisible && (
        <Popup 
          message="Are you sure you want to edit this line?"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
};

export default EditLine;
