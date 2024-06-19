import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import "./Extra.css";
import { RiEdit2Fill } from "react-icons/ri";
import { RiDeleteBin5Fill } from "react-icons/ri";
import Popup from '../../components/Popup';
import axios from "axios";

const Extra = () => {
  const navigate = useNavigate();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const [users, setUsers] = useState([]); 
  const token = localStorage.getItem('token');

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://jawak-wa-tareekak.onrender.com/jawak-wa-tareekak/manager/extra', {
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
      console.error('Error fetching extra', error);
    }
  };

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
    if (selectedUsers.length > 0) {
      setIsPopupVisible(true);
    }
  };

  const confirmDelete = async () => {
    setIsPopupVisible(false);
    setLoading(true);
    try {
      const idsToDelete = selectedUser ? [selectedUser.id] : selectedUsers;
      const response = await axios.delete('https://jawak-wa-tareekak.onrender.com/jawak-wa-tareekak/manager/extra/', {
        data: { ids: idsToDelete },
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      fetchUsers();
    } catch (error) {
      alert("Error deleting Extra please try again");
    }
    setSelectedUsers([]);
    setSelectedUser(null);
    setLoading(false);
  }

  const cancelDelete = () => {
    setIsPopupVisible(false);
  }

  // const show = (id) => {
  //   navigate(`/extra/${id}`);
  // };

  const update = (element) => {
    navigate(`/extra/${element.id}/edit`, { state: { user: JSON.stringify(element) } });
  };

  useEffect(() => {
    fetchUsers();
  }, [token]);

  const deleteUser = (item) => {
    setSelectedUser(item);
    setIsPopupVisible(true);
  };

  return (
    <div className="users">
      <Sidebar />
      <div className="container">
      {loading ? (
          <div className="loader">Deleting Extra ...</div> 
        ) : (
          <>
        <div className="header">
          <h1>All Extra</h1>
          <div className="links">
            <Link to="/extra/add">ADD</Link>
            <button onClick={handleDeleteSelected}>Delete Selected</button>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title_EN</th>
              <th>Title_AR</th>
              <th>Price</th>
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
            {users.map((element, index) => (
              <tr key={index}>
                <td>{element.id}</td>
                <td>{element.title_en}</td>
                <td>{element.title_ar}</td>
                <td>{element.price}</td>
                <td className="actions-style">
                  {/* <button onClick={() => show(element.id)}>show</button> */}
                  <button onClick={() => update(element)}>
                    <RiEdit2Fill />
                  </button>
                  <button onClick={() => deleteUser(element)}>
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
            ))}
          </tbody>
        </table>
      {isPopupVisible && (
        <Popup 
          message="Are you sure you want to delete the selected extra?"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
      </>
        )}
      </div>
    </div>
  );
};

export default Extra;