"use client";
import { useState, useEffect } from "react";

export default function Books() {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({});
  const [editId, setEditId] = useState(null);

  const token = localStorage.getItem("token");

  const load = async () => {
    const res = await fetch("/api/books");
    setBooks(await res.json());
  };

  const save = async () => {
    if (editId) {
      await fetch(`/api/books/${editId}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify(form),
      });
    } else {
      await fetch("/api/books", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify(form),
      });
    }

    setForm({});
    setEditId(null);
    load();
  };

  const del = async (id) => {
    await fetch(`/api/books/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    load();
  };

  const edit = (b) => {
    setForm(b);
    setEditId(b.id);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <h1>Books</h1>

      <input placeholder="Title" value={form.title||""}
        onChange={(e)=>setForm({...form,title:e.target.value})} />

      <input placeholder="Author" value={form.author||""}
        onChange={(e)=>setForm({...form,author:e.target.value})} />

      <button onClick={save}>
        {editId ? "Update" : "Add"}
      </button>

      {books.map(b => (
        <div key={b.id}>
          {b.title} - {b.author}
          <button onClick={()=>edit(b)}>Edit</button>
          <button onClick={()=>del(b.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}