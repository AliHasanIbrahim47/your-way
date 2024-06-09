import React, { useState } from "react";
import "./AddDailyTrip.css";
import Sidebar from "../../components/Sidebar";
import Popup from '../../components/Popup';

const AddDailyTrip = () => {
  const [dPlace, setdPlace] = useState("");
  const [dTime, setDTime] = useState();
  const [dDate, setDDate] = useState();
  const [aPlace, setaPlace] = useState("");
  const [aTime, setATime] = useState();
  const [aDate, setADate] = useState();
  const [isPopupVisible, setIsPopuoVisble] = useState(false);

  const sendData = (event) => {
    event.preventDefault();
    setIsPopuoVisble(true);
  };

  const confirmDelete = () => {
    setIsPopuoVisble(false);
    if (!dPlace || !dTime || !dDate || !aPlace || !aTime || ! aDate) {
      alert("All fields are required!");
      return;
    }
    let data = { dPlace: dPlace, dTime: dTime, dDate:dDate, aPlace: aPlace, aTime: aTime, aDate: aDate };
    console.log(data);
    // send data to database with axios

    setdPlace("");
    setDTime();
    setDDate();
    setaPlace("");
    setATime();
    setADate();
  }
  
  const cancelDelete = () => {
    setIsPopuoVisble(false);
    console.log('cancel');
  }

  return (
    <div className="adduser">
      <Sidebar />
      <div className="container">
        <h1>Add Daily Trip</h1>
        <form onSubmit={sendData}>
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

          <input type="submit" value="Add Daily Trip" />
        </form>
      </div>
      {isPopupVisible && (
        <Popup 
          message="Are you sure you want to add this trip?"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
};

export default AddDailyTrip;
