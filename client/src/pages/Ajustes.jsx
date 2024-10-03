import React from 'react';


const Ajustes = () => {
  return (
    <>
      <div className='w-[100vw]'>
        <p className='mt-5 mx-5'>Global</p>
        <div className='bg-gray-200 h-[125px] rounded-md p-2 mx-5 mb-7'>
          <div className='flex flex-row justify-beetwen space-x-[119px] pt-[10px]'><p className='text-xs'>Cambiar país y región</p> <p className='text-xs text-gray-500'>Canadá Toronto</p></div>
          <div className='flex flex-row justify-beetwen space-x-[195px] pt-[20px]'><p className='text-xs'>Cambiar idioma</p> <p className='text-xs text-gray-500'>Español</p></div>
          <div className='flex flex-row justify-beetwen space-x-[205px] pt-[20px]'><p className='text-xs'>Cambiar moneda</p> <p className='text-xs text-gray-500'>PEN</p></div>
        </div>
        <p className='mt-5 mx-5'>Notificaciones</p>
        <div className='bg-gray-200 h-[150px] rounded-md p-2 mx-5 '>

          <div className='flex flex-row justify-between space-x-[119px] pt-[10px]'>
            <div className='flex flex-row justify-between pt-1 space-x-[90px]'>
              <p className='text-xs'>Mostrar notificaciones de compras</p>
              <div className='relative'>
                <div className='absolute w-[50px] h-[20px] left-0 top-0 bg-[#3D3D3D] rounded-[5px] flex items-center justify-center'>
                  <div className='w-[20px] h-[20px] bg-white shadow-[1px_0_1px_rgba(0,0,0,0.25)] rounded-[5px]'></div>
                </div>
              </div>
            </div></div>
          <div className='flex flex-row justify-between space-x-[119px] pt-[10px]'>
            <div className='flex flex-row justify-between pt-1 space-x-[78px]  '>
              <p className='text-xs'>Mostrar notificaciones de descuentos</p>
              <div className='relative'>
                <div className='absolute w-[50px] h-[20px] left-0 top-0 bg-[#3D3D3D] rounded-[5px] flex items-center justify-center'>
                  <div className='w-[20px] h-[20px] bg-white shadow-[1px_0_1px_rgba(0,0,0,0.25)] rounded-[5px]'></div>
                </div>
              </div>
            </div>
          </div>
          <div className='flex flex-row justify-between space-x-[119px] pt-[10px]'>
            <div className='flex flex-row justify-between pt-1 space-x-[99px]  '>
              <p className='text-xs'>Mostrar notificaciones de talleres</p>
              <div className='relative'>
                <div className='absolute w-[50px] h-[20px] left-0 top-0 bg-[#3D3D3D] rounded-[5px] flex items-center justify-center'>
                  <div className='w-[20px] h-[20px] bg-white shadow-[1px_0_1px_rgba(0,0,0,0.25)] rounded-[5px]'></div>
                </div>
              </div>
            </div>
          </div>
          <div className='flex flex-row justify-between space-x-[119px] pt-[10px]'>
            <div className='flex flex-row justify-between pt-1 space-x-[147px]  '>
              <p className='text-xs'>Sonido de notificaciones</p>
              <div className='relative'>
                <div className='absolute w-[50px] h-[20px] left-0 top-0 bg-[#3D3D3D] rounded-[5px] flex items-center justify-center'>
                  <div className='w-[20px] h-[20px] bg-white shadow-[1px_0_1px_rgba(0,0,0,0.25)] rounded-[5px]'></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className='mt-5 mx-5'>Legal</p>
        <div className='bg-gray-200 h-[125px] rounded-md p-2 mx-5 mb-7'>
          <div className='flex flex-row justify-beetwen space-x-[119px] pt-[10px]'><p className='text-xs'>Política de privacidad</p> <p className='text-xs text-gray-500'></p></div>
          <div className='flex flex-row justify-beetwen space-x-[195px] pt-[20px]'><p className='text-xs'>Información legal</p> <p className='text-xs text-gray-500'></p></div>
          <div className='flex flex-row justify-beetwen space-x-[205px] pt-[20px]'><p className='text-xs'>Libro de reclamaciones</p> <p className='text-xs text-gray-500'></p></div>
        </div>
      </div>
    </>

  );
};

export default Ajustes;
