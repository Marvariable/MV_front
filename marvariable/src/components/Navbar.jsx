import { useState, useEffect, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./Navbar.css"
import logoMar from "../assets/logomar.jpg"

const menuItems = [
  { label: "LIBROS", path: "/libros" },
  { label: "TEORÍA",           path: "/theory" },
  { label: "NARRATIVA",        path: "/narrative" },
  { label: "TEATRO",           path: "/theater" },
  {
    label: "ARTES VISUALES",
    dropdown: [
      { label: "Arte Digital", path: "/rhumor" },
      { label: "Arte Plástico", path: "/arte-plastico" },
    ],
  },
  { label: "SOBRE EL AUTOR",   path: "/about-author" },
  { label: "CONTACTO",         path: "/contact" },
]

const sectionLabels = {
  OBRAS_PUBLICADAS: "Libros",
  TEORIA:           "Teoría",
  NARRATIVA:        "Narrativa",
  TEATRO:           "Teatro",
}

export default function Navbar() {
  const [searchOpen, setSearchOpen]   = useState(false)
  const [query, setQuery]             = useState("")
  const [publications, setPublications] = useState([])
  const [loading, setLoading]         = useState(false)
  const inputRef  = useRef(null)
  const timerRef  = useRef(null)
  const navigate  = useNavigate()

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50)
    } else {
      setQuery("")
      setPublications([])
    }
  }, [searchOpen])

  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") setSearchOpen(false)
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [])

  useEffect(() => {
    clearTimeout(timerRef.current)
    if (!query.trim()) { setPublications([]); return }
    timerRef.current = setTimeout(async () => {
      setLoading(true)
      try {
        const res  = await fetch(`http://localhost:8080/api/publications?title=${encodeURIComponent(query)}`)
        const data = await res.json()
        setPublications(data)
      } catch {
        setPublications([])
      } finally {
        setLoading(false)
      }
    }, 300)
    return () => clearTimeout(timerRef.current)
  }, [query])

  const matchedCategories = menuItems.filter(item =>
    item.label.toLowerCase().includes(query.toLowerCase())
  )

  function handleResultClick(path) {
    setSearchOpen(false)
    navigate(path)
  }

  return (
    <>
      <header className="navbar-header">
        <div className="navbar-top">
          <div />

          <Link to="/" className="navbar-brand-link">
            <img src={logoMar} alt="Marvariable" className="navbar-logo" />
            MARVARIABLE
          </Link>

          <div className="navbar-actions">
            <Link to="/admin-register" className="navbar-icon-btn" aria-label="Admin">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                strokeWidth={1.5} stroke="currentColor" width="20" height="20">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
            </Link>
            <button type="button" aria-label="Buscar" className="navbar-icon-btn"
              onClick={() => setSearchOpen(true)}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                strokeWidth="1.8" stroke="currentColor" width="20" height="20">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
              </svg>
            </button>
          </div>
        </div>

        <div className="navbar-rule" />

        <nav className="navbar-nav">
          <ul className="navbar-menu">
            {menuItems.map((item) =>
              item.dropdown ? (
                <li key={item.label} className="nav-dropdown">
                  <span className="nav-dropdown-trigger navbar-link">{item.label}</span>
                  <div className="nav-dropdown-menu">
                    {item.dropdown.map((sub) => (
                      <Link key={sub.path} to={sub.path} className="nav-dropdown-item">
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                </li>
              ) : (
                <li key={item.label}>
                  <Link to={item.path} className="navbar-link">
                    {item.label}
                  </Link>
                </li>
              )
            )}
          </ul>
        </nav>
      </header>

      {searchOpen && (
        <div className="search-overlay">
          <div className="search-header">
            <span className="search-label">Buscar</span>
            <button className="search-close" onClick={() => setSearchOpen(false)}>
              ✕ Cerrar
            </button>
          </div>

          <div className="search-input-row">
            <svg className="search-icon" width="22" height="22" fill="none" viewBox="0 0 24 24"
              stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
            </svg>
            <input
              ref={inputRef}
              type="text"
              className="search-input"
              placeholder="Buscar obras, categorías..."
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
          </div>

          <div className="search-results">
            {!query.trim() ? (
              <div>
                <p className="search-group-label">Categorías</p>
                <div className="search-categories">
                  {menuItems.map(item => (
                    <button
                      key={item.path}
                      className="search-category-link"
                      onClick={() => handleResultClick(item.path)}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <>
                {matchedCategories.length > 0 && (
                  <div>
                    <p className="search-group-label">Categorías</p>
                    <div className="search-categories">
                      {matchedCategories.map(item => (
                        <button
                          key={item.path}
                          className="search-category-link match"
                          onClick={() => handleResultClick(item.path)}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <p className="search-group-label">
                    {loading ? "Buscando..." : `Obras${publications.length ? ` — ${publications.length} resultado${publications.length !== 1 ? "s" : ""}` : ""}`}
                  </p>
                  {!loading && publications.length === 0 && matchedCategories.length === 0 && (
                    <p className="search-empty">Sin resultados para "{query}"</p>
                  )}
                  <div className="search-pub-list">
                    {publications.map(pub => (
                      <button
                        key={pub.id}
                        className="search-pub-item"
                        onClick={() => handleResultClick(
                          pub.section === "OBRAS_PUBLICADAS" ? "/libros" :
                          pub.section === "TEORIA"           ? "/theory" :
                          pub.section === "NARRATIVA"        ? "/narrative" :
                          pub.section === "TEATRO"           ? "/theater" : "/libros"
                        )}
                      >
                        {pub.imageUrl && (
                          <img
                            src={pub.imageUrl.startsWith("http") ? pub.imageUrl : `http://localhost:8080${pub.imageUrl}`}
                            alt={pub.title}
                            className="search-pub-img"
                          />
                        )}
                        <div className="search-pub-info">
                          <span className="search-pub-title">{pub.title}</span>
                          <span className="search-pub-section">
                            {sectionLabels[pub.section] || pub.section}
                          </span>
                        </div>
                        <span className="search-pub-arrow">→</span>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
