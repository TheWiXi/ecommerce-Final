import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Start = () => {
  const navigate = useNavigate(); 
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, 1500); 


    const navigateTimer = setTimeout(() => {
      navigate('/register'); 
    }, 2000); 

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(navigateTimer);
    };
  }, [navigate]);

  return (
    <div className={`bg-[url('/fondo.svg')] bg-cover bg-center h-screen flex justify-center items-center transition-opacity duration-500 ${isFading ? 'opacity-0' : 'opacity-100'}`}>
      <div className="w-[70%]">
        <img src="/mainlogo.svg" alt="Main Logo" />
      </div>
    </div>
  );
};

export default Start;
