import { armasStore } from './BaseDeDatos.js';

const productosContainer = document.getElementById('productos');
const carritoLista = document.getElementById('carrito-lista');
const carritoTotal = document.getElementById('carrito-total');
const btnFinalizarCompra = document.getElementById('btn-finalizar-compra');
const btnVolver = document.getElementById('btn-volver');
const toggleCarritoBtn = document.getElementById('toggle-carrito');
const carritoContenedor = document.getElementById('carrito-compras');

let carrito = [];
let total = 0;

// Cargar armas en el DOM
function cargarArmas() {
  productosContainer.innerHTML = '';

  armasStore.forEach((arma, index) => {
    const card = document.createElement('div');
    card.classList.add('card-arma');

    const efectos = arma.efectosEspeciales.length > 0
      ? `<p><strong>Efectos:</strong> ${arma.efectosEspeciales.join(', ')}</p>`
      : '';

    const stats = [];
    if (arma.modificadorSalud) stats.push(`Salud +${arma.modificadorSalud}`);
    if (arma.modificadorFuerza) stats.push(`Fuerza +${arma.modificadorFuerza}`);
    if (arma.modificadorInteligencia) stats.push(`Inteligencia +${arma.modificadorInteligencia}`);
    if (arma.modificadorDestreza) stats.push(`Destreza +${arma.modificadorDestreza}`);
    if (arma.modificadorSuerte) stats.push(`Suerte +${arma.modificadorSuerte}`);

    const botonTexto = arma.stock > 0 ? 'Agregar al carrito' : 'Fuera de stock';
    const botonEstado = arma.stock > 0 ? '' : 'disabled';

    card.innerHTML = `
      <img src="${arma.imagen}" alt="${arma.nombre}">
      <h3>${arma.nombre}</h3>
      <p><strong>Valor:</strong> ${arma.valor} créditos</p>
      <p><strong>Stock:</strong> ${arma.stock}</p>
      ${stats.length ? `<p><strong>Stats:</strong> ${stats.join(', ')}</p>` : ''}
      ${efectos}
      <button data-index="${index}" ${botonEstado}>${botonTexto}</button>
    `;

    productosContainer.appendChild(card);
  });
}

// Manejo de agregar al carrito
productosContainer.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON' && !e.target.disabled) {
    const index = parseInt(e.target.getAttribute('data-index'));
    const arma = armasStore[index];

    if (arma.stock <= 0) {
      alert('Esta arma está agotada.');
      return;
    }

    // Agregar al carrito
    carrito.push({ arma: arma, index: index });
    total += arma.valor;
    arma.stock--;

    actualizarCarrito();
    cargarArmas(); // Recargar las tarjetas con stock actualizado
  }
});

// Quitar un item del carrito
carritoLista.addEventListener('click', (e) => {
  // Si haces click en un item del carrito, lo quitamos
  if (e.target && e.target.dataset && e.target.dataset.carritoIndex !== undefined) {
    const carritoIndex = parseInt(e.target.dataset.carritoIndex);
    const item = carrito[carritoIndex];
    const arma = item.arma;
    const indexEnStore = item.index;

    // Restaurar stock
    armasStore[indexEnStore].stock++;

    // Restar del total
    total -= arma.valor;

    // Quitar del arreglo carrito
    carrito.splice(carritoIndex, 1);

    // Actualizar vista
    actualizarCarrito();
    cargarArmas();
  }
});

// Actualizar el contenido del carrito en el DOM
function actualizarCarrito() {
  carritoLista.innerHTML = '';
  carrito.forEach((item, idx) => {
    const li = document.createElement('li');
    li.innerHTML = `${item.arma.nombre} - ${item.arma.valor} créditos <button class="btn-quitar" data-carrito-index="${idx}">Quitar</button>`;
    carritoLista.appendChild(li);
  });
  carritoTotal.textContent = total;
}

// Finalizar compra
btnFinalizarCompra.addEventListener('click', () => {
  const jugadorGuardado = localStorage.getItem('jugador');
  if (!jugadorGuardado) {
    alert("No hay un jugador creado.");
    return;
  }

  const jugador = JSON.parse(jugadorGuardado);

  if (total > jugador.balanceCreditos) {
    alert("No tienes suficientes créditos.");
    return;
  }

  jugador.balanceCreditos -= total;
  alert(`Compra realizada con éxito. Te quedan ${jugador.balanceCreditos} créditos.`);

  localStorage.setItem('jugador', JSON.stringify(jugador));
  location.reload();
});

// Botón volver
btnVolver.addEventListener('click', () => {
  window.location.href = "index.html";
});

// Colapsar / expandir carrito
toggleCarritoBtn.addEventListener('click', () => {
  const colapsado = carritoContenedor.classList.toggle('colapsado');
  toggleCarritoBtn.innerText = colapsado ? '➕' : '➖';
});

// Inicializar
cargarArmas();
actualizarCarrito();
