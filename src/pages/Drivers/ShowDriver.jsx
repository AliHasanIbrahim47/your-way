import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import './ShowDriver.css';

const ShowDriver = ({ data }) => {
  const { id } = useParams();
  const driver = data.find(driver => driver.id.toString() === id);

  const navigate = useNavigate();
  const trips = [
    { id: 1, type: 'previous', departure: 'New York', arrival: 'Los Angeles', date: '2024-05-01', time: '10:00 AM', services: ['WiFi', 'Meal'] },
    { id: 2, type: 'pending', departure: 'Los Angeles', arrival: 'New York', date: '2024-06-15', time: '12:00 PM', services: ['WiFi'] },
    { id: 3, type: 'previous', departure: 'Chicago', arrival: 'Miami', date: '2024-04-20', time: '03:00 PM', services: ['Meal'] },
    { id: 4, type: 'pending', departure: 'Miami', arrival: 'Los Angeles', date: '2024-07-10', time: '09:00 AM', services: [] }
  ];

  const previousTrips = trips.filter(trip => trip.type === 'previous');
  const pendingTrips = trips.filter(trip => trip.type === 'pending');

  const handleAddTrip = () => {
    navigate(`/drivers/${id}/addtrip`);
  };

  if (!driver) {
    return (
      <div className="showdriver">
        <Sidebar />
        <div className="container">
          <h1>Driver not found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="showdriver">
      <Sidebar />
      <div className="container">
        <h1>Driver Details</h1>
        <div className="user-details">
          <p><strong>Name:</strong> {driver.name}</p>
          <p><strong>Number:</strong> {driver.number}</p>
          <p><strong>CarModel:</strong> {driver.carModel}</p>
          <p><strong>Year:</strong> {driver.year}</p>
          <p><strong>Passengers:</strong> {driver.passengers}</p>
          <p><strong>Role:</strong> {driver.office ? "Office" : "Regular"}</p>
        </div>
      </div>

      <div className="trips-section">
          <h2>Previous Trips</h2>
          {previousTrips.length > 0 ? (
            <ul>
              {previousTrips.map(trip => (
                <li key={trip.id}>
                  <p><strong>Departure:</strong> {trip.departure}</p>
                  <p><strong>Arrival:</strong> {trip.arrival}</p>
                  <p><strong>Date:</strong> {trip.date}</p>
                  <p><strong>Time:</strong> {trip.time}</p>
                  <p><strong>Services:</strong> {trip.services.join(', ') || 'None'}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No previous trips</p>
          )}
          <h2>Pending Trips</h2>
          {pendingTrips.length > 0 ? (
            <ul>
              {pendingTrips.map(trip => (
                <li key={trip.id}>
                  <p><strong>Departure:</strong> {trip.departure}</p>
                  <p><strong>Arrival:</strong> {trip.arrival}</p>
                  <p><strong>Date:</strong> {trip.date}</p>
                  <p><strong>Time:</strong> {trip.time}</p>
                  <p><strong>Services:</strong> {trip.services.join(', ') || 'None'}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No pending trips</p>
          )}
          <button className="add-trip-btn" onClick={handleAddTrip}>Add Trip</button>
        </div>
    </div>
  );
};

export default ShowDriver;
