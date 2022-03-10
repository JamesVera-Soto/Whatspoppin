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
import {AuthApiProvider} from './AuthApi';
import PrivateRoute from './PrivateRoute';
import LoggedInRoute from './LoggedInRoute';
import NotFound from './components/NotFound';
import ViewEvent from './components/ViewEvent';
import ViewOrganizer from './components/ViewOrganizer';
import EditEvent from './components/AccountComponents/EditEvent';


function App() {

  

  return  (
    <AuthApiProvider>
      <Router>
        <NavBar />

        <Routes>

          <Route exact path="/" element={<Home />} />

          <Route path="/events" element={<Events />} />

          <Route path="/signup" element={<LoggedInRoute><Signup /></LoggedInRoute>} />

          <Route path="/login" element={<LoggedInRoute><Login /></LoggedInRoute>} />

          <Route path="/account" element={<PrivateRoute><AccountHome /></PrivateRoute>} />
          <Route path="/account/my-events" element={<PrivateRoute><MyEvents /></PrivateRoute>} />
          <Route path="/account/followers" element={<PrivateRoute><Followers /></PrivateRoute>} />
          <Route path="/account/following" element={<PrivateRoute><Following /></PrivateRoute>} />
          <Route path="/account/notifications" element={<PrivateRoute><Notifications /></PrivateRoute>} />
          <Route path="/account/create-event" element={<PrivateRoute><AccountCreateEvent /></PrivateRoute>} />
          <Route path="/account/my-events/:id" element={<PrivateRoute><EditEvent /></PrivateRoute>} />

          <Route path="/event/:id" element={<ViewEvent />} />

          <Route path="/organizer/:id" element={<ViewOrganizer />} />

          <Route path="*" element={<NotFound />} />

        </Routes>
      </Router>
    </AuthApiProvider>
  )
}

export default App;
