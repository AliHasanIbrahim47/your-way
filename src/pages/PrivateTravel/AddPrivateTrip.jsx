import React, { useState, useEffect } from "react";
import "./AddPrivateTrip.css";
import Sidebar from "../../components/Sidebar";
import Popup from '../../components/Popup';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddPrivateTrip = () => {
  const [going_date, setgoing_date] = useState("");
  const [going_from, setgoing_from] = useState("");
  const [going_to, setgoing_to] = useState("");
  const [bus_id, setbus_id] = useState();
  const [user_id, setuser_id] = useState();
  const [seats, setseats] = useState();
  const [loading, setLoading] = useState(false);
  const [drivers, setDrivers] = useState([]); // State for drivers
  const [users, setUsers] = useState([]); // State for users

  const [isPopupVisible, setIsPopuoVisble] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchDrivers();
    fetchUsers();
  }, []);

  const fetchDrivers = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('https://jawak-wa-tareekak.onrender.com/jawak-wa-tareekak/manager/users/type?type=driver', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setDrivers(response.data.data);
      console.log(drivers);
    } catch (error) {
      console.error('Error fetching drivers', error);
    }
  };

  const fetchUsers = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('https://jawak-wa-tareekak.onrender.com/jawak-wa-tareekak/manager/users/', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setUsers(response.data.data);
    } catch (error) {
      console.error('Error fetching users', error);
    }
  };

  const sendData = (event) => {
    event.preventDefault();
    setIsPopuoVisble(true);
  };

  const confirmDelete = async () => {
    const token = localStorage.getItem('token');
    setIsPopuoVisble(false);
    if (!going_date || !going_from || !going_to || !bus_id || !user_id || !seats) {
      alert("All fields are required!");
      return;
    }
    let data = { going_date: going_date, going_from: going_from, going_to: going_to,
      bus_id: bus_id, user_id: user_id, seats: seats, extra_ids: [1]
    };
    setLoading(true);
    try {
      const response = await axios.post('https://jawak-wa-tareekak.onrender.com/jawak-wa-tareekak/manager/travels/private', 
        data, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      setgoing_date("");
      setgoing_from("");
      setgoing_to("");
      setbus_id();
      setuser_id();
      setseats();
      alert("Adding Private Travel is successful");
      navigate('/travels/private');
      } catch (error) {
        alert("Error adding private travel please try again");
    }  finally {
      setLoading(false);
    }
  }

  const cancelDelete = () => {
    setIsPopuoVisble(false);
  }

  return (
    <div className="addextra">
      <Sidebar />
      <div className="container">
      {/* {loading ? (
          <div className="loader">Adding Private Travel ...</div> 
        ) : ( */}
          <> 
        <h1>Add Private Travel</h1>
        <form onSubmit={sendData}>
          <label htmlFor="going_date">Going Date</label>
          <input
            type="date"
            id="going_date"
            placeholder=""
            value={going_date}
            onChange={(event) => setgoing_date(event.target.value)}
            required
          />
          <label htmlFor="going_from">Going From</label>
          <input
            type="text"
            id="going_from"
            placeholder=""
            value={going_from}
            onChange={(event) => setgoing_from(event.target.value)}
            required
          />
          <label htmlFor="going_to">Going To</label>
          <input
            type="text"
            id="going_to"
            placeholder=""
            value={going_to}
            onChange={(event) => setgoing_to(event.target.value)}
            required
          />
          <label htmlFor="bus_id">Bus</label>
          <select
            id="bus_id"
            value={bus_id}
            onChange={(event) => setbus_id(event.target.value)}
            required
          >
            <option value="">Select Bus</option>
            {drivers.map(driver => (
              driver.bus.map(bus => (
                <option key={bus.id} value={bus.id}>
                  {`Driver: ${driver.full_name}, Car:${bus.brand} ${bus.model}`}
                </option>
              ))
            ))}
          </select>
          <label htmlFor="user_id">User</label>
          <select
            id="user_id"
            value={user_id}
            onChange={(event) => setuser_id(event.target.value)}
            required
          >
            <option value="">Select User</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.full_name}
              </option>
            ))}
          </select>
          <label htmlFor="seats">Seats</label>
          <input
            type="number"
            id="seats"
            placeholder=""
            value={seats}
            onChange={(event) => setseats(event.target.value)}
            required
          />
          <input type="submit" value={loading ? "Adding..." : "Add Private Travel"} />
        </form>
        {isPopupVisible && (
        <Popup 
          message="Are you sure you want to add this private Travel?"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </>
  {/* )} */}
</div>
    </div>
  );
};

export default AddPrivateTrip;
