import React, { useState, useEffect } from "react";
import {jwtDecode} from 'jwt-decode';  
import Header from '../components/Header';
import Footer from '../components/Footer';
import triangleSVG from '../../public/triangle.svg';

const Carrito = () => {
    const [userData, setUserData] = useState(null);
    const [productos, setProductos] = useState([]);

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

                    // Luego de obtener el userData, busca los productos por sus IDs
                    if (data.compras) {
                        fetchProductos(data.compras);
                    }
                } else {
                    console.error('Error al obtener los datos del usuario');
                }
            } catch (error) {
                console.error('Error en la solicitud:', error);
            }
        };

        const fetchProductos = async (comprasIds) => {
            try {
                const productosFetch = await Promise.all(
                    comprasIds.map(async (id) => {
                        const response = await fetch(`http://localhost:3000/products/searchById/${id}`);
                        if (response.ok) {
                            return await response.json();
                        } else {
                            console.error('Error al obtener producto con ID:', id);
                        }
                    })
                );
                // Filtra los productos no nulos (por si alguna solicitud falló)
                setProductos(productosFetch.filter(product => product !== undefined));
            } catch (error) {
                console.error('Error al obtener los productos:', error);
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

    return (
        <div className=''>
            <Header />
            <section className='mt-3'>
                <div>
                    <div className='flex items-center'>
                        <img src={triangleSVG} className='h-10' alt="triangle" />
                        <p className='font-bold w-full'>Tu carrito de compras</p>
                    </div>
                    <p className='ml-5 text-[rgba(0,0,0,0.48)] text-sm'>
                        Revisa aquí los productos que añadiste a tu carrito
                    </p>

                    {/* Mostrar los productos del carrito */}
                    <div className="mt-5">
                        {productos.length > 0 ? (
                            productos.map((producto) => (
                                <div key={producto._id} className="border p-4 mb-4">
                                    <img src={producto.foto} alt={producto.nombre} className="w-32 h-32" />
                                    <h2 className="font-bold">{producto.nombre}</h2>
                                    <p>{producto.descripcion}</p>
                                    <p>Precio: ${producto.precio}</p>
                                    {producto.descuento && <p>Descuento: {producto.descuento}%</p>}
                                </div>
                            ))
                        ) : (
                            <p>No tienes productos en el carrito.</p>
                        )}
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default Carrito;
