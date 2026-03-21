import { useEffect, useState } from "react"
import { motion } from "motion/react"
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
    title: "El pensamiento de Karl Marx",
    date: "Marzo-14-2024",
  },
  {
    id: 2,
    image: cover2,
    title: "El pensamiento de Karl Marx",
    date: "Marzo-14-2024",
  },
  {
    id: 3,
    image: cover3,
    title: "El pensamiento de Karl Marx",
    date: "Marzo-14-2024",
  },
  {
    id: 4,
    image: cover4,
    title: "El pensamiento de Karl Marx",
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
        const response = await fetch("http://localhost:8080/api/publications/recent")

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
    <main className="w-full bg-[#f3f3f3]">
      <section className="w-full">
        <img
          src={banner}
          alt="Banner principal"
          className="h-[300px] w-full object-cover"
        />
      </section>

      <section className="px-10 py-10">
        <h2 className="mb-8 text-2xl font-bold uppercase text-neutral-900">
          Textos recientes
        </h2>

        {loadingRecentTexts ? (
          <p>Cargando textos recientes...</p>
        ) : errorRecentTexts ? (
          <p>{errorRecentTexts}</p>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 justify-items-center">
            {recentTexts.map((text) => (
              <article key={text.id} className="flex w-[220px] flex-col items-center">
                <img
                  src={`http://localhost:8080${text.imageUrl}`}
                  alt={text.title}
                  className="mb-3 h-[180px] w-[220px] object-cover"
                />

                <h3 className="text-center text-sm font-medium text-neutral-900">
                  {text.title}
                </h3>

                <p className="text-center text-xs text-neutral-700">
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
        className="w-full min-h-[500px] bg-cover bg-center"
        style={{ backgroundImage: `url(${banner2})` }}
      >
        <div className="min-h-[500px] bg-white/25 px-10 py-12">
          <h2 className="mb-12 text-2xl font-bold uppercase text-neutral-900">
            Libros publicados
          </h2>

          <div className="mx-auto grid max-w-[820px] grid-cols-2 gap-x-16 gap-y-10">
            {publishedBooks.map((book) => (
              <article key={book.id} className="flex flex-col items-center">
                <img
                  src={book.image}
                  alt={book.title}
                  className="mb-3 h-[360px] w-[280px] object-cover shadow-md"
                />

                <h3 className="text-center text-sm font-medium text-neutral-900">
                  {book.title}
                </h3>

                <p className="text-center text-xs text-neutral-700">
                  {book.date}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-10 py-10">
        <h2 className="mb-8 text-2xl font-bold uppercase text-neutral-900">
          Artes visuales
        </h2>

       {loadingVisualArts ? (
  <p>Cargando artes visuales...</p>
) : errorVisualArts ? (
  <p>{errorVisualArts}</p>
) : (
  <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
    {visualArts.map((art) => (
      <motion.article
        key={art.id}
        className="flex flex-col items-center"
        whileHover={{ y: -4 }}
        transition={{ duration: 0.25 }}
      >
        <div className="mb-3 h-[320px] w-[220px] overflow-hidden">
          <motion.img
            src={`http://localhost:8080${art.imageUrl}`}
            alt={art.category}
            className="h-full w-full object-cover"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          />
        </div>

        <h3 className="text-center text-sm font-medium text-neutral-900">
          {art.category}
        </h3>

        <p className="text-center text-xs text-neutral-700">
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