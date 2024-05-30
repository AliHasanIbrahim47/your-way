import React, { useState } from "react";
import "./AddDriver.css";
import Sidebar from "../../components/Sidebar";

const AddDriver = () => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [carModel, setCarModel] = useState("");
  const [year, setYear] = useState();
  const [passengers, setPassengers] = useState();
  const [office, setOffice] = useState();

  const sendData = (event) => {
    event.preventDefault();
    if (!name || !carModel || !number || !year || !passengers || !office) {
      alert("All fields are required!");
      return;
    }
    let data = { name: name, number: number, carModel: carModel, year: year, passengers: passengers, office: office };
    console.log(data);
    // send data to database with axios

    setName("");
    setCarModel("");
    setNumber("");
    setYear();
    setPassengers();
    setOffice();
  };

  return (
    <div className="adduser">
      <Sidebar />
      <div className="container">
        <h1>Add Driver</h1>
        <form onSubmit={sendData}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />

          <label htmlFor="number">Number</label>
          <input
            type="number"
            id="number"
            placeholder="Phone Number"
            value={number}
            onChange={(event) => setNumber(event.target.value)}
            required
          />

          <label htmlFor="carmodel">Car Model</label>
          <input
            type="text"
            id="carmodel"
            placeholder="Kia"
            value={carModel}
            onChange={(event) => setCarModel(event.target.value)}
            required
          />

          <label htmlFor="year">Year</label>
          <input
            type="number"
            id="year"
            placeholder="Year Made"
            value={year}
            onChange={(event) => setYear(event.target.value)}
            required
          />

          <label htmlFor="passengers">Passengers Number</label>
          <input
            type="number"
            id="passengers"
            placeholder="Passengers Number"
            value={passengers}
            onChange={(event) => setPassengers(event.target.value)}
            required
          />

          <label htmlFor="office">Driver Role</label>
          <input
            type="text"
            id="office"
            placeholder="Office or Regular"
            value={office}
            onChange={(event) => setOffice(event.target.value === "Office" || event.target.value === "office")}
            required
          />

          <input type="submit" value="Add Driver" />
        </form>
      </div>
    </div>
  );
};

export default AddDriver;
