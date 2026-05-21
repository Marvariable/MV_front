# MARVARIABLE — Frontend

> *Filosofía, narrativa y teatro desde Quito al mundo.*

Interfaz pública y panel de administración del sitio web del artista **Marvariable**. Construido con React 19, Vite 8 y Tailwind CSS v4, con animaciones fluidas a través de Framer Motion.

---

## Tecnologías

| Herramienta | Versión | Uso |
|---|---|---|
| React | 19 | UI declarativa con hooks |
| Vite | 8 | Build tool y dev server |
| Tailwind CSS | 4 | Utilidades de estilo |
| Framer Motion (`motion`) | 12 | Animaciones y transiciones |
| React Router DOM | 7 | Enrutamiento SPA |
| Heroicons | 2 | Iconografía en el panel admin |
| Headless UI | 2 | Componentes accesibles |

---

## Estructura del proyecto

```
src/
├── assets/                  # Imágenes estáticas (banners)
├── components/
│   ├── Navbar.jsx / .css    # Cabecera con buscador en overlay
│   ├── Footer.jsx / .css    # Pie de página con diseño de tres columnas
│   ├── ProtectedRoute.jsx   # Guard para rutas de admin
│   └── admin/
│       ├── AdminLayout.jsx  # Sidebar burdeos + área de contenido crema
│       ├── PublicationForm.jsx
│       ├── ConfirmModal.jsx
│       └── EditModal.jsx
├── pages/
│   ├── Home.jsx / .css      # Landing: banner, textos recientes, libros, galería
│   ├── Publications.jsx     # Obras publicadas en layout de lista
│   ├── Theory.jsx           # Textos de teoría
│   ├── Narrative.jsx        # Textos de narrativa
│   ├── Theater.jsx          # Textos de teatro
│   ├── Rhumor.jsx / .css    # Galería de artes visuales con lightbox
│   ├── AboutAuthor.jsx
│   ├── Contact.jsx
│   ├── AdminRegister.jsx
│   └── admin/
│       ├── PublicationsList.jsx
│       ├── CreatePublication.jsx
│       ├── EditPublication.jsx
│       ├── VisualArtsList.jsx
│       └── BooksList.jsx
├── services/
│   ├── PublicationService.jsx   # CRUD publicaciones → /api/publications
│   └── VisualArtsService.jsx    # CRUD artes visuales → /api/visual-arts
├── App.jsx                  # Árbol de rutas
└── index.css                # Tailwind + clases globales
```

---

## Rutas

### Públicas

| Ruta | Página | Descripción |
|---|---|---|
| `/` | Home | Banner, textos recientes, libros, galería visual |
| `/publications` | Publications | Lista de obras publicadas con imagen y PDF |
| `/theory` | Theory | Textos de filosofía y teoría |
| `/narrative` | Narrative | Textos de narrativa |
| `/theater` | Theater | Textos de teatro |
| `/rhumor` | Rhumor | Galería de artes visuales (grid 6×n + lightbox) |
| `/about-author` | AboutAuthor | Página del autor |
| `/contact` | Contact | Formulario de contacto |
| `/admin-register` | AdminRegister | Acceso al panel de administración |

### Protegidas (`/admin/*`)

| Ruta | Descripción |
|---|---|
| `/admin/publicaciones` | Lista y gestión de publicaciones |
| `/admin/publicaciones/nueva` | Crear publicación |
| `/admin/publicaciones/:id/editar` | Editar publicación |
| `/admin/arte-digital` | Gestión de arte digital |
| `/admin/arte-manual` | Gestión de arte manual |
| `/admin/libros` | Gestión de libros publicados |

---

## Diseño

El sitio sigue un lenguaje visual oscuro y sofisticado inspirado en galerías de arte y editoriales literarias.

### Paleta de colores

| Nombre | Hex | Uso |
|---|---|---|
| Burdeos | `#7b1e2b` | Acento principal, sidebar, botones |
| Dorado | `#C9A84C` | Destacados, hover, subtítulos |
| Marfil | `#f0ece8` | Títulos sobre fondos oscuros |
| Crema | `#F0EBE3` | Fondo del panel admin |
| Negro editorial | `#0e0c0b` | Fondo de páginas de contenido |

### Tipografía

- Pesos ligeros (`font-weight: 100–300`) en títulos grandes
- `letter-spacing` amplio para textos en uppercase
- `clamp()` en títulos para escalar entre mobile y desktop

### Animaciones

- **Entrada de cards**: `opacity: 0 → 1`, `y: 50 → 0`, stagger de `0.07s` por item
- **Hover en cards**: `translateY(-8px)` con `ease-out 0.3s`
- **Lightbox**: scale + fade con `AnimatePresence`
- **Títulos de sección**: `fadeSlideInRight` — desliza desde la derecha al cargar
- **Búsqueda**: overlay con `fadeIn + translateY(-10px)` de 0.25s

---

## Búsqueda

El botón de lupa en el Navbar abre un overlay de búsqueda en tiempo real:

- **Sin texto**: muestra accesos directos a todas las categorías
- **Al escribir**: filtra categorías por nombre + consulta el backend con debounce de 300ms
- **Resultados**: imagen en miniatura, título y sección de cada obra
- **Navegación por teclado**: `Escape` cierra el overlay

---

## Galería Rhumor

La galería de artes visuales (`/rhumor`) usa CSS Grid con 6 columnas fijas:

```css
grid-template-columns: repeat(6, 1fr);
```

Cada obra tiene marco (`#1a1410`) + passepartout crema (`#f5f0e8`) simulando una galería física. Al hacer clic se abre un lightbox con navegación por flechas y teclado (`←` `→` `Esc`).

---

## Panel de administración

Acceso protegido por `ProtectedRoute`. Sidebar en burdeos (`#7b1e2b`) con estado activo detectado por `useLocation`. El área de contenido usa fondo crema para facilitar la lectura.

Funcionalidades:
- CRUD completo de publicaciones (texto + imagen + PDF + sección + destacado en home)
- CRUD de artes visuales separado por categoría (digital / manual)
- CRUD de libros con portada e imagen de home
- Confirmación de borrado con modal
- Edición en modal sin cambio de página

---

## Servicios / API

Backend en **Spring Boot** corriendo en `http://localhost:8080`.

```
GET    /api/publications
GET    /api/publications?title=query
GET    /api/publications/section/:section
GET    /api/publications/home-selected
POST   /api/publications
PUT    /api/publications/:id
DELETE /api/publications/:id

GET    /api/visual-arts
GET    /api/visual-arts?showOnHome=true
POST   /api/visual-arts
PUT    /api/visual-arts/:id
DELETE /api/visual-arts/:id

GET    /api/books?showOnHome=true
POST   /api/books
PUT    /api/books/:id
DELETE /api/books/:id
```

Las imágenes se sirven directamente desde Cloudinary.

---

## Instalación y uso

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build

# Previsualizar build de producción
npm run preview
```

> Requiere el backend de Spring Boot corriendo en `localhost:8080`.

---

## Autor del sitio

**Marvariable** — Quito, Ecuador
marvariable@gmail.com

---

*Desarrollado con React 19 + Vite 8*
