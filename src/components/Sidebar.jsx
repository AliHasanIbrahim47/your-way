import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../logo/pngAsset 6@4x.png";
import "./Sidebar.css";
import { FaUser, FaCar, FaMap, FaGripLinesVertical } from "react-icons/fa";
import { PiFlagBannerFill } from "react-icons/pi";
import { IoLogOut } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Sidebar = () => {
  // const [isVisible, setIsVisible] = useState(true);

  // const toggleSidebar = () => {
  //   setIsVisible(!isVisible);
  // };
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const logutHandle = () => {
    logout();
    navigate('/manager/login');
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
                <span className="lll"> Users</span>
              </Link>
            </li>
            <li>
              <Link to="/drivers">
                <FaCar className="icons-margin" />
                <span className="lll"> Drivers</span>
              </Link>
            </li>
            <li>
              <Link to="/dailytrips">
                <FaMap className="icons-margin" />
                <span className="lll"> Daily Trips</span>
              </Link>
            </li>
            <li>
              <Link to="/lines">
                <FaGripLinesVertical className="icons-margin" />
                <span className="lll"> Lines</span>
              </Link>
            </li>
            <li>
              <Link to="/brands">
                <PiFlagBannerFill className="icons-margin" />
                <span className="lll"> Brands</span>
              </Link>
            </li>
            <li>
              <Link to="/extra">
                <PiFlagBannerFill className="icons-margin" />
                <span className="lll"> Extra</span>
              </Link>
            </li>
            <li>
              <button onClick={logutHandle}>
                <IoLogOut className="icons-margin" />
                <span className="lll"> Logout</span>
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
