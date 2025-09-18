export class Arma {
  constructor(nombre, modificadorSalud, modificadorFuerza, modificadorInteligencia, modificadorDestreza, modificadorSuerte, efectosEspeciales = [], valor, imagen) {
    this.nombre = nombre;
    this.modificadorSalud = modificadorSalud;
    this.modificadorFuerza = modificadorFuerza;
    this.modificadorInteligencia = modificadorInteligencia;
    this.modificadorDestreza = modificadorDestreza;
    this.modificadorSuerte = modificadorSuerte;
    this.efectosEspeciales = efectosEspeciales;
    this.valor = valor;
    this.imagen = imagen;
  }
}