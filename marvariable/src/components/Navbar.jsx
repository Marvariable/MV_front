import { Link } from "react-router-dom"



const menuItems = [
    { label: "OBRAS PUBLICADAS", path: "/publications" },
    { label: "TEORÍA", path: "/theory" },
    { label: "NARRATIVA", path: "/narrative" },
    { label: "TEATRO", path: "/theater" },
    { label: "ARTES VISUALES", path: "/rhumor" },
    { label: "SOBRE EL AUTOR", path: "/about-author" },
    { label: "CONTACTO", path: "/contact" },
]

export default function Navbar() {
    return (
        <header className="w-full bg-white">
            <div className="grid grid-cols-3 items-center border-b border-gray-200 px-6 py-8">
                <div></div>

                <h1 className="text-center text-5xl font-light tracking-[0.2em] text-neutral-800">
                    <Link to="/" className="hover:opacity-70">
                        MARVARIABLE
                    </Link>
                </h1>

                <div className="flex items-center justify-end gap-3">
                    <Link to="/admin-register" className="hover:opacity-70">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="h-8 w-8 text-neutral-800"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.964 0a9 9 0 1 0-11.964 0m11.964 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275"
                            />
                        </svg>
                    </Link>

                    <button
                        type="button"
                        aria-label="Buscar"
                        className="text-neutral-900 hover:opacity-70"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.8"
                            stroke="currentColor"
                            className="h-5 w-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                            />
                        </svg>
                    </button>
                </div>
            </div>

            <nav className="px-6 py-4">
                <ul className="flex flex-wrap items-center justify-center gap-8 text-sm tracking-wide text-neutral-800">
                    {menuItems.map((item) => (
                        <li key={item.label}>
                            <Link to={item.path} className="hover:opacity-70">
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    )
}