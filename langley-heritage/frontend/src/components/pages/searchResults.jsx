import { useState, useEffect } from "react";
import personIcon from "../../../img/person_icon.png";
import { useLocation, useParams } from "react-router-dom";

import SearchBar from "../searchbar";


const useSearch = (query) => {
	const [records, setRecords] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		async function fetchRecords()
		{
			let response = await fetch(`/search?query=${query}`)
			if (!response.ok) {
				throw new Error("Server errored getting records");
			}
			let newRecords = await response.json()

			setRecords(newRecords);
			setLoading(false)
		}

		fetchRecords();
	}, [query]);

	return { records, loading, error };
};

function SearchResults() {
    let location = useLocation()
    let query = location.state.query
    const { records, loading, error } = useSearch(query);
    //let records = [{id : 2, name : "john"},{id : 1, name : "steve"}]

    if (loading) return <p>Loading...</p>;
    if (error) return <p>A network error was encountered</p>;

    const titleFont = "font-serif font-bold italic";
    const centre = "flex justify-center items-center";

    
    return (
        <div className={`${centre} min-h-screen gap-y-12 flex-col`}>
            <SearchBar />
            <span>Found {records.length} Records</span>
            <div className="max-w-2xl w-full flex flex-col gap-y-2">
                {records.map((record, recordIndex) => (
                    <div key={recordIndex} className="border-2 border-[#D3D3D3] p-8 rounded-lg shadow-xl w-full max-w-2xl hover:border-[#780502] transition-all duration-300 bg-transparent">
                        {/* {Object.entries(record).map(([key, value], index) => ( */}
                        <span>{record.Firstname} {record.Surname} </span>
                        {/* ))} */}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SearchResults;
