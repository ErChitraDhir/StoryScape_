import { Outlet } from "react-router-dom";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";

export default function Master(){
    return(
        <>  
            <Header/>
            <Outlet/>
            <Footer/>    
        </>
    )
}