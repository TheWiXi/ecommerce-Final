import React from 'react';

const Svglogin = ({ svgUrl, text }) => {
  return (
    <div className='flex bg-white justify-between items-center rounded py-1 px-4'>
      <img src={svgUrl} alt="SVG" className="w-7"/>
      <p className='w-[90%] text-center'>Inicia sesion con <span className='font-semibold'>{text}</span></p>
    </div>
  );
};

export default Svglogin;
