import React from 'react';
import Header4 from '../components/Header4';

const AtencionAlCliente = () =>{
return(
    <>
 <Header4/>
 <div className='w-[100vw]'>
 <p className='mt-5 mx-5 mb-3'>Preguntas frecuentes</p>
 <div className='bg-gray-200 h-[40px] rounded-md p-2 mx-5 mb-4 flex items-center'>
    <p className='text-sm'>¿Cómo compro en la app?</p>
</div>

<div className='bg-gray-200 h-[40px] rounded-md p-2 mx-5 mb-4 flex items-center'>
    <p className='text-sm'>¿Cómo me inscribo en un taller?</p>
</div>

<div className='bg-gray-200 h-[40px] rounded-md p-2 mx-5 mb-4 flex items-center'>
    <p className='text-sm'>¿Cómo escaneo el QR interactivo?</p>
</div>

<div className='bg-gray-200 h-[40px] rounded-md p-2 mx-5 mb-4 flex items-center'>
    <p className='text-sm'>¿Cómo cambio la moneda en la app?</p>
</div>

<div className='bg-gray-200 h-[40px] rounded-md p-2 mx-5 mb-4 flex items-center'>
    <p className='text-sm'>¿Cómo reporto un problema?</p>
</div>

<p className='mt-5 mx-7 mb-3'>
    ¿Necesitas atención personalizada? habla<br />
    con nuestro equipo de soporte
</p>

<div className='bg-gray-200 h-[40px] rounded-md p-2 mx-5 mb-4 flex items-center'>
    <p className='text-sm'>Empieza un chat</p>
</div>








 </div>
</>
);
}

export default AtencionAlCliente;