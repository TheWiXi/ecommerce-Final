import React, {useState, useEffect, useRef} from 'react';
import {jwtDecode} from 'jwt-decode';
import Icons from './Icons'
import separadorSvg from '../../public/aside/separador.svg'
import Campuslands from '../../public/aside/campuslands.png'
const Header = () => {
    const [open, setOpen] = useState(false)
    const sidebarRef = useRef(null);
    const [userData, setUserData] = useState(null);

    const getCookieValue = (cookieName) => {
        const cookies = document.cookie.split('; ');
        const cookie = cookies.find(row => row.startsWith(cookieName + '='));
        return cookie ? cookie.split('=')[1] : null;
    };

    useEffect(() => {
        const fetchUserData = async (email) => {
            try {
                const response = await fetch('http://localhost:3000/users/verifyEmail', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ correo: email }),
                });

                if (response.ok) {
                    const data = await response.json();
                    setUserData(data);
                } else {
                    console.error('Error al obtener los datos del usuario');
                }
            } catch (error) {
                console.error('Error en la solicitud:', error);
            }
        };

        const token = getCookieValue('token');

        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                const userEmail = decodedToken.correo;
                fetchUserData(userEmail);
            } catch (error) {
                console.error('Token inválido', error);
            }
        }

        const handleClickOutside = (event) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };

    }, []);

    return (
            <section className='bg-black flex flex-row p-4 justify-between gap-x-4'>
                <button onClick={() => setOpen(true)}>
                    <img src="/searchbar/menu.svg" alt="svg" className='w-10' />
                </button>
                <div className='bg-graySearch flex w-[100%] px-2 py-1 gap-x-3 items-center rounded'>
                    <img src="/searchbar/search.svg" alt="svg" className='w-4' />
                    <input
                        type="text"
                        className="text-white text-opacity-50 text-xs bg-transparent  placeholder:text-opacity-50 w-[100%]"
                        placeholder="Buscar producto o tienda..."
                    />
                </div>

                <div className={`${!open && "hidden"} bg-gray-600/50 min-h-screen w-full fixed top-0 left-0 rigth-0 z-10`}>
                    <div
                        ref={sidebarRef}
                        className={`${open ? "w-80" : "w-0"} bg-black min-h-screen fixed top-0 left-0 transition-all duration-300`}
                    >
                        <div className={`${!open && "hidden"} pt-3`}>
                            <div className='flex items-center justify-center'>
                            {userData && userData.fotoPerfil ? (
                                <div className='flex items-center gap-2'>
                                <img 
                                    src={userData.fotoPerfil} 
                                    alt="Foto de perfil" 
                                    className="w-14 h-14 rounded-full" 
                                />
                                <h1 className='text-white'>{userData.nombre}</h1>
                                </div>
                            ) : (
                                <img 
                                    src="/searchbar/default-profile.svg" 
                                    alt="Sin imagen" 
                                    className="w-20 h-20 rounded-full" 
                                />
                            )}
                            </div>
                            <div className='m-4'>
                                <a href='/Favorites'><div className='text-left text-white text-xl py-3 m-2 ml-3 flex items-center gap-3'><Icons svgUrl="/aside/favorite.svg" className="w-[60%]"/>Lista de favoritos</div></a>
                                <a href='/Purchases'><div className='text-left text-white text-xl py-3 m-2 ml-3 flex items-center gap-3'><Icons svgUrl="/aside/bagstore.svg" className="w-[60%]"/>Compras</div></a>
                                <a href='/workshops'><div className='text-left text-white text-xl py-3 m-2 ml-3 flex items-center gap-3'><Icons svgUrl="/aside/talleres.svg" className="w-[60%]"/>Talleres</div></a>
                                <a href='/Redeem'><div className='text-left text-white text-xl py-3 m-2 ml-3 flex items-center gap-3'><Icons svgUrl="/aside/cupon.svg" className="w-[60%]"/>Canjear cupón</div></a>
                            </div>
                            <div className='m-4'>
                                <img className='' src={separadorSvg}></img>
                            </div>
                            <div className='m-4'>
                                <a href='/Ajustes'><div className='text-left text-white text-xl py-3 m-2 ml-3 flex items-center gap-3'><Icons svgUrl="/aside/settings.svg" className="w-[60%]"/>Ajustes</div></a>
                                <a href='/Comentarios'><div className='text-left text-white text-xl py-3 m-2 ml-3 flex items-center gap-3'><Icons svgUrl="/aside/comments.svg" className="w-[60%]"/>Comentarios </div></a>
                                <a href='/Atencion'><div className='text-left text-white text-xl py-3 m-2 ml-3 flex items-center gap-3'><Icons svgUrl="/aside/atention.svg" className="w-[60%]"/>Atención al cliente</div></a>
                             </div>
                             <div className='w-full h-10'>
                                <img className='w-full h-full object-contain' src={Campuslands}></img>
                             </div>
                        </div>
                    </div>
                </div>
            </section>
    )
}

export default Header