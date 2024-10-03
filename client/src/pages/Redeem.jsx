import React from "react";

const Redeem = () => {
    return (
        <div>
            <section>
                <div className="flex relative items-center justify-center w-full py-5">
                    <div class="left absolute top-0 left-0">
                        <a href="/home" class="flex items-center">
                            <img src='/left-arrow.svg' alt="Left Arrow" class="w-10" />
                        </a>
                    </div>
                    <p className="font-bold w-20 text-center">Canjear Cupon</p>
                    <img src="/category/rectangle.svg" alt="" className="w-14 absolute z-[-1]" />
                </div>
            </section>
            <section className="mx-6 flex flex-col gap-y-6 mt-5">
                <p className="font-bold">¿Cuentas con algún cupón de descuento? Canjealo aquí</p>
                <div className="flex bg-grayUbi justify-between gap-x-3 py-2 px-3 rounded-md">
                    <img src="/redeem/discount.svg" alt="" className="w-6" />
                    <input type="text" placeholder="Ingresa tu cupón" className="bg-transparent w-[100%] text-sm" />
                    <button className="bg-graySearch text-white text-sm py-1 px-2 rounded">Validar</button>
                </div>
                <div className="mt-4">
                    <p className="font-bold">Cupones vigentes</p>
                    <p className="text-xs opacity-50">*Usar antes de la fecha de vencimiento</p>
                </div>
            </section>
            <section className="mx-6 my-4">
                <div className="flex flex-col gap-y-4">
                    <div className="flex bg-grayUbi rounded-md overflow-hidden">
                        <div className=" w-[250px] h-[110px] overflow-hidden">
                            <img src="/test/imagen4.svg" alt="" className="w-full h-full object-cover"/>
                        </div>
                        <div className="flex flex-col m-2 ">
                            <div className="flex flex-col gap-y-2">
                                <p className="text-sm leading-none">50% de descuento en cartucheras del <span className="font-bold">Taller Awaq Ayllus</span></p>
                                <p className="text-sm"><span className="font-bold">Fecha de vencimiento:</span> 4/9/23</p>
                            </div>
                            <button className="text-xs self-start text-white bg-graySearch py-1 px-2 rounded-md">Usar cupón</button>
                        </div>
                    </div>
                    <div className="flex bg-grayUbi rounded-md overflow-hidden">
                        <div className=" w-[250px] h-[110px] overflow-hidden">
                            <img src="/test/imagen4.svg" alt="" className="w-full h-full object-cover"/>
                        </div>
                        <div className="flex flex-col m-2 ">
                            <div className="flex flex-col gap-y-2">
                                <p className="text-sm leading-none">50% de descuento en cartucheras del <span className="font-bold">Taller Awaq Ayllus</span></p>
                                <p className="text-sm"><span className="font-bold">Fecha de vencimiento:</span> 4/9/23</p>
                            </div>
                            <button className="text-xs self-start text-white bg-graySearch py-1 px-2 rounded-md">Usar cupón</button>
                        </div>
                    </div>
                    <div className="flex bg-grayUbi rounded-md overflow-hidden">
                        <div className=" w-[250px] h-[110px] overflow-hidden">
                            <img src="/test/imagen4.svg" alt="" className="w-full h-full object-cover"/>
                        </div>
                        <div className="flex flex-col m-2 ">
                            <div className="flex flex-col gap-y-2">
                                <p className="text-sm leading-none">50% de descuento en cartucheras del <span className="font-bold">Taller Awaq Ayllus</span></p>
                                <p className="text-sm"><span className="font-bold">Fecha de vencimiento:</span> 4/9/23</p>
                            </div>
                            <button className="text-xs self-start text-white bg-graySearch py-1 px-2 rounded-md">Usar cupón</button>
                        </div>
                    </div>
                    <div className="flex bg-grayUbi rounded-md overflow-hidden">
                        <div className=" w-[250px] h-[110px] overflow-hidden">
                            <img src="/test/imagen4.svg" alt="" className="w-full h-full object-cover"/>
                        </div>
                        <div className="flex flex-col m-2 ">
                            <div className="flex flex-col gap-y-2">
                                <p className="text-sm leading-none">50% de descuento en cartucheras del <span className="font-bold">Taller Awaq Ayllus</span></p>
                                <p className="text-sm"><span className="font-bold">Fecha de vencimiento:</span> 4/9/23</p>
                            </div>
                            <button className="text-xs self-start text-white bg-graySearch py-1 px-2 rounded-md">Usar cupón</button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Redeem;