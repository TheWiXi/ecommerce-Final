import React from "react";
import { useNavigate } from "react-router-dom";


export const PurchaseConfirmation = ({ productos,onClose,userData, total }) => {

    const navigate = useNavigate()

    const realizarCompra = async () => {
        const userId = userData._id;
        const compraData = {
            usuarioId: userId,
            productos: productos.map(producto => ({
                productoId: producto._id,   
                cantidad: producto.cantidad,
                precio: producto.precio,
            })),
            total,
            fecha: new Date().toISOString(),
            estado: "pendiente"
        };
    
        try {
            const response2 = await fetch(`http://localhost:3000/users/carrito/${userId}`, {
                method: 'PUT', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(compraData),
            });

            const response = await fetch('http://localhost:3000/orders/postingNewOrder', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(compraData),
            });
    
            if (response.ok && response2.ok) {
                onClose()
                navigate('/Comprado');
            } else {
                console.error('Error al realizar la compra');
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
        }
    };


    return (
        <div className="fixed inset-0 flex items-center justify-center">

            <div className="absolute inset-0 bg-[gray] opacity-70"></div>
            
            <dialog open className="relative bg-[white] rounded-lg text-black p-6 mx-auto z-10">
                <h2 className="mb-4">¿Seguro de realizar la compra?</h2>

                <div className="flex flex-col justify-around items-center gap-3">
                    <button className="text-white flex items-center justify-center gap-2 bg-[#3D3D3D] w-[100px] h-10 rounded-lg" onClick={realizarCompra}>
                        <svg width="30" viewBox="0 0 75 75" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="37.5" y="-1.24264" width="54.7903" height="54.7903" rx="12" transform="rotate(45 37.5 -1.24264)" stroke="white" strokeWidth="6"/><path d="M20.9404 40.4898L29.4948 49.1655C30.278 49.9599 31.5598 49.9599 32.343 49.1655L53.3704 27.8398" stroke="white" strokeWidth="5"/></svg>
                        <span>Si</span>
                    </button>
                    <button className="text-white flex items-center justify-center gap-2 bg-[#3D3D3D] w-[100px] h-10 rounded-lg" onClick={onClose}>
                        <svg width="30" viewBox="0 0 75 75" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="37.5" y="-1.24264" width="54.7903" height="54.7903" rx="12" transform="rotate(45 37.5 -1.24264)" stroke="white" strokeWidth="6"/><path d="M26 26L49 49" stroke="white" strokeWidth="6"/><path d="M49 26L26 49" stroke="white" strokeWidth="6"/></svg>
                        <span>No</span>
                    </button>
                </div>

            </dialog>
        </div>
    );
};
