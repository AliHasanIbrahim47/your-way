import React, { useState, useEffect } from "react";
import "./EditExtra.css";
import Sidebar from "../../components/Sidebar";
import Popup from '../../components/Popup';
import axios from "axios";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const EditExtra = () => {
  const [t, i18n] = useTranslation("global");
  const [title_en, settitle_en] = useState("");
  const [price, setprice] = useState(null);
  const [title_ar, settitle_ar] = useState("");
  const [isPopupVisible, setIsPopuoVisble] = useState(false);
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  const navigate = useNavigate();

  const baseURL = process.env.REACT_APP_URL;

  useEffect(() => {
    if (location.state && location.state.user) {
      const userData = JSON.parse(location.state.user);
      settitle_en(userData.title_en);
      setprice(userData.price);
      settitle_ar(userData.title_ar);
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
    if (!title_en || !price || !title_ar) {
      alert("All fields are required!");
      return;
    }
    let data = { title_en: title_en, price: price, title_ar: title_ar };
    setLoading(true);
    try {
      await axios.put(baseURL + `/extra/${id}`, {
        title_en: title_en , title_ar: title_ar, price: price
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      settitle_en("");
      setprice("");
      settitle_ar("");
      alert("Editing Extra is successful");
      navigate('/extra');
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
          <div className="loader">Adding Extra ...</div> 
        ) : ( */}
          <>
        <h1>{t("extra.edit")}</h1>
        <form onSubmit={sendData}>
          <label htmlFor="title_en">{t("banners.titleEn")}</label>
          <input
            type="text"
            id="title_en"
            placeholder=""
            value={title_en}
            onChange={(event) => settitle_en(event.target.value)}
            required
          />
          <label htmlFor="title_ar">{t("banners.titleAr")}</label>
          <input
            type="text"
            id="title_ar"
            placeholder=""
            value={title_ar}
            onChange={(event) => settitle_ar(event.target.value)}
            required
          />
          <label htmlFor="price">{t("extra.price")}</label>
          <input
            type="number"
            id="price"
            placeholder=""
            value={price}
            onChange={(event) => setprice(event.target.value)}
            required
          />
          <input type="submit" value={loading ? t("banners.editing") : t("extra.edit")} />
        </form>
        {isPopupVisible && (
              <Popup 
                message={t("extra.editMessage")}
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

export default EditExtra;
