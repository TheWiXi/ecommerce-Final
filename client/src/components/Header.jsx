import React from 'react';

const Header = () => {
    return (
        <section className='bg-black flex flex-row p-4 justify-between gap-x-4'>
            <img src="/searchbar/menu.svg" alt="svg" className='w-10' />
            <div className='bg-graySearch flex w-[100%] px-2 py-1 gap-x-3 items-center rounded'>
                <img src="/searchbar/search.svg" alt="svg" className='w-4' />
                <input type="text" className="text-white text-opacity-50 text-xs bg-transparent  placeholder:text-opacity-50 w-[100%]" placeholder="Buscar producto o tienda..." />
            </div>
        </section>
    )
}

export default Header