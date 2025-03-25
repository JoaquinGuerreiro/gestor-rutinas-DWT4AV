import * as service from "../../services/entrenadores.service.js";

function getEntrenadores(req, res) {
    service.getEntrenadores()
        .then((entrenadores) => res.status(200).json(entrenadores))
        .catch((error) => res.status(500).json({ error: error.message }));
}

function getEntrenadorId(req, res) {
    const id = req.params.id;
    service.getEntrenadorId(id)
        .then((entrenador) => {
            if (entrenador) {
                res.status(200).json(entrenador);
            } else {
                res.status(404).json({ message: "Entrenador no encontrado" });
            }
        })
        .catch((error) => res.status(500).json({ error: error.message }));
}

function agregarEntrenador(req, res) {
    service.agregarEntrenador(req.body)
        .then((entrenador) => res.status(201).json(entrenador))
        .catch((error) => res.status(500).json({ error: error.message }));
}

function reemplazarEntrenador(req, res) {
    const id = req.params.id;
    service.reemplazarEntrenador(id, req.body)
        .then((entrenador) => res.status(201).json(entrenador))
        .catch((error) => res.status(500).json({ error: error.message }));
}

function actualizarEntrenador(req, res) {
    const id = req.params.id;
    service.actualizarEntrenador(id, req.body)
        .then((entrenador) => {
            if (entrenador) {
                res.status(201).json(entrenador);
            } else {
                res.status(404).json({ message: "Entrenador no encontrado" });
            }
        })
        .catch((error) => res.status(500).json({ error: error.message }));
}

function borrarEntrenador(req, res) {
    const id = req.params.id;
    service.eliminarEntrenador(id)
        .then(() => res.status(202).json({ id: id }))
        .catch((error) => res.status(500).json({ error: error.message }));
}

function getRutinasEntrenador(req, res) {
    const id = req.params.id;  
    service.getRutinasEntrenador(id)
        .then((rutinas) => {
            if (rutinas.length > 0) {
                res.status(200).json(rutinas);
            } else {
                res.status(404).json({ message: "No se encontraron rutinas para este entrenador" });
            }
        })
        .catch((error) => res.status(500).json({ error: error.message }));
}

export {
    getEntrenadores,
    getEntrenadorId,
    agregarEntrenador,
    reemplazarEntrenador,
    actualizarEntrenador,
    borrarEntrenador,
    getRutinasEntrenador
};
