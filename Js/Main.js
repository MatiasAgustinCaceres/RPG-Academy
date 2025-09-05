document.addEventListener('DOMContentLoaded', function () {
  const especializaciones = [
    { nombre: "Espada", profesion: "Guerrero", descripción: "Al elegir la espada como tu arma seguiras el camino del Caballero. Disiplinados y valerosos gerreros.", creditosRequeridos: 25 },
    { nombre: "Hacha", profesion: "Guerrero", descripción: "Al elegir la hacha como tu arma seguiras el camino del Bárbaro. Salvajes y feroces gerreros.", creditosRequeridos: 50 },
    { nombre: "Maza", profesion: "Guerrero", descripción: "Al elegir la maza como tu arma seguiras el camino del Templario. Resistentes e incorruptibles gerreros.", creditosRequeridos: 75 },
    { nombre: "Libro de mágia elemental", profesion: "Mago", descripción: "El Libro de mágia elemental te llevará por el camino de los Hechiceros. Poderosos magos capaces de manipular los elementos y la naturaleza.", creditosRequeridos: 25 },
    { nombre: "Báculo de invocación", profesion: "Mago", descripción: "El Báculo de invocación te llevará por le camino del los Invocadores. Poderosos magos capaces de invocar criaturas. Ya sean, o no, de este mundo.", creditosRequeridos: 50 },
    { nombre: "Amuleto de Druida", profesion: "Mago", descripción: "El Amuleto de Druida te llevará por le camino del los Druidas. Poderosos magos capaces de sanar cualquier Herida y con el don de la clarividencia.", creditosRequeridos: 75 },
    { nombre: "Arco", profesion: "Picaro", descripción: "Dominar el Arco te permitirá eliminar a tus enemigos antes de que ellos puedan tocarte.", creditosRequeridos: 25 },
    { nombre: "Dagas", profesion: "Picaro", descripción: "Dominar las Dagas te permitirá eliminar a tus enemigos antes de que estos noten tu presencia. Las sombras serán tus mejores aliadas.", creditosRequeridos: 50 },
    { nombre: "Bastón de monje", profesion: "Picaro", descripción: "Dominar Bastón de monje requiere de una impecable agilidad y autocontrol. Tu mente y cuerpo deben ser uno.", creditosRequeridos: 75 }
  ];

  const btnSiguiente = document.getElementById('btn-siguiente');
  const btnFinalizar = document.getElementById('btn-finalizar');
  const selectClase = document.getElementById('clase');
  const selectArma = document.getElementById('arma');
  const descripcionDiv = document.getElementById('descripcion-arma');
  const resultadoDiv = document.getElementById('resultado');

  btnSiguiente.addEventListener('click', () => {
    const nombre = document.getElementById('nombre').value.trim();
    if (nombre === "") {
      alert("Por favor, ingresa tu nombre.");
      return;
    }
    document.getElementById('step1').classList.add('hidden');
    document.getElementById('step2').classList.remove('hidden');
  });

  selectClase.addEventListener('change', () => {
    const clase = selectClase.value;
    const opciones = especializaciones.filter(e => e.profesion === clase);
    
    selectArma.innerHTML = "";
    descripcionDiv.classList.add('hidden');
    descripcionDiv.innerText = "";

    if (opciones.length > 0) {
      opciones.forEach(op => {
        const option = document.createElement('option');
        option.value = op.nombre;
        option.textContent = op.nombre;
        selectArma.appendChild(option);
      });

      document.getElementById('step3').classList.remove('hidden');
      selectArma.dispatchEvent(new Event('change'));
    } else {
      document.getElementById('step3').classList.add('hidden');
    }
  });

  selectArma.addEventListener('change', () => {
    const armaSeleccionada = selectArma.value;
    const especializacion = especializaciones.find(e => e.nombre === armaSeleccionada);

    if (especializacion) {
      descripcionDiv.innerHTML = `
        <p>${especializacion.descripción}</p>
        <p><strong>Créditos requeridos:</strong> ${especializacion.creditosRequeridos}</p>
      `;
      descripcionDiv.classList.remove('hidden');
    } else {
      descripcionDiv.innerText = "";
      descripcionDiv.classList.add('hidden');
    }
  });

  btnFinalizar.addEventListener('click', () => {
    const nombre = document.getElementById('nombre').value;
    const arma = selectArma.value;
    const especializacion = especializaciones.find(e => e.nombre === arma);

    if (!especializacion) {
      alert("Por favor, selecciona un arma válida.");
      return;
    }

    resultadoDiv.innerHTML = `
      <p><strong>${nombre}</strong> ha elegido el camino del <strong>${especializacion.profesion}</strong>.</p>
      <p>Su arma será <strong>${especializacion.nombre}</strong>.</p>
      <p>${especializacion.descripción}</p>
      <p><strong>Créditos requeridos:</strong> ${especializacion.creditosRequeridos}</p>
    `;
    resultadoDiv.classList.remove('hidden');
  });
});
