import React, { useState, useEffect } from "react";
import "./EditPrivateTrip.css";
import Sidebar from "../../components/Sidebar";
import Popup from '../../components/Popup';
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditPrivateTrip= () => {
  const { id } = useParams();

  const [status, setstatus] = useState("");
  const [note, setnote] = useState("");

  const [isPopupVisible, setIsPopuoVisble] = useState(false);

  const navigate = useNavigate();

  const sendData = (event) => {
    event.preventDefault();
    setIsPopuoVisble(true);
  };

  const confirmDelete = async () => {
    const token = localStorage.getItem('token');
    setIsPopuoVisble(false);
    if (!status || !note) {
      alert("All fields are required!");
      return;
    }
    let data = { status: status, note: note };
    try {
      const response = await axios.put(`https://jawak-wa-tareekak.onrender.com/jawak-wa-tareekak/manager/travels/private/${id}`,
        data, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      setstatus("");
      setnote("");
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
    <div className="edituser">
      <Sidebar />
      <div className="container">
        <h1>Edit Travel {id}</h1>
        <form onSubmit={sendData}>
          <label htmlFor="status">Status</label>
          <input
            type="text"
            id="status"
            placeholder=""
            value={status}
            onChange={(event) => setstatus(event.target.value)}
            required
          />
          <label htmlFor="note">Note</label>
          <input
            type="text"
            id="note"
            placeholder=""
            value={note}
            onChange={(event) => setnote(event.target.value)}
            required
          />
          <input type="submit" value="Add Travel" />
        </form>
      </div>
      {isPopupVisible && (
        <Popup 
          message="Are you sure you want to edit this private travel?"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
};

export default EditPrivateTrip;
