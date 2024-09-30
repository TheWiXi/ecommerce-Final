import React from 'react';
import { useLocation } from 'react-router-dom';
import siSvg from '../../public/buttons/si-black.svg';
import discountSvg from '../../public/discount.svg';

const Product = () => {
    const location = useLocation();
    const { product } = location.state || {};
    
    return (
        <div className="">
            {product ? (
                <>
                    <div className="relative">
                        <img src={product.foto} alt={product.nombre} className="w-full" />
                        {product.descuento && (
                            <div
                                className="absolute bottom-2 left-2 flex items-center text-white h-50 w-50"
                                style={{
                                    backgroundImage: `url(${discountSvg})`,
                                    backgroundSize: '100%', 
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'center',
                                    padding: '1rem', 
                                    borderRadius: '0.5rem', 
                                }}
                            >
                                <span>-{product.descuento}%</span>
                            </div>
                        )}
                    </div>
                    <div className=''>
                        <h1 className="text-2xl font-bold mt-4">{product.nombre}</h1>
                        <p>Precio: ${product.precio?.$numberDecimal || product.precio}</p>
                        <p>Artesano: {product.nombreArtesano}</p>
                        <p>Dimensiones: {product.dimensiones}</p>
                        <p>Descripción: {product.descripcion}</p>
                        <p className='flex gap-2'>
                            <img src={siSvg} className='w-5 h-5' alt="Envío" /> 
                            Cuenta con envío hacia tu ubicación
                        </p>
                    </div>
                </>
            ) : (
                <p>No se encontró información del producto.</p>
            )}
        </div>
    );
};

export default Product;
