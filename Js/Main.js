import { Especializacion } from './Especializacion.js';
import { Jugador } from './Jugador.js';

const especializaciones = [
  new Especializacion("Caballero", "Espada", "Guerrero", "Al elegir la espada como tu arma seguirás el camino del Caballero. Disciplinados y valerosos guerreros.", 25, "Assets/armas-principales/espada.png"),
  new Especializacion("Bárbaro", "Hacha", "Guerrero", "Al elegir la hacha como tu arma seguirás el camino del Bárbaro. Salvajes y feroces guerreros.", 50, "Assets/armas-principales/hacha.png"),
  new Especializacion("Templario", "Maza", "Guerrero", "Al elegir la maza como tu arma seguirás el camino del Templario. Resistentes e incorruptibles guerreros.", 75, "Assets/armas-principales/maza.png"),

  new Especializacion("Hechicero", "Libro de magia elemental", "Mago", "El Libro de magia elemental te llevará por el camino de los Hechiceros. Poderosos magos capaces de manipular los elementos y la naturaleza.", 25, "Assets/armas-principales/libro-de-magia-elemental.png"),
  new Especializacion("Invocador", "Báculo de invocación", "Mago", "El Báculo de invocación te llevará por el camino de los Invocadores. Poderosos magos capaces de invocar criaturas. Sean, o no, de este mundo.", 50, "Assets/armas-principales/baculo-de-invocacion.png"),
  new Especializacion("Druida", "Amuleto de Druida", "Mago", "El Amuleto de Druida te llevará por el camino de los Druidas. Poderosos magos capaces de sanar cualquier herida y con el don de la clarividencia.", 75, "Assets/armas-principales/amuleto-de-druida.png"),

  new Especializacion("Arquero", "Arco", "Picaro", "Dominar el Arco te permitirá eliminar a tus enemigos antes de que ellos puedan tocarte.", 25, "Assets/armas-principales/arco.png"),
  new Especializacion("Asesino", "Dagas", "Picaro", "Dominar las Dagas te permitirá eliminar a tus enemigos antes de que estos noten tu presencia. Las sombras serán tus mejores aliadas.", 50, "Assets/armas-principales/dagas.png"),
  new Especializacion("Monje", "Bastón de monje", "Picaro", "Dominar el Bastón de monje requiere de una impecable agilidad y autocontrol. Tu mente y cuerpo deben ser uno.", 75, "Assets/armas-principales/baston-de-monje.png")
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
  document.getElementById('cred-nombre').innerText = j.nombre;
  document.getElementById('cred-profesion').innerText = j.profesion;
  document.getElementById('cred-especialidad').innerText = j.especialidad;
  document.getElementById('cred-arma').innerText = j.armaPrincipal;
  document.getElementById('cred-creditos').innerText = j.balanceCreditos;

  // Nuevas estadísticas
  document.getElementById('cred-salud').innerText = j.salud;
  document.getElementById('cred-fuerza').innerText = j.fuerza;
  document.getElementById('cred-inteligencia').innerText = j.inteligencia;
  document.getElementById('cred-destreza').innerText = j.destreza;
  document.getElementById('cred-suerte').innerText = j.suerte;
  document.getElementById('cred-efectos').innerText = j.efectosExtra?.join(', ') || 'Ninguno';

  document.getElementById('pedido-nombre').classList.add('hidden');
  document.getElementById('pedido-clase').classList.add('hidden');
  document.getElementById('pedido-arma').classList.add('hidden');
  credencialDiv.classList.remove('hidden');
  accionesFinalesDiv.classList.remove('hidden');
}

// Pedido de nombre
btnSiguiente.addEventListener('click', () => {
  const nombre = document.getElementById('nombre').value.trim();
  const mensajeError = document.getElementById("mensaje-error-nombre");
  if (nombre === "") {
    mensajeError.textContent = "Por favor, ingresa tu nombre";
    mensajeError.classList.remove("hidden");
    return;
  }

  mensajeError.textContent = "";
  mensajeError.classList.add("hidden");

  document.getElementById('pedido-nombre').classList.add('hidden');
  document.getElementById('pedido-clase').classList.remove('hidden');
});

// Selección de la clase
selectClase.addEventListener('change', () => {
  const clase = selectClase.value;
  const opciones = especializaciones.filter(e => e.profesion === clase);
  opcionesArmasDiv.innerHTML = '';
  armaSeleccionada = null;

  opciones.forEach(op => {
    const card = document.createElement('div');
    card.classList.add('card-arma');
    card.innerHTML = `
      <img src="${op.imagen}" alt="${op.arma}">
      <div>
        <h4>${op.arma}</h4>
        <p>${op.descripcion}</p>
        <p><strong>Créditos requeridos:</strong> ${op.creditosRequeridos}</p>
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

// Finalizar creación del personaje
btnFinalizar.addEventListener('click', () => {
  const nombre = document.getElementById('nombre').value.trim();
  const mensajeError = document.getElementById("mensaje-error-arma");

  if (!armaSeleccionada) {
    mensajeError.textContent = "Por favor, seleccione una de las tres armas antes de presionar el boton finalizar";
    mensajeError.classList.remove("hidden");
    return;
  }

  mensajeError.textContent = "";
  mensajeError.classList.add("hidden");

  const jugador = new Jugador(
    nombre,
    armaSeleccionada.profesion,
    armaSeleccionada.nombre,
    armaSeleccionada.arma
  );

  jugador.balanceCreditos = 100 - armaSeleccionada.creditosRequeridos;

  localStorage.setItem('jugador', JSON.stringify(jugador));

  document.getElementById('cred-nombre').innerText = jugador.nombre;
  document.getElementById('cred-profesion').innerText = jugador.profesion;
  document.getElementById('cred-especialidad').innerText = jugador.especialidad;
  document.getElementById('cred-arma').innerText = jugador.armaPrincipal;
  document.getElementById('cred-creditos').innerText = jugador.balanceCreditos;

  // Nuevas estadísticas
  document.getElementById('cred-salud').innerText = jugador.salud;
  document.getElementById('cred-fuerza').innerText = jugador.fuerza;
  document.getElementById('cred-inteligencia').innerText = jugador.inteligencia;
  document.getElementById('cred-destreza').innerText = jugador.destreza;
  document.getElementById('cred-suerte').innerText = jugador.suerte;
  document.getElementById('cred-efectos').innerText = 'Ninguno';

  document.getElementById('pedido-nombre').classList.add('hidden');
  document.getElementById('pedido-clase').classList.add('hidden');
  document.getElementById('pedido-arma').classList.add('hidden');
  credencialDiv.classList.remove('hidden');
  accionesFinalesDiv.classList.remove('hidden');
});

// Reiniciar
btnReiniciar.addEventListener('click', () => {
  localStorage.removeItem('jugador');
  location.reload();
});

// Ir al Store
btnIrStore.addEventListener('click', () => {
  mensajeSiguiente.classList.remove('hidden');
});
