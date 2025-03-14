import missionImg from "../../../img/mission.jpg";

function Mission(){
    return (
        <div className="flex flex-col justify-center items-center min-h-screen">
            {/* <h2 className="text-3xl font-bold font-serif text-[#780502]">
                    Langley Park Cemetery
            </h2> */}
            <img src={missionImg} alt="Mission Img" style={{width: '60%'}} />
	    </div>
    );
}

export default Mission;