import React from 'react';

const Categoria = ({ svgUrl, text, className }) => {
    return (
        <div className='flex items-center justify-center w-12 flex-col'>
            <div className='bg-grayUbi w-10 h-10 flex items-center justify-center rounded-full'>
                <img src={svgUrl} alt="" className={`${className}`}/>
            </div>
            <p className='text-xs text-center leading-tight'>{text}</p>
        </div>
    )

}

export default Categoria;