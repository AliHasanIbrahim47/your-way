import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import "./Users.css";
import { RiEdit2Fill } from "react-icons/ri";
import { RiDeleteBin5Fill } from "react-icons/ri";
import Popup from '../../components/Popup';
import axios from "axios";
import { FaUser } from "react-icons/fa";
import { FaCar } from "react-icons/fa";
import Spinner from "../../components/Spinner";

const Users = () => {
  const navigate = useNavigate();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedType, setSelectedType] = useState('user');
  const [loading, setLoading] = useState(false);
  const [loader, setLoader] = useState(false);

  const token = localStorage.getItem('token');

  const fetchUsers = async () => {
    setLoader(true);
    try {
      const response = await axios.get(`https://jawak-wa-tareekak.onrender.com/jawak-wa-tareekak/manager/users/type?type=${selectedType}`, {
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
      alert("Error loading data");
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
      await axios.delete('https://jawak-wa-tareekak.onrender.com/jawak-wa-tareekak/manager/users', {
        data: { ids: idsToDelete },
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      alert("Deleting Users is successful");
      fetchUsers();
    } catch (error) {
      alert("Error deleting Users please try again");
    }
    setSelectedUsers([]);
    setSelectedUser(null);
    setLoading(false);
    setLoader(false);
  }

  const cancelDelete = () => {
    setIsPopupVisible(false);
  }

  const show = (id) => {
    navigate(`/users/${id}`);
  };

  const update = (element) => {
    navigate(`/users/${element.id}/edit`, { state: { user: JSON.stringify(element) } });
  };

  useEffect(() => {
    fetchUsers();
  }, [token, selectedType]);

  const deleteUser = (item) => {
    setSelectedUser(item);
    setIsPopupVisible(true);
  };

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const filteredUsers = selectedType === 'user' 
    ? users 
    : users.filter(user => user.type === selectedType);

  if (users.length === 0 && !loader) {
    return (
      <div className="users">
        <Sidebar />
        <div className="container">
          <h1>There are no Drivers</h1>
          <div className="links">
            <Link to="users-only"><FaUser id="fa"/> Users</Link>
            <Link to="drivers-only"><FaCar id="fa"/> Drivers</Link>
            <div className="travel-links">
              <Link to="drivers-unactive">Inactive Drivers</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (loader && !loading) {
    return (
      <div className="users">
        <Sidebar />
        <div className="continer">
          <h1 className="loader">
            Loading Data <Spinner />
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="users">
      <Sidebar />
      <div className="container">
      {loading && !loader ? (
          <div className="loader">Deleting Users <Spinner /></div> 
        ) : (
          <>
        <div className="header">
          <h1>All Users</h1>
          <div className="links">
            <Link to="users-only"><FaUser id="fa"/> Users</Link>
            <Link to="drivers-only"><FaCar id="fa"/> Drivers</Link>
            <div className="travel-links">
              <Link to="drivers-unactive">Inactive Drivers</Link>
            </div>
          </div>
          <div className="links">
            <Link to="/users/add">ADD User</Link>
            <Link to="/drivers/add">ADD Driver</Link>
            <button onClick={handleDeleteSelected}>Delete Selected</button>
            <div className="filter">
            <label htmlFor="userType">Filter by Type: </label>
            <select id="userType" value={selectedType} onChange={handleTypeChange}>
              {/* <option value="all">All</option> */}
              <option value="user">User</option>
              <option value="driver">Driver</option>
            </select>
          </div>
          </div>
          
        </div>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Phone Number</th>
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
            {filteredUsers.map((element, index) => {
              return (
                <tr key={index}>
                  <td>{element.id}</td>
                  <td>{element.full_name}</td>
                  <td>{element.phone}</td>
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
              );
            })}
          </tbody>
        </table>
        {isPopupVisible && (
        <Popup 
          message="Are you sure you want to delete the selected users?"
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

export default Users;
