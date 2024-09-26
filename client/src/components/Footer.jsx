import React from "react";
import Icons from './Icons'

const Footer = () => {
    return (
        <section className='bg-black py-3 flex items-center justify-around'>
                <Icons svgUrl="/navbar/store.svg" className="w-[60%]"/>
                <Icons svgUrl="/navbar/descuento.svg" className="w-[60%]"/>
                <Icons svgUrl="/navbar/home.svg" className="w-[60%]"/>
                <Icons svgUrl="/navbar/cart.svg" className="w-[60%]"/>
                <Icons svgUrl="/navbar/profile.svg" className="w-[60%]"/>
        </section>
    )
}

export default Footer;