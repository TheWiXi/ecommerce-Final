# Ecommerce App

Este proyecto es una aplicación web de ecommerce enfocada en móviles que implementa la arquitectura hexagonal. La aplicación permite a los usuarios registrarse y loguearse tanto de manera local como mediante Google, Facebook e Instagram. Además, cuenta con una pasarela de pagos simulada y un chat de atención al cliente en tiempo real.

## Tecnologías

- **Frontend**: React (Vite) y Tailwind CSS
- **Backend**: Express.js
- **Base de datos**: MongoDB alojada en AWS
- **Autenticación**: Local, Google, Facebook, Instagram
- **Arquitectura**: Hexagonal
- **Pasarela de pagos**: Simulada con una API de ejemplo
- **Chat en tiempo real**: WebSockets (socket.io)
- **HTTPS**: Implementado con un certificado SSL

## Características principales

- **Registro y Login local**: Permite a los usuarios crear una cuenta y loguearse
- **Login social**: Opción de login mediante Google, Facebook e Instagram
- **Pasarela de pagos simulada**: Integración de un sistema que simula el proceso de pago
- **Chat en tiempo real**: Atención al cliente en línea para resolver preguntas y dudas
- **Seguridad**: HTTPS y autenticación segura mediante JWT y cookies

## Instrucciones de Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/TheWiXi/ecommerce-Final.git
   cd ecommerce-Final
   ```
2. Instala las dependencias del proyecto raíz y de los workspaces:

   ```bash
   npm install
   ```
3. Configura las variables de entorno (ver sección siguiente).
4. Inicia la aplicación:

   ```bash
   npm run dev        # Inicia cliente y servidor (sin respuestas al chat en consola)
   npm run dev:server # Inicia solo el servidor
   npm run dev:client # Inicia solo el cliente
   ```

## Configuración del Entorno (.env)

Crea un archivo `.env` en la carpeta `/server` con las siguientes variables:

```env
KEY_SECRET=your_jwt_secret_key_here
EXPRESS_EXPIRE=3600 # tiempo de expiración de las sesiones (ej: 3600 segundos)
EXPRESS_PORT=3000
EXPRESS_HOST="localhost"

MONGO_ACCESS=remote_access # si accedes de manera remota o local
MONGO_USER=your_mongodb_username_here
MONGO_PWD=your_mongodb_password_here
MONGO_HOST=your_mongodb_host_here # ejemplo: "cluster0.mongodb.net"
MONGO_PORT=27017
MONGO_DB_NAME=your_database_name_here

GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here

GITHUB_CLIENT_ID=your_github_client_id_here
GITHUB_CLIENT_SECRET=your_github_client_secret_here

DISCORD_CLIENT_ID=your_discord_client_id_here
DISCORD_CLIENT_SECRET=your_discord_client_secret_here

```

## Ejemplos de Uso

### Registro de Usuario

```javascript
// Cliente (React)
const registerUser = async () => {
  const response = await fetch('/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: 'usuario@ejemplo.com',
      password: 'contraseña123',
      name: 'Usuario Ejemplo'
    }),
  });
  const data = await response.json();
  console.log(data); // { userId: '123', token: 'jwt_token' }
};
```

### Compra de Producto

```javascript
// Cliente (React)
const purchaseProduct = async (productId) => {
  const response = await fetch('/api/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      productId,
      quantity: 1
    }),
  });
  const order = await response.json();
  console.log(order); // { orderId: '456', status: 'pending' }
};
```

## Documentación de la API

### Autenticación

#### Registro de Usuario

- **POST** `/api/auth/register`

  ```json
  {
    "email": "string",
    "password": "string",
    "name": "string"
  }
  ```

  Respuesta: `201 Created`
  ```json
  {
    "userId": "string",
    "token": "string"
  }
  ```

#### Login

- **POST** `/api/auth/login`

  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```

  Respuesta: `200 OK`
  ```json
  {
    "token": "string"
  }
  ```

### Productos

#### Obtener Productos

- **GET** `/api/products`

  Parámetros de query:

  - `page` (número, opcional)
  - `limit` (número, opcional)
  - `category` (string, opcional)

  Respuesta: `200 OK`

  ```json
  {
    "products": [
      {
        "id": "string",
        "name": "string",
        "price": "number",
        "description": "string",
        "imageUrl": "string"
      }
    ],
    "totalPages": "number",
    "currentPage": "number"
  }
  ```

### Órdenes

#### Crear Orden

- **POST** `/api/orders`

  ```json
  {
    "productId": "string",
    "quantity": "number"
  }
  ```

  Respuesta: `201 Created`
  ```json
  {
    "orderId": "string",
    "status": "string",
    "total": "number"
  }
  ```

### Chat

#### Iniciar Chat

- **WebSocket** `/ws/chat`

  Eventos:

  - `message`: Enviar/recibir mensajes

  ```json
  {
    "type": "message",
    "content": "string",
    "timestamp": "string"
  }
  ```

## Scripts disponibles

- `npm run dev`: Inicia tanto el servidor como el cliente en modo desarrollo. Nota: No muestra logs en la consola.
- `npm run dev:server`: Inicia solo el servidor en modo desarrollo
- `npm run dev:client`: Inicia solo el cliente en modo desarrollo

## Configuración de Workspaces

Este proyecto utiliza workspaces de npm para manejar un monorepo. Los workspaces están configurados en el package.json raíz:

```json
{
  "workspaces": [
    "client",
    "server"
  ]
}
```

## Estructura del Proyecto

```
 /ecommerce-Final
│
├── /client                  # Aplicación del lado del cliente (React + Tailwind)
│   ├── /node_modules
│   ├── /public
│   ├── /src
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── /server
│   ├── /adapters            # Adaptadores de entrada/salida
│   │   └── /database        # Schemas de MongoDB
│   │
│   ├── /application         # Capa de aplicación
│   │   ├── /controllers     # Controladores para diferentes rutas
│   │   ├── /middlewares     # Middlewares de autenticación
│   │   └── /routes          # Definición de rutas
│   │
│   ├── /domain              # Núcleo de la lógica de negocio
│   │   ├── /models          # Modelos de datos
│   │   ├── /repositories    # Interfaces de repositorio
│   │   ├── /services        # Servicios de dominio
│   │   └── /validators      # Validadores de datos
│   │
│   ├── /infrastructure      # Configuración y utilidades
│   │   ├── /database        # Conexión a MongoDB
│   │   ├── /middlewares     # Middlewares generales
│   │   └── /server          # Configuración del servidor
│   │       └── /socket      # Configuración de WebSockets
│   │
│   ├── .env
│   ├── .env.template        # Plantilla de variables de entorno
│   ├── .gitignore
│   ├── package-lock.json
│   ├── package.json
│   └── README.md
```
