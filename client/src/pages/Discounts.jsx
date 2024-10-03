import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Discounts = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);

    const categories = [
        "Textileria",
        "Ceramica",
        "Orfebreria",
        "Talla en piedra",
        "Talla en madera",
        "Bordado",
        "Joyeria",
        "Hojalateria",
        "Estampado",
        "Pintura tradicional"
    ];

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };

    return (
        <div>
            <Header />
            <section className="">
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
                            className={`text-xs font-bold py-2 px-4 cursor-pointer whitespace-nowrap ${selectedCategory === category ? 'bg-black text-white' : ''
                                }`}
                        >
                            {category}
                        </p>
                    ))}
                </div>
            </section>
            <section className="mx-6 my-6">
                <div className="flex flex-wrap justify-between gap-y-7">
                    <div className="w-[45%] relative">
                        <div className="w-full h-[100px] rounded-t-md overflow-hidden border-t border-x">
                            <img src="/test/imagen6.svg" alt="" className="w-full h-full"/>
                        </div>
                        <div className="bg-black text-white text-xs py-1 px-1 truncate rounded-b-md">
                            <p className="truncate">Chalina Beige con flecos</p>
                            <p>S/.100 S/.65</p>
                            <p className="truncate">Asoc. de artesanos Tinkuy</p>
                        </div>
                        <img src="/discounts/dsc.svg" alt="" className="absolute -top-6 -left-6 w-16 z-[10]" />
                        <p className="absolute -top-1 -left-2 text-white z-[20] text-sm transform rotate-[20deg]">-35%</p>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default Discounts;