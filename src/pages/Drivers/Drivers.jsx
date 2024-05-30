import React from "react";
import Sidebar from '../../components/Sidebar';
import { Link, useNavigate } from "react-router-dom";
import "./Drivers.css";
import { RiSettings4Fill } from "react-icons/ri";
import { RiDeleteBin5Fill } from "react-icons/ri";

const Drivers = ({data}) => {
    const navigate = useNavigate();
//   useEffect(() => {
//     localStorage.setItem("token", "test");
//     if (!localStorage.getItem("token")) {
//       navigate("/login");
//     }
//   }, []);

  const show = (id) => {
    navigate(`/drivers/${id}`);
  };

  const update = (id) => {
    navigate(`/drivers/${id}/edit`);
  };


  return (
    <div className="drivers">
      <Sidebar />
      <div className="container">
        <div className="header">
          <h1>All Drivers</h1>
          <div className="links">
            <Link to="/drivers/add">ADD</Link>
            <Link to="/login">Logout</Link>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Number</th>
              <th>CarModel</th>
              <th>Year</th>
              <th>Passengers</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((element, index) => {
              return (
                <tr key={index}>
                  <td>{element.id}</td>
                  <td>{element.name}</td>
                  <td>{element.number}</td>
                  <td>{element.carModel}</td>
                  <td>{element.year}</td>
                  <td>{element.passengers}</td>
                  <td>{element.office ? "Office" : "Regular"}</td>
                  <td className="actions-style">
                    <button onClick={() => show(element.id)}>show</button>
                    <button onClick={() => update(element.id)}><RiSettings4Fill /></button>
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

export default Drivers;
