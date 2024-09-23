// Configuración y conexión a MongoDB.
const { MongoClient } = require("mongodb");
class ConnectToDatabase{
    static instanceConnect;
    db;
    connection;
    user;
    #password;
    constructor({user, pwd} = {user: process.env.MONGO_USER, pwd: process.env.MONGO_PWD}){
        if(ConnectToDatabase.instanceConnect && this.connection){
            return ConnectToDatabase.instanceConnect;
        }
        this.user = user;
        this.setPassword = pwd;
        // this.open();
        ConnectToDatabase.instanceConnect = this;
    }
    async connectOpen(){
        this.connection = new MongoClient(`${process.env.MONGO_ACCESS}${this.user}:${this.getPassword}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`);
        try {
            await this.connection.connect();
            this.db = this.connection.db(process.env.MONGO_DB_NAME);
        } catch (error) {
            this.connection = undefined;
            throw new Error('Error connecting');
        }
    }
    async connectClose(){
        this.connection.close();
    }
    get getPassword(){
        return this.#password;
    }
    set setPassword(pwd){
        this.#password = pwd;
    }
}
module.exports = ConnectToDatabase;