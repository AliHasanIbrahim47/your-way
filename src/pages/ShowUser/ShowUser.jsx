import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import './ShowUser.css';
import axios from 'axios';
import Spinner from "../../components/Spinner";
import { useTranslation } from 'react-i18next';
import Moment from 'react-moment';
import Select from 'react-select';
import Popup from '../../components/Popup';

const ShowUser = () => {
  const [t, i18n] = useTranslation("global");
  const [loader, setLoader] = useState(true);
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState([]);
  const [selectedType, setSelectedType] = useState('future');
  const [showPopup, setShowPopup] = useState(false);
  const [payments, setPayments] = useState([]);
  const [newPaymentAmount, setNewPaymentAmount] = useState(0);
  const [paymentUpdates, setPaymentUpdates] = useState({});

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

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  // holidays and reservations 

  const [reservationDays, setReservationDays] = useState([]);
  const [holidays, setHolidays] = useState([]);
  const [newHoliday, setNewHoliday] = useState("");
  const [selectedHolidays, setSelectedHolidays] = useState([]);
  const daysOptions = [
    { value: 'Monday', label: t("week.Monday") },
    { value: 'Tuesday', label: t("week.Tuesday") },
    { value: 'Wednesday', label: t("week.Wednesday") },
    { value: 'Thursday', label: t("week.Thursday") },
    { value: 'Friday', label: t("week.Friday") },
    { value: 'Saturday', label: t("week.Saturday") },
    { value: 'Sunday', label: t("week.Sunday") }
  ];

  const [selectedDays, setSelectedDays] = useState([]);

  useEffect(() => {
    fetchReservationDays();
    fetchHolidays();
    fetchPayments();
  }, []);

  const fetchReservationDays = async () => {
    try {
      const response = await axios.get(`${baseURL}/days`, 
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      setReservationDays(response.data.data);
    } catch (error) {
      console.error("Error fetching reservation days", error);
    }
  };

  const fetchHolidays = async () => {
    try {
      const response = await axios.get(`${baseURL}/holidays/${id}`, 
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      setHolidays(response.data.data);
      console.log(holidays);
    } catch (error) {
      console.error("Error fetching holidays", error);
    }
  };

  const fetchPayments = async () => {
    try {
      const response = await axios.get(`${baseURL}/commissions/driver/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setPayments(response.data.data);
    } catch (error) {
      console.error("Error fetching payments", error);
    }
  };

  const addReservationDays = async () => {
    const newDays = selectedDays.map(day => day.value);
    const allDays = [...new Set([...reservationDays, ...newDays])];
    try {
      await axios.post(`${baseURL}/days`, { days: allDays }, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      fetchReservationDays();
      setSelectedDays([]);
    } catch (error) {
      console.error("Error adding reservation days", error);
    }
  };

  const addHolidays = async () => {
    try {
      const existingHolidays = holidays.map(h => h.date.split('T')[0]);
      const newHolidayString = newHoliday;
      const allHolidaysSet = new Set([...existingHolidays, newHolidayString]);
      const allHolidays = Array.from(allHolidaysSet); 
      await axios.post(`${baseURL}/holidays/${id}`, { dates: allHolidays }, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      fetchHolidays(); 
      setNewHoliday(""); 
    } catch (error) {
      console.error("Error adding holidays", error);
    }
  };

  const toggleHolidaySelection = (holidayId) => {
    setSelectedHolidays((prevSelected) => {
      if (prevSelected.includes(holidayId)) {
        return prevSelected.filter(id => id !== holidayId);
      } else {
        return [...prevSelected, holidayId];
      }
    });
  };

  const confirmDeleteHolidays = () => {
    setShowPopup(true);
  };

  const deleteHolidays = async () => {
    try {
      await axios.delete(`${baseURL}/holidays/${id}`, { ids: selectedHolidays }, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      fetchHolidays();
      setSelectedHolidays([]);
    } catch (error) {
      console.error("Error deleting holidays", error);
    } finally {
      setShowPopup(false);
    }
  };

  const handleAddPayment = async () => {
    try {
      await axios.post(`${baseURL}/commissions`, 
      { 
        driver_id: id, 
        amount: newPaymentAmount,
        currency: "USD" // or whatever currency you need
      }, 
      {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      fetchPayments(); 
      setNewPaymentAmount(0); 
    } catch (error) {
      console.error("Error adding payment", error);
    }
  };

  const handleUpdatePayment = async (paymentId, newAmount) => {
    try {
      await axios.put(`${baseURL}/commissions/${paymentId}`, 
      { 
        amount: newAmount
      }, 
      {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      fetchPayments(); 
    } catch (error) {
      console.error("Error updating payment", error);
    }
  };

  const handlePaymentChange = (paymentId, newAmount) => {
    setPaymentUpdates(prev => ({
      ...prev,
      [paymentId]: newAmount
    }));
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
          <div className="table-type">
            <div className="filter">
              <label htmlFor="userType">{t("travels.filter")} </label>
              <select id="userType" value={selectedType} onChange={handleTypeChange}>
                <option value="future">{t("travels.future")}</option>
                <option value="old">{t("travels.old")}</option>
              </select>
            </div>
          </div>

          <div className="user-details">
            <div className="details">
              <p><strong>{t("usersOnly.name")}:</strong> {user.full_name}</p>
              <p><strong>{t("usersOnly.phone")}:</strong> {user.phone}</p>
            </div>
            
            {/* Reservation Days */}
            <div className="reservation-days">
              <h2>{t("holidays.resDays")}</h2>
              <ul>
                {reservationDays.map((day, index) => (
                  <li key={index}>{t(`week.${day}`)}</li>
                ))}
              </ul>
              <Select
                isMulti
                value={selectedDays}
                options={daysOptions}
                onChange={setSelectedDays}
                placeholder={t("holidays.selectDays")}
              />
              <button onClick={addReservationDays}>{t("holidays.addDays")}</button>
            </div>

            {/* Display Holidays */}
            <div className="holidays">
              <h2>{t("holidays.title")}</h2>
              <ul>
                {holidays.map((holiday) => (
                  <li key={holiday.id}>
                    <input
                      type="checkbox"
                      checked={selectedHolidays.includes(holiday.id)}
                      onChange={() => toggleHolidaySelection(holiday.id)}
                    />
                    <Moment format="YYYY/MM/DD">{holiday.date}</Moment>
                  </li>
                ))}
              </ul>
              <input
                type="date"
                value={newHoliday}
                onChange={(e) => setNewHoliday(e.target.value)}
              />
              <button onClick={addHolidays}>{t("holidays.addHoliday")}</button>
              <button onClick={confirmDeleteHolidays}>{t("holidays.deleteSelected")}</button>
            </div>

            {/* Display Payments */}
            <div className="payment">
              <h2>{t("holidays.title1")}</h2>
              <ul>
                {payments.map((payment) => (
                  <li key={payment.id}>
                    <span>{payment.amount} {payment.currency}</span>
                    <input
                      type="number"
                      value={paymentUpdates[payment.id] || payment.amount}
                      onChange={(e) => handlePaymentChange(payment.id, e.target.value)}
                    />
                    <button onClick={() => handleUpdatePayment(payment.id, paymentUpdates[payment.id] || payment.amount)}>
                      {t("holidays.update")}
                    </button>
                  </li>
                ))}
              </ul>
              <div className='edit-payment'>
                <input
                  type="number"
                  value={newPaymentAmount}
                  onChange={(e) => setNewPaymentAmount(e.target.value)}
                />
                <button onClick={handleAddPayment}>{t("holidays.addPayment")}</button>
              </div>
            </div>
          </div>

          {/* Public Travels */}
          <div className="private-table">
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
                  {userData.map((element, index) =>
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
                    ) : null
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Private Travels */}
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
                  {userData.map((element, index) =>
                    element.type === "private" ? (
                      <tr key={index}>
                        <td><Moment format="YYYY/MM/DD">{element.going_date}</Moment></td>
                        <td>{element.going_from}</td>
                        <td>{element.going_to}</td>
                        <td>{element.status}</td>
                      </tr>
                    ) : null
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {showPopup && (
          <Popup
            message={t("holidays.confirmDelete")}
            onConfirm={deleteHolidays}
            onCancel={() => setShowPopup(false)}
          />
        )}
      </div>
    );
  }

  return null;
};

export default ShowUser;
