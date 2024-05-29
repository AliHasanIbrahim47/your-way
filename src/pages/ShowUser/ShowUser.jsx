import React from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import './ShowUser.css';

const ShowUser = ({ data }) => {
  const { id } = useParams();
  const user = data.find(user => user.id.toString() === id);

  if (!user) {
    return (
      <div className="showuser">
        <Sidebar />
        <div className="container">
          <h1>User not found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="showuser">
      <Sidebar />
      <div className="container">
        <h1>User Details</h1>
        <div className="user-details">
          <p><strong>ID:</strong> {user.id}</p>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Number:</strong> {user.number}</p>
        </div>
      </div>
    </div>
  );
};

export default ShowUser;
