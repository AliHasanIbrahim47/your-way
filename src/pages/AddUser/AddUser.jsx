import React, { useState } from "react";
import "./AddUser.css";
import Sidebar from "../../components/Sidebar";
import Popup from '../../components/Popup';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const AddUser = () => {
  const [t, i18n] = useTranslation("global");
  const [full_name, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const sendData = (event) => {
    event.preventDefault();
    setIsPopupVisible(true);
  };

  const confirmDelete = async () => {
    const token = localStorage.getItem('token');
    setIsPopupVisible(false);
    if (!full_name || !phone || !password) {
      alert("All fields are required!");
      return;
    }
    const data = { full_name: full_name, phone: phone, password: password };

    setLoading(true);
    setError(null); 

    try {
      const response = await axios.post('https://jawak-wa-tareekak.onrender.com/jawak-wa-tareekak/manager/users', 
        data, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setFullName("");
      setPhone("");
      setPassword("");
      alert("Adding User is successful");
      navigate('/users');
    } catch (error) {
      console.error('Error adding user', error.response?.data || error.message);
      setError(error.response?.data?.message || error.message);
      // alert(`Error: ${error.response?.data?.message || error.message}`);
      alert("Error adding the user please try again");
    } finally {
      setLoading(false);
    }
  }

  const cancelDelete = () => {
    setIsPopupVisible(false);
  }

  return (
    <div className="addextra">
      <Sidebar />
      <div className="container">
        {/* {loading ? (
          <div className="loader">Adding User ...</div> 
        ) : ( */}
          <>
            <h1>{t("addusers.h1")}</h1>
            {/* {error && <p className="error">{error}</p>} */}
            <form onSubmit={sendData}>
              <label htmlFor="full_name">{t("addusers.name")}</label>
              <input
                type="text"
                id="full_name"
                placeholder=""
                value={full_name}
                onChange={(event) => setFullName(event.target.value)}
                required
              />
              <label htmlFor="phone">{t("addusers.phone")}</label>
              <input
                type="number"
                id="phone"
                placeholder=""
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                required
              />
              <label htmlFor="password">{t("addusers.password")}</label>
              <input
                type="text"
                id="password"
                placeholder=""
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
              <input type="submit" value={loading ? t("addusers.adding") : t("addusers.add1")}  />
            </form>
            {isPopupVisible && (
              <Popup 
                message={t("addusers.message1")}
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

export default AddUser;
