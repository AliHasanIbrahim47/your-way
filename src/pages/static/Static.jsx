import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import "./Static.css";
import { RiEdit2Fill } from "react-icons/ri";
import Popup from '../../components/Popup';
import axios from "axios";
import Spinner from "../../components/Spinner";
import { useTranslation } from "react-i18next";

const Static = () => {
  const [t, i18n] = useTranslation("global");
  const navigate = useNavigate();
  // const [selectedUsers, setSelectedUsers] = useState([]);
  // const [selectedUser, setSelectedUser] = useState(null);
  // const [isPopupVisible, setIsPopupVisible] = useState(false);
  // const [loading, setLoading] = useState(false);
  const [loader, setLoader] = useState(false);

  const [users, setUsers] = useState([]);
  const token = localStorage.getItem('token');

  const baseURL = process.env.REACT_APP_URL;

  const fetchUsers = async () => {
    setLoader(true);
    try {
      const response = await axios.get(baseURL + '/static-contents/', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setUsers(response.data.data);
    } catch (error) {
      console.error('Error fetching lines', error);
    } finally {
      setLoader(false);
    }
  };

  // const handleSelectAll = (event) => {
  //   if (event.target.checked) {
  //     setSelectedUsers(users.map((user) => user.id));
  //   } else {
  //     setSelectedUsers([]);
  //   }
  // };

  // const handleSelectUser = (id) => {
  //   setSelectedUsers((prevSelected) =>
  //     prevSelected.includes(id)
  //       ? prevSelected.filter((userId) => userId !== id)
  //       : [...prevSelected, id]
  //   );
  // };

  // const handleDeleteSelected = () => {
  //   if (selectedUsers.length > 0) {
  //     setIsPopupVisible(true);
  //   }
  // };

  // const confirmDelete = async () => {
  //   setIsPopupVisible(false);
  //   setLoading(true);
  //   try {
  //     const idsToDelete = selectedUser ? [selectedUser.id] : selectedUsers;
  //     const response = await axios.delete(baseURL + '/lines/', {
  //       data: { ids: idsToDelete },
  //       headers: {
  //         'Authorization': `Bearer ${token}`,
  //         'Content-Type': 'application/json'
  //       }
  //     });
  //     alert("Deleting Lines is successful");
  //     fetchUsers();
  //   } catch (error) {
  //     alert("Error deleting Lines please try again");
  //   }
  //   setSelectedUsers([]);
  //   setSelectedUser(null);
  //   setLoading(false);
  // }

  // const cancelDelete = () => {
  //   setIsPopupVisible(false);
  // }

  // const show = (id) => {
  //   navigate(`/lines/${id}`);
  // };

  const update = (element) => {
    navigate(`/static/${element.id}/edit`, { state: { user: JSON.stringify(element) } });
  };

  useEffect(() => {
    fetchUsers();
  }, [token]);

  // const deleteUser = (item) => {
  //   setSelectedUser(item);
  //   setIsPopupVisible(true);
  // };

  if (loader) {
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
      {/* {loading ? (
          <div className="loader">{t("lines.deleting")} <Spinner /></div> 
        ) : (
          <> */}
        <div className="header">
          <h1>{t("static.h1")}</h1>
          {/* <div className="links">
            <Link to="/lines/add">{t("lines.add")}</Link>
            <button onClick={handleDeleteSelected}>{t("usersOnly.deleteS")}</button>
          </div> */}
        </div>
        <table>
          <thead>
            <tr>
              <th>{t("static.description_en")}</th>
              <th>{t("static.description_ar")}</th>
              <th>{t("static.content_en")}</th>
              <th>{t("static.content_ar")}</th>
              <th>{t("usersOnly.actions")}</th>
              {/* <th>
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={selectedUsers.length === users.length}
                />
              </th> */}
            </tr>
          </thead>
          <tbody>
            {users.map((element, index) => (
              <tr key={index}>
                <td>{element.description_en}</td>
                <td>{element.description_ar}</td>
                <td>{element.content_en}</td>
                <td>{element.content_ar}</td>
                <td className="actions-style">
                  <button onClick={() => update(element)}>
                    <RiEdit2Fill />
                  </button>
                </td>
                {/* <td className="actions-style">
                  <button onClick={() => show(element.id)}>show</button>
                  <button onClick={() => navigate("/edit")}>
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
                  />
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
        {/* {isPopupVisible && (
        <Popup 
          message={t("lines.message")}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
      </>
        )} */}
      </div>
    </div>
  );
};

export default Static;