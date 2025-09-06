export class Jugador {
  constructor(nombre, profesion, especialidad, armaPrincipal, balanceCreditos = 100) {
    this.nombre = nombre;
    this.profesion = profesion;
    this.especialidad = especialidad;
    this.armaPrincipal = armaPrincipal;
    this.balanceCreditos = balanceCreditos;
  }
}
