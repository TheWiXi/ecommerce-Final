import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Workshop = () => {
    const location = useLocation();
    const tienda = location.state?.tienda;
    const [products, setProductos] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (tienda?._id) {
            fetch(`http://localhost:3000/products/${tienda._id}`)
                .then((response) => response.json())
                .then((data) => {
                    if (data.length > 0 && data[0].productos) {
                        setProductos(data[0].productos);
                    }
                })
                .catch((error) => console.error("Error fetching products:", error));
        }
    }, [tienda]);

    const handleTiendaClick = (tienda) => {
        navigate('/infoworkshops', { state: { tienda } });
    };

    return (
        <div>
            <section className="w-full relative flex flex-col items-center">
                <div className="w-full max-h-[210px]">
                    <img src={tienda?.fotoPerfil} alt={tienda?.nombre} className="w-[100%] h-[200px] object-cover" />
                </div>
                <div className="absolute top-0 bg-graySearch px-7 pt-2 pb-1 rounded-b-md">
                    <p className="text-xs text-white">{tienda?.nombre}</p>
                </div>
                <img src="/workshop/rectangle.svg" alt="" className="absolute top-0 left-0 w-7" />
                <a href="/Tiendas">
                    <img src="/workshop/arrow.svg" alt="" className="absolute top-5 left-1 w-4" />
                </a>
                <div className="bg-graySearch flex justify-between py-2" onClick={() => handleTiendaClick(tienda)}>
                    <img src="/workshop/rleft.svg" alt="" className="w-4" />
                    <p className="text-white text-center w-[77%] underline leading-tight text-sm">Conoce la historia detrás de este taller artesanal y cómo producen sus textiles</p>
                    <img src="/workshop/rright.svg" alt="" className="w-4" />
                </div>
            </section>

            {/* Sección de búsqueda de productos */}
            <section className="flex flex-col gap-y-2">
                <div className="w-full relative flex justify-center items-center py-5">
                    <p className="text-xs font-bold">Artesanías</p>
                    <img src="/category/rectangle.svg" alt="" className="absolute w-12 z-[-1]" />
                    <img src="/workshop/comment.svg" alt="" className="absolute right-2 w-8" />
                </div>
                <div className="mx-6">
                    <div className="flex gap-x-2">
                        <div className="flex bg-grayUbi w-[100%] rounded gap-3 p-2">
                            <img src="/category/search.svg" alt="" className="w-4" />
                            <input type="text" placeholder="Buscar producto o palabra clave..." className="bg-transparent w-[100%] text-sm" />
                        </div>
                        <img src="/category/filter.svg" alt="" className="w-5" />
                    </div>
                </div>
            </section>

            {/* Sección de productos */}
            <section className="mx-6">
                <div className="flex flex-wrap justify-between my-4 items-center gap-y-4">
                    {products.length > 0 ? (
                        products.map((product, index) => (
                            <div key={index} className="w-[45%] rounded-lg overflow-hidden"onClick={() => navigate('/product', { state: { product } })}>
                                <div className="w-[100%] h-[130px]">
                                    <img src={product.foto} alt={product.nombre} className="w-[100%] h-full object-cover" />
                                </div>
                                <div className="bg-black text-white flex flex-col justify-between">
                                    <div className="m-2">
                                        <p className="font-bold text-sm text-start ml-2 truncate">{product.nombre}</p>
                                        <p className="text-sm text-start ml-2">${product.precio}</p>
                                        <p className="text-sm text-start ml-2 truncate">{product.descripcion}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500 w-full">No se encontraron productos</p>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Workshop;
