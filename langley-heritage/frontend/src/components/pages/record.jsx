import { useState, useEffect } from "react";
import personIcon from "../../../img/person_icon.png";
import { useLocation } from "react-router-dom";

const useRecord = (id) => {
    const [record, setRecord] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchRecord() {
            try {
                let response = await fetch(`/record?id=${id}`);
                if (!response.ok) {
                    throw new Error("Server errored getting record");
                }
                let newRecord = await response.json();
                setRecord(newRecord);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchRecord();
    }, [id]);

    return { record, loading, error };
};

function Record() {
    const location = useLocation(); 
    const id = location.state?.id; 

    if (!id) {
        return <p>Error: No record ID provided.</p>; 
    }

    const { record, loading, error } = useRecord(id);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>A network error was encountered</p>;

    const titleFont = "font-serif font-bold italic";
    const centre = "flex justify-center items-center";

    let hiddenAttributes = ["RecordID", "Firstname", "Middlename", "Surname"];

    return (
        <div className={`${centre} min-h-screen gap-y-12 flex-col`}>
            <div className={`${centre} p-4`}>
                <img src={personIcon} alt="Record Image" className="w-32 h-32 rounded-md" />
                <h2 className="text-3xl font-bold font-serif">
                    {record.Firstname} {record.Middlename ? record.Middlename : ""} {record.Surname}
                </h2>
            </div>
            <div className={`${centre} flex-col gap-y-2`}>
                {Object.entries(record).map(([key, value], index) => (
                    !hiddenAttributes.includes(key) && value && (
                        <div key={index} className={`${centre} gap-x-10`}>
                            <p>
                                <span className={titleFont}>{key}: </span>
                                {value}
                            </p>
                        </div>
                    )
                ))}
            </div>
        </div>
    );
}

export default Record;