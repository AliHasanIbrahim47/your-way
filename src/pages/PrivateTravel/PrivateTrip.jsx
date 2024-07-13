import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import "./PrivateTrip.css";
import { RiEdit2Fill } from "react-icons/ri";
import { RiDeleteBin5Fill } from "react-icons/ri";
import Popup from '../../components/Popup';
import axios from "axios";
import { FaCheckCircle } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import Spinner from "../../components/Spinner";
import { useTranslation } from 'react-i18next';
import Moment from "react-moment";

const PrivateTrip = () => {
  const [t, i18n] = useTranslation("global");
  const navigate = useNavigate();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [acceptedUsers, setAcceptedUser] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [deleteORaccept, setdeleteORaccept] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('pending');
  const [loading, setLoading] = useState(false);
  const [loader, setLoader] = useState(false);

  const [users, setUsers] = useState([]); 
  const [driver, setDriver] = useState();
  const token = localStorage.getItem('token');

  const baseURL = process.env.REACT_APP_URL;

  const fetchUsers = async () => {
    setLoader(true);
    try {
      const response = await axios.get(baseURL + `/travels/private?status=${selectedStatus}`, {
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
      console.error('Error fetching private', error);alert("Error loading data");
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

  const handleAcceptAll = (event) => {
    if (event.target.checked) {
      setAcceptedUser(users.map((user) => user.id));
    } else {
      setAcceptedUser([]);
    }
  };

  const handleAcceptedUser = (id) => {
    setAcceptedUser((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((userId) => userId !== id)
        : [...prevSelected, id]
    );
  };

  const handleDeleteSelected = () => {
    if (selectedUsers.length > 0) {
      setdeleteORaccept(false);
      setIsPopupVisible(true);
    }
  };

  const handleAcceptedSelected = () => {
    if (acceptedUsers.length > 0) {
      setdeleteORaccept(true);
      setIsPopupVisible(true);
    }
  };

  const confirmDelete = async () => {
    setIsPopupVisible(false);
    setLoading(true);
    if(!deleteORaccept) {
      try {
        const idsToDelete = selectedUser ? [selectedUser.id] : selectedUsers;
        const response = await axios.delete(baseURL + '/travels/private', {
          data: { ids: idsToDelete },
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        alert("Deleting private travels is successful");
        fetchUsers();
      } catch (error) {
        console.error('Error deleting extra', error);
      }
      setSelectedUsers([]);
      setSelectedUser(null);
    }

    if(deleteORaccept) {
      try {
        const idsToAccept = selectedUser ? [selectedUser.id] : acceptedUsers;
        const response = await axios.put(baseURL + '/travels/private/update-many', {
          ids: idsToAccept,
          status: 'accepted'
        }, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        alert("Accepting Private Travels is successful");
        fetchUsers();
      } catch (error) {
        alert("Error accepting Private Travels please try again");
      }
      setAcceptedUser([]);
      setLoading(false);
      setLoader(false);
    }
  }

  const cancelDelete = () => {
    setIsPopupVisible(false);
  }

  // const show = (id) => {
  //   navigate(`/travels/private/${id}`);
  // };

  const update = (element) => {
    navigate(`/travels/private/${element.id}/edit`, { state: { user: JSON.stringify(element) } });
  };

  useEffect(() => {
    fetchUsers();
  }, [token, selectedStatus]);

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const deleteUser = (item) => {
    setSelectedUser(item);
    setdeleteORaccept(false);
    setIsPopupVisible(true);
  };

  const acceptUser = (item) => {
    setSelectedUser(item);
    setdeleteORaccept(true);
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
          <div className="loader">{!deleteORaccept ? t("private.deleting") : t("private.accepting")} {t("private.title")} <Spinner /></div> 
        ) : (
          <>
        <div className="header">
          <h1>{t("private.h1")}</h1>
          <div className="links">
            {/* <Link to="/travels/reservations/add">{t("reservations.add")}</Link> */}
            {/* <button onClick={handleDeleteSelected}>{t("usersOnly.deleteS")}</button> */}
            {/* <button onClick={handleAcceptedSelected}>{t("private.acceptS")}</button> */}
            <div className="filter">
              <label htmlFor="userStatus">{t("reservations.filter")}: </label>
              <select id="userStatus" value={selectedStatus} onChange={handleStatusChange}>
                <option value="accepted">{t("reservations.accepted")}</option>
                <option value="rejected">{t("reservations.rejected")}</option>
                <option value="canceled">{t("reservations.canceled")}</option>
                <option value="pending">{t("reservations.pending")}</option>
              </select>
            </div>
          </div>
        </div>
        {selectedStatus !== "canceled" && <table>
          <thead>
            <tr>
              <th>{t("private.gDate")}</th>
              <th>{t("private.going_from")}</th>
              <th>{t("private.going_to")}</th>
              <th>{t("private.user")}</th>
              <th>{t("private.seats")}</th>
              {selectedStatus === "accepted" && <th>{t("users.driver")}</th>}
              {/* <th>{t("usersOnly.actions")}</th> */}
              {/* <th>
                <label>{t("private.deleteAll")}</label>
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={selectedUsers.length === users.length}
                />
              </th> */}
              {/* <th>
                <label>{t("private.acceptAll")}</label>
                <input
                  type="checkbox"
                  onChange={handleAcceptAll}
                  checked={acceptedUsers.length === users.length}
                />
              </th> */}
            </tr>
          </thead>
          <tbody>
            {console.log(selectedStatus, users)}
            {users.map((element, index) => (
              <tr key={index}>
                <td><Moment format="YYYY/MM/DD">{element.going_date}</Moment></td>       
                <td>{element.going_from}</td>                
                <td>{element.going_to}</td>
                <td>{element.user.full_name}</td>
                <td>{element.seats}</td>
                {}
                {selectedStatus === "accepted" && 
                <td>
                  {element.bus_id}
                </td>}
                {/* <td className="actions-style">
                  <button onClick={() => show(element.id)}>show</button>
                  <button onClick={() => acceptUser(element)}>
                    <FaCheckCircle />
                  </button>
                  <button onClick={() => update(element)}>
                    <RiEdit2Fill />
                  </button>
                  <button onClick={() => deleteUser(element)}>
                    <RiDeleteBin5Fill />
                  </button>
                </td> */}
                {/* <td>
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(element.id)}
                    onChange={() => handleSelectUser(element.id)}
                  /><IoMdCloseCircle  id="c" />
                </td> */}
                {/* <td>
                  <input
                    type="checkbox"
                    checked={acceptedUsers.includes(element.id)}
                    onChange={() => handleAcceptedUser(element.id)}
                  /><FaCheckCircle  id="c" />
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>}

        {selectedStatus === "canceled" && <table>
          <thead>
            <tr>
              <th>{t("private.gDate")}</th>
              <th>{t("private.going_from")}</th>
              <th>{t("private.going_to")}</th>
              <th>{t("private.user")}</th>
              <th>{t("private.seats")}</th>
            </tr>
          </thead>
          <tbody>
            {users.map((element, index) => (
              <tr key={index}>
                <td><Moment format="YYYY/MM/DD">{element.going_date}</Moment></td>       
                <td>{element.going_from}</td>                
                <td>{element.going_to}</td>
                <td>{element.user.full_name}</td>
                <td>{element.seats}</td>
              </tr>
            ))}
          </tbody>
          </table>}
        {isPopupVisible && (
        <Popup 
          message={ deleteORaccept ? t("private.acceptMessage") : 
            t("private.deleteMessage")
                }
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

export default PrivateTrip;