import React, { useState, useEffect } from "react";
import leftSVG from '../../public/left-arrow.svg';
import { useNavigate } from "react-router-dom";

const Workshops = () => {
    const [workshops, setWorkshops] = useState([]);
    const navigate = useNavigate(); 

    useEffect(() => {
        fetch('http://localhost:3000/workshops/getWorkshopWithArtesanoName')
            .then(response => response.json())
            .then(data => setWorkshops(data))
            .catch(error => console.error('Error fetching workshops:', error));
    }, []);

    const handleWorkshopClick = (workshop) => {
        navigate('/Register_workshop', { state: { workshop } });
    };

    return (
        <div className="flex flex-col gap-y-6">
            <section className="flex flex-col gap-y-2">
                <div className="flex relative items-center justify-center w-full py-5">
                    <div className="left absolute top-0 left-0">
                        <a href="/home" className="flex items-center">
                            <img src={leftSVG} alt="Left Arrow" className="w-10 h-19" />
                        </a>
                    </div>
                    <p className="font-bold w-20 text-center">Talleres Educativos</p>
                    <img src="/category/rectangle.svg" alt="" className="w-14 absolute z-[-1]" />
                </div>
                <div className="px-8">
                    <div className="flex bg-grayUbi w-[100%] rounded gap-3 p-2">
                        <img src="/category/search.svg" alt="" className="w-4" />
                        <input type="text" placeholder="Buscar producto o palabra clave..." className="bg-transparent w-[100%] text-sm" />
                    </div>
                </div>
            </section>
            <section className="mx-4 flex flex-col gap-y-4">
                {workshops.length > 0 ? (
                    workshops.map((workshop) => (
                        <div key={workshop._id} className="flex w-[100%] bg-grayUbi rounded-lg">
                            <div className="w-48 border-black border rounded-lg overflow-hidden">
                                <img src={workshop.imagen} alt={workshop.nombre} className="w-[100%] min-h-[120px] max-h-[120px]" />
                            </div>
                            <div className="flex flex-col w-[100%] gap-y-3 m-2">
                                <div className="flex items-start flex-col">
                                    <p className="text-sm font-bold leading-none">{workshop.nombre}</p>
                                    <p className="text-sm underline leading-none">Para el público: {workshop.publico}</p>
                                    <p className="text-sm font-bold leading-none">Artesano: {workshop.artesanoNombre}</p>
                                </div>
                                <div className="items-start bg-graySearch rounded px-2 py-1">
                                    <button 
                                        onClick={() => handleWorkshopClick(workshop)}
                                        className="text-xs text-white underline"
                                    >
                                        Entérate más sobre el taller aquí
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Cargando talleres...</p>
                )}
            </section>
        </div>
    );
}

export default Workshops;
