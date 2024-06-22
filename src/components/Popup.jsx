import React from "react";
import "./Popup.css";
import { useTranslation } from "react-i18next";

const Popup = ({ message, onConfirm, onCancel }) => {
    const [t, i18n] = useTranslation("global");
    return (
        <div className="popup-overlay">
        <div className="popup">
            <h2>{message}</h2>
            <div className="popup-buttons">
            <button onClick={onConfirm}>{t("popup.yes")}</button>
            <button onClick={onCancel}>{t("popup.no")}</button>
            </div>
        </div>
        </div>
    );
};

export default Popup;