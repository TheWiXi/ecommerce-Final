import React from 'react';

const Svgregistro = ({ svgUrl, text }) => {
  return (
    <div className='flex bg-white justify-between items-center rounded py-1 px-4'>
      <img src={svgUrl} alt="SVG" className="w-7"/>
      <p className='w-[80%] text-center'>Registrate con <span className='font-semibold'>{text}</span></p>
    </div>
  );
};

export default Svgregistro;
