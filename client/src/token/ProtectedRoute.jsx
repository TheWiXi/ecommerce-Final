import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = document.cookie.split('; ').find(row => row.startsWith('token='));
    console.log("Token:", token); // Agrega esta línea para depurar

    if (!token) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoute;