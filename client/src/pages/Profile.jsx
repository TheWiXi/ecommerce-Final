import React, { useState, useEffect } from "react";
import Header from '../components/Header';
import Footer from '../components/Footer';
import editSVG from '../../public/edit.svg'
import {jwtDecode} from 'jwt-decode';

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const [isEditing, setIsEditing] = useState({}); 
    const [updatedData, setUpdatedData] = useState({})

    const getCookieValue = (cookieName) => {
        const cookies = document.cookie.split('; ');
        const cookie = cookies.find(row => row.startsWith(cookieName + '='));
        return cookie ? cookie.split('=')[1] : null;
    };

    useEffect(() => {
        const fetchUserData = async (email) => {
            try {
                const response = await fetch('http://localhost:3000/users/verifyEmail', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ correo: email }),
                });

                if (response.ok) {
                    const data = await response.json();
                    setUserData(data);
                } else {
                    console.error('Error al obtener los datos del usuario');
                }
            } catch (error) {
                console.error('Error en la solicitud:', error);
            }
        };

        const token = getCookieValue('token');

        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                const userEmail = decodedToken.correo;
                fetchUserData(userEmail);
            } catch (error) {
                console.error('Token inválido', error);
            }
        }
    }, []);

    const handleEdit = (field) => {
        setIsEditing((prev) => ({ ...prev, [field]: true }));
    };

    const handleChange = (field, value) => {
        setUpdatedData((prev) => ({ ...prev, [field]: value }));
    };

    const handleUpdate = async (field) => {
        const userId = userData._id; // Assuming you have userId in userData
        try {
            const response = await fetch(`http://localhost:3000/users/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ [field]: updatedData[field] }), 
            });

            if (response.ok) {
                const updatedUser = await response.json();
                setUserData(updatedUser);
                setIsEditing((prev) => ({ ...prev, [field]: false })); 
            } else {
                console.error('Error al actualizar el campo');
            }
        } catch (error) {
            console.error('Error en la solicitud de actualización:', error);
        }
    };

    return (
<div className='relative'>
    <Header />
    <section className='flex flex-col h-screen p-4 bg-white'>
        <div className="flex flex-col items-center justify-center">
            {userData ? (
                <div className="flex flex-col items-center w-full">
                    <h1 className="flex justify-content-center text-lg font-semibold mb-2">Foto de perfil</h1>
                    <div className="flex ">
                        <img src={userData.fotoPerfil} alt="Foto de perfil" className="w-24 h-24 rounded-full mb-4" />
                    </div>
                    
                    <div className="w-full">
                        <div className="info-item flex items-center justify-around mb-5 mt-5 gap-5">
                            <span className="info-label ml-2 font-medium">Usuario:</span>
                            {isEditing.nombre ? (
                                <input 
                                    type="text" 
                                    value={updatedData.nombre || userData.nombre} 
                                    onChange={(e) => handleChange('nombre', e.target.value)}
                                    className="border rounded p-1"
                                />
                            ) : (
                                <span className="inline-flex items-center justify-center w-3/5 h-10 px-3 bg-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">{userData.nombre}</span>
                            )}
                            <button onClick={() => isEditing.nombre ? handleUpdate('nombre') : handleEdit('nombre')}>
                                <img src={editSVG} alt="Editar" className="w-5 h-5" />
                            </button>
                        </div>
                        
                        <div className="info-item flex items-center justify-around mb-5 mt-5 gap-5">
                            <span className="info-label ml-2 font-medium">Correo:</span>
                            {isEditing.correo ? (
                                <input 
                                    type="email" 
                                    value={updatedData.correo || userData.correo} 
                                    onChange={(e) => handleChange('correo', e.target.value)} 
                                    className="border rounded p-1"
                                />
                            ) : (
                                <span className="inline-flex items-center justify-center  w-3/5 h-10 px-3 bg-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">{userData.correo}</span>
                            )}
                            <button onClick={() => isEditing.correo ? handleUpdate('correo') : handleEdit('correo')}>
                                <img src={editSVG} alt="Editar" className="w-5 h-5" />
                            </button>
                        </div>
                        
                        <div className="info-item flex items-center justify-around mb-5 mt-5 gap-5">
                            <span className="info-label ml-2 font-medium">Celular:</span>
                            {isEditing.telefono ? (
                                <input 
                                    type="text" 
                                    value={updatedData.telefono || userData.telefono} 
                                    onChange={(e) => handleChange('telefono', e.target.value)} 
                                    className="border rounded p-1"
                                />
                            ) : (
                                <span className="inline-flex items-center justify-center  w-3/5 h-10 px-3 bg-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">{userData.telefono || 'No disponible'}</span>
                            )}
                            <button onClick={() => isEditing.telefono ? handleUpdate('telefono') : handleEdit('telefono')}>
                                <img src={editSVG} alt="Editar" className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <p>No estás autenticado</p>
            )}
        </div>
        <div>
            <h1>Métodos de pago</h1>
        </div>
    </section>
    <Footer />
</div>
);
}

export default Profile;
