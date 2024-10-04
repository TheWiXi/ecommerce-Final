import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import leftSVG from '../../public/left-arrow.svg'

function Login() {
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

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
            document.cookie = `token=${data.token}; path=/`;
            navigate('/home'); 
        } else {
            const errorData = await response.json();
            console.error('Error:', errorData.message);
        }
    } catch (error) {
        console.error('Error al hacer login:', error);
    }
};

  return (
    <> 
    <div class="left fixed top-0 left-0">
        <a href="/init-register" class="flex items-center">
            <img src={leftSVG} alt="Left Arrow" class="w-10 h-19"/>
        </a>
    </div>
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-80 p-6 bg-white rounded-lg">
        <label htmlFor="email" className="text-sm font-medium">Correo</label>
        <input 
          type="email" 
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          id="email"
          name="email"
          required
          className="w-full h-10 px-3 bg-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <label htmlFor="password" className="text-sm font-medium">Contraseña</label>
        <input 
          type="password"
          value={contraseña}
          onChange={(e) => setContraseña(e.target.value)}
          id="password"
          name="password"
          required
          className="w-full h-10 px-3 bg-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button type="submit" className="text-black underline mt-10">Iniciar Sesión</button>
        <h5 className="text-center text-black underline">
          <a href='#'>¿Olvidaste tu contraseña?</a>
        </h5>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-500 text-sm">{success}</p>}
      </form>
    </div>
  </>
  );
}

export default Login;
