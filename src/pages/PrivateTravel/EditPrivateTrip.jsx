import React, { useState, useEffect } from "react";
import "./EditPrivateTrip.css";
import Sidebar from "../../components/Sidebar";
import Popup from '../../components/Popup';
import axios from "axios";
import { useNavigate, useParams, useLocation } from "react-router-dom";

const EditPrivateTrip = () => {
  const [status, setstatus] = useState("");
  const [note, setnote] = useState("");
  const [isPopupVisible, setIsPopuoVisble] = useState(false);
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    if (location.state && location.state.user) {
      const userData = JSON.parse(location.state.user);
      setstatus(userData.status);
    } else {
      // Handle scenario where user data is not passed correctly
      // alert("User data not found in location state");
    }
  }, [location.state]);

  const sendData = (event) => {
    event.preventDefault();
    setIsPopuoVisble(true);
  };

  const confirmDelete = async () => {
    const token = localStorage.getItem('token');
    setIsPopuoVisble(false);
    if (!note || !status) {
      alert("All fields are required!");
      return;
    }
    let data = { status: status, note: note };
    setLoading(true);
    try {
      const response = await axios.put(`https://jawak-wa-tareekak.onrender.com/jawak-wa-tareekak/manager/travels/private/${id}`, {
        status: status, note: note
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      setstatus("");
      setnote("");
      navigate('/travels/private');
      } catch (error) {
        alert("Error editing private travel please try again");
    } finally {
      setLoading(false);
    }
  }
  
  const cancelDelete = () => {
    setIsPopuoVisble(false);
  }

  return (
    <div className="editextra">
      <Sidebar />
      <div className="container">
      {loading ? (
          <div className="loader">Editing Private Travel ...</div> 
        ) : (
          <>
        <h1>Edit Line</h1>
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
          <input type="submit" value="Edit Private Travel" />
        </form>
        {isPopupVisible && (
              <Popup 
                message="Are you sure you want to edit this line?"
                onConfirm={confirmDelete}
                onCancel={cancelDelete}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default EditPrivateTrip;
