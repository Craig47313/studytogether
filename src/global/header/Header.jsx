import { useEffect } from "react";
import GoogleButton from "../../auth/googleButton/GoogleButton";
import useAuthStore from "../../lib/useAuthStore";
import style from "./Header.module.css";
import { Navigate, useNavigate } from "react-router-dom";
export default function Header(){
    const user = useAuthStore((state)=>state.user);
    const setUser = useAuthStore((state)=>state.setUser);
    const navigate = useNavigate();
    const logout = () =>{
        setUser(null);
    }

    useEffect(()=>{
        console.log(user);
        console.log('change in user');
    },[user])

    return(
        <div className={style.bar}>
            <button className={style.homeButton} onClick={() => navigate("/")}>home</button>
            <button className={style.homeButton} onClick={()=>navigate("/create")}>create listing</button>
            <button className={style.homeButton} onClick={()=>navigate("/browse")}>browse listings</button>
            <div className={style.authButtonContainer}>
                {user ? <button onClick={logout} className={style.homeButton}>logout</button> //steal style from homebutton
                : 
                <GoogleButton/>}
            </div>
            
        </div>
        
    );
}