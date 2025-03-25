import { Router } from "express";
import * as controller from "../controllers/entrenadores.controller.js";

const route = Router();

route.get("/entrenadores", controller.getEntrenadores); 
route.get("/entrenadores/:id", controller.getEntrenadorId); 
route.post("/entrenadores", controller.agregarEntrenador); 
route.put("/entrenadores/:id", controller.reemplazarEntrenador); 
route.patch("/entrenadores/:id", controller.actualizarEntrenador); 
route.delete("/entrenadores/:id", controller.borrarEntrenador);
route.get("/entrenadores/:id/rutinas", controller.getRutinasEntrenador);

export default route;
