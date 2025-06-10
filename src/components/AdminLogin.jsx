import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css'; 

const AdminLogin = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const correctPassword = 'admin123';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === correctPassword) {
      navigate('/admin');
    } else {
      setError('Contraseña incorrecta');
    }
  };

  return (
    <div className="admin-login-container">
      <div className="form-section">
        <h2>Acceso al Panel de Administración</h2>
        <form onSubmit={handleSubmit} className="admin-form">
          <input
            type="password"
            placeholder="Ingrese la contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="password-input"
          />
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="submit-button">Acceder</button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
