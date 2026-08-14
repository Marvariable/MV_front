# Login - Documentación

## Stack

- **Frontend:** React 19 + Vite 8
- **Backend:** Spring Boot (http://localhost:8080)
- **Autenticación:** JWT via `localStorage`

## Flujo de autenticación

### 1. Login

El formulario de login está en `src/pages/AdminRegister.jsx` (el nombre del archivo es engañoso, no es un registro).

**Petición** (línea 35):
```
POST http://localhost:8080/login
Content-Type: application/json

{
  "email": "usuario@email.com",
  "password": "********"
}
```

**Respuesta esperada:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9..."
}
```

**Manejo** (líneas 55-57): el token se guarda en `localStorage` con clave `"token"` y redirige a `/admin/publicaciones`.

### 2. Protección de rutas

`src/components/ProtectedRoute.jsx` — Lee el token de `localStorage`. Si no existe, es `"undefined"` o `"null"`, redirige a `/admin-register`.

Todas las rutas bajo `/admin/*` están envueltas en `<ProtectedRoute />` en `src/App.jsx` (línea 41).

### 3. Llamadas autenticadas

Los servicios que envían el token en el header `Authorization`:

| Servicio | Header |
|---|---|
| `src/services/BooksService.jsx` (línea 7) | `Authorization: <token>` |
| `src/services/VisualArtsService.jsx` (línea 7) | `Authorization: <token>` |
| `src/pages/admin/AuthorSettings.jsx` (líneas 48-51) | `Authorization: <token>` |

**Nota:** No se usa el prefijo `Bearer`. El token se manda en crudo.

## Archivos clave

| Archivo | Rol |
|---|---|
| `src/pages/AdminRegister.jsx` | Formulario de login y envío de credenciales |
| `src/components/ProtectedRoute.jsx` | Guardia de rutas protegidas |
| `src/App.jsx` | Definición de rutas públicas y protegidas |
| `src/services/BooksService.jsx` | API de libros con auth |
| `src/services/VisualArtsService.jsx` | API de arte con auth |

## Observaciones

- **No hay logout:** no existe botón ni lógica para cerrar sesión.
- **"Recordarme"** no tiene efecto funcional, el token siempre se guarda en `localStorage`.
- **No hay validación del token:** `ProtectedRoute` solo verifica que exista, no que sea válido o no haya expirado.
- **No hay AuthContext ni Axios interceptor:** el token se lee directamente de `localStorage` en cada servicio.
- **PublicationService no usa auth:** las operaciones CRUD de publicaciones no envían token.
- **Login.jsx** es un placeholder vacío (no se usa).
