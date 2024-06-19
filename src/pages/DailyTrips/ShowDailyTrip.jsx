import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import './ShowDailyTrip.css';
import axios from 'axios';

const ShowDailyTrip = () => {
  const [loader, setLoader] = useState(true);
  const [user, setUser] = useState(null);
  const token = localStorage.getItem('token');

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`https://jawak-wa-tareekak.onrender.com/jawak-wa-tareekak/manager/travels`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const users = response.data.data;
        const foundUser = users.find(user => user.id.toString() === id);
        setUser(foundUser);
        setLoader(false);
      } catch (error) {
        console.error('Error fetching user', error);
        setLoader(false);
      }
    };
    fetchUser();
  }, [token, id]);

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

  if (!user) {
    return (
      <div className="showuser">
        <Sidebar />
        <div className="container">
          <h1>User Not Found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="showuser">
      <Sidebar />
      <div className="container">
      <div className="header">
          <h1>All Lines for this Travel</h1>
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
          {user.line.map((element, index) => (
              <tr key={index}>
                <td>{element.id}</td>       
                <td>{element.point_a}</td>                
                <td>{element.point_b}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShowDailyTrip;
