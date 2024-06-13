import React, { useState, useEffect } from "react";
import "./AddBrand.css";
import Sidebar from "../../components/Sidebar";
import Popup from '../../components/Popup';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddBrand = () => {
  const [title_en, settitle_en] = useState("");
  const [image, setimage] = useState(null);
  const [title_ar, settitle_ar] = useState("");
  const [isPopupVisible, setIsPopuoVisble] = useState(false);

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
    let data = { title_en: title_en, image: image, title_ar: title_ar}

    try {
      const response = await axios.post('https://jawak-wa-tareekak.onrender.com/jawak-wa-tareekak/manager/banners', {
        data
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      settitle_en("");
      setimage(null);
      settitle_ar("");
      navigate('/banners');
      } catch (error) {
      console.error('Error adding banner', error);
    }

  }
  
  const cancelDelete = () => {
    setIsPopuoVisble(false);
  }

  return (
    <div className="adduser">
      <Sidebar />
      <div className="container">
        <h1>Add Banner</h1>
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
          <input type="submit" value="Add Banner" />
        </form>
      </div>
      {isPopupVisible && (
        <Popup 
          message="Are you sure you want to add this banner?"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
};

export default AddBrand;
