import styles from "./SessionPreview.module.css";

export default function SessionPreview(props){
    console.log(props);
    return(
        <div className={styles.previewContainer}>
            <h3>{props.title || "no title"} </h3>
            <p>Month: {props.month}</p>
            <p>Day: {props.day}</p>
            <p>Start time: {props.startTime}</p>
            <p>End time: {props.endTime}</p>
        </div>
        
    )
}