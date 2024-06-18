import './App.css';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';

import Users from './pages/Users/Users';
import ShowUser from './pages/ShowUser/ShowUser';
import EditUser from './pages/EditUser/EditUser';
import AddUser from './pages/AddUser/AddUser';
import AddDriver from './pages/AddUser/AddDriver';

import DailyTrips from './pages/DailyTrips/DailyTrips';
import AddDailyTrip from './pages/DailyTrips/AddDailyTrip';
import EditDailyTrip from './pages/DailyTrips/EditDailyTrip';
import ShowDailyTrip from './pages/DailyTrips/ShowDailyTrip';

import PrivateTrip from './pages/PrivateTravel/PrivateTrip';
import AddPrivateTrip from './pages/PrivateTravel/AddPrivateTrip';
import EditPrivateTrip from './pages/PrivateTravel/EditPrivateTrip';

import Reservation from './pages/Reservation/Reservation';
import AddReservation from './pages/Reservation/AddReservation';
import EditReservation from './pages/Reservation/EditReservation';

import Brands from './pages/Brands/Brands';
import AddBrand from './pages/Brands/AddBrand';
import EditBrand from './pages/Brands/EditBrand';

import Lines from './pages/Lines/Lines';
import EditLine from './pages/Lines/EditLine';
import AddLine from './pages/Lines/AddLine';

import AddExtra from './pages/Extra/AddExtra';
import EditExtra from './pages/Extra/EditExtra';
import Extra from './pages/Extra/Extra';

import ProtectedRoute from './pages/Login/ProtectedRoute';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

function App() {

  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Main Routes */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} /> 
          <Route path="/" element={<Login/>} />

          {/* Users */}
          <Route path="/users" element={<ProtectedRoute><Users/></ProtectedRoute> } />
          <Route path="/users/add" element={<ProtectedRoute><AddUser /></ProtectedRoute>} />
          <Route path="/drivers/add" element={<ProtectedRoute><AddDriver /></ProtectedRoute>} />
          <Route path="/users/:id" element={<ProtectedRoute ><ShowUser /></ProtectedRoute>} />
          <Route path="/users/:id/edit" element={<ProtectedRoute ><EditUser /></ProtectedRoute>} />

          {/* Travels */}
          <Route path="/travels" element={<ProtectedRoute><DailyTrips /></ProtectedRoute>} />
          <Route path="/travels/add" element={<ProtectedRoute><AddDailyTrip /></ProtectedRoute>} />
          <Route path="/travels/:id/edit" element={<ProtectedRoute><EditDailyTrip /></ProtectedRoute>} />
          <Route path="/travels/:id" element={<ProtectedRoute><ShowDailyTrip /></ProtectedRoute>} />

          {/* Private Travels */}
          <Route path="/travels/private" element={<ProtectedRoute><PrivateTrip /></ProtectedRoute>} />
          <Route path="/travels/private/add" element={<ProtectedRoute><AddPrivateTrip /></ProtectedRoute>} />
          <Route path="/travels/private/:id/edit" element={<ProtectedRoute><EditPrivateTrip /></ProtectedRoute>} />

          {/* Reservations */}
          <Route path="/travels/reservations" element={<ProtectedRoute><Reservation /></ProtectedRoute>} />
          <Route path="/travels/reservations/add" element={<ProtectedRoute><AddReservation /></ProtectedRoute>} />
          <Route path="/travels/reservations/:id/edit" element={<ProtectedRoute><EditReservation /></ProtectedRoute>} />

          {/* lines */}
          <Route path="/lines" element={<ProtectedRoute><Lines /></ProtectedRoute>} />
          <Route path="/lines/add" element={<ProtectedRoute><AddLine /></ProtectedRoute>} />
          <Route path="/lines/:id/edit" element={<ProtectedRoute><EditLine /></ProtectedRoute>} />

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
