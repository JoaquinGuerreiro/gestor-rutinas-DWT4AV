import * as service from "../../services/rutinas.service.js";

function getRutinas(req, res) {
    console.log("Filtros", req.query);
    const filtros = {};

    if (req.query.nivel) {
        filtros.nivel = req.query.nivel;
    }
    if (req.query.seccion) {
        filtros.seccion = req.query.seccion;
    }

    service.getRutinas(filtros)
        .then((rutinas) => res.status(200).json(rutinas))
        .catch((error) => res.status(500).json({ error: error.message }));
}

function getRutinaId(req, res) {
    const id = req.params.id;
    service.getRutinaId(id)
        .then((rutina) => {
            if (rutina) {
                res.status(200).json(rutina);
            } else {
                res.status(404).json({ message: "Rutina no encontrada" });
            }
        })
        .catch((error) => res.status(500).json({ error: error.message }));
}

function agregarRutina(req, res) {
    service.agregarRutina(req.body)
        .then((rutina) => res.status(201).json(rutina))
        .catch((error) => res.status(500).json({ error: error.message }));
}

function reemplazarRutina(req, res) {
    const id = req.params.id;
    service.reemplazarRutina(id, req.body)
        .then((rutina) => res.status(201).json(rutina))
        .catch((error) => res.status(500).json({ error: error.message }));
}

function actualizarRutina(req, res) {
    const id = req.params.id;
    service.actualizarRutina(id, req.body)
        .then((rutina) => {
            if (rutina) {
                res.status(201).json(rutina);
            } else {
                res.status(404).json({ message: "Rutina no encontrada" });
            }
        })
        .catch((error) => res.status(500).json({ error: error.message }));
}

function borrarRutina(req, res) {
    const id = req.params.id;
    service.eliminarRutina(id)
        .then(() => res.status(202).json({ id: id }))
        .catch((error) => res.status(500).json({ error: error.message }));
}

export {
    getRutinas,
    getRutinaId,
    agregarRutina,
    reemplazarRutina,
    actualizarRutina,
    borrarRutina
};
