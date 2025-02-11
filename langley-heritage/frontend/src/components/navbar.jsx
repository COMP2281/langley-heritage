import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav className="bg-gray-900 p-4 flex justify-between items-center">
        <div className="text-white text-xl font-bold">Langley Heritage</div>
        <div className="flex space-x-4">
        <li className="text-gray-400 hover:text-white transition"><Link to="/">Home</Link></li>
        <li className="text-gray-400 hover:text-white transition"><Link to="/w&e">W&E Page</Link></li>
        </div>
    </nav>
  );
}

export default NavBar