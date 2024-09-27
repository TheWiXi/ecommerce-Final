import React from 'react';
import Svglogin from "../components/Svglogin"

const init_login = () => {

    return (
        <div className="bg-[url('/fondologin.svg')] bg-cover bg-center h-screen flex justify-center items-center ">
            <div className="flex flex-col w-[70%] gap-y-8 justify-center items-center">
                <p className="text-2xl w-[80%] text-center">Inicia sesión y continúa viendo <span className="font-semibold">tus artesanías favoritas</span></p>
                <div className='flex flex-col gap-y-4 w-[100%]'>
                    <Svglogin svgUrl="/services/facebook.svg" text="Facebook" />
                    <Svglogin svgUrl="/services/instagram.svg" text="Instagram" />
                    <a href='http://localhost:3000/users/auth/google'><Svglogin svgUrl="/services/gmail.svg" text="Gmail" /></a>
                    <a href='/login'><Svglogin svgUrl="/services/user.svg" text="tu cuenta de Ruraq Maki" /></a>
                </div>
            </div>
        </div>
    );
};

export default init_login;
