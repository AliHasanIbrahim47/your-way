import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import "./Brands.css";
import { RiEdit2Fill } from "react-icons/ri";
import { RiDeleteBin5Fill } from "react-icons/ri";
import Popup from '../../components/Popup';
import axios from "axios"; 

const Users = () => {
  const navigate = useNavigate();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isPopupVisible, setIsPopuoVisble] = useState(false);

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedUsers(users.map((user) => user.id));
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

  const [users, setUsers] = useState([]); // Initial state as an empty array
  const token = localStorage.getItem('token');
  console.log('Token retrieved:', token); // Debug: Check the token

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://jawak-wa-tareekak.onrender.com/jawak-wa-tareekak/manager/banners', {
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
      } catch (error) {
        console.error('Error fetching users', error);
      }
    };

    fetchUsers();
  }, [token]);

  return (
    <div className="users">
      <Sidebar />
      <div className="container">
        <div className="header">
          <h1>All Banners</h1>
          {/* <div className="links">
            <Link to="/users/add">ADD</Link>
            <button onClick={handleDeleteSelected}>Delete Selected</button>
          </div> */}
        </div>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Actions</th>
              <th>
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={selectedUsers.length === users.length}
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((element, index) => {
              return (
                <tr key={index}>
                  <td>{element.id}</td>
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