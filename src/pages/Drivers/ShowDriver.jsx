import React from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import './ShowDriver.css';

const ShowDriver = ({ data }) => {
  const { id } = useParams();
  const driver = data.find(driver => driver.id.toString() === id);

  if (!driver) {
    return (
      <div className="showdriver">
        <Sidebar />
        <div className="container">
          <h1>Driver not found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="showuser">
      <Sidebar />
      <div className="container">
        <h1>Driver Details</h1>
        <div className="user-details">
          <p><strong>Name:</strong> {driver.name}</p>
          <p><strong>Number:</strong> {driver.number}</p>
          <p><strong>CarModel:</strong> {driver.carModel}</p>
          <p><strong>Year:</strong> {driver.year}</p>
          <p><strong>Passengers:</strong> {driver.passengers}</p>
          <p><strong>Role:</strong> {driver.office ? "Office" : "Regular"}</p>
        </div>
      </div>
    </div>
  );
};

export default ShowDriver;
