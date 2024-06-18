import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import './ShowUser.css';
import axios from 'axios';

const ShowUser = () => {
  const [loader, setLoader] = useState(true);
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem('token');


  const { id } = useParams();
  const user = users.find(user => user.id.toString() === id);
  const navigate = useNavigate();

  // const trips = [
  //   { id: 1, type: 'previous', departure: 'New York', arrival: 'Los Angeles', date: '2024-05-01', time: '10:00 AM', services: ['WiFi', 'Meal'] },
  //   { id: 2, type: 'pending', departure: 'Los Angeles', arrival: 'New York', date: '2024-06-15', time: '12:00 PM', services: ['WiFi'] },
  //   { id: 3, type: 'previous', departure: 'Chicago', arrival: 'Miami', date: '2024-04-20', time: '03:00 PM', services: ['Meal'] },
  //   { id: 4, type: 'pending', departure: 'Miami', arrival: 'Los Angeles', date: '2024-07-10', time: '09:00 AM', services: [] }
  // ];

  // const previousTrips = trips.filter(trip => trip.type === 'previous');
  // const pendingTrips = trips.filter(trip => trip.type === 'pending');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://jawak-wa-tareekak.onrender.com/jawak-wa-tareekak/manager/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (Array.isArray(response.data.data)) {
          setUsers(response.data.data);
        } else {
          console.error('Response data is not an array');
        }
        setLoader(false);
      } catch (error) {
        console.error('Error fetching users', error);
      }
    };

    fetchUsers();
  }, [token]);

  const handleAddTrip = () => {
    navigate(`/travels/add`);
  };

  // const update = (id) => {
  //   navigate(`/users/${id}/trip/edit`);
  // };

  if (!user && !loader) {
    return (
      <div className="showuser">
        <Sidebar />
        <div className="container">
          <h1>User Not Found</h1>
        </div>
      </div>
    );
  }

  if (loader) {
    return (
      <div className="showuser">
        <Sidebar />
        <div className="container">
          <h1>Loading...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="showuser">
      <Sidebar />
      <div className="container">
        <h1>User {id} Details</h1>
        <div className="user-details">
          <p><strong>Name:</strong> {user.full_name}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
        </div>
        {/* <div className="trips-section">
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
        </div> */}
      </div>
    </div>
  );
};

export default ShowUser;
