import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Login from './pages/Login/Login';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Signup from './pages/Signup/Signup'
import Header from './components/Header/Header'
import Error from './components/Error/Error'
import Home from './pages/Home/Home';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Header/>
        <Routes>
          <Route exact path="/" element={<Home/>}>
          </Route>
          <Route exact path="/login" element={<Login />}>
          </Route>
          <Route exact path="/signup" element={<Signup />}>
          </Route>
          <Route path='*' element={<Error />}>
          </Route>
        </Routes>
  </Router>
);


