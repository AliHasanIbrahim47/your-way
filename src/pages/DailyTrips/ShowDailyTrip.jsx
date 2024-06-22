import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import { Link, useParams } from "react-router-dom";
import "./ShowDailyTrip.css";
import axios from "axios";
import Spinner from "../../components/Spinner";
import { useTranslation } from 'react-i18next';

const ShowDailyTrips = () => {
  const [t, i18n] = useTranslation("global");

  const { id } = useParams();

  const [users, setUsers] = useState([]); 
  const token = localStorage.getItem('token');

  const [loader, setLoader] = useState(true);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`https://jawak-wa-tareekak.onrender.com/jawak-wa-tareekak/manager/travels/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (Array.isArray(response.data.data)) {
        setUsers(response.data.data);
        setLoader(false);
      } else {
        console.error('Response data is not an array');
      }
    } catch (error) {
      console.error('Error fetching travels', error);
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [token]);

  if (loader) {
    return (
      <div className="showuser">
        <Sidebar />
        <div className="container loader">
          <h1>{t("showuser.load")}</h1>
          <Spinner />
        </div>
      </div>
    );
  }

  return (
    <div className="users">
      <Sidebar />
      <div className="container">
        <div className="header">
          <h1>{t("travels.travelLineShow")}:</h1>
          <div className="links">
            <Link to="/travels">{t("driversOnly.back")}</Link>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>{t("usersOnly.id")}</th>
              <th>{t("travels.going_from")}</th>
              <th>{t("travels.going_to")}</th>
            </tr>
          </thead>
          <tbody>
            {users.map((element, index) => (
              <tr key={index}>
                <td>{element.line.id}</td>       
                <td>{element.line.point_a}</td>                
                <td>{element.line.point_b}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShowDailyTrips;