import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import siSvg from '../../public/buttons/si-black.svg';
import discountSvg from '../../public/discount.svg';
import leftSVG from '../../public/left-arrow.svg';
import triangleSVG from '../../public/triangle.svg';
import cartBlackSVG from '../../public/navbar/cart-black.svg';
import favoriteSiSVG from '../../public/buttons/favorite-si.svg'
import favoriteNoSVG from '../../public/buttons/favorite-no.svg'

const Product = () => {
    const location = useLocation();
    const { product } = location.state || {};
    const [userData, setUserData] = useState(null);

    const precioOriginal = product?.precio?.$numberDecimal || product?.precio;
    const precioConDescuento = product?.descuento
        ? (precioOriginal - (precioOriginal * (product.descuento / 100))).toFixed(2)
        : null;

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

    const fetchUserCartUpdate = async (productId) => {
        const userId = userData._id;
        try {
            const response = await fetch(`http://localhost:3000/users/carrito/${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ compras: [productId] }),
            });

            if (response.ok) {
                const data = await response.json();
                setUserData(data); 
            } else {
                console.error('Error al actualizar el carrito del usuario');
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
        }
    };
    
    const fetchUserFavoriteUpdate = async (productId) => {
        const userId = userData._id;
        try {
            const response = await fetch(`http://localhost:3000/users/favorite/${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ favoritos: [productId] }),
            });

            if (response.ok) {
                const data = await response.json();
                setUserData(data); 
            } else {
                console.error('Error al actualizar el carrito del usuario');
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
        }
    };

    const handleAddToCart = () => {
        fetchUserCartUpdate(product._id);
    };

    const handleAddToFavorite = () => {
        fetchUserFavoriteUpdate(product._id);
    };

    return (
        <div className="relative">
            <div className="fixed top-0 left-0 z-10">
                <a href="/home" className="flex items-center">
                    <img src={leftSVG} alt="Left Arrow" className="h-20" />
                </a>
            </div>
            <div>
                {product ? (
                    <>
                        <div className="relative">
                            <img src={product.foto} alt={product.nombre} className="w-full h-80 object-fill" />
                            {product.descuento && (
                                <div
                                    className="absolute bottom-4 left-4 flex items-center text-white p-2"
                                    style={{
                                        backgroundImage: `url(${discountSvg})`,
                                        backgroundSize: '100%',
                                        backgroundRepeat: 'no-repeat',
                                        backgroundPosition: 'center',
                                        padding: '1rem',
                                        borderRadius: '0.5rem',
                                    }}
                                >
                                    <span className="text-lg font-bold">-{product.descuento}%</span>
                                </div>
                            )}
                        </div>
                        <div className='flex bg-neutral-700'>
                            <img src={triangleSVG} className='h-10' alt="Triángulo" />
                            <h1 className="text-2xl font-bold text-white p-1">{product.nombre}</h1>
                        </div>
                        <div className="flex p-4 gap-2 flex-col">
                            <p>
                                {precioConDescuento ? (
                                    <>
                                        <span className="text-black line-through mr-2">${precioOriginal}</span>
                                        <span className="text-black font-bold">${precioConDescuento}</span>
                                    </>
                                ) : (
                                    <span>${precioOriginal}</span>
                                )}
                            </p>
                            <div className='flex justify-between items-center'>
                            <p className='font-bold'>{product.nombreArtesano}</p>
                            <button  onClick={handleAddToFavorite}>
                                <img src={favoriteNoSVG} className='h-10 w-10 mr-10' alt="Carrito" />
                            </button>
                            </div>
                            <p><span className='font-bold'>Dimensiones</span>: {product.dimensiones}</p>
                            <p><span className='font-bold'>Descripción</span>: {product.descripcion}</p>
                            <p className="flex items-center gap-2 mt-2">
                                <img src={siSvg} className="w-5 h-5" alt="Envío" />
                                Cuenta con envío hacia tu ubicación
                            </p>
                        </div>
                        <div className='flex pl-4'>
                            <button className='flex items-center bg-zinc-300 px-2 py-1' onClick={handleAddToCart}>
                                <img src={cartBlackSVG} className='h-5 w-5' alt="Carrito" />
                                <p className='ml-2'>Añadir a mi carrito de compras</p>
                            </button>
                        </div>
                    </>
                ) : (
                    <p>No se encontró información del producto.</p>
                )}
            </div>
        </div>
    );
};

export default Product;
