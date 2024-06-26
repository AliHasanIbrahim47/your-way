import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import './ShowUser.css';
import axios from 'axios';
import Spinner from "../../components/Spinner";
import { useTranslation } from 'react-i18next';

const ShowUser = () => {
  const [t, i18n] = useTranslation("global");
  const [loader, setLoader] = useState(true);
  const [user, setUser] = useState(null);
  const token = localStorage.getItem('token');

  const { id } = useParams();
  const navigate = useNavigate();

  const baseURL = process.env.REACT_APP_URL;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(baseURL + `/users`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const users = response.data.data;
        const foundUser = users.find(user => user.id.toString() === id);
        setUser(foundUser);
        setLoader(false);
      } catch (error) {
        console.error('Error fetching user', error);
        setLoader(false);
      }
    };
    fetchUser();
  }, [token, id]);

  // const handleAddTrip = () => {
  //   navigate(`/travels/add`);
  // };

  if (loader) {
    return (
      <div className="showuser">
        <Sidebar />
        <div className="container">
          <h1 className="loader">{t("showuser.load")} <Spinner /></h1>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="showuser">
        <Sidebar />
        <div className="container">
          <h1>{t("showuser.found")}</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="showuser">
      <Sidebar />
      <div className="container">
        <h1>{t("showuser.h1")}</h1>
        <div className="user-details">
          <p><strong>{t("showuser.name")}:</strong> {user.full_name}</p>
          <p><strong>{t("showuser.phone")}:</strong> {user.phone}</p>
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
