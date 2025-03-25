import express from "express";
import rutinasRoute from "./routes/rutinas.routes.js";
import apiRoute from "./api/routes/rutinas.routes.js";
import entrenadoresRoute from "./api/routes/entrenadores.routes.js";
// import path from 'path';


const app = express();

// app.use(express.static(path.join(process.cwd(), 'public')));
app.use(express.static ("public"))

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.redirect('/rutinas');
});

app.use("/api", apiRoute);
app.use("/api", entrenadoresRoute);
app.use(rutinasRoute);

app.listen(3333, () => console.log("Servidor funcionando en el puerto 3333"));