import React, { useState, useEffect } from "react";
import "./AddReservation.css";
import Sidebar from "../../components/Sidebar";
import Popup from '../../components/Popup';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddReservation = () => {
  const [travel_id, settravel_id] = useState("");
  const [user_id, setuser_id] = useState("");

  const [isPopupVisible, setIsPopuoVisble] = useState(false);

  const navigate = useNavigate();

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
    let data = { travel_id: travel_id, user_id: user_id};
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
      navigate('/travels/reservations');
      } catch (error) {
        console.error('Error adding travel', error.response?.data || error.message);
        alert(`Error: ${error.response?.data.message || error.message}`);
    }
  }

  const cancelDelete = () => {
    setIsPopuoVisble(false);
  }

  return (
    <div className="addextra">
      <Sidebar />
      <div className="container">
        <h1>Add Reservation</h1>
        <form onSubmit={sendData}>
          <label htmlFor="travel_id">Travel ID</label>
          <input
            type="number"
            id="travel_id"
            placeholder=""
            value={travel_id}
            onChange={(event) => settravel_id(event.target.value)}
            required
          />
          <label htmlFor="user_id">User ID</label>
          <input
            type="number"
            id="user_id"
            placeholder=""
            value={user_id}
            onChange={(event) => setuser_id(event.target.value)}
            required
          />
          <input type="submit" value="Add Reservation" />
        </form>
      </div>
      {isPopupVisible && (
        <Popup 
          message="Are you sure you want to add this Reservation?"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
};

export default AddReservation;
