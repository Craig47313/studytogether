import { Navigate } from "react-router-dom";
import useAuthStore from "../lib/useAuthStore";

export default function Home(){
    const user = useAuthStore((state) => state.user);
    return(
        <h1>Home</h1>
    );
}