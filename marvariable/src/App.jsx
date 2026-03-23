import { Routes, Route } from "react-router-dom";

import PublicLayout from "./components/layout/PublicLayout";
import AdminLayout from "./components/admin/AdminLayout";

import Home from "./pages/Home";
import Publications from "./pages/Publications";
import Theory from "./pages/Theory";
import Narrative from "./pages/Narrative";
import Theater from "./pages/Theater";
import Rhumor from "./pages/Rhumor";
import AboutAuthor from "./pages/AboutAuthor";
import Contact from "./pages/Contact";
import AdminRegister from "./pages/AdminRegister";

import PublicationsList from "./pages/admin/PublicationsList";
import CreatePublication from "./pages/admin/CreatePublication";
import EditPublication from "./pages/admin/EditPublication";

function App() {
  return (
    <Routes>
      {/* RUTAS PÚBLICAS */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/publications" element={<Publications />} />
        <Route path="/theory" element={<Theory />} />
        <Route path="/narrative" element={<Narrative />} />
        <Route path="/theater" element={<Theater />} />
        <Route path="/rhumor" element={<Rhumor />} />
        <Route path="/about-author" element={<AboutAuthor />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin-register" element={<AdminRegister />} />
      </Route>

     
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="publicaciones" element={<PublicationsList />} />
        <Route path="publicaciones/nueva" element={<CreatePublication />} />
        <Route
          path="publicaciones/:id/editar"
          element={<EditPublication />}
        />
      </Route>
    </Routes>
  );
}

export default App;