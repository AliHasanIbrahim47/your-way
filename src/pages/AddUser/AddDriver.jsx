import React, { useState, useEffect } from "react";
import "./AddDriver.css";
import Sidebar from "../../components/Sidebar";
import Popup from '../../components/Popup';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddDriver = () => {
  const [full_name, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [capacity, setCapacity] = useState("");
  const [line_id, setLineId] = useState("");
  const [lines, setLines] = useState([]); // State to store lines

  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [loading, setLoading] = useState(false); // Add loader state
  const [error, setError] = useState(null); // Add error state

  const navigate = useNavigate();

  const fetchLines = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('https://jawak-wa-tareekak.onrender.com/jawak-wa-tareekak/manager/lines', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setLines(response.data.data);
    } catch (error) {
      console.error('Error fetching lines', error);
    }
  };

  useEffect(() => {
    fetchLines();
  }, []);

  const sendData = (event) => {
    event.preventDefault();
    setIsPopupVisible(true);
  };

  const confirmDelete = async () => {
    const token = localStorage.getItem('token');
    setIsPopupVisible(false);
    if (!full_name || !phone || !password || !brand || !model || !capacity || !line_id) {
      alert("All fields are required!");
      return;
    }
    const data = { full_name, phone, password, brand, model, capacity, line_id };

    console.log("Data being sent:", data); // Debug logging

    setLoading(true); // Start loading
    setError(null); // Reset error state

    try {
      const response = await axios.post('https://jawak-wa-tareekak.onrender.com/jawak-wa-tareekak/manager/drivers', 
        data, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setFullName("");
      setPhone("");
      setPassword("");
      setBrand("");
      setModel("");
      setCapacity("");
      setLineId("");
      navigate('/users');
    } catch (error) {
      console.error('Error adding driver', error.response?.data || error.message);
      setError(error.response?.data?.message || error.message);
      // alert(`Error: ${error.response?.data?.message || error.message}`);
      alert("Error adding the driver  please try again");
    } finally {
      setLoading(false); // Stop loading
    }
  }

  const cancelDelete = () => {
    setIsPopupVisible(false);
  }

  return (
    <div className="addextra">
      <Sidebar />
      <div className="container">
        {loading ? (
          <div className="loader">adding Driver ...</div> // Display only the loading text
        ) : (
          <>
            <h1>Add Driver</h1>
            {/* {error && <p className="error">{error}</p>}  */}
            <form onSubmit={sendData}>
              <label htmlFor="full_name">Full Name</label>
              <input
                type="text"
                id="full_name"
                placeholder=""
                value={full_name}
                onChange={(event) => setFullName(event.target.value)}
                required
              />
              <label htmlFor="phone">Phone</label>
              <input
                type="number"
                id="phone"
                placeholder=""
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                required
              />
              <label htmlFor="password">Password</label>
              <input
                type="text"
                id="password"
                placeholder=""
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
              <label htmlFor="brand">Brand</label>
              <input
                type="text"
                id="brand"
                placeholder=""
                value={brand}
                onChange={(event) => setBrand(event.target.value)}
                required
              />
              <label htmlFor="model">Model</label>
              <input
                type="text"
                id="model"
                placeholder=""
                value={model}
                onChange={(event) => setModel(event.target.value)}
                required
              />
              <label htmlFor="capacity">Capacity</label>
              <input
                type="number"
                id="capacity"
                placeholder=""
                value={capacity}
                onChange={(event) => setCapacity(event.target.value)}
                required
              />
              <label htmlFor="line_id">Line</label>
              <select
                id="line_id"
                value={line_id}
                onChange={(event) => setLineId(event.target.value)}
                required
              >
                <option value="">Select Line</option>
                {lines.map((line) => (
                  <option key={line.id} value={line.id}>
                    from {line.point_a} to {line.point_b}
                  </option>
                ))}
              </select>
              <input type="submit" value="Add Driver" />
            </form>
            {isPopupVisible && (
              <Popup 
                message="Are you sure you want to add this driver?"
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

export default AddDriver;
