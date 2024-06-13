import React, { useState } from "react";
import "./AddLine.css";
import Sidebar from "../../components/Sidebar";
import Popup from '../../components/Popup';
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const AddLine = () => {
  const [point_a, setpoint_a] = useState("");
  const [point_b, setpoint_b] = useState("");
  const [isPopupVisible, setIsPopuoVisble] = useState(false);

  const { id } = useParams();

  const navigate = useNavigate();

  const sendData = (event) => {
    event.preventDefault();
    setIsPopuoVisble(true);
  };

  const confirmDelete = async () => {
    const token = localStorage.getItem('token');
    setIsPopuoVisble(false);
    if (!point_a || !point_b) {
      alert("All fields are required!");
      return;
    }
    let data = { point_a: point_a, point_b: point_b };
    try {
      const response = await axios.put(`https://jawak-wa-tareekak.onrender.com/jawak-wa-tareekak/manager/lines/${id}`, {
        point_a: point_a, point_b: point_b
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      setpoint_a("");
      setpoint_b("");
      navigate('/lines');
      } catch (error) {
      console.error('Error adding line', error);
    }

  }
  
  const cancelDelete = () => {
    setIsPopuoVisble(false);
  }

  return (
    <div className="adduser">
      <Sidebar />
      <div className="container">
        <h1>Edit Line</h1>
        <form onSubmit={sendData}>
          <label htmlFor="point_a">Deprature Place</label>
          <input
            type="text"
            id="point_a"
            placeholder="Point A"
            value={point_a}
            onChange={(event) => setpoint_a(event.target.value)}
            required
          />
          <label htmlFor="point_b">Arrival Place</label>
          <input
            type="text"
            id="point_b"
            placeholder="Point B"
            value={point_b}
            onChange={(event) => setpoint_b(event.target.value)}
            required
          />
          <input type="submit" value="Edit Line" />
        </form>
      </div>
      {isPopupVisible && (
        <Popup 
          message="Are you sure you want to edit this line?"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
};

export default AddLine;
