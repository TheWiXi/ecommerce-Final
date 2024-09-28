import React from "react";
import Icons from './Icons'

const Footer = () => {
    return (
        <section className='bg-black py-3 flex items-center justify-around fixed bottom-0 w-full'>
                <a href="#"><Icons svgUrl="/navbar/store.svg" className="w-[60%]"/></a>
                <a href="#"><Icons svgUrl="/navbar/descuento.svg" className="w-[60%]"/></a>
                <a href="/home"><Icons svgUrl="/navbar/home.svg" className="w-[60%]"/></a>
                <a href="#"><Icons svgUrl="/navbar/cart.svg" className="w-[60%]"/></a>
                <a href="/profile"><Icons svgUrl="/navbar/profile.svg" className="w-[60%]"/></a>
        </section>
    )
}

export default Footer;