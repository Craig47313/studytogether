import { useState } from "react";
import useAuthStore from "../../lib/useAuthStore";
import { doc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import Select from "react-select";
import { redirect } from "react-router-dom";

export default function CreateSeshForm(props){
    const [isLoading, setLoading] = useState(false);
    const user = useAuthStore((state) => state.user);

    const handleSubmit = async (e) =>{
        e.preventDefault();

        const userDocRef = doc(db,"userStuff",user.uid);

    }
    const monthOptions = [
        {value: "nov", label: "november"},
        {value: "dec", label: "december"},
        {value: "jan", label: "january"},
        {value: "feb", label: "february"},
        {value: "mar", label: "march"},
        {value: "apr", label: "april"},
        {value: "may", label: "may"},
        {value: "jun", label: "june"},
        {value: "jul", label: "july"},
        {value: "aug", label: "august"},
        {value: "sep", label: "september"},
        {value: "oct", label: "october"}
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

    return (
        <>
            {isLoading && <h1>Loading...</h1>}
            <form onSubmit={handleSubmit}>
                <p>Month</p>
                <Select options={monthOptions}
                    styles={{
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
                    }}
                />
                <p>Day</p>
                <Select onChange={(e)=>{props.set}} options={dayOptions}
                    styles={{
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
                    }}
                />

            </form>
        </>
    );
}