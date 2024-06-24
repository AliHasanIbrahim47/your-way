import React, { useState, useEffect } from "react";
import "./AddDailyTrip.css";
import Sidebar from "../../components/Sidebar";
import Popup from '../../components/Popup';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const AddDailyTrip = () => {
  const [t, i18n] = useTranslation("global");
  const [starting_date, setstarting_date] = useState("");
  const [going_from, setgoing_from] = useState("");
  const [ending_date, setending_date] = useState("");
  const [bus_id, setbus_id] = useState("");
  const [line_id, setline_id] = useState(null);
  // const [type, settype] = useState("");
  const [status, setstatus] = useState();
  const [returning_from, setreturning_from] = useState("");
  const [going_time, setgoing_time] = useState("");
  const [returning_time, setreturning_time] = useState("");
  const [starting_pool, setstarting_pool] = useState("");
  const [returning_pool, setreturning_pool] = useState("");
  const [price, setPrice] = useState();
  const [loading, setLoading] = useState(false);

  const [users, setUsers] = useState([]); // State for buses
  const [lines, setLines] = useState([]); // State for lines

  const [isPopupVisible, setIsPopuoVisble] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
    fetchLines();
  }, []);

  const fetchUsers = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('https://jawak-wa-tareekak.onrender.com/jawak-wa-tareekak/manager/users/type?type=driver', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setUsers(response.data.data);
    } catch (error) {
      console.error('Error fetching users');
    }
  };

  const fetchLines = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('https://jawak-wa-tareekak.onrender.com/jawak-wa-tareekak/manager/lines', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setLines(response.data.data);
    } catch (error) {
      console.error('Error fetching lines');
    }
  };

  const sendData = (event) => {
    event.preventDefault();
    setIsPopuoVisble(true);
  };

  const confirmDelete = async () => {
    const token = localStorage.getItem('token');
    setIsPopuoVisble(false);
    if (!starting_date || !going_from || !ending_date || !bus_id || !line_id 
        || !status || !returning_from || !going_time || !returning_time) {
      alert("All fields are required!");
      return;
    }
    let data = { price, starting_date, starting_pool, returning_pool, going_from, ending_date, bus_id, line_id, type:'public', status, returning_from, going_time, returning_time };
    setLoading(true);
    try {
      const response = await axios.post('https://jawak-wa-tareekak.onrender.com/jawak-wa-tareekak/manager/travels/', 
        data, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      setstarting_date("");
      setgoing_from("");
      setending_date("");
      setbus_id(null);
      setline_id(null);
      // settype("");
      setstatus("");
      setreturning_time("");
      setgoing_time("");
      setreturning_from("");
      setreturning_pool("");
      setstarting_pool("");
      setPrice(0);
      alert("Adding Travel is successful");
      navigate('/travels');
    } catch (error) {
      alert("Error adding Travel please try again");
    } finally {
      setLoading(false);
    }
  };

  const cancelDelete = () => {
    setIsPopuoVisble(false);
  };

  return (
    <div className="adddailytrip">
      <Sidebar />
      <div className="container">
      {/* {loading ? (
          <div className="loader">Adding Travel ...</div> 
        ) : ( */}
          <>
        <h1>{t("travels.add")}</h1>
        <form onSubmit={sendData}>
          <label htmlFor="starting_date">{t("travels.sDate")}</label>
          <input
            type="date"
            id="starting_date"
            placeholder=""
            value={starting_date}
            onChange={(event) => setstarting_date(event.target.value)}
            required
          />
          <label htmlFor="ending_date">{t("travels.eDate")}</label>
          <input
            type="date"
            id="ending_date"
            placeholder=""
            value={ending_date}
            onChange={(event) => setending_date(event.target.value)}
            required
          />
          <label htmlFor="going_from">{t("travels.going_from")}</label>
          <input
            type="text"
            id="going_from"
            placeholder=""
            value={going_from}
            onChange={(event) => setgoing_from(event.target.value)}
            required
          />
          <label htmlFor="returning_from">{t("travels.going_to")}</label>
          <input
            type="text"
            id="returning_from"
            placeholder=""
            value={returning_from}
            onChange={(event) => setreturning_from(event.target.value)}
            required
          />
          <label htmlFor="going_time">{t("travels.sTime")}</label>
          <input
            type="time"
            id="going_time"
            placeholder=""
            value={going_time}
            onChange={(event) => setgoing_time(event.target.value)}
            required
          />
          <label htmlFor="returning_time">{t("travels.aTime")}</label>
          <input
            type="time"
            id="returning_time"
            placeholder=""
            value={returning_time}
            onChange={(event) => setreturning_time(event.target.value)}
            required
          />
          <label htmlFor="bus_id">{t("travels.car")}</label>
          <select
            id="bus_id"
            value={bus_id}
            onChange={(event) => setbus_id(event.target.value)}
            required
          >
            <option value="">{t("travels.sCar")}</option>
            {users.map(user => (
              user.bus.map(bus => (
                <option key={bus.id} value={bus.id}>
                  {`${bus.brand} ${bus.model}`}
                </option>
              ))
            ))}
          </select>
          <label htmlFor="line_id">{t("travels.line")}</label>
          <select
            id="line_id"
            value={line_id}
            onChange={(event) => setline_id(event.target.value)}
            required
          >
            <option value="">{t("travels.sLine")}</option>
            {lines.map(line => (
              <option key={line.id} value={line.id}>
                {`From: ${line.point_a}, To: ${line.point_b}`}
              </option>
            ))}
          </select>
          {/* <label htmlFor="type">{t("travels.type")}</label>
          <input
            type="text"
            id="type"
            placeholder=""
            value={type}
            onChange={(event) => settype(event.target.value)}
          /> */}
          <label htmlFor="starting_pool">{t("travels.starting_pool")}</label>
          <input
            type="text"
            id="starting_pool"
            placeholder=""
            value={starting_pool}
            onChange={(event) => setstarting_pool(event.target.value)}
            required
          />
          <label htmlFor="returning_pool">{t("travels.returning_pool")}</label>
          <input
            type="text"
            id="returning_pool"
            placeholder=""
            value={returning_pool}
            onChange={(event) => setreturning_pool(event.target.value)}
            required
          />
          <label htmlFor="status">{t("travels.status")}</label>
          <input
            type="text"
            id="status"
            placeholder=""
            value={status}
            onChange={(event) => setstatus(event.target.value)}
            required
          />
          <label htmlFor="price">{t("extra.price")}</label>
          <input
            type="number"
            id="price"
            placeholder=""
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            required
          />
          <input type="submit" value={loading ? t("addusers.adding") : t("travels.add")} />
        </form>
      </>
      {/* )} */}
      </div>
      {isPopupVisible && (
        <Popup 
          message={t("travels.addMessage")}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
};

export default AddDailyTrip;
