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
  const [deleteORaccept, setdeleteORaccept] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loader, setLoader] = useState(false);

  const [users, setUsers] = useState([]); 
  const token = localStorage.getItem('token');

  const fetchUsers = async () => {
    setLoader(true);
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
      console.error('Error fetching private travels', error);alert("Error loading data");
    } finally {
      setLoader(false);
      setLoading(false);
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
    if (selectedUsers.length > 0) {
      setdeleteORaccept(false);
      setIsPopupVisible(true);
    }
  };

  const handleAcceptedSelected = () => {
    if (acceptedUsers.length > 0) {
      setdeleteORaccept(true);
      setIsPopupVisible(true);
    }
  };

  const confirmDelete = async () => {
    setIsPopupVisible(false);
    setLoading(true);
    if(!deleteORaccept) {
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
        console.error('Error deleting extra', error); alert("Error loading data");
      }
      setSelectedUsers([]);
      setSelectedUser(null);
    }

    if(deleteORaccept) {
      try {
        const idsToAccept = acceptedUsers;
        const response = await axios.put('https://jawak-wa-tareekak.onrender.com/jawak-wa-tareekak/manager/travels/update-many', {
          ids: idsToAccept,
          status: 'accepted'
        }, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        fetchUsers();
      } catch (error) {
        alert("Error deleting Private Travels please try again")
      }
      setAcceptedUser([]);
      setLoading(false);
      setLoader(false);
    }
  }

  const cancelDelete = () => {
    setIsPopupVisible(false);
  }

  // const show = (id) => {
  //   navigate(`/travels/private/${id}`);
  // };

  const update = (element) => {
    navigate(`/travels/private/${element.id}/edit`, { state: { user: JSON.stringify(element) } });
  };

  useEffect(() => {
    fetchUsers();
  }, [token]);

  const deleteUser = (item) => {
    setSelectedUser(item);
    setdeleteORaccept(false);
    setIsPopupVisible(true);
  };

  if (loader && !loading) {
    return (
      <div className="users">
        <Sidebar />
        <div className="container">
          <h1>Loading data ...</h1>
          
        </div>
      </div>
    );
  }

  return (
    <div className="users">
      <Sidebar />
      <div className="container">
      {loading && !loader ? (
          <div className="loader">Deleting Private Travel ...</div> 
        ) : (
          <>
        <div className="header">
          <h1>All Private Travels</h1>
          <div className="links">
            <Link to="/travels/private/add">ADD</Link>
            <button onClick={handleDeleteSelected}>Delete Selected</button>
            <button onClick={handleAcceptedSelected}>Accept Selected</button>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Going Date</th>
              <th>Going From</th>
              <th>Going To</th>
              <th>Seats</th>
              <th>Actions</th>
              <th>
                <label>Delete All</label>
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
                <td>{element.seats}</td>
                <td className="actions-style">
                  {/* <button onClick={() => show(element.id)}>show</button> */}
                  {/* <button onClick={() => update(element)}>
                    <RiEdit2Fill />
                  </button> */}
                  <button onClick={() => deleteUser(element)}>
                    <RiDeleteBin5Fill />
                  </button>
                </td>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(element.id)}
                    onChange={() => handleSelectUser(element.id)}
                  >
                    
                  </input>
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
        {isPopupVisible && (
        <Popup 
          message={ deleteORaccept ? "Are you sure you want to accept the selected private travels?" : 
                  "Are you sure you want to delete the selected private travels?"
                }
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

export default PrivateTrip;