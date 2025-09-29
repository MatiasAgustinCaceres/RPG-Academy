export class Arma {
  constructor(
    nombre,
    modificadorSalud,
    modificadorFuerza,
    modificadorInteligencia,
    modificadorDestreza,
    modificadorSuerte,
    efectosEspeciales = [],
    valor = 0,
    stock = 1,
    imagen = ""
  ) {
    this.nombre = nombre;
    this.modificadorSalud = modificadorSalud;
    this.modificadorFuerza = modificadorFuerza;
    this.modificadorInteligencia = modificadorInteligencia;
    this.modificadorDestreza = modificadorDestreza;
    this.modificadorSuerte = modificadorSuerte;
    this.efectosEspeciales = efectosEspeciales;
    this.valor = valor;
    this.stock = stock;
    this.imagen = imagen;
  }
}
