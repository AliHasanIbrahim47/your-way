import React, { useState, useEffect } from "react";
import "./AddDriver.css";
import Sidebar from "../../components/Sidebar";
import Popup from '../../components/Popup';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const AddDriver = () => {
  const [t, i18n] = useTranslation("global");
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

  const baseURL = process.env.REACT_APP_URL;

  const fetchLines = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(baseURL + '/lines', {
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
      const response = await axios.post(baseURL + '/drivers', 
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
      alert("Adding Driver is successful");
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
        {/* {loading ? (
          <div className="loader">adding Driver ...</div>
        ) : ( */}
          <>
            <h1>{t("addusers.h2")}</h1>
            {/* {error && <p className="error">{error}</p>}  */}
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
              <label htmlFor="brand">{t("addusers.brand")}</label>
              <input
                type="text"
                id="brand"
                placeholder=""
                value={brand}
                onChange={(event) => setBrand(event.target.value)}
                required
              />
              <label htmlFor="model">{t("addusers.model")}</label>
              <input
                type="text"
                id="model"
                placeholder=""
                value={model}
                onChange={(event) => setModel(event.target.value)}
                required
              />
              <label htmlFor="capacity">{t("addusers.capacity")}</label>
              <input
                type="number"
                id="capacity"
                placeholder=""
                value={capacity}
                onChange={(event) => setCapacity(event.target.value)}
                required
              />
              <label htmlFor="line_id">{t("addusers.line")}</label>
              <select
                id="line_id"
                value={line_id}
                onChange={(event) => setLineId(event.target.value)}
                required
              >
                <option value="">{t("addusers.sline")}</option>
                {lines.map((line) => (
                  <option key={line.id} value={line.id}>
                    from {line.point_a} to {line.point_b}
                  </option>
                ))}
              </select>
              <input type="submit" value={loading ? t("addusers.adding") : t("addusers.add2")} />
            </form>
            {isPopupVisible && (
              <Popup 
                message={t("addusers.message2")}
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

export default AddDriver;
