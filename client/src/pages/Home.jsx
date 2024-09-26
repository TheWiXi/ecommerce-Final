import React from 'react';
import Header from '../components/Header'
import Categoria from '../components/Categoria'
const Home = () => {
    return (
        <div>
            <Header />
            <section className='m-4 flex flex-col gap-y-4 relative'>
                <div className='bg-grayUbi flex justify-between px-2 py-1 gap-x-3 rounded items-center'>
                    <img src="/searchbar/ubi.svg" alt="" className='w-4' />
                    <input type="text"className="text-black text-opacity-40 text-xs bg-transparent  placeholder:text-opacity-40 w-[100%]" placeholder="Ubicación de entrega actual"/>
                </div>
                <img src="/home/rectangle.svg" alt="svg" className='absolute top-10 -left-4 z-[-1] w-5'/>
                <div className='mx-3'>
                    <p className='font-black'>Categorías</p>
                    <div className='my-2 flex items-start gap-x-5 gap-y-2 flex-wrap'>
                        <Categoria svgUrl="/categorias/textileria.svg" text="Textileria" className="w-[70%]" />
                        <Categoria svgUrl="/categorias/ceramica.svg" text="Ceramica" className="w-[70%]" />
                        <Categoria svgUrl="/categorias/orfebreria.svg" text="Orfebreria" className="w-[70%]" />
                        <Categoria svgUrl="/categorias/tallaenpiedra.svg" text="Talla en piedra" className="w-[70%]"/>
                        <Categoria svgUrl="/categorias/tallamadera.svg" text="Talla en madera" className="w-[50%]"/>
                        <Categoria svgUrl="/categorias/bordado.svg" text="Bordado" className="w-[50%]"/>
                        <Categoria svgUrl="/categorias/joyeria.svg" text="Joyeria" className="w-[50%]"/>
                        <Categoria svgUrl="/categorias/hojalateria.svg" text="Hojalateria" className="w-[50%]"/>
                        <Categoria svgUrl="/categorias/estampado.svg" text="Estampado" className="w-[50%]"/>
                        <Categoria svgUrl="/categorias/pintura.svg" text="Pintura tradicional" className="w-[50%]"/>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home;