import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function NavBar() {
	const [menuOpen, setMenuOpen] = useState(false);
	const centerUnderlineHover =
		"relative pb-1 after:content-[''] after:absolute after:left-1/2 after:bottom-0 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 after:origin-center hover:after:left-0 hover:after:w-full";
	const links = ["/", "/mission", "contact", "login"];

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth >= 768 && menuOpen) {
				setMenuOpen(false);
			}
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, [menuOpen]);

	return (
		<nav className="bg-[#780502] text-white p-8 flex justify-between items-center fixed top-0 left-0 w-full z-50 shadow-lg">
			<div className="text-xl font-bold">
				<span className="font-serif">Langley Heritage.</span>
			</div>

			<div className="md:hidden">
				<button
					onClick={() => setMenuOpen((prev) => !prev)}
					className="text-2xl cursor-pointer px-3 py-2 rounded-md"
				>
					☰
				</button>
			</div>

			<ul
				className={`${
					menuOpen
						? "flex flex-col absolute top-full left-0 w-full bg-[#780502] items-center p-4"
						: "hidden"
				} md:hidden`}
			>
				{["Home", "Our Mission", "Contact", "Login"].map((item, index) => (
					<li key={index} className="relative font-semibold text-center">
						<Link to={links[index]} className={centerUnderlineHover}>
							{item}
						</Link>
					</li>
				))}
			</ul>

			<ul className="hidden md:flex space-x-6">
				{["Home", "Our Mission", "Contact", "Login"].map((item, index) => (
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

