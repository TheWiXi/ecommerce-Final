import React from 'react';
import Header3 from '../components/Header3';

const ComentariosDeLaApp = () =>{
return(
    <>
    <Header3/>
    <div className='w-[100vw]'>
    <p className='mt-5 mx-5'>Problemas frecuentes</p>
    <div className='bg-gray-200 h-[40px] rounded-md p-2 mx-5 mb-4 flex items-center'>
    <p className='text-sm'>La aplicación no carga de manera correcta</p>
</div>

<div className='bg-gray-200 h-[40px] rounded-md p-2 mx-5 mb-4 flex items-center'>
    <p className='text-sm'>Errores al querer comprar en la aplicación</p>
</div>

<div className='bg-gray-200 h-[45px] rounded-md p-2 mx-5 mb-4 flex items-center'>
    <p className='text-sm'>No puedo ver las imágenes de las tiendas y/o artesanías</p>
</div>

<div className='bg-gray-200 h-[40px] rounded-md p-2 mx-5 mb-4 flex items-center'>
    <p className='text-sm'>No me permite usar un cupón de descuento</p>
</div>

<div className='bg-gray-200 h-[40px] rounded-md p-2 mx-5 mb-4 flex items-center'>
    <p className='text-sm'>No me deja inscribirme a los talleres</p>
</div>
<div className='bg-gray-200 h-[40px] rounded-md p-2 mx-5 mb-4 flex items-center'>
    <p className='text-sm'>El QR interactivo no funciona de manera correcta</p>
</div>

    <p className='mt-4 mx-5'>Otro</p>
    <div className='bg-gray-200 h-[115px] rounded-md p-2 mx-5 mb-4'>
    <div className='flex flex-row justify-beetwen space-x-[119px] pt-[10px]'><p className='text-sm text-gray-500'>Describe aquí tu problema...</p> </div>
    </div>
<div className="flex justify-between p-4w">
<button className="bg-[#3D3D3D] text-white font-bold py-1 px-2 rounded mx-5 text-sm">
    Adjuntar captura
</button>

<button className="bg-[#3D3D3D] text-white font-bold py-1 px-2 rounded mx-5 text-sm">
    Enviar
</button>

</div>
    </div>
    </>

);
};

export default ComentariosDeLaApp;