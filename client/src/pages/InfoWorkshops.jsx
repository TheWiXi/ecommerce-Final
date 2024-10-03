import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const InfoWorkshops = () => {
    const location = useLocation();
    const tienda = location.state?.tienda; // Obtener información de la tienda
    const [workshopInfo, setWorkshopInfo] = useState(null); // Estado para almacenar la información del taller
    const [loading, setLoading] = useState(true); // Estado de carga

    useEffect(() => {
        const fetchWorkshopInfo = async () => {
            if (tienda?._id) {
                try {
                    const response = await fetch(`http://localhost:3000/workshops/searchForArtesano/${tienda._id}`);
                    const data = await response.json();

                    if (response.ok && data.length > 0) {
                        setWorkshopInfo(data[0]); // Almacenar la primera información del taller
                    } else {
                        console.error("Error fetching workshop info:", data);
                    }
                } catch (error) {
                    console.error("Error fetching workshop info:", error);
                } finally {
                    setLoading(false); // Cambiar estado de carga al finalizar
                }
            }
        };

        fetchWorkshopInfo();
    }, [tienda]);

    if (loading) {
        return <p>Loading...</p>; // Muestra un loading mientras se obtienen los datos
    }

    if (!workshopInfo) {
        return <section className="flex justify-center items-center flex-col w-full h-[100px]">
        <a href="/home"><img src="/left-arrow.svg" alt="" className="absolute top-0 left-0 w-10" /></a>
        <p className="ml-10">No hay mucha informacion sobre este usuario</p>
        </section>
    }

    return (
        <div className="">
            <section className="flex justify-center items-center flex-col w-full gap-y-4 relative py-9 border">
                <a href="/home"><img src="/left-arrow.svg" alt="" className="absolute top-0 left-0 w-10" /></a>
                <img src="/infoworkshops/rombos.svg" alt="" className="w-52 " />
                <p className="text-center text-xs w-[70%]">{workshopInfo.descripcion}</p>
                <img src="/infoworkshops/rombos.svg" alt="" className="w-52" />
            </section>
            <p className="font-bold text-sm mx-6">{`Taller de arte ${workshopInfo.nombre} - Documental`}</p>
            <section>
                <div className="flex justify-center items-center bg-grayUbi p-4">
                <iframe className="rounded-lg border w-full h-[200px]" src={workshopInfo.documental} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                </div>
            </section> 
            <section className="mx-6 flex flex-col justify-center items-center mt-4">
                <p className="self-start font-bold text-sm">Conoce más del taller de forma interactiva</p>
                <p className="self-start text-xs w-[75%] text-grayUbi">Escanea el código QR con tu celular y disfruta de la experiencia</p>
                <img src="/infoworkshops/qr.svg" alt="" className="w-24 mt-4"/>
            </section>
        </div>
    );
};

export default InfoWorkshops;
