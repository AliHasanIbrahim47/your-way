import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import './EditDailyTrip.css';
import Popup from '../../components/Popup';

const EditDailyTrip = ({ data, updateDailyTrips }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = data.find(user => user.id.toString() === id);

  const [dPlace, setdPlace] = useState(user ? user.name : '');
  const [dTime, setDTime] = useState();
  const [dDate, setDDate] = useState();
  const [aPlace, setaPlace] = useState("");
  const [aTime, setATime] = useState();
  const [aDate, setADate] = useState();
  const [isPopupVisible, setIsPopuoVisble] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsPopuoVisble(true);
  };

  const confirmDelete = () => {
    setIsPopuoVisble(false);
    const updatedUser = { id: user.id, dPlace: dPlace, dTime: dTime, dDate: dDate, aPlace: aPlace, aTime: aTime, aDate: aDate };
    updateDailyTrips(updatedUser);
    navigate(`/dailytrips/${id}`);
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
          <h1>Daily Trip not found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="edituser">
      <Sidebar />
      <div className="container">
        <h1>Edit Daily Trip</h1>
        <form onSubmit={handleSubmit}>
        <label htmlFor="dplace">Departure Place</label>
          <input
            type="text"
            id="dplace"
            placeholder="Damascus"
            value={dPlace}
            onChange={(event) => setdPlace(event.target.value)}
            required
          />

          <div className="form-group">
            <label htmlFor="dDate">Departure Date</label>
            <input
              type="date"
              id="dDate"
              value={dDate}
              onChange={(e) => setDDate(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="dTime">Departure Time</label>
            <input
              type="time"
              id="dTime"
              value={dTime}
              onChange={(e) => setDTime(e.target.value)}
              required
            />
          </div>

          <label htmlFor="aplace">Arrival Place</label>
          <input
            type="text"
            id="aplace"
            placeholder="Beruit"
            value={aPlace}
            onChange={(event) => setaPlace(event.target.value)}
            required
          />

          <div className="form-group">
            <label htmlFor="aDate">Arrival Date</label>
            <input
              type="date"
              id="aDate"
              value={aDate}
              onChange={(e) => setADate(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="aTime">Arrival Time</label>
            <input
              type="time"
              id="aTime"
              value={aTime}
              onChange={(e) => setATime(e.target.value)}
              required
            />
          </div>

          <input type="submit" value="Save Changes" />
        </form>
      </div>
      {isPopupVisible && (
        <Popup 
          message="Are you sure you want to edit this trip?"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
};

export default EditDailyTrip;
