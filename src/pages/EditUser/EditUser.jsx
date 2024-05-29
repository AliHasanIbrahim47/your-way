import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import './EditUser.css';

const EditUser = ({ data, updateUser }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = data.find(user => user.id.toString() === id);

  const [name, setName] = useState(user ? user.name : '');
  const [username, setUsername] = useState(user ? user.username : '');
  const [number, setNumber] = useState(user ? user.number : '');

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedUser = { id: user.id, name, username, number };
    updateUser(updatedUser);
    navigate(`/item/${id}`);
  };

  if (!user) {
    return (
      <div className="edituser">
        <Sidebar />
        <div className="container">
          <h1>User not found</h1>
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
            type="text"
            placeholder="Number"
            value={number}
            onChange={(event) => setNumber(event.target.value)}
          />
          <input type="submit" value="Save Changes" />
        </form>
      </div>
    </div>
  );
};

export default EditUser;
