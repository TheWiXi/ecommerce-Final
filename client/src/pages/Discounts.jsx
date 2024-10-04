import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import Header from "../components/Header";
import Footer from "../components/Footer";

const Discounts = () => {
    const [selectedCategory, setSelectedCategory] 
    = useState("Textileria")
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();  
    const categories = [
        "Textileria", "Ceramica", "Orfebreria", "Talla en piedra", "Talla en madera",
        "Bordado", "Joyeria", "Hojalateria", "Estampado", "Pintura tradicional"
    ];

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };

    const handleProductClick = (product) => {
        navigate("/product", { state: { product } });  
    };

    useEffect(() => {
        if (selectedCategory) {
            setLoading(true);
            fetch("http://localhost:3000/products/searchDiscounts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ categoria: selectedCategory.toLowerCase() }),
            })
                .then(response => response.json())
                .then(data => {
                    setProducts(data); 
                    setLoading(false);
                })
                .catch(err => {
                    console.error("Error fetching products:", err);
                    setLoading(false);
                });
        }
    }, [selectedCategory]);

    return (
        <div className="w-full min-h-[100vh]">
            <Header />
            <section>
                <div className="py-3 relative pl-6">
                    <p className="font-bold">Descuentos y promociones</p>
                    <p className="text-sm opacity-50">En cientos de artesanías</p>
                    <img src="/home/rectangle.svg" alt="" className="absolute w-5 left-0 top-1" />
                </div>
                <div className="flex bg-grayUbi overflow-auto border-b-2 border-black">
                    {categories.map((category) => (
                        <p
                            key={category}
                            onClick={() => handleCategoryClick(category)}
                            className={`text-xs font-bold py-2 px-4 cursor-pointer whitespace-nowrap ${selectedCategory === category ? 'bg-black text-white' : ''}`}
                        >
                            {category}
                        </p>
                    ))}
                </div>
            </section>

            <section className="mx-6 my-6 h-[80vh]">
                {loading ? (
                    <p>Cargando productos...</p>
                ) : (
                    <div className="flex flex-wrap justify-between gap-y-7">
                        {products.length > 0 ? (
                            products.map(product => (
                                <div
                                    key={product._id}
                                    className="w-[45%] relative cursor-pointer"
                                    onClick={() => handleProductClick(product)} 
                                >
                                    <div className="w-full h-[100px] rounded-t-md overflow-hidden">
                                        <img src={product.foto} alt={product.nombre} className="absolute w-full h-full z-[-1] rounded-t-md"/>
                                    </div>
                                    <div className="bg-black text-white text-xs py-1 px-1 truncate rounded-b-md">
                                        <p className="truncate">{product.nombre}</p>
                                        <p>S/.{product.precio}</p>
                                        <p className="truncate">{product.nombreArtesano}</p>
                                    </div>
                                    <img src="/discounts/dsc.svg" alt="descuento" className="absolute -top-6 -left-6 w-16 z-[-1]" />
                                    <p className="absolute -top-1 -left-2 text-white z-[3] text-sm transform rotate-[20deg]">-{product.descuento}%</p>
                                </div>
                            ))
                        ) : (
                            <p>No hay productos disponibles para esta categoría.</p>
                        )}
                    </div>
                )}
            </section>
            <Footer />
        </div>
    );
};

export default Discounts;
