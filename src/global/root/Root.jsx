import { Outlet } from "react-router-dom"
import { useRef } from "react"
import Header from "../Header/Header";
import Footer from "../footer/Footer";
import styles from "./Root.module.css";
export default function Root() {
    const mainRef = useRef(null);

    return (
        <div className={styles.fullContainer}>  
            <div className={styles.Header}>
                <Header scrollTargetRef={mainRef}/>
            </div>
            <main ref={mainRef} className={styles.main}>
                <Outlet />
            </main>
            <div className={styles.Footer}>
                <Footer scrollTargetRef={mainRef} />
            </div>
            
        </div>
    )
}