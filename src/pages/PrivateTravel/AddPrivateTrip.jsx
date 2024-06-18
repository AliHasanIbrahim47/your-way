import React, { useState, useEffect } from "react";
import "./AddPrivateTrip.css";
import Sidebar from "../../components/Sidebar";
import Popup from '../../components/Popup';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddPrivateTrip = () => {
  const [going_date, setgoing_date] = useState("");
  const [going_from, setgoing_from] = useState("");
  const [going_to, setgoing_to] = useState("");
  const [bus_id, setbus_id] = useState();
  const [user_id, setuser_id] = useState();
  const [seats, setseats] = useState();

  const [isPopupVisible, setIsPopuoVisble] = useState(false);

  const navigate = useNavigate();

  const sendData = (event) => {
    event.preventDefault();
    setIsPopuoVisble(true);
  };

  const confirmDelete = async () => {
    const token = localStorage.getItem('token');
    setIsPopuoVisble(false);
    if (!going_date || !going_from || !going_to || !bus_id || !user_id || !seats) {
      alert("All fields are required!");
      return;
    }
    let data = { going_date: going_date, going_from: going_from, going_to: going_to,
      bus_id: bus_id, user_id: user_id, seats: seats, extra_ids: [1]
    };
    try {
      const response = await axios.post('https://jawak-wa-tareekak.onrender.com/jawak-wa-tareekak/manager/travels/private', 
        data, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      setgoing_date("");
      setgoing_from("");
      setgoing_to("");
      setbus_id();
      setuser_id();
      setseats();
      navigate('/travels/private');
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
        <h1>Add Private Travel</h1>
        <form onSubmit={sendData}>
          <label htmlFor="status">Going Date</label>
          <input
            type="date"
            id="going_date"
            placeholder=""
            value={going_date}
            onChange={(event) => setgoing_date(event.target.value)}
            required
          />
          <label htmlFor="going_from">Going From</label>
          <input
            type="text"
            id="going_from"
            placeholder=""
            value={going_from}
            onChange={(event) => setgoing_from(event.target.value)}
            required
          />
          <label htmlFor="status">Going To</label>
          <input
            type="text"
            id="status"
            placeholder=""
            value={going_to}
            onChange={(event) => setgoing_to(event.target.value)}
            required
          />
          <label htmlFor="bus_id">Bus ID</label>
          <input
            type="number"
            id="bus_id"
            placeholder=""
            value={bus_id}
            onChange={(event) => setbus_id(event.target.value)}
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
          <label htmlFor="seats">Seats</label>
          <input
            type="number"
            id="seats"
            placeholder=""
            value={seats}
            onChange={(event) => setseats(event.target.value)}
            required
          />
          <input type="submit" value="Add Private Travel" />
        </form>
      </div>
      {isPopupVisible && (
        <Popup 
          message="Are you sure you want to add this private travel?"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
};

export default AddPrivateTrip;
