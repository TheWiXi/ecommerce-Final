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

### URL BASE

```
http://localhost:3000/
```

# Documentación de Endpoints

## Creación y Gestión de Usuarios

### /users

### Autenticación

### `GET /auth/google`

- **Descripción**: Redirige a la autenticación con Google.
- **Respuestas**:
  - `302`: Redirección a Google para autenticación.

### `GET /auth/google/callback`

- **Descripción**: Callback para la autenticación de Google.
- **Respuestas**:
  - `302`: Redirige a la página principal después de la autenticación.
  - `500`: Error interno del servidor.

### `GET /auth/github`

- **Descripción**: Redirige a la autenticación con GitHub.
- **Respuestas**:
  - `302`: Redirección a GitHub para autenticación.

### `GET /auth/github/callback`

- **Descripción**: Callback para la autenticación de GitHub.
- **Respuestas**:
  - `302`: Redirige a la página principal después de la autenticación.
  - `500`: Error interno del servidor.

### `GET /auth/discord`

- **Descripción**: Redirige a la autenticación con Discord.
- **Respuestas**:
  - `302`: Redirección a Discord para autenticación.

### `GET /auth/discord/callback`

- **Descripción**: Callback para la autenticación de Discord.
- **Respuestas**:
  - `302`: Redirige a la página principal después de la autenticación.
  - `500`: Error interno del servidor.

### `GET /getAllUsersTypeArtesano`

- **Descripción**: Obtiene una lista de todos los usuarios de tipo artesano.
- **Respuestas**:
  - `200`: Un array de usuarios tipo artesano.
  - `500`: Error interno del servidor.

### `GET /:id`

- **Descripción**: Obtiene un usuario específico por su ID.
- **Parámetros**:
  - `id` (obligatorio, en la ruta): El ID del usuario.
- **Respuestas**:
  - `200`: El usuario solicitado.
  - `404`: Usuario no encontrado.

### `GET /searchBar`

- **Descripción**: Realiza una búsqueda en la barra de búsqueda de productos y usuarios.
- **Respuestas**:
  - `200`: Resultados de búsqueda.
  - `400`: Error en los datos de búsqueda.

### `POST /`

- **Descripción**: Crea un nuevo usuario.
- **Parámetros**:
  - `user` (obligatorio, en el cuerpo): Datos del usuario a crear.
- **Respuestas**:
  - `201`: Usuario creado exitosamente.
  - `400`: Datos inválidos del usuario.

```
{
  "nombre": "Alexander Riaño Muñoz",
  "correo": "jaimekimano123456789@gmail.com",
  "contraseña": "123456789",
  "fotoPerfil": "https://lh3.googleusercontent.com/a/ACg8ocI9fepOkrBVJvonrVsDVrlpTPSWg41WX_WyOnUMAha-HLeFrNhV=s96-c",
  "telefono": "3223558494",
  "tipo": "comprador"
} 

```

### `POST /verifyEmail`

- **Descripción**: Verifica el correo electrónico de un usuario.
- **Parámetros**:
  - `email` (obligatorio, en el cuerpo): Correo electrónico a verificar.
- **Respuestas**:
  - `200`: Resultado de la verificación.
  - `400`: Correo electrónico inválido.

```
{
  "correo": "jaimekimano@gmail.com"
} 
```

### `POST /login`

- **Descripción**: Inicia sesión con cookies.
- **Parámetros**:
  - `login` (obligatorio, en el cuerpo): Datos de inicio de sesión del usuario.
- **Respuestas**:
  - `200`: Inicio de sesión exitoso.
  - `401`: No autorizado.

```
{
  "correo": "jaimekimano@gmail.com",
  "contraseña": "123456789"
}
```

### `POST /carrito/:id`

- **Descripción**: Actualiza el carrito de compras de un usuario.
- **Parámetros**:
  - `id` (obligatorio, en la ruta): El ID del usuario.
  - `userUpdate` (obligatorio, en el cuerpo): Datos actualizados del usuario.
- **Respuestas**:
  - `200`: Carrito actualizado exitosamente.
  - `400`: Datos inválidos para la actualización.

```
{
  "compras": ["66f5df6707b38aa8402171dc"]
}
```

### `POST /favorite/:id`

- **Descripción**: Actualiza los productos favoritos de un usuario.
- **Parámetros**:
  - `id` (obligatorio, en la ruta): El ID del usuario.
  - `userUpdate` (obligatorio, en el cuerpo): Datos actualizados del usuario.
- **Respuestas**:
  - `200`: Favoritos actualizados exitosamente.
  - `400`: Datos inválidos para la actualización.

```
{
  "favoritos": ["66f5df6707b38aa8402171dc"]
}
```

### `PUT /:id`

- **Descripción**: Actualiza los datos de un usuario.
- **Parámetros**:
  - `id` (obligatorio, en la ruta): El ID del usuario a actualizar.
  - `userUpdate` (obligatorio, en el cuerpo): Datos actualizados del usuario.
- **Respuestas**:
  - `200`: Usuario actualizado exitosamente.
  - `400`: Datos inválidos para la actualización.

```
{
  "nombre": "Alexander"
}
```

### `PUT /carrito/:id`

- **Descripción**: Elimina el carrito de compras de un usuario.
- **Parámetros**:
  - `id` (obligatorio, en la ruta): El ID del usuario.
  - `userUpdate` (obligatorio, en el cuerpo): Datos actualizados del usuario.
- **Respuestas**:
  - `200`: Carrito eliminado exitosamente.
  - `400`: Datos inválidos para la eliminación.

### `PUT /deleteCarrito/:id`

- **Descripción**: Elimina un producto del carrito de compras de un usuario.
- **Parámetros**:
  - `id` (obligatorio, en la ruta): El ID del usuario.
  - `userUpdate` (obligatorio, en el cuerpo): Datos actualizados del usuario.
- **Respuestas**:
  - `200`: Producto eliminado del carrito exitosamente.
  - `400`: Datos inválidos para la eliminación.

```
{
  "compras": ["66f5df6707b38aa8402171dc"]
}
```

### `PUT /deleteFavorite/:id`

- **Descripción**: Elimina un producto de los favoritos de un usuario.
- **Parámetros**:
  - `id` (obligatorio, en la ruta): El ID del usuario.
  - `userUpdate` (obligatorio, en el cuerpo): Datos actualizados del usuario.
- **Respuestas**:
  - `200`: Producto eliminado de favoritos exitosamente.
  - `400`: Datos inválidos para la eliminación.

### `DELETE /:id`

- **Descripción**: Elimina un usuario.
- **Parámetros**:
  - `id` (obligatorio, en la ruta): El ID del usuario a eliminar.
- **Respuestas**:
  - `204`: Usuario eliminado exitosamente.
  - `404`: Usuario no encontrado.

# Talleres

### /workshops

### `GET /getWorkshopWithArtesanoName`

- **Descripción**: Obtiene una lista de talleres con los nombres de los artesanos.
- **Respuestas**:
  - `200`: Un array de talleres con los nombres de los artesanos.
  - `500`: Error interno del servidor.

### `GET /:id`

- **Descripción**: Obtiene un taller específico por su ID.
- **Parámetros**:
  - `id` (obligatorio, en la ruta): El ID del taller.
- **Respuestas**:
  - `200`: El taller solicitado.
  - `404`: Taller no encontrado.

### `GET /searchForArtesano/:id`

- **Descripción**: Busca los talleres de un artesano específico por su ID.
- **Parámetros**:
  - `id` (obligatorio, en la ruta): El ID del artesano.
- **Respuestas**:
  - `200`: Un array de talleres del artesano especificado.
  - `404`: No se encontraron talleres para el artesano.

### `POST /postingAWorkshop`

- **Descripción**: Crea un nuevo taller.
- **Parámetros**:
  - `workshop` (obligatorio, en el cuerpo): Datos del taller a crear.
- **Respuestas**:
  - `201`: Taller creado exitosamente.
  - `400`: Datos inválidos para el taller.

### `DELETE /:id`

- **Descripción**: Elimina un taller específico por su ID.
- **Parámetros**:
  - `id` (obligatorio, en la ruta): El ID del taller a eliminar.
- **Respuestas**:
  - `204`: Taller eliminado exitosamente.
  - `404`: Taller no encontrado.

### `PUT /:id`

- **Descripción**: Actualiza los datos de un taller por su ID.
- **Parámetros**:
  - `id` (obligatorio, en la ruta): El ID del taller a actualizar.
  - `workshop` (obligatorio, en el cuerpo): Datos actualizados del taller.
- **Respuestas**:
  - `200`: Taller actualizado exitosamente.
  - `400`: Datos inválidos para la actualización.

# Productos

### /products

### `GET /searchAll`

- **Descripción**: Obtiene una lista de todos los productos.
- **Respuestas**:
  - `200`: Un array de todos los productos.
  - `500`: Error interno del servidor.

### `GET /:id`

- **Descripción**: Obtiene un producto específico por su ID, agrupado por artesano con su nombre.
- **Parámetros**:
  - `id` (obligatorio, en la ruta): El ID del producto.
- **Respuestas**:
  - `200`: El producto agrupado por artesano con su nombre.
  - `404`: Producto no encontrado.

### `GET /searchById/:id`

- **Descripción**: Busca un producto específico por su ID.
- **Parámetros**:
  - `id` (obligatorio, en la ruta): El ID del producto.
- **Respuestas**:
  - `200`: El producto solicitado.
  - `404`: Producto no encontrado.

### `POST /searchDiscounts`

- **Descripción**: Busca productos elegibles para descuentos segun la categoria.
- **Parámetros**:
  - `product` (obligatorio, en el cuerpo): Datos del producto para buscar descuentos.
- **Respuestas**:
  - `200`: Un array de productos con descuentos.
  - `400`: Datos inválidos del producto.

```
{
   "categoria": "Joyeria"
}
```

### `POST /`

- **Descripción**: Crea un nuevo producto.
- **Parámetros**:
  - `product` (obligatorio, en el cuerpo): Datos del producto a crear.
- **Respuestas**:
  - `201`: Producto creado exitosamente.
  - `400`: Datos inválidos del producto.

```
{
  "nombre": "Topo Tríptico",
  "categoria": "joyeria",
  "descripcion": "Materia prima Plata 925, Armado - Burilado",
  "precio": 250000,
  "dimensiones": "6 cm x 1 cm",
  "foto": "https://i.pinimg.com/originals/a8/c1/42/a8c1423b50c997d5ff87e151c94e248d.png",
  "stock": 5,
  "descuento": 10,
  "artesanoId":"66f4e8c004599f995cc5f248"
}
```

### `POST /searchCategory`

- **Descripción**: Busca productos en una categoría específica.
- **Parámetros**:
  - `product` (obligatorio, en el cuerpo): Datos del producto para la búsqueda por categoría.
- **Respuestas**:
  - `200`: Un array de productos en la categoría especificada.
  - `400`: Categoría de producto inválida.

```
{
   "categoria": "Joyeria"
}
```

### `POST /searchFavorite`

- **Descripción**: Busca productos favoritos en una categoría específica.
- **Parámetros**:
  - `product` (obligatorio, en el cuerpo): Datos del producto para la búsqueda de favoritos.
- **Respuestas**:
  - `200`: Un array de productos favoritos en la categoría especificada.
  - `400`: Categoría de producto inválida.

```
{
   "categoria": "Joyeria"
}
```

### `PUT /:id`

- **Descripción**: Actualiza los datos de un producto por su ID.
- **Parámetros**:
  - `id` (obligatorio, en la ruta): El ID del producto a actualizar.
  - `product` (obligatorio, en el cuerpo): Datos actualizados del producto.
- **Respuestas**:
  - `200`: Producto actualizado exitosamente.
  - `400`: Datos inválidos para la actualización.

```
{
   "nombre": "Diomira"
}
```

### `DELETE /:id`

- **Descripción**: Elimina un producto específico por su ID.
- **Parámetros**:
  - `id` (obligatorio, en la ruta): El ID del producto a eliminar.
- **Respuestas**:
  - `204`: Producto eliminado exitosamente.
  - `404`: Producto no encontrado.

## Órdenes

### /orders

### `GET /getAllOrders`

- **Descripción**: Obtiene una lista de todas las órdenes.
- **Respuestas**:
  - `200`: Un array de todas las órdenes.
  - `500`: Error interno del servidor.

### `GET /:id`

- **Descripción**: Obtiene una orden específica por su ID.
- **Parámetros**:
  - `id` (obligatorio, en la ruta): El ID de la orden.
- **Respuestas**:
  - `200`: La orden solicitada.
  - `404`: Orden no encontrada.

### `GET /searchUser/:id`

- **Descripción**: Obtiene todas las órdenes asociadas a un usuario específico.
- **Parámetros**:
  - `id` (obligatorio, en la ruta): El ID del usuario.
- **Respuestas**:
  - `200`: Un array de órdenes asociadas al usuario.
  - `404`: No se encontraron órdenes para el usuario.

### `POST /postingNewOrder`

- **Descripción**: Crea una nueva orden.
- **Parámetros**:
  - `order` (obligatorio, en el cuerpo): Datos de la orden a crear.
- **Respuestas**:
  - `201`: Orden creada exitosamente.
  - `400`: Datos inválidos de la orden.

### `DELETE /:id`

- **Descripción**: Elimina una orden específica por su ID.
- **Parámetros**:
  - `id` (obligatorio, en la ruta): El ID de la orden a eliminar.
- **Respuestas**:
  - `204`: Orden eliminada exitosamente.
  - `404`: Orden no encontrada.

### `PUT /:id`

- **Descripción**: Actualiza los datos de una orden por su ID.
- **Parámetros**:
  - `id` (obligatorio, en la ruta): El ID de la orden a actualizar.
  - `order` (obligatorio, en el cuerpo): Datos actualizados de la orden.
- **Respuestas**:
  - `200`: Orden actualizada exitosamente.
  - `400`: Datos inválidos para la actualización.

# Mensajes

### /messages

### `GET /searchAllMessages`

- **Descripción**: Obtiene una lista de todos los mensajes.
- **Respuestas**:
  - `200`: Un array de todos los mensajes.
  - `500`: Error interno del servidor.

### `GET /:id`

- **Descripción**: Obtiene un mensaje específico por su ID.
- **Parámetros**:
  - `id` (obligatorio, en la ruta): El ID del mensaje.
- **Respuestas**:
  - `200`: El mensaje solicitado.
  - `404`: Mensaje no encontrado.

### `POST /newMessage`

- **Descripción**: Crea un nuevo mensaje.
- **Parámetros**:
  - `message` (obligatorio, en el cuerpo): Datos del mensaje a crear.
- **Respuestas**:
  - `201`: Mensaje creado exitosamente.
  - `400`: Datos inválidos del mensaje.

### `DELETE /:id`

- **Descripción**: Elimina un mensaje específico por su ID.
- **Parámetros**:
  - `id` (obligatorio, en la ruta): El ID del mensaje a eliminar.
- **Respuestas**:
  - `204`: Mensaje eliminado exitosamente.
  - `404`: Mensaje no encontrado.

### `PUT /:id`

- **Descripción**: Actualiza los datos de un mensaje por su ID.
- **Parámetros**:
  - `id` (obligatorio, en la ruta): El ID del mensaje a actualizar.
  - `message` (obligatorio, en el cuerpo): Datos actualizados del mensaje.
- **Respuestas**:
  - `200`: Mensaje actualizado exitosamente.
  - `400`: Datos inválidos para la actualización.

## Cupones

### /coupons

### `GET /getAllCoupons`

- **Descripción**: Obtiene una lista de todos los cupones.
- **Respuestas**:
  - `200`: Un array de todos los cupones.
  - `500`: Error interno del servidor.

### `GET /:id`

- **Descripción**: Obtiene un cupón específico por su ID.
- **Parámetros**:
  - `id` (obligatorio, en la ruta): El ID del cupón.
- **Respuestas**:
  - `200`: El cupón solicitado.
  - `404`: Cupón no encontrado.

### `POST /postingCouponsData`

- **Descripción**: Crea un nuevo cupón.
- **Parámetros**:
  - `coupon` (obligatorio, en el cuerpo): Datos del cupón a crear.
- **Respuestas**:
  - `201`: Cupón creado exitosamente.
  - `400`: Datos inválidos del cupón.

```
{
  "codigo": "OFF en joyería de",
  "descuento": 30,
  "tipo": "general",
  "fechaExpiracion": "4/9/25",
  "usuarioId": "66f4ea5104599f995cc5f24c",
  "imagen": "https://i.pinimg.com/originals/19/e5/84/19e58421b7038ea5d910f55716c6779f.png"
}

```

### `DELETE /:id`

- **Descripción**: Elimina un cupón específico por su ID.
- **Parámetros**:
  - `id` (obligatorio, en la ruta): El ID del cupón a eliminar.
- **Respuestas**:
  - `204`: Cupón eliminado exitosamente.
  - `404`: Cupón no encontrado.

### `PUT /:id`

- **Descripción**: Actualiza los datos de un cupón por su ID.
- **Parámetros**:
  - `id` (obligatorio, en la ruta): El ID del cupón a actualizar.
  - `coupon` (obligatorio, en el cuerpo): Datos actualizados del cupón.
- **Respuestas**:
  - `200`: Cupón actualizado exitosamente.
  - `400`: Datos inválidos para la actualización.

```
{
   "codigo": "Cupon2"
}
```

## Chat

### /chat

### `GET /history/:userId`

- **Descripción**: Obtiene el historial de mensajes para un usuario específico.
- **Parámetros**:
  - `userId` (obligatorio, en la ruta): ID del usuario para el que se solicita el historial de mensajes.
- **Respuestas**:
  - `200`: Un objeto que contiene el historial de mensajes del usuario.
  - `404`: Usuario no encontrado o sin historial de mensajes.
  - `500`: Error interno del servidor.

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
│      ├── /database        # Conexión a MongoDB
│      ├── /middlewares     # Middlewares generales
│      ├── /server          # Configuración del servidor
│      └── /socket      # Configuración de WebSockets
│   
├── .env
├── .env.template        # Plantilla de variables de entorno
├── .gitignore
├── package-lock.json
├── package.json
└── README.md
```
