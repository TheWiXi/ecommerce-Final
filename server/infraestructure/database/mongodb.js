const mongoose = require('mongoose');

module.exports = class connect {
    static instance;
    #user;
    #port;
    #pass;
    #host;
    #cluster;
    #dbName;
    #connection;
    uri;
    constructor() {
        if (typeof connect.instance === 'object') {
            return connect.instance;
        }
        this.#user = process.env.MONGO_USER;
        this.#port = process.env.MONGO_PORT;
        this.#pass = process.env.MONGO_PWD;
        this.#host = process.env.MONGO_ACCESS;
        this.#cluster = process.env.MONGO_HOST;
        this.#dbName = process.env.MONGO_DB_NAME;
        this.uri =`${this.#host}${this.#user}:${this.#pass}@${this.#cluster}:${this.#port}/${this.#dbName}`
        connect.instance = this;
        return this;
    }

    async open() {
        try{
            await mongoose
            .connect(this.uri)
            .then(() => console.log("MongoDB connection established successfully",this.uri))
        }
        catch(error) {
            console.error("MongoDB connection failed", error);
            await this.reconnect();
        }
    }   

    async reconnect() {
        console.log('Reconnecting to MongoDB...');
        await this.open();
    }

    async close() {
        mongoose.disconnect()
        .then(() => console.log('MongoDB connection closed'))
        .catch(err => console.error('Error to close MongoDB connection:', err));
    }
}