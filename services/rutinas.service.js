import { MongoClient, ObjectId } from "mongodb";
import * as entrenadoresService from "./entrenadores.service.js";

const client = new MongoClient("mongodb://localhost:27017");
const db = client.db("AH20232CP1");

async function getRutinas(filtros = {}) {
    const filterMongo = { eliminado: { $ne: true } };
    
    if (filtros.seccion) {
        filterMongo.seccion = { $eq: filtros.seccion };
    }
    if (filtros.nivel) {
        filterMongo.nivel = { $eq: filtros.nivel };
    }
    await client.connect();
    return db.collection("Rutinas").find(filterMongo).toArray();
}


async function getRutinaId(id_ingresado) {
    await client.connect();
    const rutina = await db.collection("Rutinas").findOne({ _id: new ObjectId(id_ingresado) });

    if (rutina) {
        const entrenadores = await entrenadoresService.getEntrenadoresPorIds(rutina.entrenadores || []);
        return { rutina, entrenadores }; 
    }
    return null;
    
}

async function agregarRutina(rutina) {
    rutina.entrenadores = rutina.entrenadores.map(id => new ObjectId(id));

    await client.connect();
    await db.collection("Rutinas").insertOne(rutina);
    return rutina;
}

async function reemplazarRutina(id, rutinaActualizada) {
    await client.connect();
    await db.collection("Rutinas").replaceOne({ _id: new ObjectId(id) }, rutinaActualizada);
    return rutinaActualizada;
}

async function actualizarRutina(id, rutinaActualizada) {
    if (rutinaActualizada.entrenadores) {
        rutinaActualizada.entrenadores = rutinaActualizada.entrenadores.map(id => new ObjectId(id));
    }
    await client.connect();
    await db.collection("Rutinas").updateOne({ _id: new ObjectId(id) }, { $set: rutinaActualizada });
    return rutinaActualizada;
}

async function eliminarRutina(id) {
    await client.connect();
    await db.collection("Rutinas").updateOne({ _id: new ObjectId(id) }, { $set: { eliminado: true } });
    return id;
}


export {
    getRutinas,
    getRutinaId,
    agregarRutina,
    reemplazarRutina,
    actualizarRutina,
    eliminarRutina
};
