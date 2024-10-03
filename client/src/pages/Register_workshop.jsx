import React from "react";
import { useLocation } from "react-router-dom";

const Register_workshop = () => {
    const location = useLocation();
    const workshop = location.state?.workshop;
    console.log(workshop)
    return (
        <div>
            <section className="w-full relative flex flex-col items-center">
                <div className="w-full h-[260px]">
                    <img src={workshop?.imagen} alt="" className="w-full h-full object-cover" />
                </div>
                <a href="/workshops"><img src="/workshop/rectangle.svg" alt="" className="absolute top-0 left-0 w-8" /></a>
                <a href="/workshops"><img src="/workshop/arrow.svg" alt="" className="absolute top-6 left-1 w-4" /></a>
                <div className="flex justify-start w-full items-center bg-graySearch gap-x-2 py-1">
                    <img src="/workshop/rleft.svg" alt="" className="w-4" />
                    <p className="text-white text-lg">{workshop?.nombre} </p>
                </div>
            </section>
            <section className="mx-6 mt-4 mb-0 flex flex-col gap-y-3">
                <p className="text-[0.8125rem] leading-[1.2]">{workshop?.descripcion} </p>
                <div className="flex flex-col gap-y-1">
                    <p className="font-bold">Para {workshop?.publico} </p>
                    <p className="leading-none text-[0.8125rem] opacity-50">*los niños menores de 8 años se recomienda que estén acompañados de un adulto</p>
                </div>
                <div className=" flex flex-col ">
                    <p><span className="font-bold">Duración:</span> {workshop?.duracion} </p>
                    <p><span className="font-bold">Fecha de inicio:</span>{workshop?.fechaInicio} </p>
                    <p><span className="font-bold">Materiales:</span> {workshop?.materialesProporcionados} </p>
                    <p><span className="font-bold">Modalidad:</span>{workshop?.modalidad} </p>
                </div>
                <div className="flex items-center gap-x-3 mt-3">
                    <div className="flex bg-grayUbi p-2 gap-x-2 rounded-md">
                        <img src="/register_workshop/book.svg" alt="" className="w-5"/>
                        <p className="font-bold">Inscribirse al taller</p>
                    </div>
                    <p className="text-[0.8125rem] opacity-50">*Cupos limitados</p>
                </div>
            </section>
        </div>
    )
}

export default Register_workshop;