import GoogleButton from "../../auth/googleButton/GoogleButton";
import useAuthStore from "../../lib/useAuthStore";
import style from "./Header.module.css";
export default function Header(){
    const user = useAuthStore((state)=>state.user);
    const setUser = useAuthStore((state)=>state.setUser);
    const goToHome = () =>{
        <Navigate to="/" replace />
    }
    const logout = () =>{
        setUser(null);
    }
    return(
        <div className={style.bar}>
            <button className={style.homeButton} onClick={goToHome}>home</button>
            
            <div className={style.authButton}>
                {user ? <button onClick={logout}>logout</button>
                : 
                <GoogleButton/>}
            </div>
            
        </div>
        
    );
}