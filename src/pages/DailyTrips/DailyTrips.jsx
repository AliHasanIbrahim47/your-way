import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import "./DailyTrips.css";
import { RiEdit2Fill } from "react-icons/ri";
import { RiDeleteBin5Fill } from "react-icons/ri";
import Popup from '../../components/Popup';
import axios from "axios";
import Moment from "react-moment";
import Spinner from "../../components/Spinner";
import { useTranslation } from "react-i18next";
import { IoMdCloseCircle } from "react-icons/io";

const DailyTrips = () => {
  const [t, i18n] = useTranslation("global");
  const navigate = useNavigate();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [users, setUsers] = useState([]);
  // const [selectedType, setSelectedType] = useState('private');
  const [loading, setLoading] = useState(false);
  const [loader, setLoader] = useState(false);

  const token = localStorage.getItem('token');

  const baseURL = process.env.REACT_APP_URL;

  const fetchUsers = async () => {
    setLoader(true);
    try {
      const response = await axios.get(baseURL + `/travels`, {
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
      await axios.delete(baseURL + '/travels', {
        data: { ids: idsToDelete },
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      alert("Deleting Travels is successful");
      fetchUsers();
    } catch (error) {
      alert("Error deleting Travels please try again");
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
    navigate(`/travels/${id}`);
  };

  const update = (element) => {
    navigate(`/travels/${element.id}/edit`, { state: { user: JSON.stringify(element) } });
  };

  useEffect(() => {
    fetchUsers();
  }, [token]);

  const deleteUser = (item) => {
    setSelectedUser(item);
    setIsPopupVisible(true);
  };

  // const handleTypeChange = (event) => {
  //   setSelectedType(event.target.value);
  // };
  //
  // const filteredUsers = selectedType === 'user' 
  //   ? users 
  //   : users.filter(user => user.type === selectedType);

  if (loader && !loading) {
    return (
      <div className="users">
        <Sidebar />
        <div className="container">
          <h1 className="loader">{t("usersOnly.load")}  <Spinner/></h1>
          
        </div>
      </div>
    );
  }

  return (
    <div className="users">
      <Sidebar />
      <div className="container">
      {loading && !loader ? (
          <div className="loader">{t("travels.deleting")} <Spinner /></div> 
        ) : (
          <>
        <div className="header">
        <h1>{t("travels.h1")}</h1>
        <Link to="/travels/private">{t("travels.private")}</Link>
        <div className="travel-links">
          <Link to="/travels/reservations">{t("travels.res")}</Link>
        </div>
        <div className="links">
          <Link to="/travels/add">{t("travels.add")}</Link>
          <button onClick={handleDeleteSelected}>{t("usersOnly.deleteS")}</button>
        </div>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>{t("travels.sDate")}</th>
              <th>{t("travels.sTime")}</th>
              <th>{t("travels.going_from")}</th>
              <th>{t("travels.aDate")}</th>
              <th>{t("travels.aTime")}</th>
              <th>{t("travels.going_to")}</th>
              <th>{t("travels.status")}</th>
              {/* <th>{t("extra.price")}</th> */}
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
            {users.map((element, index) => (
              <tr key={index}>
                <td><Moment format="YYYY/MM/DD">{element.starting_date}</Moment></td>
                <td>{element.going_time}</td>
                <td>{element.going_from}</td>
                <td><Moment format="YYYY/MM/DD">{element.ending}</Moment></td>
                <td>{element.returning_time}</td>
                <td>{element.returning_from}</td>
                <td>{element.status}</td>
                {/* <td>{element.price}</td> */}
                <td className="actions-style">
                  {/* <button onClick={() => show(element.id)}>{t("usersOnly.show")}</button> */}
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
                  /> <IoMdCloseCircle  id="c" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
        {isPopupVisible && (
        <Popup 
          message={t("travels.message")}
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

export default DailyTrips;
