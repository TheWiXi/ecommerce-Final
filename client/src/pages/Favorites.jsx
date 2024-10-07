import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import Category from "../components/Category";
import leftSVG from '../../public/left-arrow.svg';
import { useNavigate } from 'react-router-dom';


const Favorites = () => {
    const [selectedCategory, setSelectedCategory] = useState("Textileria");
    const [userData, setUserData] = useState(null);
    const [favoriteProducts, setFavoriteProducts] = useState([]);

    const navigate = useNavigate();

    const getCookieValue = (cookieName) => {
        const cookies = document.cookie.split("; ");
        const cookie = cookies.find((row) => row.startsWith(cookieName + "="));
        return cookie ? cookie.split("=")[1] : null;
    };

    useEffect(() => {
        const token = getCookieValue("token");

        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                const userEmail = decodedToken.correo;
                fetchUserData(userEmail);
            } catch (error) {
                console.error("Token inválido", error);
            }
        }
    }, []); 

    const fetchUserData = async (email) => {
        try {
            const response = await fetch("http://localhost:3000/users/verifyEmail", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ correo: email }),
            });

            if (response.ok) {
                const data = await response.json();
                setUserData(data);
                fetchFavoriteProducts(data.favoritos, selectedCategory);
            } else {
                console.error("Error al obtener los datos del usuario");
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
        }
    };

    const fetchFavoriteProducts = async (favoritos, category) => {
        if (!favoritos) return;
        try {
            const response = await fetch("http://localhost:3000/products/searchFavorite", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    categoria: category,
                    favoritos: favoritos,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setFavoriteProducts(data);
            } else {
                console.error("Error al obtener los productos favoritos");
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
        }
    };

    const handleCategoryClick = (index, category) => {
        setSelectedCategory(index);
        if (userData) {
            fetchFavoriteProducts(userData.favoritos, category);
        }
    };

    const handleDeleteFavorite = async (id) => {
        if (!userData) return;

        const compraData = {
            favoritos: [id],
        };

        try {
            const response = await fetch(`http://localhost:3000/users/deleteFavorite/${userData._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(compraData),
            });

            if (response.ok) {
                setFavoriteProducts(prevProductos => prevProductos.filter(producto => producto._id !== id));
            } else {
                console.error('Error al eliminar el producto del carrito');
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
        }
    };

    const categories = [
        { svgUrl: "/categorias/textileria.svg", text: "Textileria", className: "w-[70%]" },
        { svgUrl: "/categorias/ceramica.svg", text: "Ceramica", className: "w-[70%]" },
        { svgUrl: "/categorias/orfebreria.svg", text: "Orfebreria", className: "w-[70%]" },
        { svgUrl: "/categorias/tallaenpiedra.svg", text: "Piedra", className: "w-[70%]" },
        { svgUrl: "/categorias/tallamadera.svg", text: "Madera", className: "w-[50%]" },
        { svgUrl: "/categorias/bordado.svg", text: "Bordado", className: "w-[50%]" },
        { svgUrl: "/categorias/joyeria.svg", text: "Joyeria", className: "w-[50%]" },
        { svgUrl: "/categorias/hojalateria.svg", text: "Hojalateria", className: "w-[50%]" },
        { svgUrl: "/categorias/estampado.svg", text: "Estampado", className: "w-[50%]" },
        { svgUrl: "/categorias/pintura.svg", text: "Pintura", className: "w-[50%]" },
    ];

    return (
        <div>
            <section className="flex flex-col border-black border-b-2">
                <div className="flex relative items-center justify-center w-full py-5">
                    <div className="left absolute top-0 left-0">
                        <a href="/home" className="flex items-center">
                            <img src={leftSVG} alt="Left Arrow" className="w-10 h-19" />
                        </a>
                    </div>
                    <p className="font-bold">Categorías</p>
                    <img src="/category/rectangle.svg" alt="" className="w-14 absolute z-[-1]" />
                    <img src="/home/rectangle.svg" alt="" className="w-8 absolute left-0 z-[-1]" />
                </div>
                <div className="flex gap-x-6 items-start overflow-x-auto mx-4 mt-5">
                    {categories.map((category, index) => (
                        <div 
                            key={index}
                            onClick={() => handleCategoryClick(index, category.text)}
                            className={`cursor-pointer flex flex-col items-center ${selectedCategory === index ? 'border-b-4 border-black' : ''}`}
                        >
                            <Category svgUrl={category.svgUrl} text={category.text} className={category.className} />
                        </div>
                    ))}
                </div>
            </section>
            <section className="m-6">
                <div className="flex flex-wrap justify-between">
                    {favoriteProducts.map((product) => (
                        <div key={product._id} className="w-[45%] mt-4 relative" onClick={() => {navigate('/product', { state: { product: product } });}}>
                            <div className="rounded-t-lg border-x border-t">
                                <img src={product.foto} alt={product.nombre} />
                            </div>
                            <div className="bg-black text-xs p-2 overflow-hidden rounded-b-lg">
                                <p className="text-white truncate">{product.nombre}</p>
                                <p className="text-white">S/.{product.precio}</p>
                                <p className="text-white truncate">{product.descripcion}</p>
                            </div>
                            <img
                                src="/category/close.svg"
                                alt="Eliminar"
                                className="absolute -top-1 -right-2 w-4 cursor-pointer"
                                onClick={() => handleDeleteFavorite(product._id)}
                            />
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Favorites;
