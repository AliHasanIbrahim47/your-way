import React, { useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../logo/pngAsset 6@4x.png";
import "./Sidebar.css";
import { FaUser, FaMap, FaGripLinesVertical } from "react-icons/fa";
import { PiFlagBannerFill } from "react-icons/pi";
import { IoLogOut } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { MdContentPaste } from "react-icons/md";

import { AuthContext } from '../context/AuthContext';
import { MdHomeRepairService } from "react-icons/md";

const Sidebar = () => {
  const [t, i18n] = useTranslation("global");
  // const [isVisible, setIsVisible] = useState(true);

  // const toggleSidebar = () => {
  //   setIsVisible(!isVisible);
  // };
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const logutHandle = () => {
    logout();
    navigate('/');
  }

  const handleChangeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  }

  return (
    <div>
      {/* <button className="toggle-button" onClick={toggleSidebar}>
        {isVisible ? "Hide" : "Show"}
      </button> */}
      {true && (
        <div className="sidebar">
          <img src={logo} alt="logo" />
          <ul>
            <li>
              <Link to="/users">
                <FaUser className="icons-margin" />
                <span className="lll"> {t("users.users")}</span>
              </Link>
            </li>
            <li>
              <Link to="/travels">
                <FaMap className="icons-margin" />
                <span className="lll"> {t("users.travels")}</span>
              </Link>
            </li>
            <li>
              <Link to="/lines">
                <FaGripLinesVertical className="icons-margin" />
                <span className="lll"> {t("users.lines")}</span>
              </Link>
            </li>
            <li>
              <Link to="/brands">
                <PiFlagBannerFill className="icons-margin" />
                <span className="lll"> {t("users.banners")}</span>
              </Link>
            </li>
            <li>
              <Link to="/extra">
                <MdHomeRepairService  className="icons-margin" />
                <span className="lll"> {t("users.extra")}</span>
              </Link>
            </li>
            <li>
              <Link to="/static">
                <MdContentPaste  className="icons-margin" />
                <span className="lll"> {t("users.static")}</span>
              </Link>
            </li>
            <li>
              <div className="lang">
                <button onClick={() => handleChangeLanguage("en")}>{t("lng.en")}</button>
                <button onClick={() => handleChangeLanguage("ar")}>{t("lng.ar")}</button>
              </div>
            </li>
            <li>
              <button onClick={logutHandle}>
                <IoLogOut className="icons-margin" />
                <span className="lll"> {t("users.logout")}</span>
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
