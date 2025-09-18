import { Especializacion } from './Especializacion.js';
import { Jugador } from './Jugador.js';
import { Arma } from './Arma.js';

const especializaciones = [
  new Especializacion(
    "Caballero",
    "Guerrero",
    "Al elegir la espada como tu arma seguirás el camino del Caballero. Disciplinados y valerosos guerreros.",
    new Arma("Espada", 10, 15, 0, 0, 0, [], 0, "Assets/armas-principales/espada.png")
  ),
  new Especializacion(
    "Bárbaro",
    "Guerrero",
    "Al elegir la hacha como tu arma seguirás el camino del Bárbaro. Salvajes y feroces guerreros.",
    new Arma("Hacha", 5, 20, 0, 0, 0, [], 0, "Assets/armas-principales/hacha.png")
  ),
  new Especializacion(
    "Templario",
    "Guerrero",
    "Al elegir la maza como tu arma seguirás el camino del Templario. Resistentes e incorruptibles guerreros.",
    new Arma("Maza", 15, 5, 0, 0, 5, [], 0, "Assets/armas-principales/maza.png")
  ),
  new Especializacion(
    "Hechicero",
    "Mago",
    "El Libro de magia elemental te llevará por el camino de los Hechiceros. Poderosos magos capaces de manipular los elementos y la naturaleza.",
    new Arma("Libro de magia elemental", 10, 0, 15, 0, 0, [], 0, "Assets/armas-principales/libro-de-magia-elemental.png")
  ),
  new Especializacion(
    "Invocador",
    "Mago",
    "El Báculo de invocación te llevará por el camino de los Invocadores. Poderosos magos capaces de invocar criaturas. Sean, o no, de este mundo.",
    new Arma("Báculo de invocación", 5, 0, 20, 0, 0, [], 0, "Assets/armas-principales/baculo-de-invocacion.png")
  ),
  new Especializacion(
    "Druida",
    "Mago",
    "El Amuleto de Druida te llevará por el camino de los Druidas. Poderosos magos capaces de sanar cualquier herida y con el don de la clarividencia.",
    new Arma("Amuleto de Druida", 15, 0, 5, 0, 5, [], 0, "Assets/armas-principales/amuleto-de-druida.png")
  ),
  new Especializacion(
    "Arquero",
    "Picaro",
    "Dominar el Arco te permitirá eliminar a tus enemigos antes de que ellos puedan tocarte.",
    new Arma("Arco", 5, 0, 0, 20, 0, [], 0, "Assets/armas-principales/arco.png")
  ),
  new Especializacion(
    "Asesino",
    "Picaro",
    "Dominar las Dagas te permitirá eliminar a tus enemigos antes de que estos noten tu presencia. Las sombras serán tus mejores aliadas.",
    new Arma("Dagas", 10, 0, 0, 15, 0, [], 0, "Assets/armas-principales/dagas.png")
  ),
  new Especializacion(
    "Monje",
    "Picaro",
    "Dominar el Bastón de monje requiere de una impecable agilidad y autocontrol. Tu mente y cuerpo deben ser uno.",
    new Arma("Bastón de monje", 10, 0, 0, 10, 5, [], 0, "Assets/armas-principales/baston-de-monje.png")
  ),
];

const btnSiguiente = document.getElementById('btn-siguiente');
const btnFinalizar = document.getElementById('btn-finalizar');
const selectClase = document.getElementById('clase');
const opcionesArmasDiv = document.getElementById('opciones-armas');
const credencialDiv = document.getElementById('credencial');
const accionesFinalesDiv = document.getElementById('acciones-finales');
const mensajeSiguiente = document.getElementById('mensaje-siguiente');
const btnReiniciar = document.getElementById('btn-reiniciar');
const btnIrStore = document.getElementById('btn-ir-store');

let armaSeleccionada = null;

// Cargar jugador si existe
const jugadorGuardado = localStorage.getItem('jugador');
if (jugadorGuardado) {
  const j = JSON.parse(jugadorGuardado);
  mostrarCredencial(j);
}

btnSiguiente.addEventListener('click', () => {
  const nombre = document.getElementById('nombre').value.trim();
  const mensajeError = document.getElementById("mensaje-error-nombre");
  if (nombre === "") {
    mensajeError.textContent = "Por favor, ingresa tu nombre";
    mensajeError.classList.remove("hidden");
    return;
  }

  mensajeError.classList.add("hidden");
  document.getElementById('pedido-nombre').classList.add('hidden');
  document.getElementById('pedido-clase').classList.remove('hidden');
});

selectClase.addEventListener('change', () => {
  const clase = selectClase.value;
  const opciones = especializaciones.filter(e => e.profesion === clase);
  opcionesArmasDiv.innerHTML = '';
  armaSeleccionada = null;

  opciones.forEach(op => {
  const arma = op.arma;

  // Construir solo los stats distintos de 0
  const stats = [];
  if (arma.modificadorSalud !== 0) stats.push(`Salud +${arma.modificadorSalud}`);
  if (arma.modificadorFuerza !== 0) stats.push(`Fuerza +${arma.modificadorFuerza}`);
  if (arma.modificadorInteligencia !== 0) stats.push(`Inteligencia +${arma.modificadorInteligencia}`);
  if (arma.modificadorDestreza !== 0) stats.push(`Destreza +${arma.modificadorDestreza}`);
  if (arma.modificadorSuerte !== 0) stats.push(`Suerte +${arma.modificadorSuerte}`);

  const efectos = arma.efectosEspeciales && arma.efectosEspeciales.length > 0
    ? `<p><strong>Efectos:</strong> ${arma.efectosEspeciales.join(', ')}</p>`
    : '';

  const card = document.createElement('div');
  card.classList.add('card-arma');
  card.innerHTML = `
    <img src="${arma.imagen}" alt="${arma.nombre}">
    <div>
      <h4>${arma.nombre}</h4>
      <p>${op.descripcion}</p>
      <p><strong>Créditos requeridos:</strong> ${arma.valor}</p>
      ${stats.length > 0 ? `<p><strong>Stats:</strong> ${stats.join(', ')}</p>` : ''}
      ${efectos}
    </div>
  `;

  card.addEventListener('click', () => {
    document.querySelectorAll('.card-arma').forEach(c => c.classList.remove('seleccionada'));
    card.classList.add('seleccionada');
    armaSeleccionada = op;
  });

  opcionesArmasDiv.appendChild(card);
});

  document.getElementById('pedido-arma').classList.remove('hidden');
});

btnFinalizar.addEventListener('click', () => {
  const nombre = document.getElementById('nombre').value.trim();
  const mensajeError = document.getElementById("mensaje-error-arma");

  if (!armaSeleccionada) {
    mensajeError.textContent = "Por favor, selecciona un arma.";
    mensajeError.classList.remove("hidden");
    return;
  }

  mensajeError.classList.add("hidden");

  const jugador = new Jugador(
    nombre,
    armaSeleccionada.profesion,
    armaSeleccionada.nombre,
    armaSeleccionada.arma.nombre
  );

  const arma = armaSeleccionada.arma;
  jugador.salud += arma.modificadorSalud;
  jugador.fuerza += arma.modificadorFuerza;
  jugador.inteligencia += arma.modificadorInteligencia;
  jugador.destreza += arma.modificadorDestreza;
  jugador.suerte += arma.modificadorSuerte;
  jugador.efectosExtra = arma.efectosEspeciales;
  jugador.balanceCreditos -= arma.valor;

  localStorage.setItem('jugador', JSON.stringify(jugador));
  mostrarCredencial(jugador);
});

btnReiniciar.addEventListener('click', () => {
  localStorage.removeItem('jugador');
  location.reload();
});

btnIrStore.addEventListener('click', () => {
  mensajeSiguiente.classList.remove('hidden');
});

function mostrarCredencial(j) {
  document.getElementById('cred-nombre').innerText = j.nombre;
  document.getElementById('cred-profesion').innerText = j.profesion;
  document.getElementById('cred-especialidad').innerText = j.especialidad;
  document.getElementById('cred-arma').innerText = j.armaPrincipal;
  document.getElementById('cred-creditos').innerText = j.balanceCreditos;

  document.getElementById('cred-salud').innerText = j.salud;
  document.getElementById('cred-fuerza').innerText = j.fuerza;
  document.getElementById('cred-inteligencia').innerText = j.inteligencia;
  document.getElementById('cred-destreza').innerText = j.destreza;
  document.getElementById('cred-suerte').innerText = j.suerte;
  document.getElementById('cred-efectos').innerText = j.efectosExtra.join(', ');

  document.getElementById('pedido-nombre').classList.add('hidden');
  document.getElementById('pedido-clase').classList.add('hidden');
  document.getElementById('pedido-arma').classList.add('hidden');
  credencialDiv.classList.remove('hidden');
  accionesFinalesDiv.classList.remove('hidden');
}
