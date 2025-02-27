import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import Home from './components/pages/home'
import NavBar from './components/navbar';
import Mission from './components/pages/ourmission';
import Contact from './components/pages/contact';
import Login from './components/pages/login';
import Record from './components/pages/record';
import MapPage from './components/pages/mapPage';

import './App.css'

function App() {
	const exampleRecord = {
		firstName: "John",
		surname: "Doe",
		burialDate: "2023-02-15",
		age: 45,
		plotNumber: "A1",
		BorA: "B",
		address: "123 Cemetery St.",
		inscription: "In Loving Memory",
		personalLinks: "https://johnswebsite.com",
		other: "Other details"
		};
	return (
	<Router>
		<div className="bg-[#F7F7F7] min-h-screen">
			<NavBar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/mission" element={<Mission />} />
				<Route path="/contact" element={<Contact />} />
				<Route path="/login" element={<Login />} />
				<Route path="/testing" element={<Record record = {exampleRecord}/>} />
				<Route path="/map" element={<MapPage />} />
			</Routes>
		</div>
	</Router>
	);
	}


	export default App

