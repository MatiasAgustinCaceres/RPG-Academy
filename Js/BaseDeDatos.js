import { Especializacion } from './Especializacion.js';
import { Arma } from './Arma.js';

export const especializaciones = [
  new Especializacion(
    "Caballero",
    "Guerrero",
    "Al elegir la espada como tu arma seguirás el camino del Caballero. Disciplinados y valerosos guerreros.",
    new Arma("Espada", 10, 15, 0, 0, 0, [], 0, "Assets/armas-principales/espada.png")
  ),
  new Especializacion(
    "Bárbaro",
    "Guerrero",
    "Al elegir la hacha como tu arma seguirás el camino del Bárbaro. Salvajes y feroces guerreros.",
    new Arma("Hacha", 5, 20, 0, 0, 0, [], 0, "Assets/armas-principales/hacha.png")
  ),
  new Especializacion(
    "Templario",
    "Guerrero",
    "Al elegir la maza como tu arma seguirás el camino del Templario. Resistentes e incorruptibles guerreros.",
    new Arma("Maza", 15, 5, 0, 0, 5, [], 0, "Assets/armas-principales/maza.png")
  ),
  new Especializacion(
    "Hechicero",
    "Mago",
    "El Libro de magia elemental te llevará por el camino de los Hechiceros. Poderosos magos capaces de manipular los elementos y la naturaleza.",
    new Arma("Libro de magia elemental", 10, 0, 15, 0, 0, [], 0, "Assets/armas-principales/libro-de-magia-elemental.png")
  ),
  new Especializacion(
    "Invocador",
    "Mago",
    "El Báculo de invocación te llevará por el camino de los Invocadores. Poderosos magos capaces de invocar criaturas. Sean, o no, de este mundo.",
    new Arma("Báculo de invocación", 5, 0, 20, 0, 0, [], 0, "Assets/armas-principales/baculo-de-invocacion.png")
  ),
  new Especializacion(
    "Druida",
    "Mago",
    "El Amuleto de Druida te llevará por el camino de los Druidas. Poderosos magos capaces de sanar cualquier herida y con el don de la clarividencia.",
    new Arma("Amuleto de Druida", 15, 0, 5, 0, 5, [], 0, "Assets/armas-principales/amuleto-de-druida.png")
  ),
  new Especializacion(
    "Arquero",
    "Picaro",
    "Dominar el Arco te permitirá eliminar a tus enemigos antes de que ellos puedan tocarte.",
    new Arma("Arco", 5, 0, 0, 20, 0, [], 0, "Assets/armas-principales/arco.png")
  ),
  new Especializacion(
    "Asesino",
    "Picaro",
    "Dominar las Dagas te permitirá eliminar a tus enemigos antes de que estos noten tu presencia. Las sombras serán tus mejores aliadas.",
    new Arma("Dagas", 10, 0, 0, 15, 0, [], 0, "Assets/armas-principales/dagas.png")
  ),
  new Especializacion(
    "Monje",
    "Picaro",
    "Dominar el Bastón de monje requiere de una impecable agilidad y autocontrol. Tu mente y cuerpo deben ser uno.",
    new Arma("Bastón de monje", 10, 0, 0, 10, 5, [], 0, "Assets/armas-principales/baston-de-monje.png")
  ),
];