import { Navigate } from "react-router-dom";
import useAuthStore from "../lib/useAuthStore";

export default function Home(){
    const user = useAuthStore((state) => state.user);
    const anounce = "This website is being published for the SAS HS hackathon 2025!!!\n\nIntructions for new users:\n   If you want to create a session, it's reccomended to put a zoom / google meets link in the description\nIf you don't but in a meeting link, you should contact each attendee to meet in person or otherwise study\n***Warning*** your email will be visible to the host of sessions you join"
    return(
        <>
            <h1>Hi There!, Welcome to Study Together</h1>
            <h2>Anouncements: </h2>
           <h3 style={{ 
                whiteSpace: "pre-wrap",
                // Reset defaults just in case
                margin: 0,
                padding: 0
            }}>
                {anounce} 
            </h3>
        </>
        
    );
}