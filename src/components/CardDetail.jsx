import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaMoneyBill, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import { supabase } from "../supabaseClient";

function CardDetail() {
  const { id } = useParams();
  const [card, setCard] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const { data, error } = await supabase
          .from("cards")
          .select("*")
          .eq("id", id)
          .single();

        if (error || !data) {
          console.error("Error al obtener la tarjeta:", error);
          return;
        }

        setCard(data);
      } catch (error) {
        console.error("Error general:", error);
      }
    };

    fetchCard();
  }, [id]);

  if (!card || !card.mainImage) {
    return <div style={{ padding: '2rem', color: '#fff' }}>Tarjeta no encontrada o incompleta</div>;
  }

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <div className="top-bar">
        <div className="side-buttons">
          <button onClick={() => navigate("/")}>Inicio</button>
          <button onClick={() => navigate("/servicios")}>Servicios</button>
          <button onClick={() => navigate("/contacto")}>Contacto</button>
        </div>
        <div className="side-buttons">
          <button onClick={() => navigate("/galeria")}>Galería</button>
          <button onClick={() => navigate("/nosotros")}>Nosotros</button>
          <button onClick={() => navigate("/soporte")}>Soporte</button>
        </div>
      </div>

      <h2 style={{ color: "#ff0000" }}>{card.title}</h2>

      <img
        src={card.mainImage}
        alt="Imagen principal"
        style={{
          width: "60%",
          maxWidth: "500px",
          marginBottom: "20px",
          borderRadius: "10px",
        }}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: "15px",
          justifyItems: "center",
          marginBottom: "20px",
        }}
      >
        {card.extraImages &&
          card.extraImages.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Extra ${index}`}
              style={{
                width: "100%",
                maxWidth: "150px",
                borderRadius: "8px",
                objectFit: "cover",
              }}
            />
          ))}
      </div>

      <p
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          textAlign: "justify",
          color: "#fff",
          fontSize: "1.2rem",
        }}
      >
        {card.description}
      </p>

      {card.descripcionLista && (
        <ul
          style={{
            maxWidth: "600px",
            margin: "1rem auto",
            textAlign: "left",
            color: "#ff0000",
            paddingLeft: "1.2rem",
          }}
        >
          {card.descripcionLista.split("\n").map((item, index) => (
            <li key={index} style={{ marginBottom: "6px" }}>
              {item}
            </li>
          ))}
        </ul>
      )}

    </div>
  );
}

export default CardDetail;
