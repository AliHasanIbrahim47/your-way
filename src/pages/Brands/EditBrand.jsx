import React, { useState, useEffect } from "react";
import "./EditBrand.css";
import Sidebar from "../../components/Sidebar";
import Popup from '../../components/Popup';
import axios from "axios";
import { useNavigate, useParams, useLocation } from "react-router-dom";

const EditBrand = () => {
  const [title_en, settitle_en] = useState("");
  const [image, setimage] = useState(null);
  const [title_ar, settitle_ar] = useState("");
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const location = useLocation();
  const [loading, setLoading] = useState(false);

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
      settitle_ar("");
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

  return (
    <div className="edituser">
      <Sidebar />
      <div className="container">
      {loading ? (
          <div className="loader">Editing banner ...</div> 
        ) : (
          <>
        <h1>Edit Banner</h1>
        <form onSubmit={sendData}>
          <label htmlFor="title_en">Title English</label>
          <input
            type="text"
            id="title_en"
            placeholder=""
            value={title_en}
            onChange={(event) => settitle_en(event.target.value)}
            required
          />
          <label htmlFor="title_ar">Title Arabic</label>
          <input
            type="text"
            id="title_ar"
            placeholder=""
            value={title_ar}
            onChange={(event) => settitle_ar(event.target.value)}
            required
          />
          <label htmlFor="image">Image</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={(event) => setimage(event.target.files[0])}
          />
          <input type="submit" value="Edit Banner" />
        </form>
        {isPopupVisible && (
              <Popup 
                message="Are you sure you want to edit this banner?"
                onConfirm={confirmEdit}
                onCancel={cancelEdit}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default EditBrand;
