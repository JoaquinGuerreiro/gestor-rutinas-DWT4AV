import { Router } from "express";
import * as controller from "../controllers/rutinas.controller.js";

const route = Router();

route.get("/rutinas/nuevo", controller.nuevaRutinaForm);
route.post("/rutinas/nuevo", controller.agregarRutina);

route.get("/rutinas/modificar/:id", controller.modificarRutinaForm);
route.post("/rutinas/modificar/:id", controller.modificarRutina);

route.get("/rutinas/eliminar/:id", controller.eliminarRutina);

route.get("/rutinas", controller.mostrarMenuSecciones);
route.get("/rutinas/:seccion", controller.mostrarMenuSecciones);
route.get('/rutinas/:seccion/:id', controller.mostrarRutinaPorId);

export default route;

