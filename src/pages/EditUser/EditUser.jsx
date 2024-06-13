import React, { useState, useEffect } from "react";
import "./EditUser.css";
import Sidebar from "../../components/Sidebar";
import Popup from '../../components/Popup';
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditUser= () => {
  const { id } = useParams();

  const [full_name, setfull_name] = useState("");
  const [phone, setphone] = useState();
  const [password, setpassword] = useState("");
  const [is_activated, setis_activated] = useState();

  const [isPopupVisible, setIsPopuoVisble] = useState(false);

  const navigate = useNavigate();

  const sendData = (event) => {
    event.preventDefault();
    setIsPopuoVisble(true);
  };

  const confirmDelete = async () => {
    const token = localStorage.getItem('token');
    setIsPopuoVisble(false);
    if (!full_name || !phone || !password) {
      alert("All fields are required!");
      return;
    }
    let data = { full_name: full_name, phone: phone,  password: password, is_activated: is_activated};
    try {
      const response = await axios.put(`https://jawak-wa-tareekak.onrender.com/jawak-wa-tareekak/manager/users/${id}`,
        data, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      setfull_name("");
      setphone();
      setpassword("");
      setis_activated();
      navigate('/users');
      } catch (error) {
        console.error('Error adding user', error.response?.data || error.message);
        alert(`Error: ${error.response?.data.message || error.message}`);
    }
  }

  const cancelDelete = () => {
    setIsPopuoVisble(false);
  }

  return (
    <div className="edituser">
      <Sidebar />
      <div className="container">
        <h1>Edit User {id}</h1>
        <form onSubmit={sendData}>
          <label htmlFor="full_name">Full Name</label>
          <input
            type="text"
            id="full_name"
            placeholder=""
            value={full_name}
            onChange={(event) => setfull_name(event.target.value)}
            required
          />
          <label htmlFor="phone">Phone</label>
          <input
            type="number"
            id="phone"
            placeholder=""
            value={phone}
            onChange={(event) => setphone(event.target.value)}
            required
          />
          <label htmlFor="password">Password</label>
          <input
            type="text"
            id="password"
            placeholder=""
            value={password}
            onChange={(event) => setpassword(event.target.value)}
            required
          />
          <label htmlFor="is_activated">Is Activated</label>
          <input
            type="text"
            id="is_activated"
            placeholder=""
            value={is_activated}
            onChange={(event) => setis_activated(event.target.value)}
            required
          />
          <input type="submit" value="Add Reservation" />
        </form>
      </div>
      {isPopupVisible && (
        <Popup 
          message="Are you sure you want to edit this user?"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
};

export default EditUser;
