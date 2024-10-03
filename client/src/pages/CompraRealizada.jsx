import React from "react";
import { useNavigate } from 'react-router-dom';
const CompraRealizada = () => {

  const navigate = useNavigate();
  const eventoCambiarVista = () => {
    navigate("/home")
  }
  return (
    <>
      <div className="w-[100vw]">

      <div className="flex justify-center mt-5">
      <img src="/public/buying/check.svg" alt="Ícono" className="w-[208px] h-[208px] " />
</div>
<div className="flex justify-center">

<p className='mt-5 mx-5 mb-5px text-center text-2xl font-bold'>¡Compra realizada con éxito!</p>

</div>
<div className="flex justify-center mt-5">
  <img src="/public/buying/patern.svg" alt="Ícono" className="w-[230px]" />
</div>

<div className="flex flex-col items-center text-center mt-4">
    <p className="text-base font-bold">
        Gracias por apoyar a los artesanos <br />
        colombianos, puedes revisar tu compra <br />
        en la opción de
    </p>
</div>

<div className="flex justify-center mt-4">
<button className="bg-[#A3A3A3] text-white font-bold py-1 px-3 rounded mx-5 text-base">
    Compras
</button>
</div>

<div className="flex justify-center mt-5">
  <img src="/public/buying/patern.svg" alt="Ícono" className="w-[230px]" />
</div>

<div className="flex flex-col items-center text-center mt-4">
    <p className="text-base font-bold">
    Vincula tu correo para recibir más detalles <br />
    sobre tus compras realizadas
      
    </p>
</div>

<div className="flex justify-center items-center text-center mt-4">
  <input
    type="email"
    id="email"
    name="email"
    required
    placeholder="Añadir correo electrónico"
    className="w-[calc(100%-50px)] max-w-md h-8 bg-[#A3A3A3] text-gray-800 placeholder-white rounded-md p-2"
    style={{ fontSize: '0.875rem' }} 
  />
</div>

<div><div className="flex justify-center mt-4">
    <button className="bg-[#3D3D3D] text-white font-bold py-1.5 px-3 rounded mx-5 text-base " onClick={eventoCambiarVista}>
        Regresar al inicio 
    </button>
</div></div>

      </div>
    </>
  );
};

export default CompraRealizada;
