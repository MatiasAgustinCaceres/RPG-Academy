export class Jugador {
  constructor(nombre, profesion, especialidad, armaPrincipal) {
    this.nombre = nombre;
    this.profesion = profesion;
    this.especialidad = especialidad;
    this.armaPrincipal = armaPrincipal;
    this.balanceCreditos = 100;

    // Stats iniciales
    this.salud = 0;
    this.fuerza = 0;
    this.inteligencia = 0;
    this.destreza = 0;
    this.suerte = 0;
    this.efectosExtra = [];
  }
}

