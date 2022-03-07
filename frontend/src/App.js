import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import NavBar from './components/Navbar';
import Home from './components/Home';
import AccountCreateEvent from './components/AccountComponents/AccountCreateEvent';
import Signup from './components/Signup';
import Login from './components/Login';
import Events from './components/Events';
import AccountHome from './components/AccountComponents/AccountHome';
import MyEvents from './components/AccountComponents/MyEvents';
import Followers from './components/AccountComponents/Followers';
import Following from './components/AccountComponents/Following';
import Notifications from './components/AccountComponents/Notifications';
import AuthApi from './AuthApi';
import PrivateRoute from './PrivateRoute';
import NotFound from './components/NotFound';
import ViewEvent from './components/ViewEvent';
import ViewOrganizer from './components/ViewOrganizer';


function App() {

  axios.defaults.withCredentials = true

  const [auth, setAuth] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:3001/login").then(response => {
      console.log(response)
      setAuth(response.data.loggedIn)
      if(response.data.loggedIn) setCurrentUser(response.data.user)
    })
  }, [])

  

  return  (
    <AuthApi.Provider value={{auth, setAuth, currentUser, setCurrentUser}}>
      <Router>
        <NavBar />

        <Routes>

          <Route exact path="/" element={<Home />} />

          <Route path="/events" element={<Events />} />

          <Route path="/signup" element={<Signup />} />

          <Route path="/login" element={<Login />} />

          <Route path="/account" element={<PrivateRoute><AccountHome /></PrivateRoute>} />
          <Route path="/account/my-events" element={<PrivateRoute><MyEvents /></PrivateRoute>} />
          <Route path="/account/followers" element={<PrivateRoute><Followers /></PrivateRoute>} />
          <Route path="/account/following" element={<PrivateRoute><Following /></PrivateRoute>} />
          <Route path="/account/notifications" element={<PrivateRoute><Notifications /></PrivateRoute>} />
          <Route path="/account/create-event" element={<PrivateRoute><AccountCreateEvent /></PrivateRoute>} />

          <Route path="/event/:id" element={<ViewEvent />} />

          <Route path="/organizer/:id" element={<ViewOrganizer />} />

          <Route path="*" element={<NotFound />} />

        </Routes>
      </Router>
    </AuthApi.Provider>
  )
}

export default App;
