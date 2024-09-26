import { Router } from "express";
import * as controller from "../controllers/peliculas.controller.js"

const route = Router()

route.get( "/peliculas", controller.getPeliculas )
route.get( "/peliculas/:id", controller.getPeliculaId )
route.post( "/peliculas", controller.agregarPelicula )
route.put("/peliculas/:id", controller.reemplazarPelicula)      //Reemplaza
route.patch("/peliculas/:id", controller.actualizarPelicula)    //Actualiza
route.delete("/peliculas/:id", controller.borrarPelicula)    //Eliminar

export default route