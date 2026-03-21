"use client";
import { useState } from "react";

export default function Register() {
  const [form, setForm] = useState({});

  const submit = async () => {
    await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(form),
    });
    alert("Registered");
  };

  return (
    <div>
      <h1>Register</h1>
      <input placeholder="Name" onChange={(e)=>setForm({...form,name:e.target.value})}/>
      <input placeholder="Email" onChange={(e)=>setForm({...form,email:e.target.value})}/>
      <input type="password" onChange={(e)=>setForm({...form,password:e.target.value})}/>
      <button onClick={submit}>Register</button>
    </div>
  );
}