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

    const [productData, setProductData] = useState([])
    const [workshopData, setWorkshopData] = useState([])
    const [filteredData, setFilteredData] = useState([...productData, ...workshopData])
    const [estado, setEstado] = useState(false)

    const navigate = useNavigate();

    // Función que redirige al chat cuando se hace clic
    const handleNavigateAtencion = () => {
        navigate('/Atencion');
    };
    const handleNavigateToAjustes = () =>{
        navigate('/Ajustes');
    }
    const handleNavigateTocomentarios = () =>{
        navigate('/Comentarios');
    }

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

            fetch('http://localhost:3000/products/searchAll', {credentials: "include", cache: "force-cache"})
            .then(res => res.json())
            .then(dat => {
                setProductData(dat)
                setFilteredData([...filteredData,dat])
            })
            fetch('http://localhost:3000/workshops/getWorkshopWithArtesanoName', {credentials: "include", cache: "force-cache"})
                .then(res => res.json())
                .then(res => {
                    setWorkshopData(res)
                    setFilteredData([...filteredData,...res])
                })

            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
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

    const search = (e) => {
        let termino = e.target.value
        let newProducts = productData.filter(func => func.nombre.toUpperCase().includes(termino.toUpperCase()) ||
            func.categoria.toUpperCase().includes(termino.toUpperCase())
        )
        let newWorkshops = workshopData.filter(func => func.nombre.toUpperCase().includes(termino.toUpperCase())
    )
        return setFilteredData([...newProducts, ...newWorkshops])
    }

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
                estado && filteredData.length && (
                    <div className=" overflow-y-scroll flex flex-col z-[10] top-[70px] absolute h-max w-full bg-[white] p-[10px] gap-[15px] rounded-xl rounded-tl-none rounded-tr-none">
                        {
                            filteredData && filteredData.map(({ _id, nombre, categoria, img, imagen }) => (
                                <Link className={'bg-2E1108 p-4 rounded-2xl'}  key={_id} to={`${ img ? `/product/${_id}` : `/workshop/details/${_id}` }`}>
                                    <div className="flex gap-[10px] items-center" >
                                        <img className="w-[100px] h-[100px] object-cover rounded-xl" src={ img ? img : imagen} alt={ img ? nombre : nombre } />
                                        <div>
                                            <p className="text-black"><strong>{ img ? nombre : nombre}</strong></p>
                                            <p className="text-black bg-letrasGrises w-max p-[3px] rounded-full"><small>{categoria}</small></p>
                                        </div>
                                    </div>
                                </Link>
                            ))
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