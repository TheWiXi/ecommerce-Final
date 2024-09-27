import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Svgregistro from "../components/Svgregistro";

const Init_register = () => {
  const navigate = useNavigate();
  const eventoCambiarVista = () => {
    navigate("/init-login")
  }

  return (
    <div className="bg-[url('/fondologin.svg')] bg-cover bg-center h-screen flex justify-center items-center ">
        <div className="flex flex-col w-[70%] gap-y-8">
            <p className="text-2xl">Regístrate ahora y obtén las mejores promociones en <span className="font-semibold">artesanías peruanas</span></p>
            <div className='flex flex-col gap-y-4'>
                <Svgregistro svgUrl="/services/facebook.svg" text="Facebook"/>
                <Svgregistro svgUrl="/services/instagram.svg" text="Instagram"/>
                <Svgregistro svgUrl="/services/gmail.svg" text="Gmail"/>
                <a href='/register'><Svgregistro svgUrl="/services/email.svg" text="correo"/></a>
                <Svgregistro svgUrl="/services/phone.svg" text="celular"/>
            </div>
            <div className='flex flex-col justify-center items-center'>
                <p className='text-2xl'>¿Ya tienes una cuenta?</p>
                <p className='text-2xl underline font-semibold' onClick={eventoCambiarVista}>Inicia sesión</p>
            </div>
        </div>
    </div>
  );
};

export default Init_register;
