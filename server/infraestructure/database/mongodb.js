const mongoose = require('mongoose'); // 🟡 Importa mongoose para conectarse a la base de datos MongoDB.

module.exports = class connect {
    static instance; // 🟡 Almacena la instancia de la clase para implementar el patrón singleton.
    #user; // 🟡 Almacena el nombre de usuario para la conexión a la base de datos.
    #port; // 🟡 Almacena el puerto para la conexión a la base de datos.
    #pass; // 🟡 Almacena la contraseña para la conexión a la base de datos.
    #host; // 🟡 Almacena la dirección del host para la conexión a la base de datos.
    #cluster; // 🟡 Almacena el cluster de MongoDB.
    #dbName; // 🟡 Almacena el nombre de la base de datos.
    #connection; // 🟡 Almacena la conexión a la base de datos.
    uri; // 🟡 Almacena la URI de conexión a MongoDB.

    constructor() {
        // 🟡 Implementación del patrón singleton: si ya existe una instancia, devuelve la existente.
        if (typeof connect.instance === 'object') {
            return connect.instance;
        }
        // 🟡 Asigna los valores de las variables de entorno a las propiedades de la clase.
        this.#user = process.env.MONGO_USER;
        this.#port = process.env.MONGO_PORT;
        this.#pass = process.env.MONGO_PWD;
        this.#host = process.env.MONGO_ACCESS;
        this.#cluster = process.env.MONGO_HOST;
        this.#dbName = process.env.MONGO_DB_NAME;

        // 🟡 Crea la URI de conexión a MongoDB.
        this.uri = `${this.#host}${this.#user}:${this.#pass}@${this.#cluster}/${this.#dbName}`;
        connect.instance = this; // 🟡 Guarda la instancia actual en la propiedad estática.
        return this; // 🟡 Devuelve la instancia de la clase.
    }

    /**
     * Abre la conexión a la base de datos MongoDB.
     * @returns {Promise} - Devuelve una promesa que se resuelve cuando la conexión es exitosa.
     */
    async open() {
        try {
            await mongoose
                .connect(this.uri) // 🟡 Intenta conectarse a MongoDB con la URI proporcionada.
                .then(() => console.log("MongoDB connection established successfully", this.uri)); // 🟡 Muestra un mensaje si la conexión es exitosa.
        } catch (error) {
            console.error("MongoDB connection failed", error); // 🟡 Muestra un mensaje de error si la conexión falla.
            await this.reconnect(); // 🟡 Intenta reconectar si hay un fallo en la conexión.
        }
    }

    /**
     * Reconecta a la base de datos MongoDB.
     * @returns {Promise} - Devuelve una promesa que se resuelve cuando la reconexión es exitosa.
     */
    async reconnect() {
        console.log('Reconnecting to MongoDB...'); // 🟡 Muestra un mensaje indicando que se intenta reconectar.
        await this.open(); // 🟡 Llama al método open para reconectar.
    }

    /**
     * Cierra la conexión a la base de datos MongoDB.
     * @returns {Promise} - Devuelve una promesa que se resuelve cuando la conexión se cierra.
     */
    async close() {
        mongoose.disconnect() // 🟡 Intenta desconectar de MongoDB.
            .then(() => console.log('MongoDB connection closed')) // 🟡 Muestra un mensaje si la desconexión es exitosa.
            .catch(err => console.error('Error to close MongoDB connection:', err)); // 🟡 Muestra un mensaje de error si falla al cerrar la conexión.
    }
}
