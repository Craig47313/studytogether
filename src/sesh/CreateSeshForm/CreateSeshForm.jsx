import { useEffect, useState } from "react";
import useAuthStore from "../../lib/useAuthStore";
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import Select from "react-select";
import { redirect } from "react-router-dom";
import styles from './CreateSeshForm.module.css';
import { toast } from "react-toastify";
export default function CreateSeshForm(props){
    const [isLoading, setLoading] = useState(false);
    const user = useAuthStore((state) => state.user);

    const [month, setMonth] = useState(null);
    const [day, setDay] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [desc, setDesc] = useState(null);
    const [title, setTitle] = useState(null);

    const allTimes = [
        {value: "0000", label: "00:00"},
        {value: "0030", label: "00:30"},
        {value: "0100", label: "01:00"},
        {value: "0130", label: "01:30"},
        {value: "0200", label: "02:00"},
        {value: "0230", label: "02:30"},
        {value: "0300", label: "03:00"},
        {value: "0330", label: "03:30"},
        {value: "0400", label: "04:00"},
        {value: "0430", label: "04:30"},
        {value: "0500", label: "05:00"},
        {value: "0530", label: "05:30"},
        {value: "0600", label: "06:00"},
        {value: "0630", label: "06:30"},
        {value: "0700", label: "07:00"},
        {value: "0730", label: "07:30"},
        {value: "0800", label: "08:00"},
        {value: "0830", label: "08:30"},
        {value: "0900", label: "09:00"},
        {value: "0930", label: "09:30"},
        {value: "1100", label: "11:00"},
        {value: "1130", label: "11:30"},
        {value: "1200", label: "12:00"},
        {value: "1230", label: "12:30"},
        {value: "1300", label: "13:00"},
        {value: "1330", label: "13:30"},
        {value: "1400", label: "14:00"},
        {value: "1430", label: "14:30"},
        {value: "1500", label: "15:00"},
        {value: "1530", label: "15:30"},
        {value: "1600", label: "16:00"},
        {value: "1630", label: "16:30"},
        {value: "1700", label: "17:00"},
        {value: "1730", label: "17:30"},
        {value: "1800", label: "18:00"},
        {value: "1830", label: "18:30"},
        {value: "1900", label: "19:00"},
        {value: "1930", label: "19:30"},
        {value: "2000", label: "20:00"},
        {value: "2030", label: "20:30"},
        {value: "2100", label: "21:00"},
        {value: "2130", label: "21:30"},
        {value: "2200", label: "22:00"},
        {value: "2230", label: "22:30"},
        {value: "2300", label: "23:00"},
        {value: "2330", label: "23:30"}
    ];
    const[endTimeOptions, setEndTimeOptions] = useState(allTimes);
    const[startTimeOptions, setStartTimeOptions] = useState(allTimes);

    useEffect(() =>{
        if(endTime !== null && startTime !== null){
            const filteredStartTimes = allTimes.filter(time => Number(time.value) < Number(endTime));
            const filteredEndTimes = allTimes.filter(time => Number(time.value) > Number(startTime));
            console.log("filtered times");
            console.log(filteredEndTimes);
            console.log(filteredStartTimes);
            setStartTimeOptions(filteredStartTimes);
            setEndTimeOptions(filteredEndTimes);
        }else if(endTime !== null){
            setEndTimeOptions(allTimes);
            const filteredStartTimes = allTimes.filter(time => Number(time.value) < Number(endTime));
            setStartTimeOptions(filteredStartTimes);
        }else if(startTime !== null){
            setStartTimeOptions(allTimes);
            const filteredEndTimes = allTimes.filter(time => Number(time.value) > Number(startTime));
            setEndTimeOptions(filteredEndTimes);
        }else{
            setEndTimeOptions(allTimes);
            setStartTimeOptions(allTimes);
        }
        
    },[endTime, startTime])



    const handleSubmit = async (e) =>{ 
        e.preventDefault();
        if(!(desc!==undefined && endTime !== null && startTime !== null && day !== null && month !== null && !isLoading)){
            toast.warn("Not all required fields have been filled");
            console.log("prevented bad submission");
            return;
        }else if(user === null){
            toast.warn("Please log in to create a study session");
            console.log("prevented bad submission");
            return;
        }

        setLoading(true);

        const userDocRef = doc(db,"userStuff",user.uid);
        
        const docSnap = await getDoc(userDocRef);
        if (!docSnap.exists()) {
            await setDoc(userDocRef, { listings: [] });
        }
        const listingId = crypto.randomUUID();

        const listDocRef = doc(db, "allListings", listingId);

        const newListing = {
            title: title,
            month: month,
            day: day,
            startTime: startTime,
            endTime: endTime,
            description: desc,
            host: user.email,
            id: listingId,
            amtSignedUp: 1
        }
        console.log("newListing:", newListing);

        await updateDoc(userDocRef, {
            listings: arrayUnion(newListing)
        });

        await setDoc(listDocRef, newListing);
        toast.success("Success!");
        setLoading(false);
    }
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
    const dayOptions = [
        {value: "1", label: "1"},
        {value: "2", label: "2"},
        {value: "3", label: "3"},
        {value: "4", label: "4"},
        {value: "5", label: "5"},
        {value: "6", label: "6"},
        {value: "7", label: "7"},
        {value: "8", label: "8"},
        {value: "9", label: "9"},
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
    const selectStyles = {
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
            borderColor: '#332f8e',
            borderRadius: '0px',
            "&:hover":{
                borderColor: '#646cff'
            },
            width: '150px',
            height: '65px',
            fontSize: '17px',
            boxShadow: 'none'
        })
        
    };

    const monthFull = monthOptions.find(option => option.value === month);
    let monthPreview = "";
    if(monthFull){
        monthPreview = monthFull.label.slice(0,3);
    }
    
    

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

    return (
        <div className={styles.CreateSeshFormContainer}>
            {isLoading && <h1>Loading...</h1>}
            
            <form onSubmit={handleSubmit}>
                <div className={styles.form}>
                    <div className={`${styles.part} ${title!==null ? styles.done : ""}`}>
                        <p>Title</p>
                        <input type="text" placeholder="type here" className={styles.descInput} onChange={(e)=>{setTitle(e.target.value)}}/>
                    </div>
                    <div className={`${styles.part} ${desc!==null ? styles.done : ""}`}>
                        <p>Description</p>
                        <input type="text" placeholder="type here" className={styles.descInput} onChange={(e)=>{setDesc(e.target.value)}}/>
                    </div>
                    <div className={`${styles.part} ${month!==null ? styles.done : ""}`}>
                        <p>Month</p>
                        <Select options={monthOptions} onChange={(e)=>{setMonth(e.value)}}
                            styles={selectStyles}
                        />
                    </div>
                    <div className={`${styles.part} ${day!==null ? styles.done : ""}`}>
                        <p>Day</p>
                        <Select onChange={(e)=>{setDay(e.value)}} options={dayOptions}
                        styles={selectStyles}
                        />
                    </div>
                    <div className={`${styles.part} ${startTime!==null ? styles.done : ""}`}>
                        <p>Start Time</p>
                        <Select onChange={(e)=>{setStartTime(e.value)}} options={startTimeOptions}
                        styles={selectStyles}
                        />
                    </div>
                    <div className={`${styles.part} ${endTime!==null ? styles.done : ""}`}>
                        <p>End Time</p>
                        <Select onChange={(e)=>{setEndTime(e.value)}} options={endTimeOptions}
                        styles={selectStyles}
                        />
                    </div>
                    <div className={`${styles.part} ${(desc!==undefined && endTime !== null && startTime !== null && day !== null && month !== null && !isLoading) ? styles.canSubmit : styles.cannotSubmit}`}>
                        <button onClick={handleSubmit} className={styles.submitButton} canSubmit={!isLoading}>Submit</button>   
                    </div>
                    
                </div>
            </form>
            <div className={styles.rightDiv}>
                <h2>Preview:</h2>
                <div className={styles.previewContainer}>
                    <h3>{title || "no title"} </h3>
                    <p>Day: {monthPreview} {day}</p>
                    <p>Start time: {convTime(startTime)}</p>
                    <p>End time: {convTime(endTime)}</p>
                    <p>Description: {desc}</p>
                </div>
            </div>
        </div>
    );
}