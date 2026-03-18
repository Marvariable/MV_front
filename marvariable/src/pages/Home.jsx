import banner from "../assets/banner.jpg"
import banner2 from "../assets/banner2.jpg"

import img1 from "../assets/img1.jpg"
import img2 from "../assets/img2.jpg"
import img3 from "../assets/img3.jpg"
import img4 from "../assets/img4.jpg"

import cover1 from "../assets/cover1.jpg"
import cover2 from "../assets/cover2.jpg"
import cover3 from "../assets/cover3.jpg"
import cover4 from "../assets/cover4.jpg"

import paint1 from "../assets/paint1.jpg"
import paint2 from "../assets/paint2.jpg"
import paint3 from "../assets/paint3.jpg"

const recentTexts = [
  {
    id: 1,
    image: img1,
    title: "El pensamiento de Karl Marx",
    date: "Marzo-14-2024",
  },
  {
    id: 2,
    image: img2,
    title: "El pensamiento de Karl Marx",
    date: "Marzo-14-2024",
  },
  {
    id: 3,
    image: img3,
    title: "El pensamiento de Karl Marx",
    date: "Marzo-14-2024",
  },
  {
    id: 4,
    image: img4,
    title: "El pensamiento de Karl Marx",
    date: "Marzo-14-2024",
  },
]

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

const visualArts = [
  {
    id: 1,
    image: paint1,
    title: "01",
    date: "Marzo-14-2024",
  },
  {
    id: 2,
    image: paint2,
    title: "02",
    date: "Marzo-14-2024",
  },
  {
    id: 3,
    image: paint3,
    title: "03",
    date: "Marzo-14-2024",
  },
]

export default function Home() {
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

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {recentTexts.map((text) => (
            <article key={text.id}>
              <img
                src={text.image}
                alt={text.title}
                className="mb-3 h-[180px] w-full object-cover"
              />

              <h3 className="text-sm font-medium text-neutral-900">
                {text.title}
              </h3>

              <p className="text-xs text-neutral-700">{text.date}</p>

              <a href="#" className="text-xs text-neutral-800 hover:opacity-70">
                Read more
              </a>
            </article>
          ))}
        </div>
      </section>

      <section
        className="w-full min-h-[500px] bg-cover bg-center"
        style={{ backgroundImage: `url(${banner2})` }}
      >
        <div className="min-h-[500px] bg-white/25 px-10 py-12">
          <h2 className="mb-12 text-2xl font-bold uppercase text-neutral-900">
            Libros publicados
          </h2>

          <div className="mx-auto grid max-w-[420px] grid-cols-2 gap-x-16 gap-y-10">
            {publishedBooks.map((book) => (
              <article key={book.id} className="flex flex-col items-center">
                <img
                  src={book.image}
                  alt={book.title}
                  className="mb-3 h-[150px] w-[95px] object-cover shadow-md"
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

  <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
    {visualArts.map((art) => (
      <article key={art.id} className="flex flex-col items-center">
        <img
          src={art.image}
          alt={art.title}
          className="mb-3 h-[320px] w-[220px] object-cover"
        />

        <h3 className="text-center text-sm font-medium text-neutral-900">
          {art.title}
        </h3>

        <p className="text-center text-xs text-neutral-700">{art.date}</p>
      </article>
    ))}
  </div>
</section>
    </main>
  )
}