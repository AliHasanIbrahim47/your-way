import React, { useState, useEffect, useRef } from "react";
import "./EditBrand.css";
import Sidebar from "../../components/Sidebar";
import Popup from '../../components/Popup';
import axios from "axios";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const EditBrand = () => {
  const [t, i18n] = useTranslation("global");
  const [title_en, settitle_en] = useState("");
  const [image, setimage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [title_ar, settitle_ar] = useState("");
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const imageInputRef = useRef(null);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state && location.state.user) {
      const userData = JSON.parse(location.state.user);
      settitle_en(userData.title_en);
      settitle_ar(userData.title_ar);
    } else {
      alert("User data not found in location state");
    }
  }, [location.state]);

  const sendData = (event) => {
    event.preventDefault();
    setIsPopupVisible(true);
  };

  const confirmEdit = async () => {
    const token = localStorage.getItem('token');
    setIsPopupVisible(false);

    if (!title_en || !title_ar) {
      alert("All fields are required!");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append('title_en', title_en);
    if (image) {
      formData.append('image', image);
    }
    formData.append('title_ar', title_ar);

    try {
      await axios.put(`https://jawak-wa-tareekak.onrender.com/jawak-wa-tareekak/manager/banners/${id}`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      settitle_en("");
      setimage(null);
      setImagePreview(null);
      settitle_ar("");
      alert("Editing Banner is successful");
      navigate('/brands');
    } catch (error) {
      alert("Error editing banner, please try again");
    } finally {
      setLoading(false);
    }
  };

  const cancelEdit = () => {
    setIsPopupVisible(false);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setimage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setimage(null);
    setImagePreview(null);
    imageInputRef.current.value = null;
  };

  return (
    <div className="editbanner">
      <Sidebar />
      <div className="container">
        {/* {loading ? (
          <div className="loader">Editing banner ...</div> 
        ) : ( */}
          <>
            <h1>{t("banners.edit")}</h1>
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
              <label htmlFor="image">{t("banners.image")}</label>
              <input
                type="file"
                id="image"
                ref={imageInputRef}
                accept="image/*"
                onChange={handleImageChange}
              />
              {imagePreview && (
                <div className="image-preview">
                  <img src={imagePreview} alt="Preview" />
                  <button type="button" onClick={removeImage}>{t("banners.remove")}</button>
                  </div>
              )}
              <input type="submit" value={loading ? t("banners.editing") : t("banners.edit")} />
            </form>
            {isPopupVisible && (
              <Popup 
                message={t("banners.editMessage")}
                onConfirm={confirmEdit}
                onCancel={cancelEdit}
              />
            )}
          </>
        {/* )} */}
      </div>
    </div>
  );
};

export default EditBrand;