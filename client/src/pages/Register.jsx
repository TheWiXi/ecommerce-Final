import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import leftSVG from '../../public/left-arrow.svg'

function Register (){
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [confirmarContraseña, setConfirmarContraseña] = useState('');
    const [telefono, setTelefono] = useState('')
    const [tipo, setTipo] = useState('comprador')
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (contraseña !== confirmarContraseña) {
            setError('Las contraseñas no coinciden');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/users/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ correo, contraseña, nombre, telefono, tipo}),
            });
    
            if (response.ok) {
                setSuccess('Usuario registrado con éxito');
                setError('');
                navigate('/login');
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Error al registrar');
                console.error('Error:', errorData.message);
            }
        } catch (error) {
            setError('Error al hacer el registro');
            console.error('Error al hacer login:', error);
        }
    }

    return (
    <>
        <div class="left fixed top-7 left-0">
            <a href="/init-register" class="flex items-center">
                <img src={leftSVG} alt="Left Arrow" class="w-7 h-19"/>
            </a>
        </div>

        <div className="form-register flex flex-col items-center mt-10 mx-10">
            <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full max-w-md">
                <label htmlFor="name" className="text-left">Nombre completo</label>
                <h1 className="text-sm text-gray-500">*Crea un nombre de usuario de mínimo 5 y máximo de 12 carácteres</h1>
                <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                    id="name"
                    name="name"
                    className="h-8 bg-gray-200 rounded-md p-2"
                />

                <label htmlFor="email" className="text-left">Correo electrónico*</label>
                <input
                    type="email"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    id="email"
                    name="email"
                    required
                    className="h-8 bg-gray-200 rounded-md p-2"
                />

                <label htmlFor="password" className="text-left">Contraseña*</label>
                <h1 className="text-sm text-gray-500">Recuerda crear una contraseña difícil de adivinar</h1>
                <input
                    type="password"
                    value={contraseña}
                    onChange={(e) => setContraseña(e.target.value)}
                    id="password"
                    name="password"
                    required
                    className="h-8 bg-gray-200 rounded-md p-2"
                />

                <label htmlFor="confirmPassword" className="text-left">Confirma tu contraseña*</label>
                <input
                    type="password"
                    value={confirmarContraseña}
                    onChange={(e) => setConfirmarContraseña(e.target.value)}
                    id="confirmPassword"
                    name="confirmPassword"
                    required
                    className="h-8 bg-gray-200 rounded-md p-2"
                />

                <label htmlFor="phone" className="text-left">Teléfono</label>
                <input
                    type="text"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    id="phone"
                    name="phone"
                    required
                    className="h-8 bg-gray-200 rounded-md p-2"
                />

                <label htmlFor="role" id="role" className="text-left">Elige un rol:</label>
                <select
                    name="role"
                    value={tipo}
                    onChange={(e) => setTipo(e.target.value)}
                    className="h-10 bg-gray-200 rounded-md p-2"
                >
                    <option value="comprador">Comprador</option>
                    <option value="artesano">Artesano</option>
                </select>

                <button type="submit" className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">Enviar</button>

                {/* Mostrar mensajes de éxito o error */}
                {error && <p className="text-red-500">{error}</p>}
                {success && <p className="text-green-500">{success}</p>}
            </form>
        </div>
    </>
    )
}

export default Register;
