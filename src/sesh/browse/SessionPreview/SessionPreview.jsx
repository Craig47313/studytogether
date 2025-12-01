import { useParams } from "react-router-dom";
import styles from "./SessionPreview.module.css";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { useEffect, useState } from "react";

export default function SessionPreview(){
    const id = useParams().id;
    const [result, setSeshData] = useState(null);

    async function getSeshData() {
        const sessionDocRef = doc(db, "allListings", id);
        const currentSession = (await getDoc(sessionDocRef)).data();
        setSeshData(currentSession);
    }
    
    useEffect(()=>{
        getSeshData();
    },[]);

    const monthOptions = [
        {value: null, label: "any"},
        {value: "10", label: "november"},
        {value: "11", label: "december"},
        {value: "00", label: "january"},
        {value: "01", label: "february"},
        {value: "03", label: "march"},
        {value: "04", label: "april"},
        {value: "05", label: "may"},
        {value: "06", label: "july"},
        {value: "07", label: "august"},
        {value: "08", label: "september"},
        {value: "09", label: "october"}
    ]
    let month = "mon"

    const convTime = (timeString) =>{
        try{
            const hourString = timeString.slice(0,2);
            const minuteString = timeString.slice(2);
            const hourMil = Number(hourString);
            const partOfDay = hourMil < 12 ? "AM" : "PM";
            const hourReg = hourMil % 12 !== 0 ? hourMil % 12 : 12;
            return String(hourReg)+":"+minuteString+partOfDay;
        }catch{
            return timeString;
        }
    }

    if(result === null){
        return "Loadings";
    }else{
        month = monthOptions.find(option => option.value === result.month).label.slice(0,3); //find the abreviated month
    }

    const attendees = result.attendees.map((attendee)=>{
        const isHost = attendee.email === result.host.email;
        if(isHost){
            return(
                <li style={{color: "#646cff"}}>{attendee.email}</li>
            )
        }else{
            return(
                <li>{attendee.email}</li>
            )
        }
        
    })

    return(
        <div className={styles.fullContainer}>
        
            <div className={styles.previewContainer} key={crypto.randomUUID()}>
                <h2 className={styles.seshTitle}>{result.title || "no title"} </h2>
                <p>Host:</p>
                <p className={styles.hostEmail}> {result.host.email}</p>
                <p>Day: {month} {result.day}</p>
                <p>Start time: {convTime(result.startTime)}</p>
                <p>End time: {convTime(result.endTime)}</p>
                <p>Amount Attending: {result.amtSignedUp}</p>
                <p style={{
                    overflowY: "scroll",
                    height: "65px"
                }}>Description: {result.description}</p> 
            </div>
            
            <div>
                <h2>Attendees</h2>
                <ul>
                    {attendees}
                </ul>
            </div>
            

        </div>
    )
}