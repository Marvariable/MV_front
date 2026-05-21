<div align="center">

<img src="https://readme-typing-svg.demolab.com?font=Cormorant+Garamond&weight=300&size=52&duration=3500&pause=1200&color=C9A84C&center=true&vCenter=true&width=700&height=80&lines=M+A+R+V+A+R+I+A+B+L+E" alt="Marvariable" />

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=300&size=16&duration=2500&pause=2000&color=7b1e2b&center=true&vCenter=true&width=700&height=30&lines=Filosof%C3%ADa+•+Narrativa+•+Teatro+•+Artes+Visuales;Arte+y+pensamiento+desde+Quito+al+mundo" alt="Subtítulo" />

<br/>

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white&labelColor=0d1117)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white&labelColor=0d1117)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white&labelColor=0d1117)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-FF0080?style=for-the-badge&logo=framer&logoColor=white&labelColor=0d1117)
![React Router](https://img.shields.io/badge/React_Router-7-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white&labelColor=0d1117)

</div>

---

## ¿Qué es Marvariable?

Sitio web del artista **Marvariable** — escritor, filósofo y artista visual de Quito, Ecuador. El proyecto tiene dos partes: una **interfaz pública** para explorar su obra y un **panel de administración** para gestionarla.

---

## Stack

<div align="center">

| | Herramienta | Versión | Rol |
|:---:|---|:---:|---|
| ![React](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=black&style=flat-square) | React | 19 | UI declarativa con hooks |
| ![Vite](https://img.shields.io/badge/-Vite-646CFF?logo=vite&logoColor=white&style=flat-square) | Vite | 8 | Build tool & dev server |
| ![Tailwind](https://img.shields.io/badge/-Tailwind-06B6D4?logo=tailwindcss&logoColor=white&style=flat-square) | Tailwind CSS | 4 | Sistema de utilidades |
| ![Motion](https://img.shields.io/badge/-Framer_Motion-FF0080?logo=framer&logoColor=white&style=flat-square) | Framer Motion | 12 | Animaciones & transiciones |
| ![Router](https://img.shields.io/badge/-React_Router-CA4245?logo=reactrouter&logoColor=white&style=flat-square) | React Router DOM | 7 | Enrutamiento SPA |
| ![Heroicons](https://img.shields.io/badge/-Heroicons-7b1e2b?style=flat-square) | Heroicons | 2 | Iconografía del panel admin |

</div>

---

## Estructura

```
src/
│
├── assets/                       # Banners e imágenes estáticas
│
├── components/
│   ├── Navbar.jsx / .css         # Cabecera + overlay de búsqueda en tiempo real
│   ├── Footer.jsx / .css         # Footer artístico de tres columnas
│   ├── ProtectedRoute.jsx        # Guard de autenticación para /admin
│   └── admin/
│       ├── AdminLayout.jsx       # Shell del panel (sidebar burdeos + área crema)
│       ├── PublicationForm.jsx   # Formulario reutilizable crear/editar
│       ├── ConfirmModal.jsx      # Modal de confirmación de borrado
│       └── EditModal.jsx         # Edición en modal sin cambio de página
│
├── pages/
│   ├── Home.jsx / .css           # Landing: banner · textos · libros · galería
│   ├── Publications.jsx / .css   # Obras publicadas en layout de lista
│   ├── Theory.jsx / .css         # Textos de teoría y filosofía
│   ├── Narrative.jsx / .css      # Textos de narrativa
│   ├── Theater.jsx / .css        # Textos de teatro
│   ├── Rhumor.jsx / .css         # Galería de artes visuales + lightbox
│   ├── AboutAuthor.jsx           # Página del autor
│   ├── Contact.jsx               # Formulario de contacto
│   ├── AdminRegister.jsx         # Login del panel admin
│   └── admin/
│       ├── PublicationsList.jsx  # CRUD publicaciones
│       ├── CreatePublication.jsx
│       ├── EditPublication.jsx
│       ├── VisualArtsList.jsx    # CRUD arte digital y arte manual
│       └── BooksList.jsx         # CRUD libros
│
├── services/
│   ├── PublicationService.jsx    # Fetch → /api/publications
│   └── VisualArtsService.jsx     # Fetch → /api/visual-arts
│
├── App.jsx                       # Árbol de rutas
└── index.css                     # Tailwind import + clases globales
```

---

## Rutas

<details>
<summary><strong>Públicas</strong></summary>

| Ruta | Página | Descripción |
|---|---|---|
| `/` | Home | Banner, textos recientes, libros, galería |
| `/publications` | Publications | Obras publicadas con imagen, extracto y PDF |
| `/theory` | Theory | Textos de filosofía y teoría |
| `/narrative` | Narrative | Textos de narrativa |
| `/theater` | Theater | Textos de teatro |
| `/rhumor` | Rhumor | Galería de artes visuales |
| `/about-author` | AboutAuthor | Biografía del autor |
| `/contact` | Contact | Formulario de contacto |

</details>

<details>
<summary><strong>Protegidas <code>/admin/*</code></strong></summary>

| Ruta | Descripción |
|---|---|
| `/admin/publicaciones` | Lista, buscar, editar y eliminar publicaciones |
| `/admin/publicaciones/nueva` | Crear nueva publicación |
| `/admin/publicaciones/:id/editar` | Editar publicación existente |
| `/admin/arte-digital` | Gestión de arte digital |
| `/admin/arte-manual` | Gestión de arte manual |
| `/admin/libros` | Gestión de libros publicados |

</details>

---

## Diseño

### Paleta

<div align="center">

| | Token | Hex | Uso |
|:---:|---|---|---|
| ![#7b1e2b](https://img.shields.io/badge/-%237b1e2b-7b1e2b?style=flat-square) | Burdeos | `#7b1e2b` | Acento principal, sidebar, CTAs |
| ![#C9A84C](https://img.shields.io/badge/-%23C9A84C-C9A84C?style=flat-square) | Dorado | `#C9A84C` | Hover, subtítulos, detalles |
| ![#f0ece8](https://img.shields.io/badge/-%23f0ece8-f0ece8?style=flat-square) | Marfil | `#f0ece8` | Títulos sobre oscuro |
| ![#F0EBE3](https://img.shields.io/badge/-%23F0EBE3-F0EBE3?style=flat-square) | Crema | `#F0EBE3` | Fondo panel admin |
| ![#0e0c0b](https://img.shields.io/badge/-%230e0c0b-0e0c0b?style=flat-square) | Negro editorial | `#0e0c0b` | Fondo páginas de contenido |

</div>

### Animaciones

```
Entrada staggered   opacity 0→1  y 50→0  delay: index × 0.07s
Hover en cards      translateY(-8px)  ease-out 0.3s
Lightbox            scale + fade  AnimatePresence
Títulos             fadeSlideInRight  1s ease-out
Overlay búsqueda    fadeIn + translateY(-10px)  0.25s
```

---

## Funcionalidades destacadas

<details>
<summary><strong>Búsqueda en tiempo real</strong></summary>

El icono de lupa en el Navbar abre un overlay de pantalla completa:

- Sin texto → accesos rápidos a todas las categorías
- Al escribir → debounce 300ms + fetch al backend por título
- Resultados con imagen, título y sección
- `Escape` para cerrar, clic en resultado navega a la sección

</details>

<details>
<summary><strong>Galería Rhumor</strong></summary>

Grid de 6 columnas con marco y passepartout crema simulando una galería física:

```css
grid-template-columns: repeat(6, 1fr);
```

Lightbox al hacer clic con navegación `←` `→` `Esc` y contador `1 / N`.

</details>

<details>
<summary><strong>Panel de administración</strong></summary>

Sidebar en burdeos con detección de ruta activa via `useLocation`. Área de contenido en crema `#F0EBE3`.

- CRUD publicaciones: texto + imagen + PDF + sección + destacado en home
- CRUD artes visuales por categoría (digital / manual), imágenes a tamaño completo
- CRUD libros con portada
- Confirmación de borrado con modal
- Edición inline en modal

</details>

---

## API

Backend **Spring Boot** en `http://localhost:8080`.

```
# Publicaciones
GET    /api/publications
GET    /api/publications?title={query}
GET    /api/publications/section/{section}
GET    /api/publications/home-selected
POST   /api/publications
PUT    /api/publications/{id}
DELETE /api/publications/{id}

# Artes visuales
GET    /api/visual-arts
GET    /api/visual-arts?showOnHome=true
POST   /api/visual-arts
PUT    /api/visual-arts/{id}
DELETE /api/visual-arts/{id}

# Libros
GET    /api/books?showOnHome=true
POST   /api/books
PUT    /api/books/{id}
DELETE /api/books/{id}
```

---

## Inicio rápido

```bash
# Clonar el repositorio
git clone <repo-url>
cd marvariable

# Instalar dependencias
npm install

# Servidor de desarrollo
npm run dev

# Build de producción
npm run build
```

> Requiere el backend corriendo en `localhost:8080`.

---

<div align="center">

<img src="https://readme-typing-svg.demolab.com?font=Cormorant+Garamond&weight=300&size=18&duration=4000&pause=1000&color=7b1e2b&center=true&vCenter=true&width=500&lines=Quito%2C+Ecuador+—+marvariable%40gmail.com" alt="Contacto" />

<br/>

![Made with](https://img.shields.io/badge/Hecho_con-React_19_+_Vite_8-C9A84C?style=for-the-badge&labelColor=0d1117)

</div>
