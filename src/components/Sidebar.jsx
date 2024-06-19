import React, { useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../logo/pngAsset 6@4x.png";
import "./Sidebar.css";
import { FaUser, FaMap, FaGripLinesVertical } from "react-icons/fa";
import { PiFlagBannerFill } from "react-icons/pi";
import { IoLogOut } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../context/AuthContext';
import { MdHomeRepairService } from "react-icons/md";

const Sidebar = () => {
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
              <Link to="/travels">
                <FaMap className="icons-margin" />
                <span className="lll"> Travels</span>
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
                <span className="lll"> Banners</span>
              </Link>
            </li>
            <li>
              <Link to="/extra">
                <MdHomeRepairService  className="icons-margin" />
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
