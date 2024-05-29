import { Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Dashboard from './pages/Dashboard/Dashboard';
import Users from './pages/Users/Users';
import AddUser from './pages/AddUser/AddUser';
import ShowUser from './pages/ShowUser/ShowUser';
import EditUser from './pages/EditUser/EditUser';
import { useState } from 'react';

function App() {
  const [data, setData] = useState([
    {
      id: 1,
      name: "ali",
      username: "a",
      number: 15000,
    },
    {
      id: 2,
      name: "ahmad",
      username: "ah",
      number: 20000,
    },{
      id: 1,
      name: "ali",
      username: "a",
      number: 15000,
    },
    {
      id: 2,
      name: "ahmad",
      username: "ah",
      number: 20000,
    },{
      id: 1,
      name: "ali",
      username: "a",
      number: 15000,
    },
    {
      id: 2,
      name: "ahmad",
      username: "ah",
      number: 20000,
    },{
      id: 1,
      name: "ali",
      username: "a",
      number: 15000,
    },
    {
      id: 2,
      name: "ahmad",
      username: "ah",
      number: 20000,
    },{
      id: 1,
      name: "ali",
      username: "a",
      number: 15000,
    },
    {
      id: 2,
      name: "ahmad",
      username: "ah",
      number: 20000,
    },{
      id: 1,
      name: "ali",
      username: "a",
      number: 15000,
    },
    {
      id: 2,
      name: "ahmad",
      username: "ah",
      number: 20000,
    },{
      id: 1,
      name: "ali",
      username: "a",
      number: 15000,
    },
    {
      id: 2,
      name: "ahmad",
      username: "ah",
      number: 20000,
    },{
      id: 1,
      name: "ali",
      username: "a",
      number: 15000,
    },
    {
      id: 2,
      name: "ahmad",
      username: "ah",
      number: 20000,
    },
  ]);

  const updateUser = (updatedUser) => {
    setData(data.map(user => (user.id === updatedUser.id ? updatedUser : user)));
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/users" element={<Users data={data} />} />
        <Route path="/users/add" element={<AddUser />} />
        <Route path="/users/:id" element={<ShowUser data={data} />} />
        <Route path="/users/:id/edit" element={<EditUser data={data} updateUser={updateUser} />} /> 
      </Routes>
    </>
  );
}

export default App;
