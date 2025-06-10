import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient'; // Asegúrate de que esta importación sea correcta
import './Gallery.css';

function Gallery() {
  const [cards, setCards] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const { data, error } = await supabase
          .from("cards")
          .select("*");

        if (error) {
          throw error;
        }

        const filteredCards = data.filter(card => card && card.id);
        setCards(filteredCards);
      } catch (err) {
        console.error("Error al obtener tarjetas:", err.message);
      }
    };

    fetchCards();
  }, []);

  const openCardInNewTab = (id) => {
    window.open(`/card/${id}`, '_blank');
  };

  return (
    <>
      {/* Barra superior personalizada */}
      <div className="top-bar">

        <div className="side-buttons">
          <button onClick={() => navigate('/empleo')}>Empleo</button>
        </div>
      </div>

      {/* Galería de tarjetas */}
      <div className="gallery-container">
        {cards.length === 0 ? (
          <p>No hay tarjetas disponibles.</p>
        ) : (
          cards.map((card) => (
            <div className="card" key={card.id}>
              {card.isNew && (
                <img src="/imagesXX.png" alt="Nueva" className="new-badge" />
              )}
              <img src={card.mainImage} alt={card.title} className="card-image" />
              <h3>{card.title}</h3>
              <button onClick={() => openCardInNewTab(card.id)}>Ver más</button>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default Gallery;
