import React, { useState, useEffect } from "react";
import "./EditBrand.css";
import Sidebar from "../../components/Sidebar";
import Popup from '../../components/Popup';
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditBrand = () => {
  const [title_en, settitle_en] = useState("");
  const [image, setimage] = useState(null);
  const [title_ar, settitle_ar] = useState("");
  const [isPopupVisible, setIsPopuoVisble] = useState(false);

  const { id } = useParams();

  const navigate = useNavigate();

  const sendData = (event) => {
    event.preventDefault();
    setIsPopuoVisble(true);
  };

  const confirmDelete = async () => {
    const token = localStorage.getItem('token');
    setIsPopuoVisble(false);
    if (!title_en || !image || !title_ar) {
      alert("All fields are required!");
      return;
    }
    let data = { title_en: title_en, price: image, title_ar: title_ar };
    try {
      const response = await axios.put(`https://jawak-wa-tareekak.onrender.com/jawak-wa-tareekak/manager/banners/${id}`, {
        data
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      settitle_en("");
      setimage();
      settitle_ar("");
      navigate('/extra');
      } catch (error) {
      console.error('Error adding extra', error);
    }

  }
  
  const cancelDelete = () => {
    setIsPopuoVisble(false);
  }

  return (
    <div className="edituser">
      <Sidebar />
      <div className="container">
        <h1>Edit Banner: {id}</h1>
        <form onSubmit={sendData}>
          <label htmlFor="title_en">Title English</label>
          <input
            type="text"
            id="title_en"
            placeholder="Title in English"
            value={title_en}
            onChange={(event) => settitle_en(event.target.value)}
            required
          />
          <label htmlFor="title_ar">Title Arabic</label>
          <input
            type="text"
            id="title_ar"
            placeholder="Title in Arabic"
            value={title_ar}
            onChange={(event) => settitle_ar(event.target.value)}
            required
          />
          <label htmlFor="image">Image</label>
          <input
            type="file"
            id="image"
            placeholder="Image src"
            accept="image/*"
            // value={image}
            onChange={(event) => setimage(event.target.files[0])}
            required
          />
          <input type="submit" value="Edit Banner" />
        </form>
      </div>
      {isPopupVisible && (
        <Popup 
          message="Are you sure you want to edit this banner?"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
};

export default EditBrand;
