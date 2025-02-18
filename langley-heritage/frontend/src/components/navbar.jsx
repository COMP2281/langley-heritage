import { Link } from "react-router-dom";

function NavBar() {
	const centerUnderlineHover =
		"relative pb-1 after:content-[''] after:absolute after:left-1/2 after:bottom-0 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 after:origin-center hover:after:left-0 hover:after:w-full";
	const links = ["/","/mission","contact","login"];
	return (
		<nav className="bg-[#780502] text-white p-8 flex justify-between items-center relative">
			<div className="text-xl font-bold">
				<span className="font-serif">Langley Heritage.</span>
			</div>

			<input type="checkbox" id="menu-toggle" className="peer hidden" />
			<label
				htmlFor="menu-toggle"
				className="md:hidden text-2xl cursor-pointer peer-checked:outline-2 peer-checked:outline-white px-3 py-2 rounded-md"
			>
				☰
			</label>

			<ul className="hidden md:flex space-x-6 peer-checked:flex peer-checked:absolute peer-checked:top-full peer-checked:left-0 peer-checked:w-full peer-checked:bg-[#780502] peer-checked:flex-col peer-checked:items-center peer-checked:p-4 md:relative md:flex-row md:bg-transparent md:p-0">
				{["Home", "Our Mission", "Contact", "Login",""].map((item, index) => (
					<li key={index} className="relative font-semibold text-center">
						<Link to={links[index]} className={centerUnderlineHover}>
							{item}
						</Link>
					</li>
				))}
			</ul>
		</nav>
	);
}

export default NavBar;
