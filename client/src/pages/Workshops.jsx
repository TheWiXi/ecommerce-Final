import React, { useState } from "react";
import Category from '../components/Category';
import leftSVG from '../../public/left-arrow.svg'
const Workshops = () => {

    return (
        <div className="flex flex-col gap-y-6">
            <section className="flex flex-col gap-y-2">
                <div className="flex relative items-center justify-center w-full py-5">
                    <div class="left fixed top-0 left-0">
                        <a href="/home" class="flex items-center">
                            <img src={leftSVG} alt="Left Arrow" class="w-10 h-19" />
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
            <section className="mx-4">
                <div className="flex w-[100%] bg-grayUbi">
                    <div className="w-48 border-black border rounded-lg overflow-hidden ">
                        <img src="/test/imagen2.svg" alt="" className="w-[100%] min-h-[120px] max-h-[120%]" />
                    </div>
                    <div className=" flex  justify-center items-center flex-col w-[100%]">
                        <div>
                            <p className="text-xs font-bold">Taller de bordado ayacuchano</p>
                            <p className="text-xs underline">Para el público en general</p>
                            <p className="text-xs">Taller dado por los artesanos de</p>
                            <p className="text-xs font-bold">Taller Awaq Ayllus</p>
                        </div>
                        <div className="border items-start">
                            <p className="text-xxs">Entérate más sobre el taller aquí</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Workshops;
