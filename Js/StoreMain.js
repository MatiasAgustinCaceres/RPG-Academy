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

productosContainer.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON' && !e.target.disabled) {
    const index = parseInt(e.target.getAttribute('data-index'));
    const arma = armasStore[index];

    if (arma.stock <= 0) {
      alert('Esta arma está agotada.');
      return;
    }

    carrito.push({ arma: arma, index: index });
    total += arma.valor;
    arma.stock--;

    actualizarCarrito();
    cargarArmas();
  }
});

carritoLista.addEventListener('click', (e) => {
  if (e.target && e.target.dataset && e.target.dataset.carritoIndex !== undefined) {
    const carritoIndex = parseInt(e.target.dataset.carritoIndex);
    const item = carrito[carritoIndex];
    const arma = item.arma;
    const indexEnStore = item.index;

    armasStore[indexEnStore].stock++;
    total -= arma.valor;
    carrito.splice(carritoIndex, 1);

    actualizarCarrito();
    cargarArmas();
  }
});

function actualizarCarrito() {
  carritoLista.innerHTML = '';
  carrito.forEach((item, idx) => {
    const li = document.createElement('li');
    li.innerHTML = `${item.arma.nombre} - ${item.arma.valor} créditos <button class="btn-quitar" data-carrito-index="${idx}">Quitar</button>`;
    carritoLista.appendChild(li);
  });
  carritoTotal.textContent = total;
}

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

  // Aplicar efectos y atributos de armas compradas
  const efectosConOrigen = [];
  const nombresArmasCompradas = [];

  carrito.forEach(item => {
    const arma = item.arma;

    if (arma.modificadorSalud) jugador.salud += arma.modificadorSalud;
    if (arma.modificadorFuerza) jugador.fuerza += arma.modificadorFuerza;
    if (arma.modificadorInteligencia) jugador.inteligencia += arma.modificadorInteligencia;
    if (arma.modificadorDestreza) jugador.destreza += arma.modificadorDestreza;
    if (arma.modificadorSuerte) jugador.suerte += arma.modificadorSuerte;

    arma.efectosEspeciales.forEach(e => {
      efectosConOrigen.push(`${e} (de ${arma.nombre})`);
    });

    nombresArmasCompradas.push(arma.nombre);
  });

  jugador.efectosEspeciales = (jugador.efectosEspeciales || []).concat(efectosConOrigen);
  jugador.armasCompradas = (jugador.armasCompradas || []).concat(nombresArmasCompradas);

  localStorage.setItem('jugador', JSON.stringify(jugador));

  // Limpiar carrito
  carrito = [];
  total = 0;

  // Volver al index para mostrar credencial ahí
  window.location.href = 'index.html';
});

btnVolver.addEventListener('click', () => {
  window.location.href = "index.html";
});

toggleCarritoBtn.addEventListener('click', () => {
  const colapsado = carritoContenedor.classList.toggle('colapsado');
  toggleCarritoBtn.innerText = colapsado ? '➕' : '➖';
});

// Inicializar vistas
cargarArmas();
actualizarCarrito();
