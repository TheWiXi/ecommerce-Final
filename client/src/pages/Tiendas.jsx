import React from "react";
import Header from '../components/Header';
import Footer from '../components/Footer';

const Tiendas = () => {
    const artworks = [
        { title: "Arte Abedail Aller Escalante", location: "Cusco", imageSrc: "/public/tiendas/instance.png" },
        { title: "Asoc. de artesanos Tinkuy", location: "Huánuco", imageSrc: "/public/tiendas/instance.png" },
        { title: "Retablos Jesús Urbano", location: "Ayacucho", imageSrc: "/public/tiendas/instance.png" },
        { title: "Taller Awaq Ayllus", location: "Ayacucho", imageSrc: "/public/tiendas/instance.png" },
        { title: "Retablos Jesús Urbano", location: "Ayacucho", imageSrc: "/public/tiendas/instance.png" },
        { title: "Taller Awaq Ayllus", location: "Ayacucho", imageSrc: "/public/tiendas/instance.png" },      
    ];

    return (
        <>
            <Header />
            <div className="w-[100vw]">
            <div className="flex items-center justify-between mx-auto w-full mt-4 mb-6">
                    <img src="/public/tiendas/Rectangle 35.png" alt="Ícono" className='mr-2 w-9 h-12' />
                    <div className="flex flex-col flex-grow px-4">
                        <p className="font-semibold">Talleres y tiendas artesanales</p>
                        <p className="text-sm text-[#A3A3A3]">Tiendas de artesanías de Santander Colombia</p>
                    </div>
                    <img src="/public/tiendas/graph.svg" alt="Ícono" className='ml-2 mr-3 w-9 h-10' />

                </div>
                </div>
            <div className='w-full px-4'>
    
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {artworks.map((artwork, index) => (
                        <div key={index} className="w-40 mb-4">
                            <div className="bg-black text-white p-2 rounded-t-lg h-15">
                                <p className="text-xs font-bold">{artwork.title}</p>
                                <h2 className="text-xs">{artwork.location}</h2>
                            </div>
                            <div className="h-25 overflow-hidden rounded-b-lg">
                                <img src={artwork.imageSrc} alt={artwork.title} className="w-full h-full object-cover" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Tiendas;

