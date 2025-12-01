import { arrayRemove, collection, doc, getDoc, getDocs, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import styles from './MySessions.module.css';
import useAuthStore from '../../lib/useAuthStore';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Select from 'react-select';

export async function getAllSessions() {
        
    try{
        const querySnapshot = await getDocs(collection(db, "allListings"));
        const listings = querySnapshot.docs.map(doc => doc.data());
        return listings;
    }catch (err){
        console.error("Error fetching listings:", err);
        return [];
    }
    
}
export default function MySessions(){
const user = useAuthStore((state) => state.user);

    const navigate = useNavigate();

    //use states
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('q') || "";

    const exampleResults = [];
    const [attendResults, setAttendResults] = useState(exampleResults);
    const [hostResults, setHostResults] = useState(exampleResults);
    const [sort, setSort] = useState("earliest");
    const [searchInp, setSearchInp] = useState("");
    const [month, setMonth] = useState(null);
    const [day, setDay] = useState(null);
    const [title, setTitle] = useState("No Search Parameter");



    async function loadListings() { //sets the results \

        const allSessions = await getAllSessions();

        if(allSessions.length == 0){//don't do anything if there are no sessions
            return;
        }

        let filtered = allSessions.filter(listing => { //filter by search params
            let isGood = query == "" || listing.title?.toLowerCase().includes(query.toLowerCase());
            isGood = isGood && (month == null || listing.month == month);
            isGood = isGood && (day == null || listing.day == day);
            return isGood;
        });

        /*
        console.log("user");
        console.log(user);*/

        //don't check user as you can only be on this page if you are logged in
        const userDocRef = doc(db,"userStuff",user.uid); 
        let docSnap = await getDoc(userDocRef);
        if (!docSnap.exists()) {
            await setDoc(userDocRef, { listings: [], signups: [] });
            docSnap = await getDoc(userDocRef);
        }

        const userData = docSnap.data();
        const signups = userData.signups || [];
        const listings = userData.listings || [];

        /*console.log("signups");
        console.log(signups);
        console.log(signups.length);
        console.log("listings");
        console.log(listings);
        console.log(listings.length);
        console.log("filtered before adding status");
        console.log(filtered);*/

        let sessionsHosting = filtered.filter(listing =>{
            if(listings.includes(listing.id)){
                /*
                console.log(listing.id + "in listings");
                listing.status = "Hosting";*/
                console.log(listing.title + " by " + listing.host.email + " is hosted by you");
                return true;
                
            }else{
                return false;
            }
        });

        let sessionsAttending = filtered.filter(listing =>{
            let good = true;
            if(listings.includes(listing.id)){
                return false;
            }else if(signups.includes(listing.id)){
                return true
            }else{
                return false
            }
        });

        //sort the sessions
        if(sort === "earliest"){
            sessionsHosting = sessionsHosting.sort((a, b)=>{
                
                const aTotal = a.month + "/" + a.day + "/" + a.startTime; 
                const bTotal = b.month + "/" + b.day + "/" + b.startTime; 
                //console.log(aTotal);
                if(aTotal > bTotal){
                    return 1;
                }else if(aTotal < bTotal){
                    return -1;
                }else{
                    return 0;
                }
            });   
            sessionsAttending = sessionsAttending.sort((a, b)=>{
                
                const aTotal = a.month + "/" + a.day + "/" + a.startTime; 
                const bTotal = b.month + "/" + b.day + "/" + b.startTime; 
                //console.log(aTotal);
                if(aTotal > bTotal){
                    return 1;
                }else if(aTotal < bTotal){
                    return -1;
                }else{
                    return 0;
                }
            });  
        }else if(sort === "latest"){
            sessionsHosting = sessionsHosting.sort((a, b)=>{
                
                const aTotal = a.month + "/" + a.day + "/" + a.startTime; 
                const bTotal = b.month + "/" + b.day + "/" + b.startTime; 
                //console.log(aTotal);
                if(aTotal > bTotal){
                    return -1;
                }else if(aTotal < bTotal){
                    return 1;
                }else{
                    return 0;
                }
            }); 
            sessionsAttending = sessionsAttending.sort((a, b)=>{
                
                const aTotal = a.month + "/" + a.day + "/" + a.startTime; 
                const bTotal = b.month + "/" + b.day + "/" + b.startTime; 
                //console.log(aTotal);
                if(aTotal > bTotal){
                    return -1;
                }else if(aTotal < bTotal){
                    return 1;
                }else{
                    return 0;
                }
            }); 
        }else if(sort === "numPeople"){
            sessionsHosting = sessionsHosting.sort((a, b)=>{
                //console.log(aTotal);
                if(a.amtSignedUp > b.amtSignedUp){
                    return -1;
                }else if(a.amtSignedUp < b.amtSignedUp){
                    return 1;
                }else{
                    return 0;
                }
            }); 
            sessionsAttending = sessionsAttending.sort((a, b)=>{
                //console.log(aTotal);
                if(a.amtSignedUp > b.amtSignedUp){
                    return -1;
                }else if(a.amtSignedUp < b.amtSignedUp){
                    return 1;
                }else{
                    return 0;
                }
            }); 
        }

        setAttendResults(sessionsAttending.length > 0 ? sessionsAttending : exampleResults);
        setHostResults(sessionsHosting.length > 0 ? sessionsHosting : exampleResults);
        console.log("results set");
        console.log("sessions attending");
        console.log(sessionsAttending);
        console.log("sessions hosting");
        console.log(sessionsHosting);
    }

    useEffect(() => {
        loadListings();
    }, [query, day, month, sort, user]);

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

    const dayOptions = [
        {value: null, label: "any"},
        {value: "01", label: "1"},
        {value: "02", label: "2"},
        {value: "03", label: "3"},
        {value: "04", label: "4"},
        {value: "05", label: "5"},
        {value: "06", label: "6"},
        {value: "07", label: "7"},
        {value: "08", label: "8"},
        {value: "09", label: "9"},
        {value: "10", label: "10"},
        {value: "11", label: "11"},
        {value: "12", label: "12"},
        {value: "13", label: "13"},
        {value: "14", label: "14"},
        {value: "15", label: "15"},
        {value: "16", label: "16"},
        {value: "17", label: "17"},
        {value: "18", label: "18"},
        {value: "19", label: "19"},
        {value: "20", label: "20"},
        {value: "21", label: "21"},
        {value: "22", label: "22"},
        {value: "23", label: "23"},
        {value: "24", label: "24"},
        {value: "25", label: "25"},
        {value: "26", label: "26"},
        {value: "27", label: "27"},
        {value: "28", label: "28"},
        {value: "29", label: "29"},
        {value: "30", label: "30"},
        {value: "31", label: "31"}
    ]

    const leaveSession = async(sessionId) => {
        if(!user){
            toast.warn("Cannot join session while logged out");
            return;
        }
        setAttendResults(exampleResults);

        const userDocRef = doc(db,"userStuff",user.uid); 
        const docSnap = await getDoc(userDocRef);
        if (!docSnap.exists()) {
            await setDoc(userDocRef, { listings: [], signups: [] });
        }
        
        const sessionDocRef = doc(db, "allListings", sessionId);
        
        const currentSession = (await getDoc(sessionDocRef)).data();

        await updateDoc(sessionDocRef, {
            amtSignedUp: currentSession.amtSignedUp - 1,
            attendees: arrayRemove({email: user.email, id: user.uid})
        });

        await updateDoc(userDocRef, {
            signups: arrayRemove(sessionId)
        });

        console.log("left session");
        loadListings();
    }

    const attendPreviews = attendResults.map((result) => {
        //console.log(result);
        if(!result){
            return "";
        }
        const month = monthOptions.find(option => option.value === result.month).label.slice(0,3);
        return (
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
                <button onClick={() => leaveSession(result.id)} 
                    className={styles.leaveButton}>
                    <p className={styles.leaveSession}>Leave Session</p>
                </button>
            </div>
        );
    });

    const seeAttendees = () => {
        navigate("/");
    }

    const hostPreviews = hostResults.map((result) => { //creates all of the previews of the things you're hosting
        //console.log(result);
        if(!result){
            return "";
        }
        const month = monthOptions.find(option => option.value === result.month).label.slice(0,3);
        return (
            <div className={styles.previewContainer} key={crypto.randomUUID()}>
                <h2 className={styles.seshTitle}>{result.title || "no title"} </h2>
                <p>Day: {month} {result.day}</p>
                <p>Start time: {convTime(result.startTime)}</p>
                <p>End time: {convTime(result.endTime)}</p>
                <p>Amount Attending: {result.amtSignedUp}</p>
                <p style={{
                    overflowY: "scroll",
                    height: "65px"
                }}>Description: {result.description}</p> 
                <button onClick={() => seeAttendees(result.id)} 
                    className={styles.seeAttendeesButton}>
                    <p className={styles.leaveSession}>See Attendees</p>
                </button>
            </div>
        );
    });

    const handleSearch = (e) =>{ //handles when the search box is submitted
        e.preventDefault();
        const newSearchParams = {};
        newSearchParams.q = searchInp;
        setSearchParams(newSearchParams);
        setTitle(searchInp !== "" ? searchInp : "No Search Parameter");
    }

    const sortOptions = [
        {value: "earliest", label: "earliest"},
        {value: "latest", label: "latest"},
        {value: "numPeople", label:"#people"}
    ]

    const selectStyles = { //have to do it like this since it's easiest. <-- found this method in the docs for select
        menuList: (baseStyles, state) => ({
            ...baseStyles,
            backgroundColor: '#332f8e'
        }),
        option: (baseStyles, state)=>({
            ...baseStyles,
            backgroundColor: state.isFocused ? "#1a1a1a" : "#332f8e"
        }),
        valueContainer: (baseStyles, state) => ({
            ...baseStyles,
            backgroundColor: '#332f8e',
            color: '#ffffffff',
        }),
        singleValue: (baseStyles, state) => ({
            ...baseStyles,
            color: '#ffffffff',
        }),
        dropdownIndicator: (baseStyles, state) => ({
            ...baseStyles,
            backgroundColor: '#332f8e',
        }),
        indicatorSeparator: (baseStyles, state) => ({
            ...baseStyles,
            backgroundColor: '#332f8e',
        }),
        indicatorsContainer: (baseStyles, state) => ({
            ...baseStyles,
            backgroundColor: '#332f8e',
        }),
        control: (baseStyles, state) => ({
            ...baseStyles,
            backgroundColor: '#332f8e',
            borderRadius: '0px',
            border: 'solid 2px #332f8e',
            "&:hover":{
                borderColor: '#646cff'
            },
            width: '105x',
            height: '50px',
            fontSize: '17px',
            boxShadow: 'none',

        })
        
    };

    return(

        <div className={styles.BrowsePage}>
            <div className={styles.searchContainer}>
                <form onSubmit={handleSearch}>
                    <button type="submit" className={styles.searchButton}>Search</button>
                    <input type="text" className={styles.searchInput} onChange={(e)=>setSearchInp(e.target.value)} placeholder="eg: math"/>
                   
                </form>
                <Select onChange={(e)=>{setSort(e.value)}} options={sortOptions} styles={selectStyles} placeholder="Sort"/>
                <Select onChange={(e)=>{setDay(e.value)}} options={dayOptions} styles={selectStyles} placeholder="Day"/>
                <Select onChange={(e)=>{setMonth(e.value)}} options={monthOptions} styles={selectStyles} placeholder="Month"/>
                <h1 className={styles.title}>{title}</h1>
            </div>

            
            <div className={styles.attendRow}>
                <h1 className={styles.attendTitle}>
                    Sessions you're attending:
                </h1>
                <div className={styles.sessions}>
                    {attendResults.length !== 0 ? attendPreviews: "Loading..."}
                </div>
                <h1 className={styles.attendTitle}>
                    Sessions you're hosting:
                </h1>
                <div className={styles.sessions} style={{paddingBottom:"0px"}}>
                    {hostResults.length !== 0 ? hostPreviews: "Loading..."}
                </div>
            </div>
            
            


        </div>
        
    );
}