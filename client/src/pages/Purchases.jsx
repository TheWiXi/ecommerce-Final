import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const Purchases = () => {
    const [userData, setUserData] = useState(null);
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const [produt, setProduct] = useState([]);
    
    const getCookieValue = (cookieName) => {
        const cookies = document.cookie.split('; ');
        const cookie = cookies.find(row => row.startsWith(cookieName + '='));
        return cookie ? cookie.split('=')[1] : null;
    };

    const fetchOrders = async (userId) => {
        try {
            const response = await fetch(`http://localhost:3000/orders/searchUser/${userId}`);
            if (response.ok) {
                const ordersData = await response.json();
                setOrders(ordersData);
                const productIds = ordersData.flatMap(order => order.productos.map(product => product.productoId));
                fetchProducts(productIds);
            } else {
                console.error('Error al obtener las órdenes del usuario');
            }
        } catch (error) {
            console.error('Error en la solicitud de órdenes:', error);
        }
    };

    const fetchProducts = async (productIds) => {
        try {
            const productsData = await Promise.all(productIds.map(async (id) => {
                const response = await fetch(`http://localhost:3000/products/searchById/${id}`);
                return response.ok ? response.json() : null;
            }));
            setProducts(productsData.filter(product => product !== null));
        } catch (error) {
            console.error('Error al obtener los productos:', error);
        }
    };

    const fetchAllProducts = async () => {
        try {
            const response = await fetch('http://localhost:3000/products/searchAll');
            if (response.ok) {
                const allProductsData = await response.json();
                setProduct(allProductsData);
            } else {
                console.error('Error al obtener los productos');
            }
        } catch (error) {
            console.error('Error en la solicitud de productos:', error);
        }
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

    useEffect(() => {
        if (userData) {
            fetchOrders(userData._id);
        }
    }, [userData]);

    useEffect(() => {
        fetchAllProducts();
    }, []);

    return (
        <div>
            <section>
                <div className="flex relative items-center justify-center w-full py-5">
                    <a href="/home"><img src="/category/back.svg" alt="svg" className="w-4 absolute left-1 top-9" /></a>
                    <p className="font-bold w-[120px] text-center">Compras realizadas</p>
                    <img src="/category/rectangle.svg" alt="" className="w-16 absolute z-[-1]" />
                    <img src="/home/rectangle.svg" alt="" className="w-8 absolute left-0 z-[-1]" />
                </div>
            </section>
            <section className="mx-6 flex flex-col gap-y-3">
                {orders.map(order => (
                    order.productos.map(product => {
                        const productData = products.find(p => p._id === product.productoId);
                        return (
                            <div key={order._id} className="bg-grayUbi flex p-3 pr-1 rounded-lg justify-between">
                                <div className="w-[100px] h-[100px] rounded-md overflow-hidden">
                                    <img src={productData?.foto || '/test/imagen7.svg'} alt="" className="w-full h-full object-cover" />
                                </div>
                                <div className="leading text-xxs w-[50%] flex flex-col justify-between">
                                    <div className="flex flex-col">
                                        <p className="font-bold truncate">{productData?.nombre || 'Producto desconocido'}</p>
                                        <p>S/.{productData?.precio || 0}</p>
                                        <p>{productData?.dimensiones || 'Sin dimensiones'}</p>
                                    </div>
                                    <button className="bg-graySearch text-white underline py-1 rounded">Ver seguimiento del producto</button>
                                </div>
                                <img src="/workshop/comment.svg" alt="" className="w-9 self-start" />
                            </div>
                        );
                    })
                ))}
            </section>
            <section className="m-6">
                <p className="font-bold text-lg">Sigue viendo más artesanías</p>
                <div className="flex flex-wrap justify-between">
                    {produt.slice(0, 4).map(product => ( // Muestra solo 4 productos
                        <Link to="/product" state={{ product }} key={product._id} className="w-[45%] mt-4">
                            <div className="rounded-t-lg border-x border-t">
                                <img src={product.foto} alt="" />
                            </div>
                            <div className="bg-black text-xs p-2 overflow-hidden rounded-b-lg">
                                <p className="text-white truncate">{product.nombre}</p>
                                <p className="text-white">S/.{product.precio}</p>
                                <p className="text-white truncate">{product.taller}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Purchases;
