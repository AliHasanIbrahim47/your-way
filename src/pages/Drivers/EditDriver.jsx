import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import './EditDriver.css';

const EditDriver = ({ data, updateDrivers }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = data.find(user => user.id.toString() === id);

  const [name, setName] = useState(user ? user.name : '');
  const [number, setNumber] = useState(user ? user.number : '');
  const [carModel, setCarModel] = useState(user ? user.carModel : '');
  const [year, setYear] = useState(user ? user.year : '');
  const [passengers, setPassengers] = useState(user ? user.passengers : '');
  const [office, setOffice] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedUser = { id: user.id, name: name, carModel: carModel, number: number, year: year, passengers: passengers, office: office};
    updateDrivers(updatedUser);
    navigate(`/drivers/${id}`);
  };

  if (!user) {
    return (
      <div className="edituser">
        <Sidebar />
        <div className="container">
          <h1>Driver not found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="edituser">
      <Sidebar />
      <div className="container">
        <h1>Edit Driver</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />

          <label htmlFor="number">Phone Number</label>
          <input
            id="number"
            type="number"
            placeholder="Number"
            value={number}
            onChange={(event) => setNumber(event.target.value)}
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

          <input type="submit" value="Save Changes" />
        </form>
      </div>
    </div>
  );
};

export default EditDriver;
