import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "motion/react"
import "./Home.css"
import banner from "../assets/banner.jpg"
import banner2 from "../assets/banner2.jpg"

import banner5bg from "../assets/banner5.jpg"
import { sortByDateDesc } from "../utils/sort"
import { API_BASE_URL } from "../config/api"

const sectionRoutes = {
  OBRAS_PUBLICADAS: "/libros",
  TEORIA: "/theory",
  NARRATIVA: "/narrative",
  TEATRO: "/theater",
}

export default function Home() {
  const [recentTexts, setRecentTexts] = useState([])
  const [loadingRecentTexts, setLoadingRecentTexts] = useState(true)
  const [errorRecentTexts, setErrorRecentTexts] = useState("")

  const [visualArts, setVisualArts] = useState([])
  const [loadingVisualArts, setLoadingVisualArts] = useState(true)
  const [errorVisualArts, setErrorVisualArts] = useState("")

  const [books, setBooks] = useState([])
  const [lightbox, setLightbox] = useState(null)

  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") setLightbox(null)
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [])
  const [loadingBooks, setLoadingBooks] = useState(true)

  useEffect(() => {
    async function loadRecentTexts() {
      try {
       const response = await fetch(`${API_BASE_URL}/api/publications/home-selected`)

        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`)
        }

        const data = await response.json()
        setRecentTexts(sortByDateDesc(data))
      } catch (error) {
        console.error("Error cargando textos recientes:", error)
        setErrorRecentTexts("No se pudieron cargar los textos recientes")
      } finally {
        setLoadingRecentTexts(false)
      }
    }

    loadRecentTexts()
  }, [])

  useEffect(() => {
    async function loadVisualArts() {
      try {
        const response = await fetch(`${API_BASE_URL}/api/visual-arts?showOnHome=true`)

        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`)
        }

        const data = await response.json()
        setVisualArts(sortByDateDesc(data))
      } catch (error) {
        console.error("Error cargando artes visuales:", error)
        setErrorVisualArts("No se pudieron cargar las artes visuales")
      } finally {
        setLoadingVisualArts(false)
      }
    }

    loadVisualArts()
  }, [])

  useEffect(() => {
    async function loadBooks() {
      try {
        const response = await fetch(`${API_BASE_URL}/api/books?showOnHome=true`)
        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`)
        const data = await response.json()
        setBooks(sortByDateDesc(data))
      } catch (error) {
        console.error("Error cargando libros:", error)
      } finally {
        setLoadingBooks(false)
      }
    }
    loadBooks()
  }, [])

  return (
    <main className="home-page">
      <section className="home-banner-section">
        <img
          src={banner}
          alt="Banner principal"
          className="home-banner-image"
        />
      </section>

      <section className="recent-section" style={{ backgroundImage: `linear-gradient(rgba(10,6,7,0.87), rgba(10,6,7,0.87)), url(${banner5bg})`, backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="recent-section-header">
          <span className="recent-eyebrow">— Publicaciones</span>
          <h2 className="recent-header-title">
            <span className="recent-header-main">Textos</span>
            <span className="recent-header-sub">Recientes</span>
          </h2>
          <div className="recent-header-line" />
        </div>

        {loadingRecentTexts ? (
          <p className="home-message" style={{ padding: "2rem 40px" }}>Cargando textos recientes...</p>
        ) : errorRecentTexts ? (
          <p className="home-message" style={{ padding: "2rem 40px" }}>{errorRecentTexts}</p>
        ) : (
          <div className="recent-grid">
            {recentTexts.map((text, index) => (
              <motion.div
                key={text.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
              >
                <Link
                  to={`${sectionRoutes[text.section] || "/publications"}#publication-${text.id}`}
                  className="recent-card-link"
                >
                  <article className="recent-card">
                    <div className="recent-card-img-wrapper">
                      <img
                        src={text.imageUrl?.startsWith("http") ? text.imageUrl : `${API_BASE_URL}${text.imageUrl}`}
                        alt={text.title}
                        className="recent-image"
                      />
                      <div className="recent-card-gradient" />
                      <div className="recent-card-accent" />
                    </div>
                    <div className="recent-card-body">
                      <p className="recent-date">
                        {new Date(text.publicationDate)
                          .toLocaleDateString("es-ES", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })
                          .replace(/^./, (letter) => letter.toUpperCase())}
                      </p>
                      <h3 className="recent-title">{text.title}</h3>
                      {text.description && (
                        <p className="recent-excerpt">{text.description}</p>
                      )}
                      <span className="recent-read">Leer →</span>
                    </div>
                  </article>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      <section className="books-section" style={{ backgroundImage: `url(${banner2})` }}>
        <div className="books-overlay">

          <div className="books-header">
            <div className="books-header-line" />
            <h2 className="books-section-title">Libros publicados</h2>
            <div className="books-header-line" />
          </div>

          {loadingBooks ? (
            <p className="home-message" style={{ color: "#a0a0a0", textAlign: "center" }}>Cargando libros...</p>
          ) : books.length === 0 ? (
            <p className="home-message" style={{ color: "#a0a0a0", textAlign: "center" }}>No hay libros disponibles.</p>
          ) : (
            <div className="books-grid">
              {books.map((book, index) => (
                <motion.div
                  key={book.id}
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: index * 0.18, ease: "easeOut" }}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                  className="book-card-wrapper"
                >
                  {book.link ? (
                    <a href={book.link} target="_blank" rel="noopener noreferrer" className="book-card-link">
                      <article className="book-card">
                        <div className="book-cover-wrapper">
                          <img src={book.imageUrl} alt={book.title} className="book-image" />
                          <div className="book-card-overlay">
                            <span className="book-overlay-text">Ver libro →</span>
                          </div>
                        </div>
                        <div className="book-card-info">
                          <h3 className="book-title">{book.title}</h3>
                          <p className="book-date">
                            {new Date(book.publicationDate)
                              .toLocaleDateString("es-ES", { year: "numeric" })}
                          </p>
                        </div>
                      </article>
                    </a>
                  ) : (
                    <article className="book-card">
                      <div className="book-cover-wrapper">
                        <img src={book.imageUrl} alt={book.title} className="book-image" />
                      </div>
                      <div className="book-card-info">
                        <h3 className="book-title">{book.title}</h3>
                        {book.description && (
                          <p className="book-excerpt">{book.description}</p>
                        )}
                        <p className="book-date">
                          {new Date(book.publicationDate)
                            .toLocaleDateString("es-ES", { year: "numeric" })}
                        </p>
                      </div>
                    </article>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="gallery-section">

        <div className="gallery-header">
          <h2 className="gallery-title">Artes Visuales</h2>
          <div className="gallery-title-line" />
        </div>

        {loadingVisualArts ? (
          <p className="home-message" style={{ color: "#888", textAlign: "center", paddingBottom: "60px" }}>Cargando obras...</p>
        ) : errorVisualArts ? (
          <p className="home-message" style={{ color: "#888", textAlign: "center", paddingBottom: "60px" }}>{errorVisualArts}</p>
        ) : (
          <div className="gallery-grid">
            {visualArts.map((art, index) => (
              <motion.article
                key={art.id}
                className="gallery-card"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.12, ease: "easeOut" }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                onClick={() => setLightbox({ src: art.imageUrl?.startsWith("http") ? art.imageUrl : `${API_BASE_URL}${art.imageUrl}`, title: art.nombre })}
                style={{ cursor: "pointer" }}
              >
                <div className="gallery-frame">
                  <div className="gallery-mat">
                    <img
                      src={art.imageUrl?.startsWith("http") ? art.imageUrl : `${API_BASE_URL}${art.imageUrl}`}
                      alt={art.nombre}
                      className="gallery-image"
                    />
                  </div>
                  <div className="gallery-glow" />
                  <div className="gallery-zoom-hint">＋</div>
                </div>
                <div className="gallery-card-info">
                  <h3 className="gallery-card-title">{art.nombre}</h3>
                  <p className="gallery-card-date">
                    {new Date(art.publicationDate).toLocaleDateString("es-ES", { year: "numeric" })}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </section>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setLightbox(null)}
          >
            <motion.div
              className="lightbox-content"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              <img src={lightbox.src} alt={lightbox.title} className="lightbox-img" />
              <div className="lightbox-footer">
                <span className="lightbox-title">{lightbox.title}</span>
                <button className="lightbox-close" onClick={() => setLightbox(null)}>✕ Cerrar</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}