import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import Home from './components/homePage'
import NavBar from './components/navbar';
import WEPage from './components/w&ePage';

import './App.css'

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/w&e" element={<WEPage />} />
      </Routes>
    </Router>
  );
}

export default App
