// 🟡 Importa la clase para conectarse a la base de datos MongoDB.
const ConnectToDatabase = require('./infraestructure/database/mongodb');
// 🟡 Importa la función para crear el servidor Express.
const createServer = require('./infraestructure/server/server');
// 🟡 Carga las variables de entorno desde el archivo .env ubicado en la raíz del proyecto.
require('dotenv').config({ path: '../.env' });

// 🟡 Función asíncrona para iniciar la aplicación.
const startApp = async () => {
    // 🟡 Crea una nueva instancia de ConnectToDatabase.
    let connectToDatabase = new ConnectToDatabase();
    // 🟡 Abre la conexión a la base de datos.
    await connectToDatabase.open();

    // 🟡 Crea el servidor usando la función importada.
    const server = createServer();

    // 🟡 Inicia el servidor en el puerto y host especificados en las variables de entorno.
    server.listen({ port: process.env.EXPRESS_PORT, host: process.env.EXPRESS_HOST }, () => {
        // 🟡 Imprime la URL del servidor en la consola.
        console.log(`http://${process.env.EXPRESS_HOST}:${process.env.EXPRESS_PORT}`);
    });
};

// 🟡 Llama a la función para iniciar la aplicación.
startApp();
