import { useRef } from 'react'
import { useNavigate } from 'react-router-dom';



function search(query, navigate)
{
	navigate(`/testing`,{state: {query: query}})
}

function SearchBar() {
	const navigate = useNavigate()
	const searchTextRef = useRef(null)

	const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            search(searchTextRef.current.value, navigate); // Trigger search on "Enter"
        }
    };

	return (
	  <div className="flex justify-center my-8 w-full">
		<div className="flex items-center border border-gray-300 rounded-full px-4 py-2 shadow-sm max-w-lg w-full justify-center">
		  <input
			type="text"
			placeholder="Search"
			className="flex-grow bg-transparent outline-none px-4"
			ref={searchTextRef}
			onKeyDown={handleKeyPress}
		  />
		  <button className="bg-gray-300 hover:bg-gray-400 text-gray-600 p-2 rounded-full focus:outline-none"
		  	onClick={() => search(searchTextRef.current.value, navigate)}>
			<svg
			  xmlns="http://www.w3.org/2000/svg"
			  className="h-5 w-5"
			  fill="none"
			  viewBox="0 0 24 24"
			  stroke="currentColor"
			>
			  <path
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={2}
				d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z"
			  />
			</svg>
		  </button>
		</div>
	  </div>
	);
  }
  
  export default SearchBar;
  