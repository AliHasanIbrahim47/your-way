import React, { useState, useEffect } from "react";
import "./EditPrivateTrip.css";
import Sidebar from "../../components/Sidebar";
import Popup from '../../components/Popup';
import axios from "axios";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const EditPrivateTrip = () => {
  const [t, i18n] = useTranslation("global");
  const [status, setstatus] = useState("");
  const [note, setnote] = useState("");
  const [isPopupVisible, setIsPopuoVisble] = useState(false);
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  const [users, setUsers] = useState([]);
  const [bus_id, setbus_id] = useState("");
  const [selectedStatus, setSelectedStatus] = useState('accepted');

  const baseURL = process.env.REACT_APP_URL;

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(baseURL + '/users/type?type=driver', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setUsers(response.data.data);
    } catch (error) {
      console.error('Error fetching users');
    }
  };

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
    if (!status) {
      alert("All fields are required!");
      return;
    }
    let data = { status: status, note: note, bus_id : bus_id };
    setLoading(true);
    try {
      const response = await axios.put(baseURL + `/travels/private/${id}`,
        data , {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      setstatus("");
      setnote("");
      alert("Editing Private Travel is successful");
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

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  return (
    <div className="editextra">
      <Sidebar />
      <div className="container">
      {/* {loading ? (
          <div className="loader">Editing Private Travel ...</div> 
        ) : ( */}
          <>
        <h1>{t("private.edit")}</h1>
        <form onSubmit={sendData}>
          {/* <label htmlFor="status">{t("travels.Status")}</label>
          <input
            type="text"
            id="status"
            placeholder=""
            value={status}
            onChange={(event) => setstatus(event.target.value)}
            required
          /> */}
          <label htmlFor="selectedStatus">{t("travels.status")} </label>
          <select id="selectedStatus" value={selectedStatus} onChange={handleStatusChange}>
            <option value="accepted">{t("reservations.accepted")}</option>
            <option value="rejected">{t("reservations.rejected")}</option>
          </select>
          {selectedStatus === "rejected" && <>
            <label htmlFor="note">{t("reservations.note")}</label>
          <input
            type="text"
            id="note"
            placeholder=""
            value={note}
            onChange={(event) => setnote(event.target.value)}
            required
          /></>}
          {selectedStatus === "accepted" && <>
            <label htmlFor="bus_id">{t("travels.car")}</label>
          <select
            id="bus_id"
            value={bus_id}
            onChange={(event) => setbus_id(event.target.value)}
            required
          >
            <option value="">{t("travels.sCar")}</option>
            {users.map(user => (
              user.bus.map(bus => (
                <option key={bus.id} value={bus.id}>
                  {`${bus.brand} ${bus.model}`}
                </option>
              ))
            ))}
          </select></>}
          <input type="submit" value={loading ? t("editusers.editing") : t("private.edit")} />
        </form>
        {isPopupVisible && (
              <Popup 
                message={t("private.editMessage")}
                onConfirm={confirmDelete}
                onCancel={cancelDelete}
              />
            )}
          </>
        {/* )} */}
      </div>
    </div>
  );
};

export default EditPrivateTrip;
