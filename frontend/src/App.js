import React, { useState } from 'react';
import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import NavBar from './components/Navbar';
import Home from './components/Home';
import CreateEvent from './components/CreateEvent';
import Signup from './components/Signup';
import Login from './components/Login';
import Events from './components/Events';
import AccountHome from './components/AccountComponents/AccountHome';
import MyEvents from './components/AccountComponents/MyEvents';
import Friends from './components/AccountComponents/Friends';
import Subscriptions from './components/AccountComponents/Subscriptions';
import Notifications from './components/AccountComponents/Notifications';
import {useLoadScript} from "@react-google-maps/api";
import AuthApi from './AuthApi';
import PrivateRoute from './PrivateRoute';
import NotFound from './components/NotFound';

const libraries = ['places'];

function App() {

  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [auth, setAuth] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  if (loadError) return "Error";
  if (!isLoaded) return "Loading..";



  return  (
    <AuthApi.Provider value={{auth, setAuth, currentUser, setCurrentUser}}>
      <Router>
        <NavBar />

        <Routes>

          <Route exact path="/" element={<Home />} />

          <Route path="/events" element={<Events />} />

          <Route path="/create-event" element={<CreateEvent />} />

          <Route path="/signup" element={<Signup />} />

          <Route path="/login" element={<Login />} />

          <Route path="/account" element={<PrivateRoute><AccountHome /></PrivateRoute>} />
          <Route path="/account/my-events" element={<PrivateRoute><MyEvents /></PrivateRoute>} />
          <Route path="/account/friends" element={<PrivateRoute><Friends /></PrivateRoute>} />
          <Route path="/account/subscriptions" element={<PrivateRoute><Subscriptions /></PrivateRoute>} />
          <Route path="/account/notifications" element={<PrivateRoute><Notifications /></PrivateRoute>} />

          <Route path="*" element={<NotFound />} />

        </Routes>
      </Router>
    </AuthApi.Provider>
  )
}

export default App;
