import React from "react";
import Sidebar from '../../components/Sidebar';
import { Link, useNavigate } from "react-router-dom";
import "./Users.css";
import { RiSettings4Fill } from "react-icons/ri";
import { RiDeleteBin5Fill } from "react-icons/ri";

const Users = ({data}) => {
    const navigate = useNavigate();
//   useEffect(() => {
//     localStorage.setItem("token", "test");
//     if (!localStorage.getItem("token")) {
//       navigate("/login");
//     }
//   }, []);

  const show = (id) => {
    navigate(`/item/${id}`);
  };

  const update = (id) => {
    navigate(`/${id}/edit`);
  };

  return (
    <div className="users">
      <Sidebar />
      <div className="container">
        <div className="header">
          <h1>All Users</h1>
          <div className="links">
            <Link to="/users/add">ADD</Link>
            <Link to="/login">Logout</Link>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Username</th>
              <th>Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((element, index) => {
              return (
                <tr key={index}>
                  <td>{element.id}</td>
                  <td>{element.name}</td>
                  <td>{element.username}</td>
                  <td>{element.number}</td>
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

export default Users;
