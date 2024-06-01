import React from "react";
import Sidebar from '../../components/Sidebar';
import { Link, useNavigate } from "react-router-dom";
import "./DailyTrips.css";
import { RiEdit2Fill } from "react-icons/ri";
import { RiDeleteBin5Fill } from "react-icons/ri";

const DailyTrips = ({data}) => {
    const navigate = useNavigate();
//   useEffect(() => {
//     localStorage.setItem("token", "test");
//     if (!localStorage.getItem("token")) {
//       navigate("/login");
//     }
//   }, []);


  const update = (id) => {
    navigate(`/dailytrips/${id}/edit`);
  };

  return (
    <div className="drivers">
      <Sidebar />
      <div className="container">
        <div className="header">
          <h1>All Daily Trips</h1>
          <div className="links">
            <Link to="/dailytrips/add">ADD</Link>
            <Link to="/login">Logout</Link>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Departure Place</th>
              <th>Departure Time</th>
              <th>Arrival Place</th>
              <th>Arrival Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((element, index) => {
              return (
                <tr key={index}>
                  <td>{element.id}</td>
                  <td>{element.dPlace}</td>
                  <td>{element.dTime}</td>
                  <td>{element.aPlace}</td>
                  <td>{element.aTime}</td>
                  <td className="actions-style">
                    <button onClick={() => update(element.id)}><RiEdit2Fill /></button>
                    <button><RiDeleteBin5Fill /></button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DailyTrips;
