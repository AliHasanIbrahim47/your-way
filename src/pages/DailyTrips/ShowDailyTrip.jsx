import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import { Link, useParams } from "react-router-dom";
import "./ShowDailyTrip.css";
import axios from "axios";
import Spinner from "../../components/Spinner";
import { useTranslation } from 'react-i18next';
import Moment from "react-moment";

const ShowDailyTrips = () => {
  const [t, i18n] = useTranslation("global");

  const { id } = useParams();

  const baseURL = process.env.REACT_APP_URL;

  const [users, setUsers] = useState([]); 
  const token = localStorage.getItem('token');

  const [loader, setLoader] = useState(true);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(baseURL + `/travels/${id}`, {
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

  if (users.length === 0) {
    return (
      <div className="showuser">
        <Sidebar />
        <div className="container">
          <h1>{t("travels.found")}</h1>
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
            <Link to="/lines">{t("driversOnly.back")}</Link>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>{t("travels.sDate")}</th>
              <th>{t("travels.sTime")}</th>
              <th>{t("travels.going_from")}</th>
              <th>{t("travels.aDate")}</th>
              <th>{t("travels.aTime")}</th>
              <th>{t("travels.going_to")}</th>
              <th>{t("travels.status")}</th>
            </tr>
          </thead>
          <tbody>
            {users.map((element, index) => (
              <tr key={index}>
                <td><Moment format="YYYY/MM/DD">{element.starting_date}</Moment></td>
                <td>{element.going_time}</td>
                <td>{element.going_from}</td>
                <td><Moment format="YYYY/MM/DD">{element.ending}</Moment></td>
                <td>{element.returning_time}</td>
                <td>{element.returning_from}</td>
                <td>{element.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShowDailyTrips;