"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);

  const login = async () => {
    if (!form.email || !form.password) {
      setStatus("Email and password are required.");
      return;
    }

    try {
      setBusy(true);
      setStatus("Signing in...");

      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok || !data?.token) {
        setStatus(data?.message || "Login failed.");
        return;
      }

      localStorage.setItem("token", data.token);
      setStatus("Logged in successfully.");
      router.push("/dashboard");
    } catch {
      setStatus("Unable to login right now.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="auth-card">
      <h1 className="auth-title">Welcome Back</h1>
      <p className="auth-subtitle">
        Sign in to continue managing your collection.
      </p>

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

      <button className="btn btn-primary" onClick={login} disabled={busy}>
        {busy ? "Please wait..." : "Login"}
      </button>
      <div className="status">{status}</div>

      <div className="actions">
        <Link className="btn btn-secondary" href="/register">
          Create account
        </Link>
        <Link className="btn btn-secondary" href="/">
          Home
        </Link>
      </div>
    </main>
  );
}
