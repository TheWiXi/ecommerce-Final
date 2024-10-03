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
            <section className="mx-6">
                <div className="bg-grayUbi flex p-4 pr-1 rounded-lg justify-between">
                    <div className="w-[100px] h-[100px] rounded-md overflow-hidden">
                        <img src="/test/imagen7.svg" alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="leading text-xs w-[50%] border">
                        <p className="font-bold truncate">Vasija pequeña con diseño de flor</p>
                        <p>S/.50</p>
                        <p>13x10 cm, 2 KG</p>
                        <p className="truncate">Asoc. de artesanos productores de Chazuta</p>
                        <button className="">Ver seguimiento del producto</button>
                    </div>
                    <img src="/workshop/comment.svg" alt="" className="w-9 self-start" />
                </div>
            </section>
        </div>
    )
}

export default Purchases;