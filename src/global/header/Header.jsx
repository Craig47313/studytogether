import { useEffect } from "react";
import GoogleButton from "../../auth/googleButton/GoogleButton";
import useAuthStore from "../../lib/useAuthStore";
import style from "./Header.module.css";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export default function Header(){
    const user = useAuthStore((state)=>state.user);
    const setUser = useAuthStore((state)=>state.setUser);
    const navigate = useNavigate();
    const logout = () =>{
        setUser(null);
        navigate("/");
    }

    useEffect(()=>{
        console.log(user);
        console.log('change in user');
    },[user])
    function goToMySessionsPage(){
        if(user === null || user === undefined){
            toast.warn("Sorry, you don't seem to be logged in right now");
        }else{
            navigate("/mysessions");
        }
    }
    return(
        <div className={style.bar}>
            <button className={style.homeButton} onClick={() => navigate("/")}>
                <img src="/studyTogetherLogo.png" alt="home" className={style.logo}/>
            </button>
            <button className={style.headerButton} onClick={()=>navigate("/create")}>create listing</button>
            <button className={style.headerButton} onClick={()=>navigate("/browse")}>browse listings</button>
            <button className={style.headerButton} onClick={()=>goToMySessionsPage()}>my sessions</button>
            <div className={style.authButtonContainer}>
                {user ? <button onClick={logout} className={style.homeButton}>logout</button> //steal style from homebutton
                : 
                <GoogleButton/>}
            </div>
            
        </div>
        
    );
}