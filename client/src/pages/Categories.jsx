import React, { useState } from "react";
import Category from '../components/Category';

const Categories = () => {
    // Estado para mantener la categoría seleccionada
    const [selectedCategory, setSelectedCategory] = useState(null);

    // Arreglo de categorías
    const categories = [
        { svgUrl: "/categorias/textileria.svg", text: "Textileria", className: "w-[70%]" },
        { svgUrl: "/categorias/ceramica.svg", text: "Ceramica", className: "w-[70%]" },
        { svgUrl: "/categorias/orfebreria.svg", text: "Orfebreria", className: "w-[70%]" },
        { svgUrl: "/categorias/tallaenpiedra.svg", text: "Piedra", className: "w-[70%]" },
        { svgUrl: "/categorias/tallamadera.svg", text: "Madera" , className: "w-[50%]"},
        { svgUrl: "/categorias/bordado.svg", text: "Bordado" , className: "w-[50%]"},
        { svgUrl: "/categorias/joyeria.svg", text: "Joyeria" , className: "w-[50%]"},
        { svgUrl: "/categorias/hojalateria.svg", text: "Hojalateria" , className: "w-[50%]"},
        { svgUrl: "/categorias/estampado.svg", text: "Estampado" , className: "w-[50%]"},
        { svgUrl: "/categorias/pintura.svg", text: "Pintura" , className: "w-[50%]"},
    ];

    // Manejar el clic en una categoría
    const handleCategoryClick = (index) => {
        setSelectedCategory(index);
    };

    return (
        <div>
            <section className="flex flex-col border-black border-b-2">
                <div className="flex relative items-center justify-center w-full py-5">
                    <img src="/category/back.svg" alt="svg" className="w-4 absolute left-1" />
                    <p className="font-bold">Categorías</p>
                    <img src="/category/rectangle.svg" alt="" className="w-14 absolute z-[-1]" />
                    <img src="/home/rectangle.svg" alt="" className="w-8 absolute left-0 z-[-1]" />
                </div>
                <div className="flex gap-x-6 items-start overflow-x-scroll mx-4">
                    {categories.map((category, index) => (
                        <div 
                            key={index}
                            onClick={() => handleCategoryClick(index)}
                            className={`cursor-pointer flex flex-col items-center ${selectedCategory === index ? 'border-b-4 border-black' : ''}`}
                        >
                            <Category svgUrl={category.svgUrl} text={category.text} className={category.className}/>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default Categories;
