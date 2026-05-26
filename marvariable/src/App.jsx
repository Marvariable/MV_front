import { Routes, Route } from "react-router-dom";

import PublicLayout from "./components/admin/PublicLayout";
import AdminLayout from "./components/admin/AdminLayout";

import Home from "./pages/Home";
import Books from "./pages/Books";
import Theory from "./pages/Theory";
import Narrative from "./pages/Narrative";
import Theater from "./pages/Theater";
import Rhumor from "./pages/Rhumor";
import AboutAuthor from "./pages/AboutAuthor";
import Contact from "./pages/Contact";
import AdminRegister from "./pages/AdminRegister";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicationsList from "./pages/admin/PublicationsList";
import VisualArtsList from "./pages/admin/VisualArtsList";
import CreatePublication from "./pages/admin/CreatePublication";
import EditPublication from "./pages/admin/EditPublication";
import BooksList from "./pages/admin/BooksList";

function App() {
  return (
    <Routes>
    
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/libros" element={<Books />} />
        <Route path="/theory" element={<Theory />} />
        <Route path="/narrative" element={<Narrative />} />
        <Route path="/theater" element={<Theater />} />
        <Route path="/rhumor" element={<Rhumor category="ARTE_DIGITAL" />} />
        <Route path="/arte-plastico" element={<Rhumor category="ARTE_MANUAL" />} />
        <Route path="/about-author" element={<AboutAuthor />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin-register" element={<AdminRegister />} />
      </Route>

     
      <Route element={<ProtectedRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="publicaciones" element={<PublicationsList />} />
          <Route path="publicaciones/nueva" element={<CreatePublication />} />
          <Route path="publicaciones/:id/editar" element={<EditPublication />} />
          <Route path="arte-digital" element={<VisualArtsList category="ARTE_DIGITAL" title="Arte Digital" />} />
          <Route path="arte-manual" element={<VisualArtsList category="ARTE_MANUAL" title="Arte Plástico" />} />
          <Route path="libros" element={<BooksList />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;