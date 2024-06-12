import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import "./PrivateTrip.css";
import { RiEdit2Fill } from "react-icons/ri";
import { RiDeleteBin5Fill } from "react-icons/ri";
import Popup from '../../components/Popup';
import axios from "axios";
import Moment from 'react-moment';

const PrivateTrip = () => {
  const navigate = useNavigate();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [acceptedUsers, setAcceptedUser] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const [users, setUsers] = useState([]); 
  const token = localStorage.getItem('token');

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://jawak-wa-tareekak.onrender.com/jawak-wa-tareekak/manager/travels/private?status=pending', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (Array.isArray(response.data.data)) {
        setUsers(response.data.data);
      } else {
        console.error('Response data is not an array');
      }
    } catch (error) {
      console.error('Error fetching private travels', error);
    }
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedUsers(users.map((user) => user.id));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleSelectUser = (id) => {
    setSelectedUsers((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((userId) => userId !== id)
        : [...prevSelected, id]
    );
  };

  const handleAcceptAll = (event) => {
    if (event.target.checked) {
      setAcceptedUser(users.map((user) => user.id));
    } else {
      setAcceptedUser([]);
    }
  };

  const handleAcceptedUser = (id) => {
    setAcceptedUser((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((userId) => userId !== id)
        : [...prevSelected, id]
    );
  };

  const handleDeleteSelected = () => {
    setIsPopupVisible(true);
  };

  const confirmDelete = async () => {
    setIsPopupVisible(false);
    try {
      const idsToDelete = selectedUser ? [selectedUser.id] : selectedUsers;
      const response = await axios.delete('https://jawak-wa-tareekak.onrender.com/jawak-wa-tareekak/manager/travels/private', {
        data: { ids: idsToDelete },
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      fetchUsers();
    } catch (error) {
      console.error('Error deleting extra', error);
    }
    setSelectedUsers([]);
    setSelectedUser(null);
  }

  const cancelDelete = () => {
    setIsPopupVisible(false);
  }

  // const show = (id) => {
  //   navigate(`/travels/private/${id}`);
  // };

  const update = (id) => {
    navigate(`/travels/private/${id}/edit`);
  };

  useEffect(() => {
    fetchUsers();
  }, [token]);

  const deleteUser = (item) => {
    setSelectedUser(item);
    setIsPopupVisible(true);
  };

  return (
    <div className="users">
      <Sidebar />
      <div className="container">
        <div className="header">
          <h1>All Private Travels</h1>
          <div className="links">
            <Link to="/travels/private/add">ADD</Link>
            <button onClick={handleDeleteSelected}>Delete Selected</button>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Goint Date</th>
              <th>Going From</th>
              <th>Going To</th>
              <th>Bus ID</th>
              <th>User ID</th>
              <th>Seats</th>
              <th>Actions</th>
              <th>
                <label>Delet All</label>
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={selectedUsers.length === users.length}
                />
              </th>
              <th>
                <label>Accept All</label>
                <input
                  type="checkbox"
                  onChange={handleAcceptAll}
                  checked={acceptedUsers.length === users.length}
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((element, index) => (
              <tr key={index}>
                <td><Moment format="YYYY/MM/DD">{element.going_date}</Moment></td>       
                <td>{element.going_from}</td>                
                <td>{element.going_to}</td>
                <td>{element.bus_id}</td>
                <td>{element.user_id}</td>
                <td>{element.seats}</td>
                <td className="actions-style">
                  {/* <button onClick={() => show(element.id)}>show</button> */}
                  <button onClick={() => update(element.id)}>
                    <RiEdit2Fill />
                  </button>
                  <button onClick={() => deleteUser(element)}>
                    <RiDeleteBin5Fill />
                  </button>
                </td>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(element.id)}
                    onChange={() => handleSelectUser(element.id)}
                  />
                </td>
                <td>
                  <input
                    type="checkbox"
                    checked={acceptedUsers.includes(element.id)}
                    onChange={() => handleAcceptedUser(element.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isPopupVisible && (
        <Popup
          message="Are you sure you want to delete the selected private travel?"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
};

export default PrivateTrip;