import React, { useState, useEffect } from "react";
import "./EditLine.css";
import Sidebar from "../../components/Sidebar";
import Popup from '../../components/Popup';
import axios from "axios";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const EditLine = () => {
  const [t, i18n] = useTranslation("global");
  const [point_a, setpoint_a] = useState("");
  const [point_b, setpoint_b] = useState("");
  const [isPopupVisible, setIsPopuoVisble] = useState(false);
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  const navigate = useNavigate();

  const baseURL = process.env.REACT_APP_URL;

  useEffect(() => {
    if (location.state && location.state.user) {
      const userData = JSON.parse(location.state.user);
      setpoint_a(userData.point_a);
      setpoint_b(userData.point_b);
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
    if (!point_a || !point_b) {
      alert("All fields are required!");
      return;
    }
    let data = { point_a: point_a, point_b: point_b };
    setLoading(true);
    try {
      const response = await axios.put(baseURL + `/lines/${id}`, {
        point_a: point_a, point_b: point_b
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      setpoint_a("");
      setpoint_b("");
      alert("Editing Line is successful");
      navigate('/lines');
      } catch (error) {
        alert("Error editing extra please try again");
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
      {/* {loading ? (
          <div className="loader">Editing Line ...</div> 
        ) : ( */}
          <>
        <h1>{t("lines.edit")}</h1>
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
          <input type="submit"value={loading ? t("banners.editing") : t("lines.edit")}  />
        </form>
        {isPopupVisible && (
              <Popup 
                message={t("lines.editMessage")}
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

export default EditLine;
