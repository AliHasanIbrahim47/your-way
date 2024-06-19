import React, { useState, useEffect } from "react";
import "./EditUser.css";
import Sidebar from "../../components/Sidebar";
import Popup from '../../components/Popup';
import axios from "axios";
import { useNavigate, useParams, useLocation  } from "react-router-dom";

const EditUser= () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [full_name, setFull_name] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [is_activated, setIs_activated] = useState("");
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (location.state && location.state.user) {
      const userData = JSON.parse(location.state.user);
      setFull_name(userData.full_name);
      setPhone(userData.phone);
      setPassword(userData.password);
      setIs_activated(userData.is_activated);
    } else {
      // Handle scenario where user data is not passed correctly
      // alert("User data not found in location state");
    }
  }, [location.state]);

  const sendData = (event) => {
    event.preventDefault();
    setIsPopupVisible(true);
  };

  const confirmDelete = async () => {
    const token = localStorage.getItem("token");
    setIsPopupVisible(false);
    if (!full_name || !phone || !password) {
      alert("All fields are required!");
      return;
    }
    const data = { full_name, phone, password, is_activated };
    setLoading(true);
    try {
      await axios.put(
        `https://jawak-wa-tareekak.onrender.com/jawak-wa-tareekak/manager/users/${id}`,
        data,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      navigate("/users");
    } catch (error) {
      console.error("Error updating user", error.response?.data || error.message);
      // alert(`Error: ${error.response?.data.message || error.message}`);
      alert("Error editing the user please try again");
    } finally {
      setLoading(false);
    }
  };

  const cancelDelete = () => {
    setIsPopupVisible(false);
  };

  return (
    <div className="edituser">
      <Sidebar />
      <div className="container">
      {loading ? (
          <div className="loader">Editing User ...</div> 
        ) : (
          <>
        <h1>Edit User {full_name}</h1>
        <form onSubmit={sendData}>
          <label htmlFor="full_name">Full Name</label>
          <input
            type="text"
            id="full_name"
            placeholder=""
            value={full_name}
            onChange={(event) => setFull_name(event.target.value)}
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
          <label htmlFor="is_activated">Is Activated</label>
          <input
            type="text"
            id="is_activated"
            placeholder=""
            value={is_activated}
            onChange={(event) => setIs_activated(event.target.value)}
            required
          />
          <input type="submit" value="Edit User" />
        </form>
      {isPopupVisible && (
        <Popup 
          message="Are you sure you want to edit this user?"
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

export default EditUser;
