// StoreMain.js
import { armasStore } from './BaseDeDatos.js';

const jugador = JSON.parse(localStorage.getItem('jugador'));

const contenedor = document.getElementById('store-contenedor');
const template = document.getElementById('template-arma');
const spanNombre = document.getElementById('jugador-nombre');
const spanCreditos = document.getElementById('jugador-creditos');
const btnVolver = document.getElementById('btn-volver');

if (!jugador) {
  alert("No hay jugador activo. Redirigiendo al inicio.");
  window.location.href = 'Index.html';
}

spanNombre.innerText = jugador.nombre;
spanCreditos.innerText = jugador.balanceCreditos;

function renderArmas() {
  armasStore.forEach((arma, index) => {
    const clone = template.content.cloneNode(true);

    clone.querySelector('.arma-img').src = arma.imagen;
    clone.querySelector('.arma-img').alt = arma.nombre;
    clone.querySelector('.arma-nombre').innerText = arma.nombre;
    clone.querySelector('.arma-valor').innerText = `Valor: ${arma.valor} créditos`;
    
    const stats = [];
    if (arma.modificadorSalud) stats.push(`Salud +${arma.modificadorSalud}`);
    if (arma.modificadorFuerza) stats.push(`Fuerza +${arma.modificadorFuerza}`);
    if (arma.modificadorInteligencia) stats.push(`Inteligencia +${arma.modificadorInteligencia}`);
    if (arma.modificadorDestreza) stats.push(`Destreza +${arma.modificadorDestreza}`);
    if (arma.modificadorSuerte) stats.push(`Suerte +${arma.modificadorSuerte}`);

    clone.querySelector('.arma-stats').innerText = stats.length ? `Stats: ${stats.join(', ')}` : '';
    clone.querySelector('.arma-efectos').innerText = arma.efectosEspeciales.length
      ? `Efectos: ${arma.efectosEspeciales.join(', ')}`
      : '';

    const btnComprar = clone.querySelector('.btn-comprar');
    btnComprar.disabled = jugador.balanceCreditos < arma.valor;
    btnComprar.innerText = jugador.balanceCreditos >= arma.valor ? 'Comprar' : 'Sin créditos';

    btnComprar.addEventListener('click', () => comprarArma(arma));

    contenedor.appendChild(clone);
  });
}

function comprarArma(arma) {
  if (jugador.balanceCreditos < arma.valor) {
    alert("No tienes suficientes créditos.");
    return;
  }

  jugador.balanceCreditos -= arma.valor;

  // Agregar al inventario (si no existe, crear array)
  if (!jugador.inventario) {
    jugador.inventario = [];
  }
  jugador.inventario.push(arma);

  localStorage.setItem('jugador', JSON.stringify(jugador));

  alert(`¡Has comprado ${arma.nombre}!`);
  location.reload(); // Refrescar tienda con nuevos créditos
}

btnVolver.addEventListener('click', () => {
  window.location.href = 'Index.html';
});

renderArmas();
