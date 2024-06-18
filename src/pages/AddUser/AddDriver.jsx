import React, { useState } from "react";
import "./AddDriver.css";
import Sidebar from "../../components/Sidebar";
import Popup from '../../components/Popup';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddDriver = () => {
  const [full_name, setfull_name] = useState("");
  const [phone, setphone] = useState();
  const [password, setpassword] = useState("");
  const [brand, setbrand] = useState("");
  const [model, setmodel] = useState();
  const [capacity, setcapacity] = useState();
  const [line_id, setline_id] = useState();

  const [isPopupVisible, setIsPopuoVisble] = useState(false);

  const navigate = useNavigate();

  const sendData = (event) => {
    event.preventDefault();
    setIsPopuoVisble(true);
  };

  const confirmDelete = async () => {
    const token = localStorage.getItem('token');
    setIsPopuoVisble(false);
    if (!full_name || !phone || !password || !brand || !model || !capacity || !line_id) {
      alert("All fields are required!");
      return;
    }
    let data = { full_name: full_name, phone: phone, password: password, 
        brand: brand, model: model, capacity: capacity, line_id: line_id
    };
    try {
      const response = await axios.post('https://jawak-wa-tareekak.onrender.com/jawak-wa-tareekak/manager/drivers', 
        data, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setfull_name("");
      setphone();
      setpassword("");
      setbrand("");
      setmodel();
      setcapacity();
      setline_id();
      navigate('/users');
      } catch (error) {
        console.error('Error adding driver', error.response?.data || error.message);
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
        <h1>Add Driver</h1>
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

        <label htmlFor="brand">Brand</label>
          <input
            type="text"
            id="brand"
            placeholder=""
            value={brand}
            onChange={(event) => setbrand(event.target.value)}
            required
          />
          <label htmlFor="model">Model</label>
          <input
            type="number"
            id="model"
            placeholder=""
            value={model}
            onChange={(event) => setmodel(event.target.value)}
            required
          />
          <label htmlFor="capacity">Capacity</label>
          <input
            type="number"
            id="capacity"
            placeholder=""
            value={capacity}
            onChange={(event) => setcapacity(event.target.value)}
            required
          />
          <label htmlFor="line_id">Line ID</label>
          <input
            type="number"
            id="line_id"
            placeholder=""
            value={line_id}
            onChange={(event) => setline_id(event.target.value)}
            required
          />
          <input type="submit" value="Add Driver" />
        </form>
      </div>
      {isPopupVisible && (
        <Popup 
          message="Are you sure you want to edit this driver?"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
};

export default AddDriver;
