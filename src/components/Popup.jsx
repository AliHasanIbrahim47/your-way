import React from "react";
import "./Popup.css";

const Popup = ({ message, onConfirm, onCancel }) => {
    return (
        <div className="popup-overlay">
        <div className="popup">
            <h2>{message}</h2>
            <div className="popup-buttons">
            <button onClick={onConfirm}>Yes</button>
            <button onClick={onCancel}>No</button>
            </div>
        </div>
        </div>
    );
};

export default Popup;