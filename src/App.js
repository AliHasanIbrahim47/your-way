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
import Drivers from './pages/Drivers/Drivers';
import AddDriver from './pages/Drivers/AddDriver';
import ShowDriver from './pages/Drivers/ShowDriver';
import EditDriver from './pages/Drivers/EditDriver';
import DailyTrips from './pages/DailyTrips/DailyTrips';
import AddDailyTrip from './pages/DailyTrips/AddDailyTrip';
import EditDailyTrip from './pages/DailyTrips/EditDailyTrip';

function App() {
  const [usersData, setUsersData] = useState([
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
    setUsersData(usersData.map(user => (user.id === updatedUser.id ? updatedUser : user)));
  };

  const [driversData, setDriversData] = useState([
    {
      id: 1,
      name: "ali",
      number: 5434,
      carModel: "kia",
      passengers: 4,
      year: 2010,
      office: true
    },
    {
      id: 2,
      name: "ahmad",
      number: 546742,
      carModel: "hunda",
      passengers: 4,
      year: 2015,
      office: false
    },
  ]);

  const updateDrivers = (updatedDriver) => {
    setDriversData(driversData.map(driver => (driver.id === updatedDriver.id ? updatedDriver : driver)));
  };

  const [dailyTripsData, setDailyTripsData] = useState([
    {
      id: 1,
      dPlace: "Damascus",
      dTime: "12:00",
      aPlace: "Beruit",
      aTime: "12:00",
    },
    {
      id: 2,
      dPlace: "Latakia",
      dTime: "12:00",
      aPlace: "Beruit",
      aTime: "12:00",
    },
  ]);

  const updateDailyTrips = (updatedDailyTrip) => {
    setDailyTripsData(dailyTripsData.map(dailyTrip => (dailyTrip.id === updatedDailyTrip.id ? updatedDailyTrip : dailyTrip)));
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register />} />

        {/* Users */}
        <Route path="/users" element={<Users data={usersData} />} />
        <Route path="/users/add" element={<AddUser />} />
        <Route path="/users/:id" element={<ShowUser data={usersData} />} />
        <Route path="/users/:id/edit" element={<EditUser data={usersData} updateUser={updateUser} />} />

        {/* Drivers */}
        <Route path="/drivers" element={<Drivers data={driversData} />} />
        <Route path="/drivers/add" element={<AddDriver />} />
        <Route path="/drivers/:id" element={<ShowDriver data={driversData} />} />
        <Route path="/drivers/:id/edit" element={<EditDriver data={driversData} updateDrivers={updateDrivers} />} />

        {/* Daily Trips */}
        <Route path="/dailytrips" element={<DailyTrips data={dailyTripsData} />} />
        <Route path="/dailytrips/add" element={<AddDailyTrip />} />
        <Route path="/dailytrips/:id/edit" element={<EditDailyTrip data={dailyTripsData} updateDailyTrips={updateDailyTrips} />} />

      </Routes>
    </>
  );
}

export default App;
