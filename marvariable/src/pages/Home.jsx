import { useEffect, useState } from "react"
import { motion } from "motion/react"
import "./Home.css"
import banner from "../assets/banner.jpg"
import banner2 from "../assets/banner2.jpg"

import cover1 from "../assets/cover1.jpg"
import cover2 from "../assets/cover2.jpg"
import cover3 from "../assets/cover3.jpg"
import cover4 from "../assets/cover4.jpg"

const publishedBooks = [
  {
    id: 1,
    image: cover1,
    title: "Ontologías Amerindias",
    date: "Marzo-14-2024",
  },
  {
    id: 2,
    image: cover2,
    title: "La cuádruple temporalidad de los programas de transición",
    date: "Marzo-14-2024",
  },
  {
    id: 3,
    image: cover3,
    title: "Tatuaje",
    date: "Marzo-14-2024",
  },
  {
    id: 4,
    image: cover4,
    title: "El amargo del chocolate",
    date: "Marzo-14-2024",
  },
]

export default function Home() {
  const [recentTexts, setRecentTexts] = useState([])
  const [loadingRecentTexts, setLoadingRecentTexts] = useState(true)
  const [errorRecentTexts, setErrorRecentTexts] = useState("")

  const [visualArts, setVisualArts] = useState([])
  const [loadingVisualArts, setLoadingVisualArts] = useState(true)
  const [errorVisualArts, setErrorVisualArts] = useState("")

  useEffect(() => {
    async function loadRecentTexts() {
      try {
       const response = await fetch("http://localhost:8080/api/publications/home-selected")

        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`)
        }

        const data = await response.json()
        console.log("Textos recientes desde backend:", data)
        setRecentTexts(data)
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
        const response = await fetch("http://localhost:8080/api/visual-arts")

        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`)
        }

        const data = await response.json()
        console.log("Artes visuales desde backend:", data)
        setVisualArts(data)
      } catch (error) {
        console.error("Error cargando artes visuales:", error)
        setErrorVisualArts("No se pudieron cargar las artes visuales")
      } finally {
        setLoadingVisualArts(false)
      }
    }

    loadVisualArts()
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

      <section className="home-section">
        <h2 className="home-section-title">Textos recientes</h2>

        {loadingRecentTexts ? (
          <p className="home-message">Cargando textos recientes...</p>
        ) : errorRecentTexts ? (
          <p className="home-message">{errorRecentTexts}</p>
        ) : (
          <div className="recent-grid">
            {recentTexts.map((text) => (
              <article key={text.id} className="recent-card">
                <img
                  src={`http://localhost:8080${text.imageUrl}`}
                  alt={text.title}
                  className="recent-image"
                />

                <h3 className="recent-title">{text.title}</h3>

                <p className="recent-date">
                  {new Date(text.publicationDate)
                    .toLocaleDateString("es-ES", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })
                    .replace(/^./, (letter) => letter.toUpperCase())}
                </p>
              </article>
            ))}
          </div>
        )}
      </section>

      <section
        className="books-section"
        style={{ backgroundImage: `url(${banner2})` }}
      >
        <div className="books-overlay">
          <h2 className="home-section-title">Libros publicados</h2>

          <div className="books-grid">
            {publishedBooks.map((book) => (
              <article key={book.id} className="book-card">
                <img
                  src={book.image}
                  alt={book.title}
                  className="book-image"
                />

                <h3 className="book-title">{book.title}</h3>

                <p className="book-date">{book.date}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section">
        <h2 className="home-section-title">Artes visuales</h2>

        {loadingVisualArts ? (
          <p className="home-message">Cargando artes visuales...</p>
        ) : errorVisualArts ? (
          <p className="home-message">{errorVisualArts}</p>
        ) : (
          <div className="visual-grid">
            {visualArts.map((art) => (
              <motion.article
                key={art.id}
                className="visual-card"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25 }}
              >
                <div className="visual-image-wrapper">
                  <motion.img
                    src={`http://localhost:8080${art.imageUrl}`}
                    alt={art.category}
                    className="visual-image"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                  />
                </div>

                <h3 className="visual-title">{art.category}</h3>

                <p className="visual-date">
                  {new Date(art.publicationDate)
                    .toLocaleDateString("es-ES", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })
                    .replace(/^./, (letter) => letter.toUpperCase())}
                </p>
              </motion.article>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}