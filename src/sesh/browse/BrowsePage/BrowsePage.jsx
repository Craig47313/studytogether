import { collection, getDocs } from "firebase/firestore";
import styles from "./browsePage.module.css";
import { db } from "../../../lib/firebase";
import { useEffect, useState } from "react";
import SessionPreview from "../SessionPreview/SessionPreview";
import { useSearchParams } from "react-router-dom";

async function getAllSessions() {
        
    try{
        const querySnapshot = await getDocs(collection(db, "allListings"));
        const listings = querySnapshot.docs.map(doc => doc.data());
        return listings;
    }catch (err){
        console.error("Error fetching listings:", err);
        return [];
    }
    
}

export default function BrowsePage(){

    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('q') || "";

    useEffect(() => {
        async function loadListings() {
            const listings = await getAllSessions();
            const filtered = listings.filter(listing => {
                return (query == "" || listing.title?.toLowerCase().includes(query.toLowerCase()));
            });
            setResults(listings.length ? filtered : exampleResults);
        }
        loadListings();
    }, [query]);

    const exampleResults = [];
    const [results, setResults] = useState(exampleResults);
    const [sort, setSort] = useState("newest");
    const [searchHeading, setSearch] = useState("");
    const [searchInp, setSearchInp] = useState("");

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

    const buttons = results.map((result) => {
        const monthOptions = [
            {value: 10, label: "november"},
            {value: 11, label: "december"},
            {value: 0, label: "january"},
            {value: 1, label: "february"},
            {value: 2, label: "march"},
            {value: 3, label: "april"},
            {value: 4, label: "may"},
            {value: 6, label: "july"},
            {value: 7, label: "august"},
            {value: 8, label: "september"},
            {value: 9, label: "october"}
        ]
        const month = monthOptions.find(option => option.value === result.month).label.slice(0,3);
        return (
            <div className={styles.previewContainer} key={crypto.randomUUID()}>
                <h3>{result.title || "no title"} </h3>
                <p>Day: {month} {result.day}</p>
                <p>Start time: {convTime(result.startTime)}</p>
                <p>End time: {convTime(result.endTime)}</p>
                <p>Description: {result.description}</p>
            </div>
        );
    })
    const handleSearch = (e) =>{
        e.preventDefault();
        const newSearchParams = {};
        newSearchParams.q = searchInp;
        setSearchParams(newSearchParams);
    }
    


    return(

        <div className={styles.BrowsePage}>
            <div className={styles.searchContainer}>
                <form onSubmit={handleSearch}>
                    <input type="text" className={styles.searchInput} onChange={(e)=>setSearchInp(e.target.value)}/>
                    <button type="submit">Search</button>
                </form>
                
                
            </div>

            <h1 className={styles.title}>All Sessions:</h1>

            <div className={styles.sessions}>
                {results.length !== 0 ? buttons : "Loading..."}
            </div>
            


        </div>
        
    );
}