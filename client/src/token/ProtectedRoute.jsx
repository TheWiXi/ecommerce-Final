import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    // Verifica si el token está presente en las cookies o en el localStorage
    const token = document.cookie.split('; ').find(row => row.startsWith('token='));

    // Si no hay token, redirige a la página de inicio de sesión
    if (!token) {
        return <Navigate to="/login" />;
    }

    // Si hay un token, renderiza los hijos (el componente que se desea mostrar)
    return children;
};

export default ProtectedRoute;
