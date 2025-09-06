export class Especializacion {
  constructor(nombre, arma, profesion, descripcion, creditosRequeridos, imagen) {
    this.nombre = nombre; // Ej: Caballero
    this.arma = arma; // Ej: Espada
    this.profesion = profesion; // Guerrero, Mago, Picaro
    this.descripcion = descripcion;
    this.creditosRequeridos = creditosRequeridos;
    this.imagen = imagen; // Ruta a la imagen del arma
  }
}
