import React, { useState, useEffect } from "react";
import "./AddDailyTrip.css";
import Sidebar from "../../components/Sidebar";
import Popup from '../../components/Popup';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddDailyTrip = () => {
  const [starting_date, setstarting_date] = useState("");
  const [going_from, setgoing_from] = useState("");
  const [ending_date, setending_date] = useState("");
  const [bus_id, setbus_id] = useState("");
  const [line_id, setline_id] = useState(null);
  const [type, settype] = useState("");
  const [status, setstatus] = useState();
  const [returning_from, setreturning_from] = useState("");
  const [going_time, setgoing_time] = useState("");
  const [returning_time, setreturning_time] = useState("");

  const [isPopupVisible, setIsPopuoVisble] = useState(false);

  const navigate = useNavigate();

  const sendData = (event) => {
    event.preventDefault();
    setIsPopuoVisble(true);
  };

  const confirmDelete = async () => {
    const token = localStorage.getItem('token');
    setIsPopuoVisble(false);
    if (!starting_date || !going_from || !ending_date || !bus_id || !line_id 
        || !status || !returning_from || !going_time || !returning_time) {
      alert("All fields are required!");
      return;
    }
    let data = { starting_date: starting_date, going_from: going_from, 
      ending_date: ending_date, bus_id: bus_id, 
      line_id: line_id, type: type, status: status , returning_from: returning_from,
      going_time: going_time, returning_time: returning_time };
      console.log(data);
    try {
      const response = await axios.post('https://jawak-wa-tareekak.onrender.com/jawak-wa-tareekak/manager/travels/', 
        data, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      setstarting_date("");
      setgoing_from("");
      setending_date("");
      setbus_id(null);
      setline_id(null);
      settype("");
      setstatus("");
      setreturning_time("");
      setgoing_time("");
      setreturning_from("");
      console.log(response);
      navigate('/travels');
      } catch (error) {
        console.error('Error adding travel', error.response?.data || error.message);
        alert(`Error: ${error.response?.data.message || error.message}`);
    }
  }

  const cancelDelete = () => {
    setIsPopuoVisble(false);
  }

  return (
    <div className="adddailytrip">
      <Sidebar />
      <div className="container">
        <h1>Add Travel</h1>
        <form onSubmit={sendData}>
          <label htmlFor="starting_date">Starting Date</label>
          <input
            type="date"
            id="starting_date"
            placeholder=""
            value={starting_date}
            onChange={(event) => setstarting_date(event.target.value)}
            required
          />
          <label htmlFor="ending_date">Ending Date</label>
          <input
            type="date"
            id="ending_date"
            placeholder=""
            value={ending_date}
            onChange={(event) => setending_date(event.target.value)}
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
          <label htmlFor="returning_from">Returning From</label>
          <input
            type="text"
            id="returning_from"
            placeholder=""
            value={returning_from}
            onChange={(event) => setreturning_from(event.target.value)}
            required
          />
          <label htmlFor="going_time">Going Time</label>
          <input
            type="time"
            id="going_time"
            placeholder=""
            value={going_time}
            onChange={(event) => setgoing_time(event.target.value)}
            required
          />
          <label htmlFor="returning_time">Returning Time</label>
          <input
            type="time"
            id="returning_time"
            placeholder=""
            value={returning_time}
            onChange={(event) => setreturning_time(event.target.value)}
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
          <label htmlFor="line_id">Line ID</label>
          <input
            type="number"
            id="line_id"
            placeholder=""
            value={line_id}
            onChange={(event) => setline_id(event.target.value)}
            required
          />
          <label htmlFor="type">Type</label>
          <input
            type="text"
            id="type"
            placeholder=""
            value={type}
            onChange={(event) => settype(event.target.value)}
          />
          <label htmlFor="status">Status</label>
          <input
            type="text"
            id="status"
            placeholder=""
            value={status}
            onChange={(event) => setstatus(event.target.value)}
            required
          />
          <input type="submit" value="Add Travel" />
        </form>
      </div>
      {isPopupVisible && (
        <Popup 
          message="Are you sure you want to add this Travel?"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
};

export default AddDailyTrip;
