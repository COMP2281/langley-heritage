import SearchBar from "../searchbar";

function Home() {
	return (
		<>
			<div className="flex flex-col justify-center items-center min-h-screen">
				<SearchBar />
			</div>
			<div className="bg-[#780502] w-full h-20 fixed bottom-0 left-0 flex justify-center items-center">
				<span className="text-white text-sm font-bold">Use the search bar to find a record</span>
			</div>
		</>
	);
}
  



export default Home;
