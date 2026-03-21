import Link from "next/link";

export default function Home() {
  return (
    <main className="page-shell">
      <header className="topbar">
        <div className="brand">Bibliotek</div>
        <nav className="nav-links">
          <Link href="/books" className="nav-pill">
            Collection
          </Link>
          <Link href="/login" className="nav-pill">
            Login
          </Link>
          <Link href="/register" className="nav-pill">
            Register
          </Link>
        </nav>
      </header>

      <section className="content">
        <h1 className="hero-title">
          A Thoughtful Space For Your Library Workflow
        </h1>
        <p className="hero-subtitle">
          Organize every title, track updates, and keep your reading inventory
          in sync through a single calm interface.
        </p>

        <div className="feature-grid">
          <article className="panel">
            <h3>Curated Catalog</h3>
            <p>
              Maintain clean records for books and authors with a quick edit
              cycle.
            </p>
          </article>
          <article className="panel">
            <h3>Fast Updates</h3>
            <p>
              Add new arrivals or adjust metadata in seconds using a focused
              layout.
            </p>
          </article>
          <article className="panel">
            <h3>Quiet Aesthetic</h3>
            <p>
              Warm tones and clear typography designed to reduce UI fatigue.
            </p>
          </article>
        </div>

        <div className="actions">
          <Link href="/books" className="btn btn-primary">
            Open Collection
          </Link>
          <Link href="/register" className="btn btn-secondary">
            Create Account
          </Link>
        </div>
      </section>
    </main>
  );
}
