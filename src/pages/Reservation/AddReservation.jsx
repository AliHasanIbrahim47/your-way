import React, { useState, useEffect } from "react";
import "./AddReservation.css";
import Sidebar from "../../components/Sidebar";
import Popup from '../../components/Popup';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddReservation = () => {
  const [travel_id, settravel_id] = useState("");
  const [user_id, setuser_id] = useState("");
  const [going_date, setgoing_date] = useState("");
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
    let data = { travel_id: travel_id, user_id: user_id, going_date: going_date };
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
      {loading ? (
          <div className="loader">Adding Reservation ...</div> 
        ) : (
          <>
        <h1>Add Reservation</h1>
        <form onSubmit={sendData}>
          <label htmlFor="going_date">Going Date</label>
          <input
            type="date"
            id="going_date"
            placeholder=""
            value={going_date}
            onChange={(event) => setgoing_date(event.target.value)}
            required
          />
          <label htmlFor="travel_id">Travel</label>
          <select
            id="travel_id"
            value={travel_id}
            onChange={(event) => settravel_id(event.target.value)}
            required
          >
            <option value="">Select Travel</option>
            {travels.map(travel => (
              <option key={travel.id} value={travel.id}>
                {`From: ${travel.going_from}, To: ${travel.returning_from}`}
              </option>
            ))}
          </select>
          <label htmlFor="user_id">User</label>
          <select
            id="user_id"
            value={user_id}
            onChange={(event) => setuser_id(event.target.value)}
            required
          >
            <option value="">Select User</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.full_name}
              </option>
            ))}
          </select>
          <input type="submit" value="Add Reservation" />
        </form>
      </>
      )}
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
