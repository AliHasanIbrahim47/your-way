import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import "./Users.css";
import { RiEdit2Fill } from "react-icons/ri";
import { RiDeleteBin5Fill } from "react-icons/ri";
import Popup from '../../components/Popup';
import axios from "axios"; 
import Spinner from '../../components/Spinner';
import { useTranslation } from "react-i18next";
import { IoMdCloseCircle } from "react-icons/io";

const UnAcceptedDrivers = () => {
  const [t, i18n] = useTranslation("global");
  const navigate = useNavigate();
  const [selectedUsers, setSelectedUsers] = useState([]);;
  const [selectedUser, setSelectedUser] = useState(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loader, setLoader] = useState(false);

  const [users, setUsers] = useState([]); 
  const token = localStorage.getItem('token');

  const baseURL = process.env.REACT_APP_URL;

  const fetchUsers = async () => {
    setLoader(true);
    try {
      const response = await axios.get(baseURL + '/drivers/un-accepted', {
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
      console.error('Error fetching private travels', error);
    } finally {
      setLoader(false);
      setLoading(false);
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
      const response = await axios.delete(baseURL + '/users', {
        data: { ids: idsToDelete },
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      alert("Deleting Inactive Drivers is successful");
      fetchUsers();
    } catch (error) {
      alert("Error deleting unactive drivers please try again");
    }
    setSelectedUsers([]);
    setSelectedUser(null);
    setLoading(false); 
    setLoader(false);
  }

  const cancelDelete = () => {
    setIsPopupVisible(false);
  }

  const show = (id) => {
    navigate(`/users/${id}`);
  };

  const update = (element) => {
    navigate(`/drivers/${element.id}/edit`, { state: { user: JSON.stringify(element) } });
  };

  useEffect(() => {
    fetchUsers();
  }, [token]);

  const deleteUser = (item) => {
    setSelectedUser(item);
    setIsPopupVisible(true);
  };

  
  if (loader && !loading) {
    return (
      <div className="users">
        <Sidebar />
        <div className="container">
          <h1 className="loader">{t("usersOnly.load")} <Spinner /></h1>
        </div>
      </div>
    );
  }

  return (
    <div className="users">
      <Sidebar />
      <div className="container">
      {loading && !loader ? (
          <div className="loader">{t("usersOnly.deleting")} <Spinner /></div> 
        ) : (
          <>
        <div className="header">
          <h1>{t("nonAccepted.h1")}</h1>
          <div className="links">
            <button onClick={handleDeleteSelected}>{t("usersOnly.deleteS")}</button>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>{t("usersOnly.id")}</th>
              <th>{t("usersOnly.name")}</th>
              <th>{t("usersOnly.phone")}</th>
              <th>{t("usersOnly.actions")}</th>
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
                  <td>{element.full_name}</td>
                  <td>{element.phone}</td>
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
                    /><IoMdCloseCircle  id="c" />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      {isPopupVisible && (
        <Popup 
          message={t("usersOnly.message")}
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

export default UnAcceptedDrivers;