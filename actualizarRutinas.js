import { MongoClient, ObjectId } from 'mongodb';

async function main() {
    const uri = 'mongodb://localhost:27017'; // Reemplaza con tu URI
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db('AH20232CP1'); // Reemplaza con el nombre de tu base de datos

        const rutinas = await db.collection("Rutinas").find({}).toArray();

        for (const rutina of rutinas) {
            const entrenadoresIds = rutina.entrenadores.map(id => new ObjectId(id));
            await db.collection("Rutinas").updateOne(
                { _id: rutina._id },
                { $set: { entrenadores: entrenadoresIds } }
            );
        }

        console.log('Rutinas actualizadas con ObjectId para entrenadores.');
    } finally {
        await client.close();
    }
}

main().catch(console.error);
