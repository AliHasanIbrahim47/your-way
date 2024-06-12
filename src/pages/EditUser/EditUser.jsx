import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import './EditUser.css';
import Popup from '../../components/Popup';
import axios from "axios";

const EditUser = () => {
  const [loader, setLoader] = useState(true);
  const [users, setUsers] = useState([]); // Initial state as an empty array
  const token = localStorage.getItem('token');
  console.log('Token retrieved:', token); // Debug: Check the token

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://jawak-wa-tareekak.onrender.com/jawak-wa-tareekak/manager/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Users response:', response.data); // Debug: Check the response data
        if (Array.isArray(response.data.data)) {
          setUsers(response.data.data);
        } else {
          console.error('Response data is not an array');
        }
        setLoader(false);
      } catch (error) {
        console.error('Error fetching users', error);
      }
    };

    fetchUsers();
  }, [token]);

  const { id } = useParams();
  const user = users.find(user => user.id.toString() === id);
  const navigate = useNavigate();


  const [name, setName] = useState(user ? user.name : '');
  const [username, setUsername] = useState(user ? user.username : '');
  const [number, setNumber] = useState(user ? user.number : '');
  const [isPopupVisible, setIsPopuoVisble] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsPopuoVisble(true);
  };

  const confirmDelete = () => {
    setIsPopuoVisble(false);
    const updatedUser = { id: user.id, full_name: name, phone: number };
    // updateUser(updatedUser);
    setUsers(users.map(u => (u.id === updatedUser.id ? updatedUser : u)));

    navigate(`/users/${id}`);
}
  
  const cancelDelete = () => {
    setIsPopuoVisble(false);
    console.log('cancel');
  }

  if (!user && !loader) {
    return (
      <div className="showuser">
        <Sidebar />
        <div className="container">
          <h1>User Not Found</h1>
        </div>
      </div>
    );
  }

  if (loader) {
    return (
      <div className="showuser">
        <Sidebar />
        <div className="container">
          <h1>Loading...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="edituser">
      <Sidebar />
      <div className="container">
        <h1>Edit User</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <label htmlFor="number">Phone Number</label>
          <input
            id="number"
            type="number"
            placeholder="Number"
            value={number}
            onChange={(event) => setNumber(event.target.value)}
          />
          <input type="submit" value="Save Changes" />
        </form>
      </div>
      {isPopupVisible && (
        <Popup 
          message="Are you sure you want to edit this user?"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
};

export default EditUser;
