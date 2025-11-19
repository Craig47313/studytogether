import { GoogleAuthProvider, signInWithPopup, signInWithRedirect } from "firebase/auth";
import useAuthStore from "../../lib/useAuthStore";
import { doc, setDoc } from "firebase/firestore";
import { db, auth } from "../../lib/firebase";
import style from "./GoogleButton.module.css";
//import google_logo from "/google-logo.png";
export default function GoogleButton(){
    const setUser = useAuthStore((state)=>state.setUser);

    const handleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            console.log("Signed in user:", user);
            setUser(user);
            if (result._tokenResponse?.isNewUser) {
                console.log("new user");
                const userDocRef = doc(db, "userStuff", user.uid);
                await setDoc(userDocRef, {
                name: user.displayName,
                photoURL: user.photoURL || null,
                chats:[],
                listings: []
                });
            }
        } catch (error) {
        console.error("Login error:", error);
        }
    };
    
  return (
    <button onClick={handleLogin} className={style.GoogleButton}>
        
        {/*<img src={"./vite.svg"} alt="Google logo"/> */}
        Log in
    </button>
  );
}