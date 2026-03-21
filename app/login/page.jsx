"use client";
import { useState } from "react";

export default function Login() {
  const [form, setForm] = useState({});

  const login = async () => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(form),
    });

    const data = await res.json();
    localStorage.setItem("token", data.token);

    alert("Logged in");
  };

  return (
    <div>
      <h1>Login</h1>
      <input placeholder="Email" onChange={(e)=>setForm({...form,email:e.target.value})}/>
      <input type="password" onChange={(e)=>setForm({...form,password:e.target.value})}/>
      <button onClick={login}>Login</button>
    </div>
  );
}