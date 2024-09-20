# Ecommerce App

Este proyecto es una aplicación web de ecommerce enfocada en móviles que implementa la arquitectura hexagonal. La aplicación permite a los usuarios registrarse y loguearse tanto de manera local como mediante Google, Facebook e Instagram. Además, cuenta con una pasarela de pagos simulada, un chat de atención al cliente en tiempo real, y la opción de cambiar entre modo claro y oscuro.

## Tecnologías

- **Frontend**: React (Vite)
- **Backend**: Express.js
- **Base de datos**: MongoDB
- **Autenticación**: Local, Google, Facebook, Instagram
- **Arquitectura**: Hexagonal
- **Estilos**: CSS/SCSS (Modo claro/oscuro)
- **Pasarela de pagos**: Simulada con una API de ejemplo
- **Chat en tiempo real**: WebSockets o solución similar
- **HTTPS**: Implementado con un certificado SSL

## Características principales

- **Registro y Login local**: Permite a los usuarios crear una cuenta y loguearse.
- **Login social**: Opción de login mediante Google, Facebook e Instagram.
- **Pasarela de pagos simulada**: Integración de un sistema que simula el proceso de pago.
- **Chat en tiempo real**: Atención al cliente en línea para resolver preguntas y dudas.
- **Modo claro y oscuro**: Alterna entre modo claro y oscuro para mejorar la experiencia de usuario.
- **Seguridad**: HTTPS y autenticación segura mediante JWT y cookies.

## Estructura del Proyecto

```bash
/ecommerce-Final
│
├── /src
│   ├── /domain              # Núcleo de la lógica de negocio
│   │   ├── /entities        # Entidades del dominio (User, Order, Product)
│   │   ├── /services        # Servicios de negocio (user registration, payment, etc.)
│   │   └── /repositories    # Interfaces de persistencia de datos
│   │
│   ├── /application         # Capa de aplicación (maneja los casos de uso)
│   │   ├── /useCases        # Coordinadores de lógica (registerUser, makeOrder, etc.)
│   │   └── /ports           # Definición de los puertos o interfaces para adaptadores externos (controllers, APIs, etc.)
│   │
│   ├── /adapters            # Adaptadores de entrada/salida
│   │   ├── /http            # Controladores HTTP para la API REST
│   │   ├── /database        # Implementación de repositorios utilizando MongoDB
│   │   ├── /auth            # Adaptadores de autenticación (Google, Facebook, Instagram)
│   │   └── /chat            # Adaptador para chat de atención al cliente
│   │
│   ├── /infrastructure      # Código específico del framework (Express.js, configuración MongoDB, etc.)
│   │   ├── /server          # Configuración del servidor Express
│   │   ├── /config          # Configuraciones generales (MongoDB, middlewares)
│   │   └── /security        # Configuración de HTTPS, CORS, Helmet
│
├── /client                  # Aplicación del lado del cliente (React)
│   ├── /components          # Componentes reutilizables
│   ├── /pages               # Páginas del sitio (Login, Registro, Carrito, etc.)
│   ├── /services            # Llamadas a APIs (axios o fetch)
│   ├── /styles              # Estilos globales y configuración de ChakraUI para modo claro/oscuro
│   └── /hooks               # Hooks personalizados (manejo de autenticación, carrito, etc.)
│
├── /test                    # Pruebas unitarias e integración
│
├── /public                  # Archivos estáticos (íconos, imágenes)
│
├── .env                     # Variables de entorno (MongoDB URI, claves OAuth)
├── package.json             # Dependencias y scripts de npm
├── webpack.config.js        # Configuración de Webpack (para React)
└── README.md                # Documentación del proyecto

```
