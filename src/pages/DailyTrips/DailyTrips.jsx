import React, { useState } from "react";
import Sidebar from '../../components/Sidebar';
import { Link, useNavigate } from "react-router-dom";
import "./DailyTrips.css";
import { RiEdit2Fill } from "react-icons/ri";
import { RiDeleteBin5Fill } from "react-icons/ri";
import Popup from '../../components/Popup';

const DailyTrips = ({data}) => {
    const navigate = useNavigate();
    //   useEffect(() => {
//     localStorage.setItem("token", "test");
//     if (!localStorage.getItem("token")) {
//       navigate("/login");
//     }
//   }, []);

    const [selectedDailyTrips, setSelectedDailyTrips] = useState([]);
    const [isPopupVisible, setIsPopuoVisble] = useState(false);

    const handleSelectAll = (event) => {
      if (event.target.checked) {
        setSelectedDailyTrips(data.map((user) => user.id));
      } else {
        setSelectedDailyTrips([]);
      }
    };
  
    const handleSelectUser = (id) => {
      setSelectedDailyTrips((prevSelected) =>
        prevSelected.includes(id)
          ? prevSelected.filter((userId) => userId !== id)
          : [...prevSelected, id]
      );
    };

    const handleDeleteSelected = () => {
      setIsPopuoVisble(true);
      // Implement the logic to delete selected users
      console.log("Deleting users with IDs:", selectedDailyTrips);
    };

    const confirmDelete = () => {
      setIsPopuoVisble(false);
      setSelectedDailyTrips([]);
    }
  
    const cancelDelete = () => {
      setIsPopuoVisble(false);
    }

  const update = (id) => {
    navigate(`/dailytrips/${id}/edit`);
  };

  const deleteUser = (id) => {
    setIsPopuoVisble(true);
  };

  return (
    <div className="users">
      <Sidebar />
      <div className="container">
        <div className="header">
          <h1>All Daily Trips</h1>
          <div className="links">
            <Link to="/dailytrips/add">ADD</Link>
            <button onClick={handleDeleteSelected}>Delete Selected</button>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Departure Place</th>
              <th>Departure Time</th>
              <th>Arrival Place</th>
              <th>Arrival Time</th>
              <th>Actions</th>
              <th>
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={selectedDailyTrips.length === data.length}
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((element, index) => {
              return (
                <tr key={index}>
                  <td>{element.id}</td>
                  <td>{element.dPlace}</td>
                  <td>{element.dTime}</td>
                  <td>{element.aPlace}</td>
                  <td>{element.aTime}</td>
                  <td className="actions-style">
                    <button onClick={() => update(element.id)}><RiEdit2Fill /></button>
                    <button onClick={() => deleteUser(element.id)}><RiDeleteBin5Fill /></button>
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedDailyTrips.includes(element.id)}
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
          message="Are you sure you want to delete the selected daily trips?"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
};

export default DailyTrips;
