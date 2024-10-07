import React, {useState, useEffect, useRef} from 'react';
import {jwtDecode} from 'jwt-decode';
import Icons from './Icons'
import separadorSvg from '../../public/aside/separador.svg'
import Campuslands from '../../public/aside/campuslands.png'
import { Link } from "react-router-dom"


import { useNavigate } from 'react-router-dom';

const Header = () => {
    const [open, setOpen] = useState(false)
    const sidebarRef = useRef(null);
    const [userData, setUserData] = useState(null);
    const [allData, setAllData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [estado, setEstado] = useState(false);

    const navigate = useNavigate();

    // Navigation functions remain the same
    const handleNavigateAtencion = () => {
        navigate('/Atencion');
    };
    const handleNavigateToAjustes = () => {
        navigate('/Ajustes');
    };
    const handleNavigateTocomentarios = () => {
        navigate('/Comentarios');
    };

    const getCookieValue = (cookieName) => {
        const cookies = document.cookie.split('; ');
        const cookie = cookies.find(row => row.startsWith(cookieName + '='));
        return cookie ? cookie.split('=')[1] : null;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [productsResponse, workshopsResponse] = await Promise.all([
                    fetch('http://localhost:3000/products/searchAll', {credentials: "include"}),
                    fetch('http://localhost:3000/workshops/getWorkshopWithArtesanoName', {credentials: "include"})
                ]);

                const products = await productsResponse.json();
                const workshops = await workshopsResponse.json();

                const combinedData = [...products, ...workshops];
                setAllData(combinedData);
                setFilteredData(combinedData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

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
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        const token = getCookieValue('token');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                fetchUserData(decodedToken.correo);
            } catch (error) {
                console.error('Invalid token:', error);
            }
        }

        fetchData();

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

    const search = (e) => {
        const termino = e.target.value.toUpperCase();
        const newFilteredData = allData.filter(item => 
            item.nombre.toUpperCase().includes(termino) ||
            (item.categoria && item.categoria.toUpperCase().includes(termino))
        );
        setFilteredData(newFilteredData);
    };

    return (
            <section className='bg-black flex flex-row p-4 justify-between gap-x-4'>
                <button onClick={() => setOpen(true)}>
                    <img src="/searchbar/menu.svg" alt="svg" className='w-10' />
                </button>
                <div className='bg-graySearch flex w-[100%] px-2 py-1 gap-x-3 items-center rounded'>
                    <svg
                    className="w-6 h-6 text-gray-500 mr-2"
                    viewBox="0 0 62 75"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                        <rect
                            x="1.26633"
                            y="34.3498"
                            width="34.5626"
                            height="34.5626"
                            rx="6"
                            transform="rotate(-75 1.26633 34.3498)"
                            stroke="#FFFFFF"
                            strokeWidth="4"
                        />
                        <path
                            d="M33.3945 40.7812L55.6657 72.6541"
                            stroke="#FFFFFF"
                            strokeWidth="4"
                            strokeLinecap="round"
                        />
                    </svg>
                    <input
                        type="text"
                        className="text-white text-opacity-50 text-xs bg-transparent  placeholder:text-opacity-50 w-[100%]"
                        placeholder="Buscar producto o tienda..."
                        onFocus={() => setEstado(true)}
                        onMouseLeave={() => setEstado(false)}
                        onChange={search}
                    />
                    {console.log(filteredData)}
                </div>
                {
                estado && filteredData.length > 0 && (
                    <div className="overflow-y-scroll flex flex-col z-[10] top-[70px] absolute h-max w-full bg-[white] p-[10px] gap-[15px] rounded-xl rounded-tl-none rounded-tr-none">
                        {
                            filteredData.map((item) => {
                                // Correct way to check if 'foto' property exists in item
                                const isProduct = 'foto' in item;
                                const imageUrl = isProduct ? item.foto : (item.img || item.imagen);
                                
                                return (
                                        <div 
                                            key={item._id}
                                            className='bg-2E1108 p-4 rounded-2xl cursor-pointer' 
                                            onClick={() => {
                                                if (isProduct) {
                                                    navigate('/product', { state: { product: item } });
                                                } else {
                                                    navigate('/Register_workshop', { state: { workshop: item } });
                                                }
                                            }}
                                        >
                                        <div className="flex gap-[10px] items-center">
                                            <img 
                                                className="w-[100px] h-[100px] object-cover rounded-xl" 
                                                src={imageUrl} 
                                                alt={item.nombre} 
                                            />
                                            <div>
                                                <p className="text-black">
                                                    <strong>{item.nombre}</strong>
                                                </p>
                                                {item.categoria && (
                                                    <p className="text-black bg-letrasGrises w-max p-[3px] rounded-full">
                                                        <small>{item.categoria}</small>
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                )
            }

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
                                <div onClick={handleNavigateToAjustes}className='text-left text-white text-xl py-3 m-2 ml-3 flex items-center gap-3'><Icons svgUrl="/aside/settings.svg" className="w-[60%]"/>Ajustes</div>
                                <div onClick={ handleNavigateTocomentarios}className='text-left text-white text-xl py-3 m-2 ml-3 flex items-center gap-3'><Icons svgUrl="/aside/comments.svg" className="w-[60%]"/>Comentarios </div>
                                <div onClick={handleNavigateAtencion}  className='text-left text-white text-xl py-3 m-2 ml-3 flex items-center gap-3'><Icons svgUrl="/aside/atention.svg" className="w-[60%]"/>Atención al cliente</div>
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