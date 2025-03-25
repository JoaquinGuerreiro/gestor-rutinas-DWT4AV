import * as entrenadoresService from "../services/entrenadores.service.js";


export function crearPaginaConSecciones(titulo, seccionSeleccionada, rutinas = []) {
    let html = `<header>
      <h1>Gestor de Rutinas online</h1>
      <nav>
        <ul>
          <li><a href='/rutinas/cardio'>Cardio</a></li>
          <li><a href='/rutinas/musculacion'>Musculación</a></li>
          <li><a href='/rutinas/flexibilidad'>Flexibilidad</a></li>
          <li><a href='/rutinas/resistencia'>Resistencia</a></li>
          <li><a href='/rutinas/core'>Core</a></li>
        </ul>
      </nav>
      </header>
    `;
  
    if (seccionSeleccionada) {
      html += `<main><h2>Rutinas de ${seccionSeleccionada}</h2>`;
      
      if (rutinas.length > 0) {
        html += `
          <table>
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Duración</th>
              <th>Ver más</th>
            </tr>
        `;
  
        rutinas.forEach(rutina => {
          html += `
            <tr>
              <td><strong>${rutina.nombre}</strong></td>
              <td>${rutina.descripcion}</td>
              <td>${rutina.duracion}</td>
              <td><a href='/rutinas/${seccionSeleccionada}/${rutina._id}'>Ver</a></td>
            </tr>
          `;
        });
  
        html += `</table>`;
      } else {
        html += "<p>No hay rutinas disponibles en esta sección.</p>";
      }
      html += `<br><div class="agregar"><a href='/rutinas/nuevo?seccion=${seccionSeleccionada}'>Agregar Rutina</a> </div>`;
    } else {
      html += "<h2>Selecciona una sección para ver las rutinas</h2>";
      html += `<div class="dumbbell"><img src="/dumbbell.png" alt="Pesa rusa"></div>`;
    }
  
    return crearPagina(titulo, html);
}


export function crearDetallesRutina(rutina, entrenadores = []) { 
  let html = `<header>
    <h1>Detalles de la Rutina</h1></header>
    <main>
    <div class="rutina">
    <div>
      <p><strong>Nombre:</strong> ${rutina.nombre}</p>
      <p><strong>Descripción:</strong> ${rutina.descripcion}</p>
      <p><strong>Nivel:</strong> ${rutina.nivel}</p>
      <p><strong>Duración:</strong> ${rutina.duracion} minutos</p>
      <p><strong>Enlace:</strong> <a href="${rutina.enlace}" target="_blank">Ver</a></p>
      <div class="imagen"><p><strong>Imagen:</strong></p> <img src="${rutina.imagen}" alt="${rutina.nombre}" width="200"/></div>
      <p><strong>Sección:</strong> ${rutina.seccion}</p>
      <a class="modificar" href='/rutinas/modificar/${rutina._id}'>Modificar</a>
      <a class="eliminar" href='/rutinas/eliminar/${rutina._id}'>Eliminar</a>
      <a href='/rutinas/${rutina.seccion}'>Volver a ${rutina.seccion}</a>
    </div>
    <div>
      <img src="/dumbbell.png" alt="Pesa rusa">
    </div>
    </div>
  `;

  if (entrenadores.length > 0) {
      html += `<h2 class="h2entrenadores">Entrenadores Asociados:</h2><div class="entrenadores">`;
      entrenadores.forEach(entrenador => {
          html += `
          <div> 
            <p><strong>${entrenador.nombre}</strong>: ${entrenador.descripcion || 'No disponible'}</p>
            <img src="${entrenador.foto}" alt="${entrenador.nombre}" width="150"/>
          </div>
          
          `
      });
  } else {
      html += `<p>No hay entrenadores asociados a esta rutina.</p> </div>`;
  }

  return html;
}




export async function nuevaRutina(seccionSeleccionada) {
  const entrenadores = await entrenadoresService.getEntrenadores();
  let entrenadoresOptions = entrenadores.map(entrenador => `<option value="${entrenador._id}">${entrenador.nombre}</option>`).join('');

    return `<header>
      <h1>Agregar Nueva Rutina</h1></header>
      <main>
      <form action='/rutinas/nuevo' method='post'>
        <label for='nombre'>Nombre</label>
        <input type='text' name='nombre' required>
        <br>
        <label for='descripcion'>Descripción</label>
        <textarea name='descripcion' required></textarea>
        <br>
        <label for='nivel'>Nivel de dificultad</label>
        <select name='nivel' required>
          <option value='Principiante'>Principiante</option>
          <option value='Intermedio'>Intermedio</option>
          <option value='Avanzado'>Avanzado</option>
        </select>
        <br>
        <label for='duracion'>Duración (en minutos)</label>
        <input type='text' name='duracion' required>
        <br>
        <label for='enlace'>Enlace a video tutorial</label>
        <input type='url' name='enlace' required>
        <br>
        <label for='imagen'>Enlace o ruta de imagen</label>
        <input type='url' name='imagen' required>
        <br>
        <label for='seccion'>Tipo de entrenamiento</label>
        <select name='seccion' required>
          <option value='cardio' ${seccionSeleccionada === 'cardio' ? 'selected' : ''}>Cardio</option>
          <option value='musculacion' ${seccionSeleccionada === 'musculacion' ? 'selected' : ''}>Musculación</option>
          <option value='flexibilidad' ${seccionSeleccionada === 'flexibilidad' ? 'selected' : ''}>Flexibilidad</option>
          <option value='resistencia' ${seccionSeleccionada === 'resistencia' ? 'selected' : ''}>Resistencia</option>
          <option value='core' ${seccionSeleccionada === 'core' ? 'selected' : ''}>Core</option>
        </select>
        <br>
        <label for='entrenadores'>Seleccionar Entrenadores</label>
        <select name='entrenadores' multiple required>
          ${entrenadoresOptions}
        </select>
        <br>
        <button type='submit'>Agregar</button>
      </form>
      <div class="volver"><a href='/rutinas/${seccionSeleccionada}'>Volver a ${seccionSeleccionada}</a></div>
    `;
  }
  
  
  export async function crearModificarRutina(rutina) {
    const entrenadores = await entrenadoresService.getEntrenadores(); 

    let entrenadoresOptions = entrenadores.map(entrenador => {
      const seleccionado = rutina.entrenadores.some(entrenadorId => entrenadorId.toString() === entrenador._id.toString());
      return `<option value="${entrenador._id}" ${seleccionado ? 'selected' : ''}>${entrenador.nombre}</option>`;
  }).join('');

    return `<header>
        <h1>Modificar Rutina</h1></header>
        <main>
        <form action='/rutinas/modificar/${rutina._id}' method='post'>
            <label for='nombre'>Nombre</label>
            <input type='text' name='nombre' value='${rutina.nombre}' required>
            <br>
            <label for='descripcion'>Descripción</label>
            <input type='text' name='descripcion' value='${rutina.descripcion}' required>
            <br>
            <label for='nivel'>Nivel</label>
            <select name='nivel' required>
                <option value='Principiante' ${rutina.nivel === 'Principiante' ? 'selected' : ''}>Principiante</option>
                <option value='Intermedio' ${rutina.nivel === 'Intermedio' ? 'selected' : ''}>Intermedio</option>
                <option value='Avanzado' ${rutina.nivel === 'Avanzado' ? 'selected' : ''}>Avanzado</option>
            </select>            
            <br>
            <label for='duracion'>Duración</label>
            <input type='text' name='duracion' value='${rutina.duracion}' required>
            <br>
            <label for='enlace'>Enlace</label>
            <input type='text' name='enlace' value='${rutina.enlace}' required>
            <br>
            <label for='imagen'>Imagen</label>
            <input type='text' name='imagen' value='${rutina.imagen}' required>
            <br>
            <label for='seccion'>Sección</label>
            <select name='seccion' required>
                <option value='cardio' ${rutina.seccion === 'cardio' ? 'selected' : ''}>Cardio</option>
                <option value='musculacion' ${rutina.seccion === 'musculacion' ? 'selected' : ''}>Musculación</option>
                <option value='flexibilidad' ${rutina.seccion === 'flexibilidad' ? 'selected' : ''}>Flexibilidad</option>
                <option value='resistencia' ${rutina.seccion === 'resistencia' ? 'selected' : ''}>Resistencia</option>
                <option value='core' ${rutina.seccion === 'core' ? 'selected' : ''}>Core</option>
            </select>
            <br>
            <label for='entrenadores'>Seleccionar Entrenadores (mantener Ctrl para seleccionar varios)</label>
            <select name='entrenadores' multiple required>
              ${entrenadoresOptions}
            </select>
            <br>
            <button type='submit'>Modificar</button>
        </form>
        <div class="volver"><a href='/rutinas/${rutina.seccion}/${rutina._id}'>Volver a ${rutina.nombre}</a></div>

    `;
  }
  
  
  export function crearPagina(titulo, contenido) {
    let html = `
    <!DOCTYPE html>
    <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="/styles.css">
            <link rel="icon" href="/dumbbell.jpg">
            <title>${titulo}</title>
        </head>
        <body>
            ${contenido}
            </main>
        </body>
    </html>
    `;
    return html;
  }