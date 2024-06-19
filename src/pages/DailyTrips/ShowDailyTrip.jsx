import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import { Link, useParams } from "react-router-dom";
import "./ShowDailyTrip.css";
import axios from "axios";

const ShowDailyTrips = () => {
  const { id } = useParams();
  const [users, setUsers] = useState([]); 
  const token = localStorage.getItem('token');

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`https://jawak-wa-tareekak.onrender.com/jawak-wa-tareekak/manager/travels/${id}`, {
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
      console.error('Error fetching travels', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [token]);

  return (
    <div className="users">
      <Sidebar />
      <div className="container">
        <div className="header">
          <h1>All Lines for Travel: {id}</h1>
          <div className="links">
            <Link to="/travels">Go Back</Link>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Going From</th>
              <th>Going To</th>
            </tr>
          </thead>
          <tbody>
            {users.map((element, index) => (
              <tr key={index}>
                <td>{element.line.id}</td>       
                <td>{element.line.point_a}</td>                
                <td>{element.line.point_b}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShowDailyTrips;