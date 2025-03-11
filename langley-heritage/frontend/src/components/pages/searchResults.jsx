import { useState, useEffect } from "react";

const useSearch = (id) => {
    const [records, setRecords] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`/search`, { mode: "cors" })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Server errored getting record list");
                }
                return response.json();
            })
            .then((data) => setRecords(data))
            .catch((err) => setError(err))
            .finally(() => setLoading(false));
    }, [id]);

    return { records, loading, error };
};

const titleFont = "font-serif font-bold italic";
const centre = "flex justify-center items-center";
function SearchResults(){
    return(
        <div className={`${centre} min-h-screen gap-y-12 flex-col`}>
            hello
        </div>
    )
}

export default SearchResults