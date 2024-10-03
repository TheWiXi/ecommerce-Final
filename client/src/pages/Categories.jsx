import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"; 
import Category from '../components/Category';
import leftSVG from '../../public/left-arrow.svg';

const Categories = () => {
    const navigate = useNavigate();
    const location = useLocation(); 
    const { category } = location.state || {}; 

    const [selectedCategory, setSelectedCategory] = useState(category || null); 
    const [products, setProducts] = useState([]);

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

    const handleCategoryClick = (index, category) => {
        setSelectedCategory(index);
        fetchProductsByCategory(category);
    };

    const fetchProductsByCategory = async (category) => {
        try {
            const response = await fetch('http://localhost:3000/products/searchCategory', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ categoria: category }),
            });
            const data = await response.json();
            setProducts(data); 
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        if (selectedCategory) {
            fetchProductsByCategory(selectedCategory);
        }
    }, [selectedCategory]);

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
                <div className="flex gap-x-2">
                    <div className="flex bg-grayUbi w-[100%] rounded gap-3 p-2">
                        <img src="/category/search.svg" alt="" className="w-4" />
                        <input type="text" placeholder="Buscar producto o palabra clave..." className="bg-transparent w-[100%] text-sm" />
                    </div>
                    <img src="/category/filter.svg" alt="" className="w-5" />
                </div>
                
                <div className="flex flex-wrap justify-between">
                    {products.length > 0 ? (
                        products.map((product, index) => (
                            <div key={index} className="w-[45%] rounded-lg overflow-hidden mt-4" onClick={() => navigate('/product', { state: { product } })}>
                                <div className="w-[100%]">
                                    <img src={product.foto} alt={product.nombre} className="w-[100%] min-h-[130px] max-h-[130px]"/>
                                </div>
                                <div className="bg-black text-white flex flex-col justify-between">
                                    <div className="m-2">
                                        <p className="font-bold text-md text-start ml-2 truncate">{product.nombre}</p>
                                        <p className="text-lg font-bold text-start ml-2">${product.precio?.$numberDecimal || product.precio}</p>
                                        <p className="text-sm text-start ml-2 truncate">{product.nombreArtesano}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No se encontraron productos para esta categoría.</p>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Categories;
