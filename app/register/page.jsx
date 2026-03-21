"use client";
import { useState } from "react";
import Link from "next/link";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async () => {
    if (!form.name || !form.email || !form.password) {
      setStatus("Name, email, and password are required.");
      return;
    }

    try {
      setBusy(true);
      setStatus("Creating your account...");

      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus(data?.message || "Registration failed.");
        return;
      }

      setStatus("Registered successfully. You can now login.");
      setForm({ name: "", email: "", password: "" });
    } catch {
      setStatus("Unable to register right now.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="auth-card">
      <h1 className="auth-title">Create Account</h1>
      <p className="auth-subtitle">
        Start organizing books with your own dashboard.
      </p>

      <div className="field">
        <input
          className="input"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
      </div>
      <div className="field">
        <input
          className="input"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
      </div>
      <div className="field">
        <input
          className="input"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
      </div>

      <button className="btn btn-primary" onClick={submit} disabled={busy}>
        {busy ? "Please wait..." : "Register"}
      </button>
      <div className="status">{status}</div>

      <div className="actions">
        <Link className="btn btn-secondary" href="/login">
          Login instead
        </Link>
        <Link className="btn btn-secondary" href="/">
          Home
        </Link>
      </div>
    </main>
  );
}
