import React, { useState, useEffect } from "react";
import "./AddPrivateTrip.css";
import Sidebar from "../../components/Sidebar";
import Popup from '../../components/Popup';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const AddPrivateTrip = () => {
  const [t, i18n] = useTranslation("global");
  const [going_date, setgoing_date] = useState("");
  const [going_from, setgoing_from] = useState("");
  const [going_to, setgoing_to] = useState("");
  const [bus_id, setbus_id] = useState();
  const [user_id, setuser_id] = useState();
  const [seats, setseats] = useState();
  const [loading, setLoading] = useState(false);
  const [drivers, setDrivers] = useState([]);
  const [users, setUsers] = useState([]);
  const [extras, setExtras] = useState([]);
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchDrivers();
    fetchUsers();
    fetchExtras();
  }, []);

  const fetchDrivers = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('https://jawak-wa-tareekak.onrender.com/jawak-wa-tareekak/manager/users/type?type=driver', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setDrivers(response.data.data);
    } catch (error) {
      console.error('Error fetching drivers', error);
    }
  };

  const fetchUsers = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('https://jawak-wa-tareekak.onrender.com/jawak-wa-tareekak/manager/users/', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setUsers(response.data.data);
    } catch (error) {
      console.error('Error fetching users', error);
    }
  };

  const fetchExtras = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('https://jawak-wa-tareekak.onrender.com/jawak-wa-tareekak/manager/extra', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setExtras(response.data.data);
    } catch (error) {
      console.error('Error fetching extras', error);
    }
  };

  const sendData = (event) => {
    event.preventDefault();
    setIsPopupVisible(true);
  };

  const confirmDelete = async () => {
    const token = localStorage.getItem('token');
    setIsPopupVisible(false);
    if (!going_date || !going_from || !going_to || !bus_id || !user_id || !seats) {
      alert("All fields are required!");
      return;
    }
    let data = {
      going_date: going_date,
      going_from: going_from,
      going_to: going_to,
      bus_id: bus_id,
      user_id: user_id,
      seats: seats,
      lat: "2.42",
      lon: "2.42",
      extra_ids: selectedExtras
    };
    setLoading(true);
    try {
      const response = await axios.post('https://jawak-wa-tareekak.onrender.com/jawak-wa-tareekak/manager/travels/private', 
        data, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      setgoing_date("");
      setgoing_from("");
      setgoing_to("");
      setbus_id();
      setuser_id();
      setseats();
      setSelectedExtras([]);
      alert("Adding Private Travel is successful");
      navigate('/travels/private');
    } catch (error) {
      alert("Error adding private travel please try again");
    } finally {
      setLoading(false);
    }
  }

  const cancelDelete = () => {
    setIsPopupVisible(false);
  }

  const handleExtraChange = (event) => {
    const value = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setSelectedExtras(value);
  };

  return (
    <div className="addextra">
      <Sidebar />
      <div className="container">
        {/* {loading ? (
          <div className="loader">Adding Private Travel ...</div> 
        ) : ( */}
          <>
            <h1>{t("private.add")}</h1>
            <form onSubmit={sendData}>
              <label htmlFor="going_date">{t("private.gDate")}</label>
              <input
                type="date"
                id="going_date"
                value={going_date}
                onChange={(event) => setgoing_date(event.target.value)}
                required
              />
              <label htmlFor="going_from">{t("private.going_from")}</label>
              <input
                type="text"
                id="going_from"
                value={going_from}
                onChange={(event) => setgoing_from(event.target.value)}
                required
              />
              <label htmlFor="going_to">{t("private.going_to")}</label>
              <input
                type="text"
                id="going_to"
                value={going_to}
                onChange={(event) => setgoing_to(event.target.value)}
                required
              />
              <label htmlFor="bus_id">{t("travels.car")}</label>
              <select
                id="bus_id"
                value={bus_id}
                onChange={(event) => setbus_id(event.target.value)}
                required
              >
                <option value="">{t("travels.sCar")}</option>
                {drivers.map(driver => (
                  driver.bus.map(bus => (
                    <option key={bus.id} value={bus.id}>
                      {`Driver: ${driver.full_name}, Car: ${bus.brand} ${bus.model}`}
                    </option>
                  ))
                ))}
              </select>
              <label htmlFor="user_id">{t("private.user")}</label>
              <select
                id="user_id"
                value={user_id}
                onChange={(event) => setuser_id(event.target.value)}
                required
              >
                <option value="">{t("private.userS")}</option>
                {users.map(user => (
                  <option key={user.id} value={user.id}>
                    {user.full_name}
                  </option>
                ))}
              </select>
              <label htmlFor="seats">{t("private.seats")}</label>
              <input
                type="number"
                id="seats"
                value={seats}
                onChange={(event) => setseats(event.target.value)}
                required
              />
              <label htmlFor="extras">{t("private.extraS")}</label>
              <select
                id="extras"
                multiple
                value={selectedExtras}
                onChange={handleExtraChange}
                
              >
                {extras.map(extra => (
                  <option key={extra.id} value={extra.id}>
                    {extra.title_en} {extra.price}
                  </option>
                ))}
              </select>
              <input type="submit" value={loading ? t("addusers.adding"): t("private.add")} />
            </form>
            {isPopupVisible && (
              <Popup 
                message={t("private.addMessage")}
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

export default AddPrivateTrip;
