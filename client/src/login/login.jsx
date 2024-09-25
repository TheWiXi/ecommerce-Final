import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/login.css';

function Login() {
  // Estados para manejar los datos del formulario
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch('http://localhost:3000/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ correo, contraseña }),
        });

        if (response.ok) {
            const data = await response.json();
            document.cookie = `token=${data.token}; path=/`; // Almacena el token en las cookies
            navigate('/home'); // Redirige a la página de inicio
        } else {
            // Manejar errores de autenticación
            const errorData = await response.json();
            console.error('Error:', errorData.message);
        }
    } catch (error) {
        console.error('Error al hacer login:', error);
    }
};

  return (
    <div className="form-login">
      <form onSubmit={handleSubmit}>
        <h6>Correo</h6>
        <input 
          type="email" 
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
        />
        <h6>Contraseña</h6>
        <input 
          type="password"
          value={contraseña}
          onChange={(e) => setContraseña(e.target.value)}
          required
        />
        <button type="submit" className="btn-submit">Iniciar Sesión</button>
        <h5><a href='/register'>Registrate</a></h5>
        {/* Mostrar mensajes de éxito o error */}
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
      </form>
    </div>
  );
}

export default Login;
