import { useState } from "react";
import './index.css';

export default function AddItem(){
  const [form,setForm]=useState({
    name:"",
    quantity:"",
    purchase_date:""
  });

  const handleChange=e=>{
    setForm({...form,[e.target.name]:e.target.value});
  };

  const handleSubmit=async e=>{
    e.preventDefault();

    await fetch("http://127.0.0.1:8080/add",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(form)
    });

    alert("Item Added!");
    setForm({name:"",quantity:"",purchase_date:""});
  };

  return(
    <form onSubmit={handleSubmit}>
      <h2>Add Grocery</h2>

      <input name="name" placeholder="Item name"
             value={form.name}
             onChange={handleChange}
             required/>

      <br/>

      <input name="quantity" placeholder="Quantity"
             value={form.quantity}
             onChange={handleChange}
             required/>

      <br/>

      <input name="purchase_date" type="date"
             value={form.purchase_date}
             onChange={handleChange}
             required/>

      <br/><br/>

      <button type="submit">Submit</button>
    </form>
  );
}
