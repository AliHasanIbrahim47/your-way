import React, { useState, useRef } from "react";
import "./AddBrand.css";
import Sidebar from "../../components/Sidebar";
import Popup from '../../components/Popup';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddBrand = () => {
  const [title_en, setTitleEn] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [title_ar, setTitleAr] = useState("");
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const imageInputRef = useRef(null);

  const navigate = useNavigate();

  const sendData = (event) => {
    event.preventDefault();
    setIsPopupVisible(true);
  };

  const confirmAdd = async () => {
    const token = localStorage.getItem('token');
    setIsPopupVisible(false);

    if (!title_en ||  !image || !title_ar) {
      alert("All fields are required!");
      return;
    }

    const formData = new FormData();
    formData.append('title_en', title_en);
    formData.append('image', image);
    formData.append('title_ar', title_ar);

    setLoading(true);

    try {
      await axios.post('https://jawak-wa-tareekak.onrender.com/jawak-wa-tareekak/manager/banners', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      setTitleEn("");
      setImage(null);
      setImagePreview(null);
      setTitleAr("");
      alert("Adding Banner is successful");
      navigate('/brands');
    } catch (error) {
      alert("Error adding banner, please try again");
    } finally {
      setLoading(false);
    }
  };

  const cancelAdd = () => {
    setIsPopupVisible(false);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
    imageInputRef.current.value = null;
  };

  return (
    <div className="addbanner">
      <Sidebar />
      <div className="container">
        {/* {loading ? (
          <div className="loader">Adding banner ...</div> 
        ) : ( */}
          <>
            <h1>Add Banner</h1>
            <form onSubmit={sendData}>
              <label htmlFor="title_en">Title English</label>
              <input
                type="text"
                id="title_en"
                value={title_en}
                onChange={(event) => setTitleEn(event.target.value)}
                required
              />
              <label htmlFor="title_ar">Title Arabic</label>
              <input
                type="text"
                id="title_ar"
                value={title_ar}
                onChange={(event) => setTitleAr(event.target.value)}
                required
              />
              <label htmlFor="image">Image</label>
              <input
                type="file"
                id="image"
                ref={imageInputRef}
                accept="image/*"
                onChange={handleImageChange}
                required
              />
              {imagePreview && (
                <div className="image-preview">
                  <img src={imagePreview} alt="Preview" />
                  <button type="button" onClick={removeImage}>Remove Image</button>
                </div>
              )}
              <input type="submit" value={loading ? "Adding..." : "Add Banner"}  />
            </form>
            {isPopupVisible && (
              <Popup 
                message="Are you sure you want to add this banner?"
                onConfirm={confirmAdd}
                onCancel={cancelAdd}
              />
            )}
          </>
        {/* )} */}
      </div>
    </div>
  );
};

export default AddBrand;