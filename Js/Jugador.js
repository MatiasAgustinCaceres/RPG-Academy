// Jugador.js
export class Jugador {
  constructor(nombre, profesion, especialidad, armaPrincipal) {
    this.nombre = nombre;
    this.profesion = profesion;
    this.especialidad = especialidad;
    this.armaPrincipal = armaPrincipal;
    this.balanceCreditos = 100; // inicia con 100 créditos
  }
}
