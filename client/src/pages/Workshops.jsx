import React, { useState } from "react";
import Category from '../components/Category';

const Workshops = () => {

    return (
        <div className="flex flex-col gap-y-6">
            <section className="flex flex-col gap-y-2">
                <div className="flex relative items-center justify-center w-full py-5">
                    <img src="/category/back.svg" alt="svg" className="w-4 absolute left-1" />
                    <p className="font-bold w-20 text-center border">Talleres Educativos</p>
                    <img src="/category/rectangle.svg" alt="" className="w-14 absolute z-[-1]" />
                    <img src="/home/rectangle.svg" alt="" className="w-8 absolute left-0 z-[-1]" />
                </div>
                <div className="px-8">
                    <div className="flex bg-grayUbi w-[100%] rounded gap-3 p-2">
                        <img src="/category/search.svg" alt="" className="w-4" />
                        <input type="text" placeholder="Buscar producto o palabra clave..." className="bg-transparent w-[100%] text-sm" />
                    </div>
                </div>
            </section>
            <section className="mx-4">
                <div className="flex ">
                    <div className="w-36">
                        <img src="/test/imagen2.svg" alt="" className="w-[100%]"/>
                    </div>
                    <div className="bg-grayUbi flex  justify-center flex-col">
                        <p className="text-sm">Taller de bordado ayacuchano</p>
                        <p className="text-sm">Para el público en general</p>
                        <p className="text-sm">Taller dado por los artesanos de</p>
                        <p className="text-sm">Taller Awaq Ayllus</p>
                        <div>
                            <p className="text-xs">Entérate más sobre el taller aquí</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Workshops;
