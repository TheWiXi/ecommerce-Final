import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register (){

    return (
    <div className="form-register">
        <form>
            <label htmlFor="name">Nombre</label>
            <input type="text" id="name" name="name" required></input>

            <label htmlFor="email">Correo electrónico*</label>
            <input type="email" id="email" name="email" required></input>

            <label htmlFor="password">Contraseña*</label>
            <input type="password" id="password" name="password" required></input>

            <label htmlFor="confirmPassword">Confirma tu contraseña*</label>
            <input type="password" id="confirmPassword" name="confirmPassword" required></input>

            <label htmlFor="phone">Teléfono</label>
            <input type="text" id="phone" name="phone" required></input>

            <label htmlFor="role">Elige un rol:</label>
            <select id="role" name="role">
                <option value="comprador">Comprador</option>
                <option value="artesano">Artesano</option>
            </select>

            <button type="submit">Enviar</button>
        </form>
    </div>
    )
}

export default Register;
