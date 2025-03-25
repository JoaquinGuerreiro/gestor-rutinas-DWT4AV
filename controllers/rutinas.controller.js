import { ObjectId } from "mongodb";
import * as service from "../services/rutinas.service.js";
import * as view from "../views/rutinas.view.js";

function mostrarMenuSecciones(req, res) {
    const seccion = req.params.seccion || null;
    
    if (seccion) {
        service.getRutinas({ seccion })
            .then((rutinas) => {
                const pagina = view.crearPaginaConSecciones("Rutinas de " + seccion, seccion, rutinas);
                res.status(200).send(pagina);
            })
            .catch((error) => {
                res.status(500).send(`Error: ${error.message}`);
            });
    } else {
        const pagina = view.crearPaginaConSecciones("Menú de Rutinas", null);
        res.status(200).send(pagina);
    }
}

function mostrarRutinaPorId(req, res) {
    const id = req.params.id;
    const seccion = req.params.seccion;
    service.getRutinaId(id)
        .then(({ rutina, entrenadores }) => {
            if (rutina) {
                const html = view.crearDetallesRutina(rutina, entrenadores);    
                const pagina = view.crearPagina("Detalles de la Rutina", html);
                res.status(200).send(pagina);
            } else {
                res.status(404).send("Rutina no encontrada");
            }
        })
        .catch((error) => {
            res.status(500).send(`Error: ${error.message}`);
        });
}

async function nuevaRutinaForm(req, res) {
    const seccionSeleccionada = req.query.seccion || '';
    try {
        const html = await view.nuevaRutina(seccionSeleccionada); 
        const pagina = view.crearPagina("Nueva Rutina", html);
        res.status(200).send(pagina);
    } catch (error) {
        res.status(500).send(`Error: ${error.message}`);
    }
}

function agregarRutina(req, res) {
    const nuevaRutina = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion, 
        nivel: req.body.nivel,             
        duracion: parseInt(req.body.duracion),
        enlace: req.body.enlace,           
        imagen: req.body.imagen,           
        seccion: req.body.seccion,
        entrenadores: Array.isArray(req.body.entrenadores) ? req.body.entrenadores.map(id => new ObjectId(id)) : [new ObjectId(req.body.entrenadores)]
     
    };

    service.agregarRutina(nuevaRutina)
    .then(() => res.redirect(`/rutinas/${nuevaRutina.seccion}`))
    .catch((error) => {
            res.status(500).send(`Error: ${error.message}`);
        });
}

async function modificarRutinaForm(req, res) {
    const id = req.params.id;
    try {
        const { rutina, entrenadores } = await service.getRutinaId(id);
        if (rutina) {
            const html = await view.crearModificarRutina(rutina, entrenadores); 
            const pagina = view.crearPagina("Modificar Rutina", html);
            res.status(200).send(pagina);
        } else {
            res.status(404).send("Rutina no encontrada");
        }
    } catch (error) {
        res.status(500).send(`Error: ${error.message}`);
    }
}

function modificarRutina(req, res) {
    const id = req.params.id;
    const rutinaModificada = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion, 
        nivel: req.body.nivel,             
        duracion: parseInt(req.body.duracion),
        enlace: req.body.enlace,           
        imagen: req.body.imagen,           
        seccion: req.body.seccion,  
        entrenadores: Array.isArray(req.body.entrenadores) ? req.body.entrenadores.map(id => new ObjectId(id)) : [new ObjectId(req.body.entrenadores)]          
    };

    service.reemplazarRutina(id, rutinaModificada)
    .then(() => res.redirect(`/rutinas/${rutinaModificada.seccion}/${id}`))
    .catch((error) => {
            res.status(500).send(`Error: ${error.message}`);
        });
}

function eliminarRutina(req, res) {
    const id = req.params.id;

    service.getRutinaId(id)
        .then(({ rutina }) => {
            if (rutina) {
                const seccion = rutina.seccion;
                service.eliminarRutina(id)
                    .then(() => res.redirect(`/rutinas/${seccion}`))
                    .catch((error) => {
                        res.status(500).send(`Error al eliminar la rutina: ${error.message}`);
                    });
            } else {
                res.status(404).send("Rutina no encontrada");
            }
        })
        .catch((error) => {
            res.status(500).send(`Error: ${error.message}`);
        });
}


export {
    mostrarMenuSecciones,
    mostrarRutinaPorId,
    nuevaRutinaForm,
    agregarRutina,
    modificarRutinaForm,
    modificarRutina,
    eliminarRutina
};
