import React, { useState, useEffect } from "react";
import "./EditStatic.css";
import Sidebar from "../../components/Sidebar";
import Popup from '../../components/Popup';
import axios from "axios";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const EditStatic = () => {
  const [t, i18n] = useTranslation("global");
  const [description_en, setdescription_en] = useState("");
  const [description_ar, setdescription_ar] = useState("");
  const [content_en, setcontent_en] = useState("");
  const [content_ar, setcontent_ar] = useState("");
  const [isPopupVisible, setIsPopuoVisble] = useState(false);
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    if (location.state && location.state.user) {
      const userData = JSON.parse(location.state.user);
      setdescription_en(userData.description_en);
      setdescription_ar(userData.description_ar);
      setcontent_ar(userData.content_ar);
      setcontent_en(userData.content_en);
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
    if (!description_en || !description_ar || !content_ar || !content_ar || !content_en) {
      alert("All fields are required!");
      return;
    }
    let data = { description_en: description_en, description_ar: description_ar, content_ar: content_ar, content_en: content_en, is_show: false };
    setLoading(true);
    try {
      const response = await axios.put(`https://jawak-wa-tareekak.onrender.com/jawak-wa-tareekak/manager/static-contents/1`,
        data, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      alert("Editing Static is successful");
      navigate('/static');
      } catch (error) {
        alert("Error editing static please try again");
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
        <h1>{t("static.edit")}</h1>
        <form onSubmit={sendData}>
          <label htmlFor="description_en">{t("static.description_en")}</label>
          <input
            type="text"
            id="description_en"
            placeholder=""
            value={description_en}
            onChange={(event) => setdescription_en(event.target.value)}
            required
          />
          <label htmlFor="description_ar">{t("static.description_ar")}</label>
          <input
            type="text"
            id="description_ar"
            placeholder=""
            value={description_ar}
            onChange={(event) => setdescription_ar(event.target.value)}
            required
          />
          <label htmlFor="content_en">{t("static.content_en")}</label>
          <input
            type="text"
            id="content_en"
            placeholder=""
            value={content_en}
            onChange={(event) => setcontent_en(event.target.value)}
            required
          />
          <label htmlFor="content_ar">{t("static.content_ar")}</label>
          <input
            type="text"
            id="content_ar"
            placeholder=""
            value={content_ar}
            onChange={(event) => setcontent_ar(event.target.value)}
            required
          />
          <input type="submit"value={loading ? t("banners.editing") : t("static.edit")}  />
        </form>
        {isPopupVisible && (
              <Popup 
                message={t("static.editMessage")}
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

export default EditStatic;
