import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const cliente = new MongoClient(uri);

async function connect() {
    try {
        await cliente.connect();
        console.log("Conexión exitosa a la base de datos");
        const db = cliente.db("AH20232CP1");
        return db;
    } catch (error) {
        console.error("No me pude conectar a la base de datos: ", error);
        throw error;
    }
}

export default connect;
    