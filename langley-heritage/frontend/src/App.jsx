import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import Home from './components/pages/homePage'
import NavBar from './components/navbar';
import Mission from './components/pages/missionPage';
import Contact from './components/pages/contactPage';
import Login from './components/pages/loginPage';

import './App.css'

function App() {
  return (
    <Router>
      <div className="bg-[#F7F7F7] min-h-screen">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mission" element={<Mission />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}


export default App
