import React, { useState } from "react";
import "./AddUser.css";
import Sidebar from "../../components/Sidebar";

const AddUser = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [number, setNumber] = useState("");

  const sendData = (event) => {
    event.preventDefault();
    if (!name || !username || !number) {
      alert("All fields are required!");
      return;
    }
    let data = { name: name, username: username, number: number };
    console.log(data);
    // send data to database with axios

    setName("");
    setUsername("");
    setNumber("");
  };

  return (
    <div className="adduser">
      <Sidebar />
      <div className="container">
        <h1>Add User</h1>
        <form onSubmit={sendData}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder="Username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
          />
          <label htmlFor="number">Number</label>
          <input
            type="number"
            id="number"
            placeholder="Number"
            value={number}
            onChange={(event) => setNumber(event.target.value)}
            required
          />
          <input type="submit" value="Add User" />
        </form>
      </div>
    </div>
  );
};

export default AddUser;
