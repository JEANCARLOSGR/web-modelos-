import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "../supabaseClient";
import "../App.css";

function AdminPanel({ setCards, cards }) {
  const [mainImage, setMainImage] = useState(null);
  const [mainPreview, setMainPreview] = useState(null);
  const [extraImages, setExtraImages] = useState([]);
  const [extraPreviews, setExtraPreviews] = useState([]);
  const [description, setDescription] = useState('');
  const [descripcionLista, setDescripcionLista] = useState('');
  const [title, setTitle] = useState('');
  const [cardsLocal, setCardsLocal] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCards = async () => {
      const { data, error } = await supabase.from("cards").select("*");
      if (error) {
        console.error("Error al obtener tarjetas:", error);
        return;
      }
      setCardsLocal(data);
      setCards(data);
    };

    fetchCards();
  }, []);

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ml_default");

    const response = await fetch("https://api.cloudinary.com/v1_1/de95pql38/image/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    return data.secure_url;
  };

  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMainImage(file);
      setMainPreview(URL.createObjectURL(file));
    }
  };

  const handleExtraImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setExtraImages(files);
    setExtraPreviews(files.map(file => URL.createObjectURL(file)));
  };

  const handleAddCard = async () => {
    if (!mainImage || !title) {
      alert("Falta imagen principal o título");
      return;
    }

    try {
      const uploadedMain = await uploadToCloudinary(mainImage);
      const uploadedExtras = await Promise.all(extraImages.map(uploadToCloudinary));

      const newCard = {
        id: uuidv4(),
        title,
        description,
        descripcionLista,
        mainImage: uploadedMain,
        extraImages: uploadedExtras,
        isNew: true,
      };

      const { data, error } = await supabase.from("cards").insert([newCard]);
      if (error) {
        console.error("Error al guardar en Supabase:", error);
        alert("Error guardando en Supabase: " + error.message);
        return;
      }

      const updatedCards = [...cardsLocal, ...data];
      setCardsLocal(updatedCards);
      setCards(updatedCards);

      setTitle("");
      setDescription("");
      setDescripcionLista("");
      setMainImage(null);
      setMainPreview(null);
      setExtraImages([]);
      setExtraPreviews([]);
    } catch (err) {
      console.error("Error al subir imágenes o guardar tarjeta:", err);
      alert("Error subiendo imágenes o guardando tarjeta.");
    }
  };

  const handleDelete = async (id) => {
    const { error } = await supabase.from("cards").delete().eq("id", id);
    if (error) {
      console.error("Error al eliminar tarjeta:", error);
      return;
    }

    const updated = cardsLocal.filter(card => card.id !== id);
    setCardsLocal(updated);
    setCards(updated);
  };

  const handleToggleNewStatus = async (id) => {
    const card = cardsLocal.find(c => c.id === id);
    const updatedCard = { ...card, isNew: !card.isNew };

    const { error } = await supabase
      .from("cards")
      .update({ isNew: updatedCard.isNew })
      .eq("id", id);

    if (error) {
      console.error("Error actualizando tarjeta:", error);
      return;
    }

    const updatedList = cardsLocal.map(c => (c.id === id ? updatedCard : c));
    setCardsLocal(updatedList);
    setCards(updatedList);
  };

  return (
    <div className="container">
      <h2>Panel de Administración</h2>
      <button onClick={() => navigate("/")} className="home-button">Ir al Inicio</button>

      <div className="form-group">
        <label>Título</label>
        <input
          type="text"
          placeholder="Título de la tarjeta"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Imagen principal</label>
        <input type="file" accept="image/*" onChange={handleMainImageChange} />
        {mainPreview && <img src={mainPreview} alt="Vista previa" style={{ width: "200px", borderRadius: "8px" }} />}
      </div>

      <div className="form-group">
        <label>Imágenes extra</label>
        <input type="file" accept="image/*" multiple onChange={handleExtraImagesChange} />
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "10px" }}>
          {extraPreviews.map((src, i) => (
            <img key={i} src={src} alt={`extra-${i}`} style={{ width: "100px", borderRadius: "6px" }} />
          ))}
        </div>
      </div>

      <div className="form-group">
        <label>Descripción</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>

      <div className="form-group">
        <label>Descripción en lista</label>
        <textarea
          value={descripcionLista}
          onChange={(e) => setDescripcionLista(e.target.value)}
          rows={4}
        />
      </div>

      <button onClick={handleAddCard}>Agregar Tarjeta</button>

      <h3>Tarjetas Existentes</h3>
      <div className="gallery-container">
        {cardsLocal.map(card => (
          <div key={card.id} className="card">
            {card.isNew && <img src="/imagesXX.png" alt="Nueva" className="new-badge" />}
            <img src={card.mainImage} alt={card.title} className="card-image" />
            <h3>{card.title}</h3>
            <button onClick={() => navigate(`/card/${card.id}`)}>Ver</button>
            <button onClick={() => handleDelete(card.id)}>Eliminar</button>
            <button onClick={() => handleToggleNewStatus(card.id)}>
              {card.isNew ? "Marcar como no nueva" : "Marcar como nueva"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminPanel;
