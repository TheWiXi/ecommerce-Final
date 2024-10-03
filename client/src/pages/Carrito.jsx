import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode'; 
import Header from '../components/Header';
import Footer from '../components/Footer';
import triangleSVG from '../../public/triangle.svg';

const Carrito = () => {
    const [userData, setUserData] = useState(null);
    const [productos, setProductos] = useState([]);
    const [gastosEnvio] = useState(5.99);
    const navigate = useNavigate();

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
                            const producto = await response.json();
                            return { ...producto, cantidad: 1 };
                        } else {
                            console.error('Error al obtener producto con ID:', id);
                        }
                    })
                );
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

    const incrementarCantidad = (id) => {
        setProductos(prevProductos => 
            prevProductos.map(producto => 
                producto._id === id 
                    ? { ...producto, cantidad: producto.cantidad + 1 } 
                    : producto
            )
        );
    };

    const decrementarCantidad = (id) => {
        setProductos(prevProductos => 
            prevProductos.map(producto => 
                producto._id === id && producto.cantidad > 1 
                    ? { ...producto, cantidad: producto.cantidad - 1 } 
                    : producto
            )
        );
    };

    const calcularSubtotal = () => {
        return productos.reduce((total, producto) => {
            const precioConDescuento = producto.descuento
                ? producto.precio * (1 - producto.descuento / 100)
                : producto.precio;
            return total + precioConDescuento * producto.cantidad;
        }, 0);
    };

    const total = calcularSubtotal() + gastosEnvio;

    const realizarCompra = async () => {
        const userId = userData._id;
        const compraData = {
            userId,
            productos: productos.map(producto => ({
                id: producto._id,
                cantidad: producto.cantidad,
            })),
            total,
        };

        try {
            const response = await fetch(`http://localhost:3000/users/carrito/${userId}`, {
                method: 'PUT', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(compraData),
            });

            if (response.ok) {
                navigate('/home');
            } else {
                console.error('Error al realizar la compra');
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
        }
    };

    return (
        <div>
            <Header />
            <section className='mt-3 h-screen'>
                <div>
                    <div className='flex items-center'>
                        <img src={triangleSVG} className='h-10' alt="triangle" />
                        <p className='font-bold w-full'>Tu carrito de compras</p>
                    </div>
                    <p className='ml-5 text-[rgba(0,0,0,0.48)] text-sm'>
                        Revisa aquí los productos que añadiste a tu carrito
                    </p>
                    <div className="mt-5 h-[260px] overflow-y-auto scrollbar-none">
                        {productos.length > 0 ? (
                            productos.map((producto) => (
                                <div key={producto._id} className="flex border m-4 bg-zinc-300 rounded">
                                    <div className="min-w-[120px] max-w-[120px] m-2">
                                        <img src={producto.foto} alt={producto.nombre} className="shadow rounded" />
                                    </div>
                                    <div className="flex-grow">
                                        <h2 className="text-sm">{producto.nombre}</h2>
                                        <p className="text-sm">${producto.precio}</p>
                                        <p className="text-sm max-w-[120px] truncate">${producto.dimensiones}</p>
                                        {producto.descuento && <p>Descuento: {producto.descuento}%</p>}
                                        <div className="flex items-center mt-2 min-w-[100px]">
                                            <div className="flex items-center bg-neutral-700 text-white rounded">
                                                <button
                                                    className="px-2 py-1 bg-neutral-700 rounded text-base"
                                                    onClick={() => decrementarCantidad(producto._id)}
                                                >
                                                    -
                                                </button>
                                                <p className="mx-4 bg-neutral-700">{producto.cantidad}</p>
                                                <button
                                                    className="px-2 py-1 bg-neutral-700 rounded text-base"
                                                    onClick={() => incrementarCantidad(producto._id)}
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="flex justify-center">No tienes productos en el carrito.</p>
                        )}
                    </div>
                </div>
                <div className="flex items-center mt-5 justify-center">
                    <button className="p-1 bg-zinc-300 rounded">Añadir cupón de descuento</button>
                </div>
                <div className="p-5 bg-white rounded">
                    <div className="flex justify-between pl-2 pt-2 pr-2 bg-zinc-300 rounded-t-lg">
                        <p>Subtotal</p>
                        <p>${calcularSubtotal().toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between pl-2 pr-2 bg-zinc-300 rounded-b-lg">
                        <p>Gastos de envío</p>
                        <p>${gastosEnvio.toFixed(2)}</p>    
                    </div>
                    <div className="flex justify-between pl-2 pr-2 text-lg bg-zinc-300 mt-1 rounded">
                        <span className="font-bold"><p>Total</p></span>
                        <p>${total.toFixed(2)}</p>
                    </div>
                </div>
                <div className="flex justify-start  ml-5">
                    <button
                        onClick={realizarCompra}
                        className="p-2 bg-neutral-700 text-white rounded"
                    >
                        Realizar Compra
                    </button>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default Carrito;