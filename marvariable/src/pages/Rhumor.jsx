import { useState } from "react";
import "./Rhumor.css";
import mural from "../assets/paint1.jpg";
import mural2 from "../assets/paint2.jpg";
import mural3 from "../assets/paint3.jpg";
import mural4 from "../assets/paint4.jpg";
import mural5 from "../assets/paint5.jpg";
import mural6 from "../assets/paint6.jpg";
import mural7 from "../assets/paint7.jpg";
import mural8 from "../assets/paint8.jpg";
import mural9 from "../assets/paint9.jpg";
import mural10 from "../assets/paint10.jpg";


export default function Rhumor() {
  const images = [
    { id: 1, src: mural, title: "0.1" },
    { id: 2, src: mural2, title: "0.2" },
    { id: 3, src: mural3, title: "0.3" },
    { id: 4, src: mural4, title: "0.4" },
    { id: 5, src: mural5, title: "0.5" },
    { id: 6, src: mural6, title: "0.1" },
    { id: 7, src: mural7, title: "0.2" },
    { id: 8, src: mural8, title: "0.3" },
    { id: 9, src: mural9, title: "0.4" },
    { id: 10, src: mural10, title: "0.5" },
  



  ];

  const [selectedIndex, setSelectedIndex] = useState(null);

  function openImage(index) {
    setSelectedIndex(index);
  }

  function closeImage() {
    setSelectedIndex(null);
  }

  function showPrev() {
    setSelectedIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  }

  function showNext() {
    setSelectedIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  }

  function handleOverlayClick(event) {
    if (event.target.classList.contains("rhumor-overlay")) {
      closeImage();
    }
  }

  return (
    <section className="rhumor-page">
      <div className="rhumor-header">
        <h1 className="rhumor-title">R  H U M O R</h1>

      </div>

      <div className="rhumor-gallery">
        {images.map((image, index) => (
          <button
            key={image.id}
            type="button"
            className="rhumor-card"
            onClick={() => openImage(index)}
          >
            <span className="rhumor-card-label">{image.title}</span>
            <img
              src={image.src}
              alt={`Obra ${image.title}`}
              className="rhumor-thumb"
            />
          </button>
        ))}
      </div>

      {selectedIndex !== null && (
        <div className="rhumor-overlay" onClick={handleOverlayClick}>
          <button
            type="button"
            className="rhumor-close"
            onClick={closeImage}
            aria-label="Cerrar imagen"
          >
            ×
          </button>

          <button
            type="button"
            className="rhumor-nav rhumor-nav-left"
            onClick={showPrev}
            aria-label="Imagen anterior"
          >
            ‹
          </button>

          <div className="rhumor-lightbox-frame">
            <img
              src={images[selectedIndex].src}
              alt={`Obra ampliada ${images[selectedIndex].title}`}
              className="rhumor-lightbox-image"
            />
          </div>

          <button
            type="button"
            className="rhumor-nav rhumor-nav-right"
            onClick={showNext}
            aria-label="Imagen siguiente"
          >
            ›
          </button>
        </div>
      )}
    </section>
  );
}