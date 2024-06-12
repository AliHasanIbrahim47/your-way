import './App.css';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Dashboard from './pages/Dashboard/Dashboard';
import Users from './pages/Users/Users';
import AddUser from './pages/AddUser/AddUser';
import ShowUser from './pages/ShowUser/ShowUser';
import EditUser from './pages/EditUser/EditUser';
import { useEffect, useState } from 'react';
import Drivers from './pages/Drivers/Drivers';
import AddDriver from './pages/Drivers/AddDriver';
import ShowDriver from './pages/Drivers/ShowDriver';
import EditDriver from './pages/Drivers/EditDriver';
import DailyTrips from './pages/DailyTrips/DailyTrips';
import AddDailyTrip from './pages/DailyTrips/AddDailyTrip';
import EditDailyTrip from './pages/DailyTrips/EditDailyTrip';
import AddTrip from './components/AddTrip';
import EditTrip from './components/EditTrip';
import Lines from './pages/Lines/Lines';
import Brands from './pages/Brands/Brands';
import EditLine from './pages/Lines/EditLine';
import AddLine from './pages/Lines/AddLine';
import AddBrand from './pages/Brands/AddBrand';
import EditBrand from './pages/Brands/EditBrand';
// import Unauthorized from './pages/Login/Unauthorized';
import ProtectedRoute from './pages/Login/ProtectedRoute';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
// import UserLogin from './pages/Login/UserLogin';
import AddExtra from './pages/Extra/AddExtra';
import EditExtra from './pages/Extra/EditExtra';
import Extra from './pages/Extra/Extra';

function App() {

  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Main Routes */}
          <Route path="/" element={<Dashboard />} /> 
          <Route path="/manager/login" element={<Login/>} />
          {/* <Route path="/unauthorized" element={<Unauthorized />} /> */}
          {/* <Route path="/register" element={<Register />} />  */}

          {/* Users */}
          <Route path="/users" element={<ProtectedRoute><Users/></ProtectedRoute> } />
          <Route path="/users/add" element={<ProtectedRoute><AddUser /></ProtectedRoute>} />
          <Route path="/users/:id" element={<ProtectedRoute ><ShowUser /></ProtectedRoute>} />
          <Route path="/users/:id/edit" element={<EditUser />} />
          <Route path="/users/:id/addtrip" element={<AddTrip />}/>
          <Route path="/users/:id/trip/edit" element={<EditTrip />}/>

          {/* Drivers */}
          {/* <Route path="/drivers" element={<ProtectedRoute><Drivers data={driversData} /></ProtectedRoute>} />
          <Route path="/drivers/add" element={<ProtectedRoute><AddDriver /></ProtectedRoute>} />
          <Route path="/drivers/:id" element={<ShowDriver data={driversData} />} />
          <Route path="/drivers/:id/edit" element={<EditDriver data={driversData} updateDrivers={updateDrivers} />} />
          <Route path="/drivers/:id/addtrip" element={<AddTrip />}/>
          <Route path="/drivers/:id/trip/edit" element={<EditTrip />}/> */}

          {/* Daily Trips */}
          {/* <Route path="/dailytrips" element={<DailyTrips data={dailyTripsData} />} />
          <Route path="/dailytrips/add" element={<AddDailyTrip />} />
          <Route path="/dailytrips/:id/edit" element={<EditDailyTrip data={dailyTripsData} updateDailyTrips={updateDailyTrips} />} /> */}

          {/* lines */}
          {/* <Route path="/lines" element={<Lines data={linesData} />} />
          <Route path="/lines/add" element={<AddLine />} />
          <Route path="/lines/:id/edit" element={<EditLine data={linesData} updateLines={updateLines} />} /> */}


          {/* Brands */}
          <Route path="/brands" element={<ProtectedRoute><Brands/></ProtectedRoute> } />
          <Route path="/brands/add" element={<ProtectedRoute><AddBrand /></ProtectedRoute>} />
          <Route path="/brands/:id/edit" element={<ProtectedRoute><EditBrand /></ProtectedRoute>} />

          {/* Extra */}
          <Route path="/extra" element={<ProtectedRoute><Extra/></ProtectedRoute> } />
          <Route path="/extra/add" element={<ProtectedRoute><AddExtra /></ProtectedRoute>} />
          <Route path="/extra/:id/edit" element={<ProtectedRoute><EditExtra/></ProtectedRoute>} />

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
