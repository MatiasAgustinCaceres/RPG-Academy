import { Especializacion } from './Especializacion.js';
import { Jugador } from './Jugador.js';

const especializaciones = [
  new Especializacion("Caballero", "Espada", "Guerrero", "Al elegir la espada como tu arma seguirás el camino del Caballero. Disciplinados y valerosos guerreros.", 25),
  new Especializacion("Bárbaro", "Hacha", "Guerrero", "Al elegir la hacha como tu arma seguirás el camino del Bárbaro. Salvajes y feroces guerreros.", 50),
  new Especializacion("Templario", "Maza", "Guerrero", "Al elegir la maza como tu arma seguirás el camino del Templario. Resistentes e incorruptibles guerreros.", 75),

  new Especializacion("Hechicero", "Libro de mágia elemental", "Mago", "El Libro de mágia elemental te llevará por el camino de los Hechiceros. Poderosos magos capaces de manipular los elementos y la naturaleza.", 25),
  new Especializacion("Invocador", "Báculo de invocación", "Mago", "El Báculo de invocación te llevará por el camino de los Invocadores. Poderosos magos capaces de invocar criaturas. Ya sean, o no, de este mundo.", 50),
  new Especializacion("Druida", "Amuleto de Druida", "Mago", "El Amuleto de Druida te llevará por el camino de los Druidas. Poderosos magos capaces de sanar cualquier herida y con el don de la clarividencia.", 75),

  new Especializacion("Arquero", "Arco", "Picaro", "Dominar el Arco te permitirá eliminar a tus enemigos antes de que ellos puedan tocarte.", 25),
  new Especializacion("Asesino", "Dagas", "Picaro", "Dominar las Dagas te permitirá eliminar a tus enemigos antes de que estos noten tu presencia. Las sombras serán tus mejores aliadas.", 50),
  new Especializacion("Monje", "Bastón de monje", "Picaro", "Dominar el Bastón de monje requiere de una impecable agilidad y autocontrol. Tu mente y cuerpo deben ser uno.", 75),
];

// Referencias a elementos del DOM
const btnSiguiente = document.getElementById('btn-siguiente');
const btnFinalizar = document.getElementById('btn-finalizar');
const selectClase = document.getElementById('clase');
const selectArma = document.getElementById('arma');
const descripcionDiv = document.getElementById('descripcion-arma');

const credencialDiv = document.getElementById('credencial');
const accionesFinalesDiv = document.getElementById('acciones-finales');
const mensajeSiguiente = document.getElementById('mensaje-siguiente');
const btnReiniciar = document.getElementById('btn-reiniciar');
const btnIrStore = document.getElementById('btn-ir-store');

// Función para mostrar la credencial con los datos del jugador
function mostrarCredencial(jugador) {
  document.getElementById('cred-nombre').innerText = jugador.nombre;
  document.getElementById('cred-profesion').innerText = jugador.profesion;
  document.getElementById('cred-especialidad').innerText = jugador.especialidad;
  document.getElementById('cred-arma').innerText = jugador.armaPrincipal;
  document.getElementById('cred-creditos').innerText = jugador.balanceCreditos;

  // Ocultar los pasos y la descripción
  document.getElementById('step1').classList.add('hidden');
  document.getElementById('step2').classList.add('hidden');
  document.getElementById('step3').classList.add('hidden');
  descripcionDiv.classList.add('hidden');

  // Mostrar la credencial y acciones finales
  credencialDiv.classList.remove('hidden');
  accionesFinalesDiv.classList.remove('hidden');
}

// Intentar cargar jugador guardado al iniciar la aplicación
const jugadorGuardadoJSON = localStorage.getItem('jugador');
if (jugadorGuardadoJSON) {
  const jugadorGuardado = JSON.parse(jugadorGuardadoJSON);
  mostrarCredencial(jugadorGuardado);
}

// Evento para avanzar al paso 2 (elegir clase)
btnSiguiente.addEventListener('click', () => {
  const nombre = document.getElementById('nombre').value.trim();
  if (nombre === "") {
    alert("Por favor, ingresa tu nombre.");
    return;
  }
  document.getElementById('step1').classList.add('hidden');
  document.getElementById('step2').classList.remove('hidden');
});

// Evento para cargar armas según clase seleccionada
selectClase.addEventListener('change', () => {
  const clase = selectClase.value;
  const opciones = especializaciones.filter(e => e.profesion === clase);

  selectArma.innerHTML = "";
  descripcionDiv.classList.add('hidden');
  descripcionDiv.innerText = "";

  if (opciones.length > 0) {
    opciones.forEach(op => {
      const option = document.createElement('option');
      option.value = op.arma;
      option.textContent = op.arma;
      selectArma.appendChild(option);
    });

    document.getElementById('step3').classList.remove('hidden');
    selectArma.dispatchEvent(new Event('change'));
  } else {
    document.getElementById('step3').classList.add('hidden');
  }
});

// Evento para mostrar descripción y créditos del arma seleccionada
selectArma.addEventListener('change', () => {
  const armaSeleccionada = selectArma.value;
  const especializacion = especializaciones.find(e => e.arma === armaSeleccionada);

  if (especializacion) {
    descripcionDiv.innerHTML = `
      <p>${especializacion.descripcion}</p>
      <p><strong>Créditos requeridos:</strong> ${especializacion.creditosRequeridos}</p>
    `;
    descripcionDiv.classList.remove('hidden');
  } else {
    descripcionDiv.innerText = "";
    descripcionDiv.classList.add('hidden');
  }
});

// Evento para finalizar la creación y guardar jugador en localStorage
btnFinalizar.addEventListener('click', () => {
  const nombre = document.getElementById('nombre').value;
  const arma = selectArma.value;
  const especializacion = especializaciones.find(e => e.arma === arma);

  if (!especializacion) {
    alert("Por favor, selecciona un arma válida.");
    return;
  }

  const jugador = new Jugador(nombre, especializacion.profesion, especializacion.nombre, especializacion.arma);

  // Reducir créditos según especialización
  jugador.balanceCreditos -= especializacion.creditosRequeridos;

  // Guardar en localStorage
  localStorage.setItem('jugador', JSON.stringify(jugador));

  mostrarCredencial(jugador);
});

// Botón para reiniciar (borrar localStorage y recargar)
btnReiniciar.addEventListener('click', () => {
  localStorage.removeItem('jugador');
  location.reload();
});

// Botón para mostrar mensaje Store Coming Soon
btnIrStore.addEventListener('click', () => {
  mensajeSiguiente.classList.remove('hidden');
});
