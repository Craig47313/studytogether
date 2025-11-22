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

    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || "";

    useEffect(() => {
        async function loadListings() {
            const listings = await getAllSessions();
            const filtered = listings.filter(listing => {
                return (query == "" || listing.description?.toLowerCase().includes(query.toLowerCase()));
            });
            setResults(listings.length ? filtered : exampleResults);
        }
        loadListings();
    }, [query]);

    const exampleResults = [];
    const [results, setResults] = useState(exampleResults);
    const [sort, setSort] = useState("newest");

    const buttons = results.map((result) => {
        return (
            <div className={styles.previewContainer}>
                <h3>{result.title || "no title"} </h3>
                <p>Month: {result.month}</p>
                <p>Day: {result.day}</p>
                <p>Start time: {result.startTime}</p>
                <p>End time: {result.endTime}</p>
                <p>Description: {result.description}</p>
            </div>
        );
    })

    return(

        <div className={styles.BrowsePage}>
            
            <h1 className={styles.title}>All Sessions:</h1>

            <div className={styles.sessions}>
                {results.length !== 0 ? buttons : "Loading..."}
            </div>
            


        </div>
        
    );
}