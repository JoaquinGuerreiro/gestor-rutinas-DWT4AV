import { Router } from "express";
import * as controller from "../controllers/rutinas.controller.js";

const route = Router();

route.get("/rutinas", controller.getRutinas);
route.get("/rutinas/:id", controller.getRutinaId);
route.post("/rutinas", controller.agregarRutina);
route.put("/rutinas/:id", controller.reemplazarRutina);     
route.patch("/rutinas/:id", controller.actualizarRutina);    
route.delete("/rutinas/:id", controller.borrarRutina);       

export default route;
