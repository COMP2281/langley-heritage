import personIcon from "../../../img/person_icon.png"

function Record({record}){ // record : {firstName, surname, burialDate, age, plotNumber, BorA ,address, inscription, personalLinks, other}
    const data = [
        { label: "Burial Date", value: record.burialDate },
        { label: "Age", value: record.age },
        { label: "Plot Number", value: record.plotNumber },
        { label: "Address", value: record.address },
        { label: "Inscription", value: record.inscription },
        { label: "Personal Links", value: record.personalLinks },
        { label: "Other Info", value: record.other }
      ];
    const titleFont = `font-serif font-bold italic`
    const centre = `flex justify-center items-center`
    return (  
        <div className={`${centre} min-h-screen gap-y-12 flex-col`}>
            <div className={`${centre} p-4`}>
                <img src={personIcon} alt="Record Image" className="w-32 h-32 rounded-md" />
                <h2 className="text-3xl font-bold font-serif">
                    {record.firstName} {record.surname}
                </h2>
            </div>
            <div className={`${centre} flex-col gap-y-2`}>
                {data.map((item, index) => (
                    <div key={index} className={`${centre} gap-x-10`}>
                        <p>
                            <span className={titleFont}>{item.label}: </span>
                            {item.value}
                        </p>
                    </div>
                    ))}
            </div>
        </div>  
    );  
}  

export default Record;