import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import "./Users.css";
import { RiEdit2Fill } from "react-icons/ri";
import { RiDeleteBin5Fill } from "react-icons/ri";
import Popup from '../../components/Popup';

const Users = ({ data }) => {
  const navigate = useNavigate();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isPopupVisible, setIsPopuoVisble] = useState(false);

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedUsers(data.map((user) => user.id));
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
    setIsPopuoVisble(true);
    // Implement the logic to delete selected users
    console.log("Deleting users with IDs:", selectedUsers);
  };

  const confirmDelete = () => {
    setIsPopuoVisble(false);
    setSelectedUsers([]);
  }

  const cancelDelete = () => {
    setIsPopuoVisble(false);
  }

  const show = (id) => {
    navigate(`/users/${id}`);
  };

  const update = (id) => {
    navigate(`/users/${id}/edit`);
  };

  const deleteUser = (id) => {
    setIsPopuoVisble(true);
  };

  return (
    <div className="users">
      <Sidebar />
      <div className="container">
        <div className="header">
          <h1>All Users</h1>
          <div className="links">
            <Link to="/users/add">ADD</Link>
            <button onClick={handleDeleteSelected}>Delete Selected</button>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Username</th>
              <th>Phone Number</th>
              <th>Actions</th>
              <th>
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={selectedUsers.length === data.length}
                />
              </th>
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
                    <button onClick={() => update(element.id)}>
                      <RiEdit2Fill />
                    </button>
                    <button onClick={() => deleteUser(element.id)}>
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
      </div>
      {isPopupVisible && (
        <Popup 
          message="Are you sure you want to delete the selected users?"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
};

export default Users;