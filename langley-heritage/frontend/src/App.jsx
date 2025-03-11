import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import Home from './components/pages/home'
import NavBar from './components/navbar';
import Mission from './components/pages/ourmission';
import Contact from './components/pages/contact';
import Login from './components/pages/login';
import Record from './components/pages/record';
import MapPage from './components/pages/mapPage';
import SearchResults from './components/pages/searchResults';

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
				{/* <Route path="/testing" element={<Record id = {8}/>} /> */}
				<Route path="/testing" element={<SearchResults query = {"Robert"}/>} />
				<Route path="/map" element={<MapPage />} />
			</Routes>
		</div>
	</Router>
	);
	}


	export default App

