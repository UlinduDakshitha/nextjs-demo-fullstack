"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

export default function Books() {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({ title: "", author: "" });
  const [editId, setEditId] = useState(null);
  const [token] = useState(() =>
    typeof window !== "undefined" ? localStorage.getItem("token") || "" : "",
  );
  const [status, setStatus] = useState("");

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/books");
      const data = await res.json();
      setBooks(Array.isArray(data) ? data : []);
    } catch {
      setStatus("Unable to load books right now.");
    }
  }, []);

  const save = async () => {
    if (!form.title || !form.author) {
      setStatus("Title and author are required.");
      return;
    }

    const headers = {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    if (editId) {
      await fetch(`/api/books/${editId}`, {
        method: "PUT",
        headers,
        body: JSON.stringify(form),
      });
    } else {
      await fetch("/api/books", {
        method: "POST",
        headers,
        body: JSON.stringify(form),
      });
    }

    setForm({ title: "", author: "" });
    setEditId(null);
    setStatus(editId ? "Book updated." : "Book added.");
    await load();
  };

  const del = async (id) => {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    await fetch(`/api/books/${id}`, {
      method: "DELETE",
      headers,
    });
    setStatus("Book removed.");
    await load();
  };

  const edit = (b) => {
    setForm({ title: b.title || "", author: b.author || "" });
    setEditId(b.id);
    setStatus("Editing selected book.");
  };

  useEffect(() => {
    let isMounted = true;

    fetch("/api/books")
      .then((res) => res.json())
      .then((data) => {
        if (isMounted) {
          setBooks(data);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <main className="page-shell">
      <header className="topbar">
        <div className="brand">Collection</div>
        <nav className="nav-links">
          <Link href="/" className="nav-pill">
            Home
          </Link>
          <Link href="/login" className="nav-pill">
            Login
          </Link>
          <Link href="/register" className="nav-pill">
            Register
          </Link>
        </nav>
      </header>

      <section className="content book-layout">
        <article className="panel">
          <h3>{editId ? "Edit Book" : "Add Book"}</h3>

          <div className="field">
            <input
              className="input"
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </div>

          <div className="field">
            <input
              className="input"
              placeholder="Author"
              value={form.author}
              onChange={(e) => setForm({ ...form, author: e.target.value })}
            />
          </div>

          <div className="actions">
            <button className="btn btn-primary" onClick={save}>
              {editId ? "Update" : "Add"}
            </button>
            {editId ? (
              <button
                className="btn btn-secondary"
                onClick={() => {
                  setEditId(null);
                  setForm({ title: "", author: "" });
                  setStatus("Edit cancelled.");
                }}
              >
                Cancel
              </button>
            ) : null}
          </div>
          <div className="status">{status}</div>
        </article>

        <article className="panel">
          <h3>Book List</h3>
          <div className="book-list">
            {books.length === 0 ? (
              <div className="book-author">
                No books yet. Add your first title.
              </div>
            ) : (
              books.map((b) => (
                <div key={b.id} className="book-item">
                  <div className="book-meta">
                    <span className="book-title">{b.title}</span>
                    <span className="book-author">{b.author}</span>
                  </div>
                  <div className="row-actions">
                    <button
                      className="btn btn-secondary"
                      onClick={() => edit(b)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => del(b.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </article>
      </section>
    </main>
  );
}
