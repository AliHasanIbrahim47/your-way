import React from "react";
import { Link } from "react-router-dom";
import logo from "../logo/pngAsset 6@4x.png";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <img src={logo} alt="logo" />
      <ul>
        <li>
          <Link to="/users">Users</Link>
        </li>
        <li>
          <Link to='/login'>Logout</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
