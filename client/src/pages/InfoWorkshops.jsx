import React from "react";

const InfoWorkshops = () => {
    return (
        <div className="">
            <section className="flex justify-center items-center flex-col w-full gap-y-4 relative py-9 border">
                <img src="/left-arrow.svg" alt="" className="absolute top-0 left-0 w-10" />
                <img src="/infoworkshops/rombos.svg" alt="" className="w-52 " />
                <p className="text-center text-xs w-[70%]">El Taller de Arte Awaq Ayllus reúne a más de 60 tejedores y tejedoras ayacuchanos que producen tapices murales y delicadas piezas bordadas para diversos usos decorativos y utilitarios.</p>
                <img src="/infoworkshops/rombos.svg" alt="" className="w-52" />
            </section>
            <p className="font-bold text-sm mx-6">Taller de arte Awaq Ayllus - Documental</p>
            <section>
                <div className="flex justify-center items-center bg-grayUbi p-4">
                    <iframe className="rounded-lg border w-full h-[200px]" src="https://www.youtube.com/embed/D3qgoQQQJYs?si=GMetSeq85LJeeFIc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                </div>
            </section> 
            <section className="mx-6 flex flex-col justify-center items-center mt-4">
                <p className="self-start font-bold text-sm">Conoce más del taller de forma interactiva</p>
                <p className="self-start text-xs w-[75%] text-grayUbi">Escanea el código QR con tu celular y disfruta de la experiencia</p>
                <img src="/infoworkshops/qr.svg" alt="" className="w-24 mt-4"/>
            </section>
        </div>
    )
}

export default InfoWorkshops;