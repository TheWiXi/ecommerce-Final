import React from 'react';

const Home = () => {
    return (
        <div>
            <section className='bg-black flex flex-row p-4 justify-between gap-x-4'>
                <img src="/searchbar/menu.svg" alt="svg" className='w-10'/>
                <div className='bg-graySearch flex w-[100%] px-2 py-1 gap-x-3 items-center'>
                    <img src="/searchbar/search.svg" alt="svg" className='w-4'/>
                    <p className='text-white text-opacity-50 text-xs'>Buscar producto o tienda...</p>
                </div>
            </section>
        </div>
    )
}

export default Home;