import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import './ShowUser.css';
import axios from 'axios';
import Spinner from "../../components/Spinner";
import { useTranslation } from 'react-i18next';
import Moment from 'react-moment';

const ShowUser = () => {
  const [t, i18n] = useTranslation("global");
  const [loader, setLoader] = useState(true);
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState([]);
  const [selectedType, setSelectedType] = useState('future');

  const token = localStorage.getItem('token');

  const { id } = useParams();
  const navigate = useNavigate();

  const baseURL = process.env.REACT_APP_URL;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${baseURL}/users`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const users = response.data.data;
        const foundUser = users.find(user => user.id.toString() === id);
        setUser(foundUser);
        setLoader(false);
      } catch (error) {
        console.error('Error fetching user', error);
        setLoader(false);
      }
    };
    fetchUser();
  }, [token, id, baseURL]);

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const url = selectedType === 'old'
          ? `https://jawakb.jawaktarekak.top/jawak-wa-tareekak/manager/travels/old/driver/${id}`
          : `https://jawakb.jawaktarekak.top/jawak-wa-tareekak/manager/travels/future/driver/${id}`;
        const response = await axios.get(url, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const data1 = response.data.data;
        setUserData(data1);
      } catch (error) {
        console.error('Error fetching user data', error);
      }
    };
    fetchUsersData();
  }, [selectedType, token, id]);

  useEffect(() => {
    console.log('Updated userData:', userData);
  }, [userData]);

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  if (loader) {
    return (
      <div className="showuser">
        <Sidebar />
        <div className="container">
          <h1 className="loader">{t("showuser.load")} <Spinner /></h1>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="showuser">
        <Sidebar />
        <div className="container">
          <h1>{t("showuser.found")}</h1>
        </div>
      </div>
    );
  }

  if (user.type === "user") {
    return (
      <div className="showuser">
        <Sidebar />
        <div className="container">
          <h1>{t("showuser.h1")}</h1>
          <div className="user-details">
            <p><strong>{t("showuser.name")}:</strong> {user.full_name}</p>
            <p><strong>{t("showuser.phone")}:</strong> {user.phone}</p>
          </div>
        </div>
      </div>
    );
  }

  if (user.type === "driver") {
    return (
      <div className="showuser">
        <Sidebar />
        <div className="container">
          <div className="head-driver">
            <h1>{t("users.driver")}</h1>
            <div className="filter">
              <label htmlFor="userType">{t("travels.filter")} </label>
              <select id="userType" value={selectedType} onChange={handleTypeChange}>
                <option value="future">{t("travels.future")}</option>
                <option value="old">{t("travels.old")}</option>
              </select>
            </div>
          </div>
          <div className="user-details">
            <p><strong>{t("showuser.name")}:</strong> {user.full_name}</p>
            <p><strong>{t("showuser.phone")}:</strong> {user.phone}</p>
            {/* {userData.travel.bus.brand && <p><strong>{t("addusers.brand")}:</strong> {userData.travel.bus.brand}</p>}
            {userData.travel.bus.model && <p><strong>{t("addusers.model")}:</strong> {userData.travel.bus.model}</p>}
            {userData.travel.bus.capacity && <p><strong>{t("addusers.capacity")}:</strong> {userData.travel.bus.capacity}</p>} */}
          </div>
          <div className="table-container">
            <h2>{t("travels.publicTravels")}</h2>
            <table>
              <thead>
                <tr>
                  <th>{t("travels.sDate")}</th>
                  <th>{t("travels.sTime")}</th>
                  <th>{t("travels.going_from")}</th>
                  <th>{t("travels.aDate")}</th>
                  <th>{t("travels.aTime")}</th>
                  <th>{t("travels.going_to")}</th>
                  <th>{t("extra.price")}</th>
                </tr>
              </thead>
              <tbody>
                {userData.map((element, index) => (
                  element.type === "public" ? (
                    <tr key={index}>
                      <td><Moment format="YYYY/MM/DD">{element.travel.starting_date}</Moment></td>
                      <td>{element.travel.going_time}</td>
                      <td>{element.travel.going_from}</td>
                      <td><Moment format="YYYY/MM/DD">{element.travel.ending}</Moment></td>                      
                      <td>{element.travel.returning_time}</td>
                      <td>{element.travel.returning_from}</td>
                      <td>{element.travel.price}</td>
                    </tr>
                  ) : (
                    null
                  )
                ))}
              </tbody>
            </table>
          </div>
          <div className="private-table">
          <div className="table-container">
            <h2>{t("travels.privateTravels")}</h2>
            <table>
              <thead>
                <tr>
                  <th>{t("travels.sDate")}</th>
                  <th>{t("travels.going_from")}</th>
                  <th>{t("travels.going_to")}</th>
                  <th>{t("travels.status")}</th>
                </tr>
              </thead>
              <tbody>
                {userData.map((element, index) => (
                  element.type === "private" ? (
                    <tr key={index}>
                      <td><Moment format="YYYY/MM/DD">{element.going_date}</Moment></td> 
                      <td>{element.going_from}</td>
                      <td>{element.going_to}</td>
                      <td>{element.status}</td>
                    </tr>
                  ) : (
                    null
                  )
                ))}
              </tbody>
            </table>
          </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default ShowUser;