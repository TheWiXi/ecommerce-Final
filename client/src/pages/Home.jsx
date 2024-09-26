import React from 'react';
import Header from '../components/Header'
const Home = () => {
    return (
        <div>
            <Header />
            <section className='m-4 flex flex-col gap-y-4'>
                <div className='bg-grayUbi flex justify-between px-2 py-1 gap-x-3 rounded items-center'>
                    <img src="/searchbar/ubi.svg" alt="" className='w-4' />
                    <input type="text"className="text-black text-opacity-40 text-xs bg-transparent  placeholder:text-opacity-40 w-[100%]" placeholder="Ubicación de entrega actual"/>
                </div>
                <div>
                    <p className='font-black'>Categorías</p>
                </div>
            </section>
        </div>
    )
}

export default Home;