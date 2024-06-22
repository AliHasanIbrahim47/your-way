import React, { useState, useEffect } from "react";
import "./AddReservation.css";
import Sidebar from "../../components/Sidebar";
import Popup from '../../components/Popup';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const AddReservation = () => {
  const [t, i18n] = useTranslation("global");
  const [travel_id, settravel_id] = useState("");
  const [user_id, setuser_id] = useState("");
  const [going_date, setgoing_date] = useState("");
  const [passengers_count, setpassengers_count] = useState();
  const [loading, setLoading] = useState(false);
  const [travels, setTravels] = useState([]); // State for travels
  const [users, setUsers] = useState([]); // State for users

  const [isPopupVisible, setIsPopuoVisble] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchTravels();
    fetchUsers();
  }, []);

  const fetchTravels = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('https://jawak-wa-tareekak.onrender.com/jawak-wa-tareekak/manager/travels', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setTravels(response.data.data);
    } catch (error) {
      console.error('Error fetching travels', error);
    }
  };

  const fetchUsers = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('https://jawak-wa-tareekak.onrender.com/jawak-wa-tareekak/manager/users/', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setUsers(response.data.data);
    } catch (error) {
      console.error('Error fetching users', error);
    }
  };

  const sendData = (event) => {
    event.preventDefault();
    setIsPopuoVisble(true);
  };

  const confirmDelete = async () => {
    const token = localStorage.getItem('token');
    setIsPopuoVisble(false);
    if (!travel_id || !user_id) {
      alert("All fields are required!");
      return;
    }
    let data = { travel_id: travel_id, user_id: user_id, going_date: going_date, passengers_count : passengers_count };
    setLoading(true);
    try {
      const response = await axios.post('https://jawak-wa-tareekak.onrender.com/jawak-wa-tareekak/manager/reservations', 
        data, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      settravel_id("");
      setuser_id("");
      setgoing_date("");
      setpassengers_count();
      alert("Adding Reservation is successful");
      navigate('/travels/reservations');
    } catch (error) {
      alert("Error adding the Reservation please try again");
    } finally {
      setLoading(false);
    }
  };

  const cancelDelete = () => {
    setIsPopuoVisble(false);
  };

  return (
    <div className="addextra">
      <Sidebar />
      <div className="container">
      {/* {loading ? (
          <div className="loader">Adding Reservation ...</div> 
        ) : ( */}
          <>
        <h1>{t("reservations.add1")}</h1>
        <form onSubmit={sendData}>
          <label htmlFor="going_date">{t("private.gDate")}</label>
          <input
            type="date"
            id="going_date"
            placeholder=""
            value={going_date}
            onChange={(event) => setgoing_date(event.target.value)}
            required
          />
          <label htmlFor="travel_id">{t("reservations.travel")}</label>
          <select
            id="travel_id"
            value={travel_id}
            onChange={(event) => settravel_id(event.target.value)}
            required
          >
            <option value="">{t("reservations.travelS")}</option>
            {travels.map(travel => (
              <option key={travel.id} value={travel.id}>
                {`From: ${travel.going_from}, To: ${travel.returning_from}`}
              </option>
            ))}
          </select>
          <label htmlFor="user_id">{t("private.user")}</label>
          <select
            id="user_id"
            value={user_id}
            onChange={(event) => setuser_id(event.target.value)}
            required
          >
            <option value="">{t("private.userS")}</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.full_name}
              </option>
            ))}
          </select>
          <label htmlFor="passengers_count">{t("reservations.passengers_count")}</label>
          <input
            type="number"
            id="passengers_count"
            placeholder=""
            value={passengers_count}
            onChange={(event) => setpassengers_count(event.target.value)}
            required
          />
          <input type="submit" value={loading ? t("addusers.adding"): t("reservations.add1")} />
        </form>
      </>
      {/* )} */}
      </div>
      {isPopupVisible && (
        <Popup 
          message={t("resercations.addMessage")}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
};

export default AddReservation;
