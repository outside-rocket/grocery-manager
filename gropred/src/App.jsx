import { useState } from "react";
import Home from "./Home.jsx";
import AddItem from './AddItem.jsx';
import Prediction from './Prediction.jsx';
import './index.css';
export default function App(){

    const [page,setPage] = useState("home");

    return (

        <>

            <nav>
            <button className="button-nav" onClick={()=>setPage("Home")}>Home</button>
            <button className="button-nav" onClick={()=> setPage("AddItem")}>Add Item</button>
            <button className="button-nav" onClick={()=>setPage("Prediction")}>Predictions</button>
            </nav>
            <div className="content-box">
            {page !== "AddItem" && page!=="Prediction" && <Home></Home>}
            {page === "AddItem" && <AddItem></AddItem>}
            {page === "Prediction" && <Prediction></Prediction>}
            </div>
        </>

    );


}