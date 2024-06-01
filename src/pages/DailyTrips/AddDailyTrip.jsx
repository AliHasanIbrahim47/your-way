import React, { useState } from "react";
import "./AddDailyTrip.css";
import Sidebar from "../../components/Sidebar";

const AddDailyTrip = () => {
  const [dPlace, setdPlace] = useState("");
  const [dTime, setdTime] = useState("");
  const [aPlace, setaPlace] = useState("");
  const [aTime, setaTime] = useState("");

  const sendData = (event) => {
    event.preventDefault();
    if (!dPlace || !dTime || !aPlace || !aTime) {
      alert("All fields are required!");
      return;
    }
    let data = { dPlace: dPlace, dTime: dTime, aPlace: aPlace, aTime: aTime };
    console.log(data);
    // send data to database with axios

    setdPlace("");
    setdTime("");
    setaPlace("");
    setaTime("");

  };

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

          <input type="submit" value="Add Daily Trip" />
        </form>
      </div>
    </div>
  );
};

export default AddDailyTrip;
