// src/components/Card.jsx
import React from 'react';
const Card = ({ mainImage, title, onClick }) => {
  return (
    <div className="card" onClick={onClick}>
      <img src={mainImage} alt={title} />
      <p>{title}</p>
    </div>
  );
};

export default Card;
