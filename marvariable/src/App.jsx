import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Publications from "./pages/Publications"
import Theory from "./pages/Theory"
import Narrative from "./pages/Narrative"
import Theater from "./pages/Theater";
import Rhumor from "./pages/Rhumor"
import AboutAuthor from "./pages/AboutAuthor"
import Contact from "./pages/Contact"
import AdminRegister from "./pages/AdminRegister"




function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/publications" element={<Publications />} />
        <Route path="/theory" element={<Theory />} />
        <Route path="/narrative" element={<Narrative />} />
        <Route path="/theater" element= {<Theater/>} />
        <Route path="/rhumor" element={<Rhumor />} />
        <Route path="/about-author" element={<AboutAuthor />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin-register" element={<AdminRegister />} />
        
      </Routes>
    </div>
  )
}

export default App