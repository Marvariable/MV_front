const menuItems = [
  "OBRAS PUBLICADAS",
  "TEORÍA",
  "NARRATIVA",
  "TEATRO",
  "ARTES VISUALES",
  "ABOUT",
  "CONTACT",
]

const titleStyles =
  "text-center text-5xl font-light tracking-[0.2em] text-neutral-900"

const iconButtonStyles = "text-neutral-900 hover:opacity-70"

function ProfileIcon() {
  return (
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
        d="M15.75 6.75a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 19.5a7.5 7.5 0 0 1 15 0"
      />
    </svg>
  )
}

function SearchIcon() {
  return (
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
  )
}

function IconButton({ label, children }) {
  return (
    <button
      type="button"
      aria-label={label}
      className={iconButtonStyles}
    >
      {children}
    </button>
  )
}

export default function Navbar() {
  return (
    <header className="w-full bg-white">
      <div className="grid grid-cols-3 items-center border-b border-gray-200 px-6 py-8">
        <div></div>
        <h1 className={titleStyles}>MARVARIABLE</h1>
        <div className="flex items-center justify-end gap-3">
          <IconButton label="Perfil">
            <ProfileIcon />
          </IconButton>
          <IconButton label="Buscar">
            <SearchIcon />
          </IconButton>
        </div>
      </div>

      <nav className="px-6 py-4">
        <ul className="flex flex-wrap items-center justify-center gap-8 text-sm tracking-wide text-neutral-800">
          {menuItems.map((item) => (
            <li key={item}>
              <a href="#" className="hover:opacity-70">
                {item}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}