// src/App.jsx o App.tsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AdminPanel from "./components/AdminPanel";
import Gallery from "./components/Gallery";
import CardDetail from "./components/CardDetail";
import AdminLogin from "./components/AdminLogin";
import './App.css';
import Empleo from "./components/Empleo";
import { supabase } from './supabaseClient';


function App() {
  const [cards, setCards] = useState([]);

  const fetchCards = async () => {
    try {
      const { data, error } = await supabase.from("cards").select("*");
      if (error) throw error;
      setCards(data);
    } catch (error) {
      console.error("Error al obtener tarjetas desde Supabase:", error.message);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  const addCard = async (newCard) => {
    try {
      const { data, error } = await supabase.from("cards").insert([newCard]);
      if (error) throw error;
      setCards(prev => [...prev, ...data]);
    } catch (error) {
      console.error("Error al agregar tarjeta:", error.message);
    }
  };

  const deleteCard = async (id) => {
    try {
      const { error } = await supabase.from("cards").delete().eq("id", id);
      if (error) throw error;
      setCards(prev => prev.filter(card => card.id !== id));
    } catch (error) {
      console.error("Error al eliminar tarjeta:", error.message);
    }
  };

  return (
    <Router>
      <div className="App">
        <Link to="/admin-login">Panel de Administración</Link>
        <Routes>
          <Route path="/" element={<Gallery cards={cards} />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin" element={
            <AdminPanel setCards={setCards} cards={cards} addCard={addCard} deleteCard={deleteCard} />
          } />
          <Route path="/card/:id" element={<CardDetail cards={cards} />} />
          <Route path="/empleo" element={<Empleo />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
