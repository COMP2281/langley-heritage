import { useState, useEffect } from "react";

function SearchResults({ query }) {
    //const { records, loading, error } = useSearch(query);
    let records = [{id : 2, name : "john"}]

    // if (loading) return <p>Loading...</p>;
    // if (error) return <p>A network error was encountered</p>;

    const titleFont = "font-serif font-bold italic";
    const centre = "flex justify-center items-center";

    
    return (
        <div className={`${centre} min-h-screen gap-y-12 flex-col`}>
            <span>Found {records.length} Records</span>
            {records.forEach((record,recordIndex) => {
                Object.entries(record).map(([key, value], index) => {
                    <div className="bg-[#780502] p-8 rounded-lg shadow-xl w-full max-w-md">
                        record
                    </div>
                })
            })}
        </div>
    );
}

export default SearchResults;
