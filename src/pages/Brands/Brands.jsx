import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import "./Brands.css";
import { RiEdit2Fill } from "react-icons/ri";
import { RiDeleteBin5Fill } from "react-icons/ri";
import Popup from '../../components/Popup';
import axios from "axios"; 

const Brands = () => {
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

  };

  const confirmDelete = () => {
    setIsPopuoVisble(false);
    setSelectedUsers([]);
  }

  const cancelDelete = () => {
    setIsPopuoVisble(false);
  }

  // const show = (id) => {
  //   navigate(`/brands/${id}`);
  // };

  const update = (id) => {
    navigate(`/brands/${id}/edit`);
  };

  const deleteUser = (id) => {
    setIsPopuoVisble(true);
  };

  const [users, setUsers] = useState([]); 
  const token = localStorage.getItem('token');
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://jawak-wa-tareekak.onrender.com/jawak-wa-tareekak/manager/banners', {
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
          <div className="links">
            <Link to="/brands/add">ADD</Link>
            <button onClick={handleDeleteSelected}>Delete Selected</button>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title_EN</th>
              <th>Image</th>
              <th>Title_AR</th>
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
                  <td>{element.title_en}</td>
                  <td>{element.image}</td>
                  <td>{element.title_ar}</td>
                  <td className="actions-style">
                    {/* <button onClick={() => show(element.id)}>show</button> */}
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

export default Brands;