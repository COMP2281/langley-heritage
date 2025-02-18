import { Link } from "react-router-dom";

function NavBar() {
	const centerUnderlineHover = "relative pb-1 after:content-[''] after:absolute after:left-1/2 after:bottom-0 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 after:origin-center hover:after:left-0 hover:after:w-full"
	return (
		<nav className="bg-[#780502] text-white p-8 flex justify-center relative">
			<div className="absolute left-4 text-xl font-bold">
				<span className="font-serif">Langley Heritage.</span>
			</div>

			<ul className="flex space-x-6">
				{["Home", "Explore", "Our Mission", "Help", "Login"].map((item, index) => (
					<li key={index} className="relative font-semibold ">
						<Link className={centerUnderlineHover}>
							{item}
						</Link>
					</li>
				))}
			</ul>
		</nav>
	);
}

export default NavBar;
