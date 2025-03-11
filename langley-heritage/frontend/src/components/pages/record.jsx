import { useState, useEffect } from "react";
import personIcon from "../../../img/person_icon.png";

// Custom hook to fetch record data
const useRecord = (id) => {
	const [record, setRecord] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(async () => {
		let response = await fetch(`/record?id=${id}`, { mode: "cors" })
		console.log(`Status code: ${response.status}`)
		if (!response.ok) {
			throw new Error("Server errored getting record");
		}
		let newRecord = await response.json()
		console.log(`RECORD ${newRecord}`)
		setRecord(newRecord);
		setLoading(false)
	}, [id]);

	return { record, loading, error };
};

function Record({ id }) {
	const { record, loading, error } = useRecord(id);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>A network error was encountered</p>;

	const titleFont = "font-serif font-bold italic";
	const centre = "flex justify-center items-center";

	return (
		<div className={`${centre} min-h-screen gap-y-12 flex-col`}>
			<div className={`${centre} p-4`}>
				<img src={personIcon} alt="Record Image" className="w-32 h-32 rounded-md" />
				<h2 className="text-3xl font-bold font-serif">
					{record.FirstName} {record.MiddleName ? record.MiddleName : null} {record.Surname}
				</h2>
			</div>
			<div className={`${centre} flex-col gap-y-2`}>
				{Object.entries(record).map(([key, value], index) => (
					key !== "RecordID" && key !== "FirstName" && key !== "MiddleName" && key !== "Surname" && value !== null && (
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
