import React, { useState } from "react";
import Sidebar from '../../components/Sidebar';
import { Link, useNavigate } from "react-router-dom";
import "./Lines.css";
import { RiEdit2Fill } from "react-icons/ri";
import { RiDeleteBin5Fill } from "react-icons/ri";
import Popup from '../../components/Popup';

const Lines = ({ data }) => {
  const navigate = useNavigate();

  const [selectedLines, setSelectedLines] = useState([]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedLines(data.map((line) => line.id));
    } else {
      setSelectedLines([]);
    }
  };

  const handleSelectLine = (id) => {
    setSelectedLines((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((lineId) => lineId !== id)
        : [...prevSelected, id]
    );
  };

  const handleDeleteSelected = () => {
    setIsPopupVisible(true);
    console.log("Deleting lines with IDs:", selectedLines);
  };

  const confirmDelete = () => {
    setIsPopupVisible(false);
    setSelectedLines([]);
  };

  const cancelDelete = () => {
    setIsPopupVisible(false);
  };

  const update = (id) => {
    navigate(`/lines/${id}/edit`);
  };

  const deleteLine = (id) => {
    setIsPopupVisible(true);
  };

  return (
    <div className="users">
      <Sidebar />
      <div className="container">
        <div className="header">
          <h1>All Lines</h1>
          <div className="links">
            <Link to="/lines/add">ADD</Link>
            <button onClick={handleDeleteSelected}>Delete Selected</button>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Departure Place</th>
              <th>Arrival Place</th>
              <th>Actions</th>
              <th>
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={selectedLines.length === data.length}
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((element, index) => {
              return (
                <tr key={index}>
                  <td>{element.id}</td>
                  <td>{element.DeparturePlace}</td>
                  <td>{element.ArrivalPlace}</td>
                  <td className="actions-style">
                    <button onClick={() => update(element.id)}><RiEdit2Fill /></button>
                    <button onClick={() => deleteLine(element.id)}><RiDeleteBin5Fill /></button>
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedLines.includes(element.id)}
                      onChange={() => handleSelectLine(element.id)}
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
          message="Are you sure you want to delete the selected lines?"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
};

export default Lines;
