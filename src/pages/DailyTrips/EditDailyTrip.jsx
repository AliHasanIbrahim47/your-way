import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import './EditDailyTrip.css';

const EditDailyTrip = ({ data, updateDailyTrips }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = data.find(user => user.id.toString() === id);

  const [dPlace, setdPlace] = useState(user ? user.name : '');
  const [dTime, setdTime] = useState("");
  const [aPlace, setaPlace] = useState("");
  const [aTime, setaTime] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedUser = { id: user.id, dPlace: dPlace, dTime: dTime, aPlace: aPlace, aTime: aTime };
    updateDailyTrips(updatedUser);
    navigate(`/dailytrips/${id}`);
  };

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

          <label htmlFor="dtime">Departure Time</label>
          <input
            type="text"
            id="dtime"
            placeholder="10:00"
            value={dTime}
            onChange={(event) => setdTime(event.target.value)}
            required
          />

          <label htmlFor="aplace">Arrival Place</label>
          <input
            type="text"
            id="aplace"
            placeholder="Beruit"
            value={aPlace}
            onChange={(event) => setaPlace(event.target.value)}
            required
          />

          <label htmlFor="atime">Arrival Time</label>
          <input
            type="text"
            id="atime"
            placeholder="10:00"
            value={aTime}
            onChange={(event) => setaTime(event.target.value)}
            required
          />

          <input type="submit" value="Save Changes" />
        </form>
      </div>
    </div>
  );
};

export default EditDailyTrip;
