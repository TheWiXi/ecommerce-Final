import React from "react";

const Workshop = () => {
    return (
        <div>
            <section className="w-full relative flex flex-col items-center">
                <div className="w-full h-[210px]">
                    <img src="/test/imagen3.svg" alt="" className="w-[100%]" />
                </div>
                <div className="absolute top-0 bg-graySearch px-7 pt-2 pb-1 rounded-b-md">
                    <p className="text-xs text-white">Taller Awaq Ayllus</p>
                </div>
                <img src="/workshop/rectangle.svg" alt="" className="absolute top-0 left-0 w-7" />
                <img src="/workshop/arrow.svg" alt="" className="absolute top-5 left-1 w-4" />
                <div className="bg-graySearch flex justify-between py-2">
                    <img src="/workshop/rleft.svg" alt="" className="w-4" />
                    <p className="text-white text-center w-[77%] underline leading-tight text-sm">Conoce la historia detrás de este taller artesanal y conoce como producen sus textiles</p>
                    <img src="/workshop/rright.svg" alt="" className="w-4 " />
                </div>
            </section>
            <section className="flex flex-col gap-y-2">
                <div className=" w-full relative flex justify-center items-center py-5">
                    <p className="text-xs font-bold">Artesanías</p>
                    <img src="/category/rectangle.svg" alt="" className="absolute w-12 z-[-1]" />
                    <img src="/workshop/comment.svg" alt="" className="absolute right-2 w-8" />
                </div>
                <div className="mx-6">
                    <div className="flex gap-x-2">
                        <div className="flex bg-grayUbi w-[100%] rounded gap-3 p-2">
                            <img src="/category/search.svg" alt="" className="w-4" />
                            <input type="text" placeholder="Buscar producto o palabra clave..." className="bg-transparent w-[100%] text-sm" />
                        </div>
                        <img src="/category/filter.svg" alt="" className="w-5" />
                    </div>
                </div>
            </section>
            <section className="mx-6">
                <div className="flex flex-wrap justify-between my-4 items-center gap-y-4">
                    <div className="w-[45%] rounded-lg overflow-hidden ">
                        <div className="w-[100%] h-[130px]">
                            <img src="/test/imagen1.svg" alt="" className="w-[100%] h-full" />
                        </div>
                        <div className="bg-black text-white flex flex-col justify-between">
                            <div className="m-2">
                                <p className="font-bold text-sm text-start ml-2 truncate">Tapiz Chumpi Andino III</p>
                                <p className="text-sm text-start ml-2">$600</p>
                                <p className="text-sm text-start ml-2 truncate">Taller Awaq Ayllus</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-[45%] rounded-lg overflow-hidden ">
                        <div className="w-[100%] h-[130px]">
                            <img src="/test/imagen1.svg" alt="" className="w-[100%] h-full" />
                        </div>
                        <div className="bg-black text-white flex flex-col justify-between">
                            <div className="m-2">
                                <p className="font-bold text-sm text-start ml-2 truncate">Tapiz Chumpi Andino III</p>
                                <p className="text-sm text-start ml-2">$600</p>
                                <p className="text-sm text-start ml-2 truncate">Taller Awaq Ayllus</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-[45%] rounded-lg overflow-hidden ">
                        <div className="w-[100%] h-[130px]">
                            <img src="/test/imagen1.svg" alt="" className="w-[100%] h-full" />
                        </div>
                        <div className="bg-black text-white flex flex-col justify-between">
                            <div className="m-2">
                                <p className="font-bold text-sm text-start ml-2 truncate">Tapiz Chumpi Andino III</p>
                                <p className="text-sm text-start ml-2">$600</p>
                                <p className="text-sm text-start ml-2 truncate">Taller Awaq Ayllus</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-[45%] rounded-lg overflow-hidden ">
                        <div className="w-[100%] h-[130px]">
                            <img src="/test/imagen1.svg" alt="" className="w-[100%] h-full" />
                        </div>
                        <div className="bg-black text-white flex flex-col justify-between">
                            <div className="m-2">
                                <p className="font-bold text-sm text-start ml-2 truncate">Tapiz Chumpi Andino III</p>
                                <p className="text-sm text-start ml-2">$600</p>
                                <p className="text-sm text-start ml-2 truncate">Taller Awaq Ayllus</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-[45%] rounded-lg overflow-hidden ">
                        <div className="w-[100%] h-[130px]">
                            <img src="/test/imagen1.svg" alt="" className="w-[100%] h-full" />
                        </div>
                        <div className="bg-black text-white flex flex-col justify-between">
                            <div className="m-2">
                                <p className="font-bold text-sm text-start ml-2 truncate">Tapiz Chumpi Andino III</p>
                                <p className="text-sm text-start ml-2">$600</p>
                                <p className="text-sm text-start ml-2 truncate">Taller Awaq Ayllus</p>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
        </div>
    )
}

export default Workshop