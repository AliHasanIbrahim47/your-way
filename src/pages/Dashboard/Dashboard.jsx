import React from 'react';
import Sidebar from '../../components/Sidebar';
import manager_avatar from "../../logo/manager.png";
import "./Dashboard.css";
import Home from "../../components/Home";
import { useTranslation } from 'react-i18next';

export default function Dashboard() {
    const [t, i18n] = useTranslation("global");

    const handleChangeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    }

    return (
        <div className='dash'>
            <Sidebar />
            <div className="container">
                <img src={manager_avatar} alt="Manager Avatar" />
            </div>
            <div className="container">
                <Home />
                <button onClick={() => handleChangeLanguage("en")}>EN</button>
                <button onClick={() => handleChangeLanguage("ar")}>AR</button>
            </div>
        </div>
    );
};
