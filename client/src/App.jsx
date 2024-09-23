import { useState } from 'react'
import './index.css'

function App() {
  return (
    <>
      <div class="max-w-md w-full space-y-8 p-8 bg-blue-500 rounded-lg shadow-md">
        <div class="text-center">
          <h2 class="mt-6 text-3xl font-extrabold text-gray-900">Regístrate ahora</h2>
          <p class="mt-2 text-sm text-gray-600">y obtén las mejores promociones en artesanías peruanas</p>
        </div>
        <div class="mt-8 space-y-6">
          <button class="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
            <img src="/path-to-facebook-icon.svg" alt="Facebook" class="h-5 w-5 mr-2"/>
              Regístrate con Facebook
          </button>
          <button class="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
            <img src="/path-to-instagram-icon.svg" alt="Instagram" class="h-5 w-5 mr-2"/>
              Regístrate con Instagram
          </button>
          <button class="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
            <img src="/path-to-gmail-icon.svg" alt="Gmail" class="h-5 w-5 mr-2"/>
              Regístrate con Gmail
          </button>
          <button class="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
            <img src="/path-to-email-icon.svg" alt="Email" class="h-5 w-5 mr-2"/>
              Regístrate con tu correo
          </button>
          <button class="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
            <img src="/path-to-phone-icon.svg" alt="Celular" class="h-5 w-5 mr-2"/>
              Regístrate con tu celular
          </button>
        </div>
        <div class="text-center mt-6">
          <p class="text-sm">¿Ya tienes una cuenta?</p>
          <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">Inicia sesión</a>
        </div>
      </div>
    </>
  )
}

export default App
