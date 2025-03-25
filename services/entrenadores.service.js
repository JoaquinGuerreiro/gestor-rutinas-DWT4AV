import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient("mongodb://localhost:27017");
const db = client.db("AH20232CP1");


async function getEntrenadores(filtros = {}) {
    const filterMongo = { eliminado: { $ne: true } }; 
    
    await client.connect();
    return db.collection("Entrenadores").find(filterMongo).toArray();
}

async function getEntrenadorId(id_ingresado) {
    await client.connect();
    const entrenador = await db.collection("Entrenadores").findOne({ _id: new ObjectId(id_ingresado) });
    return entrenador;
}

async function getEntrenadoresPorIds(ids) {
    // console.log("IDs de entrenadores:", ids);
    if (ids.length === 0) return []; 

    const objectIds = ids.map(id => new ObjectId(id)); 
    const entrenadores = await db.collection("Entrenadores").find({ _id: { $in: objectIds } }).toArray();
    // console.log("Entrenadores encontrados:", entrenadores);
    return entrenadores;
}


async function agregarEntrenador(entrenador) {
    await client.connect();
    await db.collection("Entrenadores").insertOne(entrenador);
    return entrenador;
}

async function reemplazarEntrenador(id, entrenadorActualizado) {
    await client.connect();
    await db.collection("Entrenadores").replaceOne({ _id: new ObjectId(id) }, entrenadorActualizado);
    return entrenadorActualizado;
}

async function actualizarEntrenador(id, entrenadorActualizado) {
    await client.connect();
    await db.collection("Entrenadores").updateOne({ _id: new ObjectId(id) }, { $set: entrenadorActualizado });
    return entrenadorActualizado;
}

async function eliminarEntrenador(id) {
    await client.connect();
    await db.collection("Entrenadores").updateOne({ _id: new ObjectId(id) }, { $set: { eliminado: true } });
    return id;
}

async function getRutinasEntrenador(entrenadorId) {
    await client.connect();
    
    const rutinas = await db.collection("Rutinas").find({ entrenadores: new ObjectId(entrenadorId) }).toArray();
    
    return rutinas;
}

export {
    getEntrenadoresPorIds,
    getEntrenadores,
    getEntrenadorId,
    agregarEntrenador,
    reemplazarEntrenador,
    actualizarEntrenador,
    eliminarEntrenador,
    getRutinasEntrenador
};
