import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import Home from './components/pages/home'
import NavBar from './components/navbar';
import Mission from './components/pages/ourmission';
import Contact from './components/pages/contact';
import Login from './components/pages/login';

import './App.css'

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/mission" element={<Mission />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App

