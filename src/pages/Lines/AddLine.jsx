import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Popup from '../../components/Popup';

const AddLine = () => {
  const [aPlace, setAPlace] = useState("");
  const [dPlace, setDPlace] = useState("");
  
  const [isPopupVisible, setIsPopuoVisble] = useState(false);

  const sendData = (event) => {
    event.preventDefault();
    setIsPopuoVisble(true);
  };

  const confirmDelete = () => {
    setIsPopuoVisble(false);
    if (!aPlace || !dPlace) {
      alert("All fields are required!");
      return;
    }
    let data = { DeparturePlace: dPlace, ArrivalPlace: aPlace  };
    console.log(data);
    // send data to database with axios

    setAPlace("");
    setDPlace("");
  }  

  const cancelDelete = () => {
    setIsPopuoVisble(false);
    console.log('cancel');
  }

  return (
    <div className="adduser">
      <Sidebar />
      <div className="container">
        <h1>Add Line</h1>
        <form onSubmit={sendData}>
          <label htmlFor="dPlace">Departure Place</label>
          <input
            type="text"
            id="dPlace"
            placeholder="Departure Place"
            value={dPlace}
            onChange={(event) => setDPlace(event.target.value)}
            required
          />

          <label htmlFor="aPlace">Arrival Place</label>
          <input
            type="text"
            id="aPlace"
            placeholder="Arrival Place"
            value={aPlace}
            onChange={(event) => setAPlace(event.target.value)}
            required
          />

          <input type="submit" value="Add Line" />
        </form>
      </div>
      {isPopupVisible && (
        <Popup 
          message="Are you sure you want to add this line?"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
};

export default AddLine;
