import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import "./DailyTrips.css";
import { RiEdit2Fill } from "react-icons/ri";
import { RiDeleteBin5Fill } from "react-icons/ri";
import Popup from '../../components/Popup';
import axios from "axios";
import Moment from "react-moment";

const DailyTrips = () => {
  const navigate = useNavigate();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [users, setUsers] = useState([]);
  // const [selectedType, setSelectedType] = useState('private');
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('token');

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`https://jawak-wa-tareekak.onrender.com/jawak-wa-tareekak/manager/travels`, {
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

  const handleDeleteSelected = () => {
    if (selectedUsers.length > 0) {
      setIsPopupVisible(true);
    }
  };

  const confirmDelete = async () => {
    setIsPopupVisible(false);
    setLoading(true);
    try {
      const idsToDelete = selectedUser ? [selectedUser.id] : selectedUsers;
      await axios.delete('https://jawak-wa-tareekak.onrender.com/jawak-wa-tareekak/manager/travels', {
        data: { ids: idsToDelete },
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      fetchUsers();
    } catch (error) {
      alert("Error deleting Travels please try again");
    }
    setSelectedUsers([]);
    setSelectedUser(null);
    setLoading(false);
  }

  const cancelDelete = () => {
    setIsPopupVisible(false);
  }

  const show = (id) => {
    navigate(`/travels/${id}`);
  };

  const update = (element) => {
    navigate(`/travels/${element.id}/edit`, { state: { user: JSON.stringify(element) } });
  };

  useEffect(() => {
    fetchUsers();
  }, [token]);

  const deleteUser = (item) => {
    setSelectedUser(item);
    setIsPopupVisible(true);
  };

  // const handleTypeChange = (event) => {
  //   setSelectedType(event.target.value);
  // };
  //
  // const filteredUsers = selectedType === 'user' 
  //   ? users 
  //   : users.filter(user => user.type === selectedType);

  return (
    <div className="users">
      <Sidebar />
      <div className="container">
      {loading ? (
          <div className="loader">Deleting Travels ...</div> 
        ) : (
          <>
        <div className="header">
        <h1>All Travels</h1>
        <Link to="/travels/private">Private</Link>
        <div className="travel-links">
          <Link to="/travels/reservations">Reservations</Link>
        </div>
        <div className="links">
          <Link to="/travels/add">ADD</Link>
          <button onClick={handleDeleteSelected}>Delete Selected</button>
        </div>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Starting Date</th>
              <th>Going Time</th>
              <th>Going From</th>
              <th>Ending Date</th>
              <th>Returning Time</th>
              <th>Returning From</th>
              <th>Status</th>
              <th>Actions</th>
              <th>
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={selectedUsers.length === users.length}
                />
              </th>
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
                <td className="actions-style">
                  <button onClick={() => show(element.id)}>show</button>
                  <button onClick={() => update(element)}>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
        {isPopupVisible && (
        <Popup 
          message="Are you sure you want to delete the selected travels?"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
      </>
        )}
      </div>
    </div>
  );
};

export default DailyTrips;
