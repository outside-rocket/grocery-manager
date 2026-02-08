import { useEffect,useState } from "react";
import './index.css';
export default function Home(){
  const [items,setItems]=useState([]);

  const loadItems=async()=>{
    const res=await fetch("http://localhost:8080/active");
    const data=await res.json();
    setItems(data);
  };

  const finishItem=async(id)=>{
    await fetch(`http://localhost:8080/finish/${id}`,{method:"PATCH"});
    loadItems();
  };

  useEffect(()=>{loadItems();},[]);
  const groceryDb = {
    apple: "🍎",
    banana: "🍌",
    milk: "🥛",
    bread: "🍞",
    chicken: "🍗",
    
  };

  const getEmoji = (text) => {
    const words = text.toLowerCase().split(' ');
    // Find the first word that matches our database
    const match = words.find(word => groceryDb[word]);
    return groceryDb[match] || "🛒"; // Default emoji
  };
  return(
    <div>
      <h2>Groceries in PANTRY</h2>
      <div className="items-cont">
      {items.map(i=>(
        <div key={i.id} className="item-container"
             style={{padding:10,margin:6}}><div className="flex-item flex-emote">
            <b>{getEmoji(i.name)}</b></div><div className="flex-item flex-left">
          <b>{i.name}</b></div><div className="flex-item flex-center">
          Days left: {i.days_left}
          </div><div className="flex-item flex-right">
          <button style={{}} onClick={()=>finishItem(i.id)}>Finished</button></div>
        </div>
      ))}
      </div>
    </div>
  );
}
