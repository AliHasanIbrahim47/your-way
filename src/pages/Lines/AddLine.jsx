import React, { useState, useEffect } from "react";
import "./AddLine.css";
import Sidebar from "../../components/Sidebar";
import Popup from '../../components/Popup';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const AddLine = () => {
  const [t, i18n] = useTranslation("global");
  const [point_a, setpoint_a] = useState("");
  const [point_b, setpoint_b] = useState("");
  const [isPopupVisible, setIsPopuoVisble] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const baseURL = process.env.REACT_APP_URL;

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
    setLoading(true);
    try {
      const response = await axios.post(baseURL + '/lines', {
        point_a: point_a, point_b: point_b
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      setpoint_a("");
      setpoint_b("");
      alert("Adding Line is successful");
      navigate('/lines');
      } catch (error) {
        alert("Error adding line please try again");
    }  finally {
      setLoading(false);
    }
  }
  
  const cancelDelete = () => {
    setIsPopuoVisble(false);
  }

  return (
    <div className="addextra">
      <Sidebar />
      <div className="container">
      {/* {loading ? (
          <div className="loader">Adding Line ...</div> 
        ) : ( */}
          <>
        <h1>{t("lines.add")}</h1>
        <form onSubmit={sendData}>
          <label htmlFor="point_a">{t("lines.dPlace")}</label>
          <input
            type="text"
            id="point_a"
            placeholder=""
            value={point_a}
            onChange={(event) => setpoint_a(event.target.value)}
            required
          />

          <label htmlFor="point_b">{t("lines.aPlace")}</label>
          <input
            type="text"
            id="point_b"
            placeholder=""
            value={point_b}
            onChange={(event) => setpoint_b(event.target.value)}
            required
          />

          <input type="submit"  value={loading ? t("addusers.adding") : t("lines.add")}  />
        </form>
      {isPopupVisible && (
        <Popup 
          message={t("lines.addMessage")}
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

export default AddLine;
