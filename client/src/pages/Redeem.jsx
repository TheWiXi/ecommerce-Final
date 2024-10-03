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
            <section>
                <p>¿Cuentas con algún cupón de descuento? Canjealo aquí</p>
                <div>
                    
                </div>
            </section>
        </div>
    )
}

export default Redeem;