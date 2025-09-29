import { Especializacion } from './Especializacion.js';
import { Arma } from './Arma.js';

export let especializaciones = [];
export let armasStore = [];

// Promesa que se resuelve cuando los datos están cargados
export const datosListos = (async () => {
  try {
    // Cargar JSON de especializaciones
    const resEspecializaciones = await fetch('./json/Especializaciones.json');
    const dataEspecializaciones = await resEspecializaciones.json();

    especializaciones = dataEspecializaciones.especializaciones.map(e =>
      new Especializacion(
        e.nombre,
        e.profesion,
        e.descripcion,
        new Arma(
          e.arma.nombre,
          e.arma.modificadorSalud,
          e.arma.modificadorFuerza,
          e.arma.modificadorInteligencia,
          e.arma.modificadorDestreza,
          e.arma.modificadorSuerte,
          e.arma.efectosEspeciales,
          e.arma.valor,
          e.arma.stock,
          e.arma.imagen
        )
      )
    );

    // Cargar JSON de armasStore
    const resArmas = await fetch('./json/ArmasStore.json');
    const dataArmas = await resArmas.json();

    armasStore = dataArmas.armasStore.map(a =>
      new Arma(
        a.nombre,
        a.modificadorSalud,
        a.modificadorFuerza,
        a.modificadorInteligencia,
        a.modificadorDestreza,
        a.modificadorSuerte,
        a.efectosEspeciales,
        a.valor,
        a.stock,
        a.imagen
      )
    );

    console.log("Datos cargados correctamente.");
  } catch (err) {
    console.error("Error al cargar los datos:", err);
  }
})();
