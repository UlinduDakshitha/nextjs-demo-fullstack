"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

export default function Dashboard() {
  const [books, setBooks] = useState([]);
  const [status, setStatus] = useState("Loading collection overview...");

  useEffect(() => {
    let isMounted = true;

    fetch("/api/books")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to load books");
        }
        return res.json();
      })
      .then((data) => {
        if (isMounted) {
          const safeBooks = Array.isArray(data) ? data : [];
          setBooks(safeBooks);
          setStatus("");
        }
      })
      .catch(() => {
        if (isMounted) {
          setStatus("Unable to load dashboard data right now.");
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const stats = useMemo(() => {
    const authors = new Set(
      books.map((book) => (book.author || "").trim()).filter(Boolean),
    );

    return {
      totalBooks: books.length,
      totalAuthors: authors.size,
      availableBooks: books.filter((book) => book.available !== false).length,
    };
  }, [books]);

  return (
    <main className="page-shell">
      <header className="topbar">
        <div className="brand">Dashboard</div>
        <nav className="nav-links">
          <Link href="/books" className="nav-pill">
            Collection
          </Link>
          <Link href="/" className="nav-pill">
            Home
          </Link>
          <Link href="/login" className="nav-pill">
            Logout
          </Link>
        </nav>
      </header>

      <section className="content">
        <h1 className="hero-title">Collection Overview</h1>
        <p className="hero-subtitle">
          Quick insight into your current library status.
        </p>

        <div className="stats-grid">
          <article className="stat-card">
            <h3>Total Books</h3>
            <p className="stat-value">{stats.totalBooks}</p>
          </article>
          <article className="stat-card">
            <h3>Unique Authors</h3>
            <p className="stat-value">{stats.totalAuthors}</p>
          </article>
          <article className="stat-card">
            <h3>Available Books</h3>
            <p className="stat-value">{stats.availableBooks}</p>
          </article>
        </div>

        <article className="panel dashboard-list-panel">
          <h3>Recent Titles</h3>
          {status ? (
            <p className="book-author">{status}</p>
          ) : books.length === 0 ? (
            <p className="book-author">
              No books found yet. Add some from Collection.
            </p>
          ) : (
            <div className="book-list">
              {books.slice(0, 6).map((book) => (
                <div key={book.id} className="book-item">
                  <div className="book-meta">
                    <span className="book-title">{book.title}</span>
                    <span className="book-author">{book.author}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </article>

        <div className="actions">
          <Link href="/books" className="btn btn-primary">
            Manage Collection
          </Link>
        </div>
      </section>
    </main>
  );
}
