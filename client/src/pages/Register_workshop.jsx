import React from "react";

const Register_workshop = () => {
    return (
        <div>
            <section className="w-full relative flex flex-col items-center">
                <div className="w-full h-[260px]">
                    <img src="/test/imagen5.svg" alt="" className="w-full h-full object-cover" />
                </div>
                <img src="/workshop/rectangle.svg" alt="" className="absolute top-0 left-0 w-8" />
                <img src="/workshop/arrow.svg" alt="" className="absolute top-6 left-1 w-4" />
                <div className="flex justify-start w-full items-center bg-graySearch gap-x-2 py-1">
                    <img src="/workshop/rleft.svg" alt="" className="w-4" />
                    <p className="text-white text-lg">Taller de cerámica artesanal</p>
                </div>
            </section>
            <section className="mx-6 mt-4 mb-0 flex flex-col gap-y-3">
                <p className="text-[0.8125rem] leading-[1.2]">En este taller dado por los artesanos de <span className="font-bold">Cerámicas Tater Vera</span> aprenderán a usar la arcilla para crear cosas para el hogar con diseños típicos ayacuchanos.</p>
                <div className="flex flex-col gap-y-1">
                    <p className="font-bold">Para el público en general</p>
                    <p className="leading-none text-[0.8125rem] opacity-50">*los niños menores de 8 años se recomienda que estén acompañados de un adulto</p>
                </div>
                <div className=" flex flex-col ">
                    <p><span className="font-bold">Duración:</span> 2 meses</p>
                    <p><span className="font-bold">Fecha de inicio:</span> 8 de Julio</p>
                    <p><span className="font-bold">Horario:</span> 4 a 6 PM cada sábado</p>
                    <p><span className="font-bold">Materiales:</span> Materiales dados en clase</p>
                    <p><span className="font-bold">Modalidad:</span> Presencial</p>
                    <p><span className="font-bold">Lugar:</span> En el Ministerio de Cultura, Lima, Perú</p>
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