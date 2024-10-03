import React, { useState, useEffect } from "react";

const Coupons = () => {
  const [coupons, setCoupons] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/coupons/getAllCoupons')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setCoupons(data))
      .catch(error => console.error('Error fetching coupons:', error));
  }, []);

  return (
    <div>
      <section>
        <div className="flex relative items-center justify-center w-full py-5">
          <div className="left absolute top-0 left-0">
            <a href="/home" className="flex items-center">
              <img src='/left-arrow.svg' alt="Left Arrow" className="w-10" />
            </a>
          </div>
          <p className="font-bold w-20 text-center">Canjear Cupon</p>
          <img src="/category/rectangle.svg" alt="" className="w-14 absolute z-[-1]" />
        </div>
      </section>
      <section className="mx-6 flex flex-col gap-y-6 mt-5">
        <p className="font-bold">¿Cuentas con algún cupón de descuento? Canjealo aquí</p>
        <div className="flex bg-grayUbi justify-between gap-x-3 py-2 px-3 rounded-md">
          <img src="/redeem/discount.svg" alt="" className="w-6" />
          <input type="text" placeholder="Ingresa tu cupón" className="bg-transparent w-full text-sm" />
          <button className="bg-graySearch text-white text-sm py-1 px-2 rounded">Validar</button>
        </div>
        <div className="mt-4">
          <p className="font-bold">Cupones vigentes</p>
          <p className="text-xs opacity-50">*Usar antes de la fecha de vencimiento</p>
        </div>
      </section>
      <section className="mx-6 my-4">
        <div className="flex flex-col gap-y-4">
          {coupons.map((cupon) => (
            <div key={cupon._id} className="flex bg-grayUbi rounded-md overflow-hidden">
              <div className="w-[250px] h-[110px] overflow-hidden">
                <img src={cupon.imagen || "/test/imagen4.svg"} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col m-2">
                <div className="flex flex-col gap-y-2">
                  <p className="text-sm leading-none">{cupon.descuento}% de descuento en {cupon.codigo}</p>
                  <p className="text-sm"><span className="font-bold">Fecha de vencimiento:</span> {cupon.fechaExpiracion}</p>
                </div>
                <button className="text-xs self-start text-white bg-graySearch py-1 px-2 rounded-md">Usar cupón</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Coupons;
