import banner2 from "../assets/banner2.jpg"
import img1 from "../assets/img1.jpg"
import img2 from "../assets/img2.jpg"
import img3 from "../assets/img3.jpg"
import img4 from "../assets/img4.jpg"

const works = [
  {
    id: 1,
    image: img1,
    title: "El pensamiento de Karl Marx",
    description:
      "El texto analiza cómo funciona el sistema capitalista, explicando cómo se produce la riqueza y cómo los trabajadores son explotados al generar más valor del que reciben como salario.",
    date: "Marzo 2023",
  },
  {
    id: 2,
    image: img2,
    title: "El pensamiento de Karl Marx",
    description:
      "El texto analiza cómo funciona el sistema capitalista, explicando cómo se produce la riqueza y cómo los trabajadores son explotados al generar más valor del que reciben como salario.",
    date: "Marzo 2023",
  },
  {
    id: 3,
    image: img3,
    title: "El pensamiento de Karl Marx",
    description:
      "El texto analiza cómo funciona el sistema capitalista, explicando cómo se produce la riqueza y cómo los trabajadores son explotados al generar más valor del que reciben como salario.",
    date: "Marzo 2023",
  },
  {
    id: 4,
    image: img4,
    title: "El pensamiento de Karl Marx",
    description:
      "El texto analiza cómo funciona el sistema capitalista, explicando cómo se produce la riqueza y cómo los trabajadores son explotados al generar más valor del que reciben como salario.",
    date: "Marzo 2023",
  },
]

export default function Publications() {
  return (
    <main
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${banner2})` }}
    >
      <div className="min-h-screen bg-white/70">
        <section className="bg-black py-4">
          <h1 className="text-center text-3xl font-light uppercase tracking-wide text-white">
            FILOSOFÍA
          </h1>
        </section>

        <section className="mx-auto max-w-5xl px-6 py-10">
          <div className="space-y-8">
            {works.map((work) => (
              <article
                key={work.id}
                className="flex flex-col gap-5 md:flex-row md:items-start"
              >
                <img
                  src={work.image}
                  alt={work.title}
                  className="h-[170px] w-[120px] object-cover"
                />

                <div className="max-w-2xl">
                  <h2 className="mb-2 text-xl font-bold text-neutral-900">
                    {work.title}
                  </h2>

                  <p className="mb-4 text-base leading-relaxed text-neutral-900">
                    <span className="font-bold">Descripción:</span>{" "}
                    {work.description}
                  </p>

                  <p className="text-sm text-neutral-800">{work.date}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}