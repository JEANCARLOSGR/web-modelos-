import React from "react";
import { Link } from "react-router-dom";
import "./Empleo.css";

const Empleo = () => {
  return (
    <div className="empleo-container">

      {/* Encabezado */}
      <section className="header-section">
        <h1>TRABAJA CON NOSOTROS</h1>
        <h2>Asegura tu estilo de vida</h2>
        <p>
          ¡Sólo lo mejor para ti! Realizamos una adecuada asesoría a nuestros modelos y clientes, haciendo un detallado seguimiento a cada proceso, desde la selección de los modelos, la realización de los contratos, la culminación del evento y la imagen de ambas partes, garantizando la satisfacción tanto del cliente como del modelo..
        </p>
      </section>

      {/* Promesas y Foto */}
      <section className="benefits-section">
        <h1>¡GANA DINERO !</h1>
        <div className="content">
          <ul className="benefits-list">
            <li>🔝 Las mayores ganancias</li>
            <li>💸 Ganancias mínimas garantizadas por pasarela</li>
            <li>🤑 Pago en efectivo al final del mes </li>
            <li>✨ Excelente ambiente y respeto</li>
            <li>🕰️ Horarios flexibles</li>
            <li>🍹 materiales incluidos</li>
            <li>📶 WiFi gratis</li>
            <li>📸 Sesión de fotos profesional</li>
            <li>📣 Marketing gratuito</li>
          </ul>
          <img
            src="/revista 1.jpg"
            alt="Chicas celebrando"
            className="benefits-image"
          />
        </div>
      </section>

      {/* Contacto */}
      <section className="contact-section">
        <h2>¡POSTÚLESE AHORA CON NOSOTROS!</h2>
        <div className="contact-cards">
          <ContactCard icon="📞" title="TELÉFONO" value="+57 3136600948" />
          <ContactCard icon="💬" title="WHATSAPP" value="+57 3136600948" />
        </div>
      </section>

      {/* Botón de regreso */}
      <div className="volver-container">
        <Link to="/" className="volver-boton">← Volver al Inicio</Link>
      </div>
    </div>
  );
};

const ContactCard = ({ icon, title, value }) => (
  <div className="contact-card">
    <div className="icon">{icon}</div>
    <h4>{title}</h4>
    <p>{value}</p>
  </div>
);

export default Empleo;
