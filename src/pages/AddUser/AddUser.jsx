import React, { useState } from "react";
import "./AddUser.css";
import Sidebar from "../../components/Sidebar";
import Popup from '../../components/Popup';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const [full_name, setfull_name] = useState("");
  const [phone, setphone] = useState();
  const [password, setpassword] = useState("");
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
    let data = { full_name: full_name, phone: phone, password: password };
    try {
      const response = await axios.post('https://jawak-wa-tareekak.onrender.com/jawak-wa-tareekak/manager/users', 
        data, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setfull_name("");
      setphone();
      setpassword("");
      navigate('/users');
      } catch (error) {
        console.error('Error adding travel', error.response?.data || error.message);
        alert(`Error: ${error.response?.data.message || error.message}`);
    }
  }
  
  const cancelDelete = () => {
    setIsPopuoVisble(false);
  }

  return (
    <div className="adduser">
      <Sidebar />
      <div className="container">
        <h1>Add User</h1>
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
          <label htmlFor="password">Passowrd</label>
          <input
            type="text"
            id="password"
            placeholder=""
            value={password}
            onChange={(event) => setpassword(event.target.value)}
            required
          />
          <input type="submit" value="Add User" />
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

export default AddUser;
