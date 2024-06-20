import React, { useState, useEffect } from "react";
import "./AddExtra.css";
import Sidebar from "../../components/Sidebar";
import Popup from '../../components/Popup';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddExtra = () => {
  const [title_en, settitle_en] = useState("");
  const [price, setprice] = useState(null);
  const [title_ar, settitle_ar] = useState("");
  const [isPopupVisible, setIsPopuoVisble] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

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
      const response = await axios.post('https://jawak-wa-tareekak.onrender.com/jawak-wa-tareekak/manager/extra', {
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
      alert("Adding Extra is successful");
      navigate('/extra');
      } catch (error) {
        alert("Error adding extra please try again");
    } finally {
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
          <div className="loader">Adding Extra ...</div> 
        ) : ( */}
          <>
        <h1>Add Extra</h1>
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
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            placeholder=""
            value={price}
            onChange={(event) => setprice(event.target.value)}
            required
          />
          <input type="submit" value={loading ? "Adding..." : "Add Extra"} />
        </form>
        {isPopupVisible && (
              <Popup 
                message="Are you sure you want to add this extra?"
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

export default AddExtra;
