import React, { useState } from 'react';
import Sidebar from './Sidebar';
import './AddTrip.css';

const AddTrip = () => {
  const [departure, setDeparture] = useState('');
  const [arrival, setArrival] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [services, setServices] = useState([]);

  const handleServiceChange = (event) => {
    const { value, checked } = event.target;
    setServices(prevServices => 
      checked ? [...prevServices, value] : prevServices.filter(service => service !== value)
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newTrip = {
      departure,
      arrival,
      date,
      time,
      services,
    };
    console.log('New Trip:', newTrip);
    // Add logic to send new trip data to the server or state management
  };

  return (
    <div className="addtrip">
      <Sidebar />
      <div className="container">
        <h1>Add New Trip</h1>
        <form onSubmit={handleSubmit} className="trip-form">
          <div className="form-group">
            <label htmlFor="departure">Departure Place:</label>
            <input
              type="text"
              id="departure"
              value={departure}
              onChange={(e) => setDeparture(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="arrival">Arrival Place:</label>
            <input
              type="text"
              id="arrival"
              value={arrival}
              onChange={(e) => setArrival(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="time">Time:</label>
            <input
              type="time"
              id="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Additional Services:</label>
            <div className="services">
              <label>
                <input
                  type="checkbox"
                  value="WiFi"
                  onChange={handleServiceChange}
                />
                WiFi
              </label>
              <label>
                <input
                  type="checkbox"
                  value="Meal"
                  onChange={handleServiceChange}
                />
                Meal
              </label>
              <label>
                <input
                  type="checkbox"
                  value="Extra Legroom"
                  onChange={handleServiceChange}
                />
                Extra Legroom
              </label>
            </div>
          </div>
          <button type="submit" className="submit-btn">Add Trip</button>
        </form>
      </div>
    </div>
  );
};

export default AddTrip;