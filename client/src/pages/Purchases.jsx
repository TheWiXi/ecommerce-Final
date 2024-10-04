import React from "react";

const Purchases = () => {
    return (
        <div>
            <section>
                <div className="flex relative items-center justify-center w-full py-5">
                    <img src="/category/back.svg" alt="svg" className="w-4 absolute left-1" />
                    <p className="font-bold w-[120px] text-center">Compras realizadas</p>
                    <img src="/category/rectangle.svg" alt="" className="w-16 absolute z-[-1]" />
                    <img src="/home/rectangle.svg" alt="" className="w-8 absolute left-0 z-[-1]" />
                </div>
            </section>
            <section className="mx-6 flex flex-col gap-y-3">
                <div className="bg-grayUbi flex p-3 pr-1 rounded-lg justify-between">
                    <div className="w-[100px] h-[100px] rounded-md overflow-hidden">
                        <img src="/test/imagen7.svg" alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="leading text-xxs w-[50%] flex flex-col justify-between">
                        <div className="flex flex-col">
                            <p className="font-bold truncate">Vasija pequeña con diseño de flor</p>
                            <p>S/.50</p>
                            <p>13x10 cm, 2 KG</p>
                            <p className="truncate">Asoc. de artesanos productores de Chazuta</p>
                        </div>

                        <button className=" bg-graySearch text-white underline py-1 rounded">Ver seguimiento del producto</button>
                    </div>
                    <img src="/workshop/comment.svg" alt="" className="w-9 self-start" />
                </div>
                <div className="bg-grayUbi flex p-3 pr-1 rounded-lg justify-between">
                    <div className="w-[100px] h-[100px] rounded-md overflow-hidden">
                        <img src="/test/imagen7.svg" alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="leading text-xxs w-[50%] flex flex-col justify-between">
                        <div className="flex flex-col">
                            <p className="font-bold truncate">Vasija pequeña con diseño de flor</p>
                            <p>S/.50</p>
                            <p>13x10 cm, 2 KG</p>
                            <p className="truncate">Asoc. de artesanos productores de Chazuta</p>
                        </div>

                        <button className=" bg-graySearch text-white underline py-1 rounded">Ver seguimiento del producto</button>
                    </div>
                    <img src="/workshop/comment.svg" alt="" className="w-9 self-start" />
                </div>
            </section>
            <section className="m-6">
                <p className="font-bold text-lg">Sigue viendo más artesanías</p>
                <div className="flex flex-wrap justify-between">
                    <div className="w-[45%]  mt-4 ">
                        <div className="rounded-t-lg border-x border-t">
                            <img src="/test/imagen1.svg" alt="" />
                        </div>
                        <div className="bg-black text-xs p-2 overflow-hidden rounded-b-lg">
                            <p className="text-white truncate">Tapiz Chumpi Andino III</p>
                            <p className="text-white">S/.600</p>
                            <p className="text-white truncate">Taller Awaq Ayllus</p>
                        </div>
                    </div>
                    <div className="w-[45%]  mt-4 ">
                        <div className="rounded-t-lg border-x border-t">
                            <img src="/test/imagen1.svg" alt="" />
                        </div>
                        <div className="bg-black text-xs p-2 overflow-hidden rounded-b-lg">
                            <p className="text-white truncate">Tapiz Chumpi Andino III</p>
                            <p className="text-white">S/.600</p>
                            <p className="text-white truncate">Taller Awaq Ayllus</p>
                        </div>
                    </div>
                    <div className="w-[45%]  mt-4 ">
                        <div className="rounded-t-lg border-x border-t">
                            <img src="/test/imagen1.svg" alt="" />
                        </div>
                        <div className="bg-black text-xs p-2 overflow-hidden rounded-b-lg">
                            <p className="text-white truncate">Tapiz Chumpi Andino III</p>
                            <p className="text-white">S/.600</p>
                            <p className="text-white truncate">Taller Awaq Ayllus</p>
                        </div>
                    </div>
                    <div className="w-[45%]  mt-4 ">
                        <div className="rounded-t-lg border-x border-t">
                            <img src="/test/imagen1.svg" alt="" />
                        </div>
                        <div className="bg-black text-xs p-2 overflow-hidden rounded-b-lg">
                            <p className="text-white truncate">Tapiz Chumpi Andino III</p>
                            <p className="text-white">S/.600</p>
                            <p className="text-white truncate">Taller Awaq Ayllus</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Purchases;