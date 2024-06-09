import React, { useState } from "react";
import Sidebar from '../../components/Sidebar';
import { Link, useNavigate } from "react-router-dom";
import "./Drivers.css";
import { RiEdit2Fill } from "react-icons/ri";
import { RiDeleteBin5Fill } from "react-icons/ri";
import Popup from '../../components/Popup';

const Drivers = ({data}) => {
    const navigate = useNavigate();
//   useEffect(() => {
//     localStorage.setItem("token", "test");
//     if (!localStorage.getItem("token")) {
//       navigate("/login");
//     }
//   }, []);

const [selectedDrivers, setSelectedDrivers] = useState([]);
const [isPopupVisible, setIsPopuoVisble] = useState(false);

const handleSelectAll = (event) => {
  if (event.target.checked) {
    setSelectedDrivers(data.map((user) => user.id));
  } else {
    setSelectedDrivers([]);
  }
};

const handleSelectUser = (id) => {
  setSelectedDrivers((prevSelected) =>
    prevSelected.includes(id)
      ? prevSelected.filter((userId) => userId !== id)
      : [...prevSelected, id]
  );
};

const handleDeleteSelected = () => {
  // Implement the logic to delete selected users
  setIsPopuoVisble(true);
  console.log("Deleting users with IDs:", selectedDrivers);
};

const confirmDelete = () => {
  setIsPopuoVisble(false);
  setSelectedDrivers([]);
}

const cancelDelete = () => {
  setIsPopuoVisble(false);
}

  const show = (id) => {
    navigate(`/drivers/${id}`);
  };

  const update = (id) => {
    navigate(`/drivers/${id}/edit`);
  };

  const deleteUser = (id) => {
    setIsPopuoVisble(true);
  };

  return (
    <div className="users">
      <Sidebar />
      <div className="container">
        <div className="header">
          <h1>All Drivers</h1>
          <div className="links">
            <Link to="/drivers/add">ADD</Link>
            <button onClick={handleDeleteSelected}>Delete Selected</button>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Number</th>
              <th>Car Brand</th>
              <th>Model</th>
              <th>Passengers</th>
              <th>Role</th>
              <th>Actions</th>
              <th>
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={selectedDrivers.length === data.length}
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
                  <td>{element.number}</td>
                  <td>{element.carModel}</td>
                  <td>{element.year}</td>
                  <td>{element.passengers}</td>
                  <td>{element.office ? "Office" : "Regular"}</td>
                  <td className="actions-style">
                    <button onClick={() => show(element.id)}>show</button>
                    <button onClick={() => update(element.id)}><RiEdit2Fill /></button>
                    <button onClick={() => deleteUser(element.id)}><RiDeleteBin5Fill /></button>
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedDrivers.includes(element.id)}
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
          message="Are you sure you want to delete the selected drivers?"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
};

export default Drivers;
