import { armasStore, datosListos } from './BaseDeDatos.js';

const productosContainer = document.getElementById('productos');
const carritoLista = document.getElementById('carrito-lista');
const carritoTotal = document.getElementById('carrito-total');
const btnFinalizarCompra = document.getElementById('btn-finalizar-compra');
const btnVolver = document.getElementById('btn-volver');
const toggleCarritoBtn = document.getElementById('toggle-carrito');
const carritoContenedor = document.getElementById('carrito-compras');

let carrito = [];
let total = 0;

// Función para mostrar toast con Toastify (abajo a la derecha)
function mostrarToast(mensaje, color = "#4caf50", duracion = 2500) {
  Toastify({
    text: mensaje,
    duration: duracion,
    gravity: "bottom", // ahora abajo
    position: "right", // y a la derecha
    backgroundColor: color
  }).showToast();
}

// Cargar armas en la vista
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
      <div>
        <h3>${arma.nombre}</h3>
        <p><strong>Valor:</strong> ${arma.valor} créditos</p>
        <p><strong>Stock:</strong> ${arma.stock}</p>
        ${stats.length ? `<p><strong>Stats:</strong> ${stats.join(', ')}</p>` : ''}
        ${efectos}
      </div>
      <button data-index="${index}" ${botonEstado}>${botonTexto}</button>
    `;

    productosContainer.appendChild(card);
  });
}

// Actualizar carrito en la vista
function actualizarCarrito() {
  carritoLista.innerHTML = '';
  carrito.forEach((item, idx) => {
    const li = document.createElement('li');
    li.innerHTML = `${item.arma.nombre} - ${item.arma.valor} créditos <button class="btn-quitar" data-carrito-index="${idx}">Quitar</button>`;
    carritoLista.appendChild(li);
  });
  carritoTotal.textContent = total;
}

// Cargar stock guardado en localStorage
function cargarStockGuardado() {
  const stockGuardado = JSON.parse(localStorage.getItem('stockArmas')) || {};
  armasStore.forEach(a => {
    const cantidadEnCarrito = carrito.filter(c => c.arma.nombre === a.nombre).length;
    a.stock = (stockGuardado[a.nombre] !== undefined ? stockGuardado[a.nombre] : a.stock) - cantidadEnCarrito;
    if (a.stock < 0) a.stock = 0;
  });
}

// Manejo de agregar arma al carrito
productosContainer.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON' && !e.target.disabled) {
    const index = parseInt(e.target.getAttribute('data-index'));
    const arma = armasStore[index];

    if (arma.stock <= 0) {
      mostrarToast(`La arma "${arma.nombre}" está agotada.`, "#ff6b6b");
      return;
    }

    carrito.push({ arma: arma, index: index });
    total += arma.valor;
    arma.stock--;

    let stockActualizado = {};
    armasStore.forEach(a => stockActualizado[a.nombre] = a.stock + carrito.filter(c => c.arma.nombre === a.nombre).length);
    localStorage.setItem('stockArmas', JSON.stringify(stockActualizado));

    actualizarCarrito();
    cargarArmas();

    mostrarToast(`"${arma.nombre}" agregado al carrito.`);
  }
});

// Manejo de quitar del carrito
carritoLista.addEventListener('click', (e) => {
  if (e.target && e.target.dataset && e.target.dataset.carritoIndex !== undefined) {
    const carritoIndex = parseInt(e.target.dataset.carritoIndex);
    const item = carrito[carritoIndex];
    const arma = item.arma;
    const indexEnStore = item.index;

    carrito.splice(carritoIndex, 1);
    total -= arma.valor;
    armasStore[indexEnStore].stock++;

    let stockActualizado = {};
    armasStore.forEach(a => stockActualizado[a.nombre] = a.stock + carrito.filter(c => c.arma.nombre === a.nombre).length);
    localStorage.setItem('stockArmas', JSON.stringify(stockActualizado));

    actualizarCarrito();
    cargarArmas();

    mostrarToast(`"${arma.nombre}" removido del carrito.`, "#f9a825");
  }
});

// Finalizar compra
btnFinalizarCompra.addEventListener('click', () => {
  const jugadorGuardado = localStorage.getItem('jugador');
  if (!jugadorGuardado) {
    mostrarToast("No hay un jugador creado.", "#ff6b6b");
    return;
  }

  const jugador = JSON.parse(jugadorGuardado);

  if (total > jugador.balanceCreditos) {
    mostrarToast("No tienes suficientes créditos.", "#ff6b6b");
    return;
  }

  jugador.balanceCreditos -= total;
  const efectosConOrigen = [];
  const nombresArmasCompradas = [];

  carrito.forEach(item => {
    const arma = item.arma;
    if (arma.modificadorSalud) jugador.salud += arma.modificadorSalud;
    if (arma.modificadorFuerza) jugador.fuerza += arma.modificadorFuerza;
    if (arma.modificadorInteligencia) jugador.inteligencia += arma.modificadorInteligencia;
    if (arma.modificadorDestreza) jugador.destreza += arma.modificadorDestreza;
    if (arma.modificadorSuerte) jugador.suerte += arma.modificadorSuerte;

    arma.efectosEspeciales.forEach(e => efectosConOrigen.push(`${e} (de ${arma.nombre})`));
    nombresArmasCompradas.push(arma.nombre);
  });

  jugador.efectosEspeciales = (jugador.efectosEspeciales || []).concat(efectosConOrigen);
  jugador.armasCompradas = (jugador.armasCompradas || []).concat(nombresArmasCompradas);

  localStorage.setItem('jugador', JSON.stringify(jugador));
  carrito = [];
  total = 0;

  // ✅ SweetAlert para compra exitosa
  Swal.fire({
    title: "¡Compra realizada con éxito!",
    text: "Tus armas se han añadido al inventario.",
    icon: "success",
    confirmButtonText: "Aceptar"
  }).then(() => {
    window.location.href = 'index.html';
  });
});

// Botones adicionales
btnVolver.addEventListener('click', () => {
  window.location.href = "index.html";
});

toggleCarritoBtn.addEventListener('click', () => {
  const colapsado = carritoContenedor.classList.toggle('colapsado');
  toggleCarritoBtn.innerText = colapsado ? '➕' : '➖';
});

// Inicialización después de cargar datos del JSON
datosListos.then(() => {
  carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
  total = carrito.reduce((acc, item) => acc + item.arma.valor, 0);

  cargarStockGuardado();
  cargarArmas();
  actualizarCarrito();
});

// Guardar carrito automáticamente en localStorage al salir
window.addEventListener('beforeunload', () => {
  localStorage.setItem('carrito', JSON.stringify(carrito));
});
