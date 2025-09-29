import { Especializacion } from './Especializacion.js';
import { Arma } from './Arma.js';

export const especializaciones = [
  new Especializacion(
    "Caballero",
    "Guerrero",
    "Al elegir la espada como tu arma seguirás el camino del Caballero. Disciplinados y valerosos guerreros.",
    new Arma("Espada", 10, 15, 0, 0, 0, [], 0, 1, "Assets/armas-principales/espada.png")
  ),
  new Especializacion(
    "Bárbaro",
    "Guerrero",
    "Al elegir la hacha como tu arma seguirás el camino del Bárbaro. Salvajes y feroces guerreros.",
    new Arma("Hacha", 5, 20, 0, 0, 0, [], 0, 1, "Assets/armas-principales/hacha.png")
  ),
  new Especializacion(
    "Templario",
    "Guerrero",
    "Al elegir la maza como tu arma seguirás el camino del Templario. Resistentes e incorruptibles guerreros.",
    new Arma("Maza", 15, 5, 0, 0, 5, [], 0, 1, "Assets/armas-principales/maza.png")
  ),
  new Especializacion(
    "Hechicero",
    "Mago",
    "El Libro de magia elemental te llevará por el camino de los Hechiceros. Poderosos magos capaces de manipular los elementos y la naturaleza.",
    new Arma("Libro de magia elemental", 10, 0, 15, 0, 0, [], 0, 1, "Assets/armas-principales/libro-de-magia-elemental.png")
  ),
  new Especializacion(
    "Invocador",
    "Mago",
    "El Báculo de invocación te llevará por el camino de los Invocadores. Poderosos magos capaces de invocar criaturas. Sean, o no, de este mundo.",
    new Arma("Báculo de invocación", 5, 0, 20, 0, 0, [], 0, 1, "Assets/armas-principales/baculo-de-invocacion.png")
  ),
  new Especializacion(
    "Druida",
    "Mago",
    "El Amuleto de Druida te llevará por el camino de los Druidas. Poderosos magos capaces de sanar cualquier herida y con el don de la clarividencia.",
    new Arma("Amuleto de Druida", 15, 0, 5, 0, 5, [], 0, 1, "Assets/armas-principales/amuleto-de-druida.png")
  ),
  new Especializacion(
    "Arquero",
    "Picaro",
    "Dominar el Arco te permitirá eliminar a tus enemigos antes de que ellos puedan tocarte.",
    new Arma("Arco", 5, 0, 0, 20, 0, [], 0, 1, "Assets/armas-principales/arco.png")
  ),
  new Especializacion(
    "Asesino",
    "Picaro",
    "Dominar las Dagas te permitirá eliminar a tus enemigos antes de que estos noten tu presencia. Las sombras serán tus mejores aliadas.",
    new Arma("Dagas", 10, 0, 0, 15, 0, [], 0, 1, "Assets/armas-principales/dagas.png")
  ),
  new Especializacion(
    "Monje",
    "Picaro",
    "Dominar el Bastón de monje requiere de una impecable agilidad y autocontrol. Tu mente y cuerpo deben ser uno.",
    new Arma("Bastón de monje", 10, 0, 0, 10, 5, [], 0, 1, "Assets/armas-principales/baston-de-monje.png")
  ),
];

export const armasStore = [
  new Arma("Anillo Mágico", 0, 0, 20, 0, 0, [], 40, 3, "Assets/armas-store/anillo-magico.png"),
  new Arma("Armadura Ligera", 10, 0, 0, 30, 0, [], 80, 1, "Assets/armas-store/armadura-ligera.png"),
  new Arma("Armadura de malla", 15, 25, 0, 0, 0, [], 80, 1, "Assets/armas-store/armadura.png"),
  new Arma("Escudo de acero", 25, 10, 0, 0, 0, [], 70, 2, "Assets/armas-store/escudo-de-acero.png"),
  new Arma("Espada de Cristal", 0, 20, 15, 0, 0, ["La mágia que recubre esta espada la hace tan resistente como el acero y las heridas causadas por esta espada no puden curarse con medicina convencional."], 90, 2, "Assets/armas-store/espada-de-cristal.png"),
  new Arma("Espadas duales", 0, 0, 0, 35, 0, [], 70, 3, "Assets/armas-store/espadas-duales.png"),
  new Arma("Katana", 0, 15, 0, 35, 0, [], 100, 5, "Assets/armas-store/katana.png"),
  new Arma("Lanza Xiaolin", 0, 0, 0, 35, 0, [], 70, 4, "Assets/armas-store/lanza-xiaolin.png"),
  new Arma("Mandoble de acero", 0, 50, 0, 0, 0, [], 100, 3, "Assets/armas-store/mandoble.png"),
  new Arma("Manto de Protección", 15, 0, 10, 10, 0, ["Este manto es capaz de absorber hechizos menores."], 90, 1, "Assets/armas-store/manto-de-proteccion.png"),
  new Arma("Pergamino Antiguo", 0, 35, 0, 0, 0, [], 70, 3, "Assets/armas-store/pergamino-antiguo.png"),
  new Arma("Túnica de mago aprendiz", 5, 0, 35, 0, 0, [], 80, 1, "Assets/armas-store/tunica-de-mago-aprendiz.png"),
  new Arma("Anduril", 20, 70, 0, 0, 0, [], 180, 1, "Assets/armas-lotr1/anduril.png"),
  new Arma("Arco de los Galadhrim", 10, 0, 0, 80, 0, [], 180, 1, "Assets/armas-lotr1/arco-galadhrim.png"),
  new Arma("Bara de Mago", 15, 0, 75, 0, 0, [], 180, 1, "Assets/armas-lotr1/bara-de-mago.png"),
  new Arma("Cuerno de Gondor", 50, 20, 0, 0, 0, ["Al utilizarse, le otroga +10 de fuerza, +10 de inteligencia y +10 de destreza a los aliados cercanos por un pequeño periodo de tiempo. "], 180, 1, "Assets/armas-lotr1/cuerno-de-gondor.png"),
  new Arma("Daga de Westernesse", 0, 20, 20, 0, 0, ["Esta daga es capaz de dañar a las criaturas inmateriales."], 100, 1, "Assets/armas-lotr1/daga-de-westernesse.png"),
  new Arma("Dardo", 10, 10, 0, 35, 0, ["Esta arma elfica se elumina cuando un orco se acerca."], 130, 1, "Assets/armas-lotr1/dardo.png"),
  new Arma("Hacha Enana", 15, 60, 0, 0, 0, [], 150, 1, "Assets/armas-lotr1/hacha-enana.png"),
  new Arma("Luz de Earendil", 0, 0, 50, 0, 30, ["Esta luz es capas de disipar toda oscuridad y ahuyentar a las criaturas que abitan en ella."], 180, 1, "Assets/armas-lotr1/luz-de-Earendil.png"),
  new Arma("Pan de Lembas", 0, 0, 0, 0, 0, ["Al consumirlo, el usuario gana +5 de cada estadistica por un tiempo."], 10, 10, "Assets/armas-lotr1/pan-de-lembas.png"),
  new Arma("Anillo único", 50, 50, 100, 50, 0, ["Todas las capacidades del usuario se verán incrementadas. El usuario podrá entrar al mundo inmaterial si se lo pone, El usuario podrá controlar a los demás usuarios de los anillos de poder. El usuario poco a poco será corrompido y consumido por la locura."], 500, 1, "Assets/armas-lotr2/anillo-unico.png"),
  new Arma("Narya", 50, 70, 0, 0, 30, ["El Anillo del Fuego. Fue creado para inspirar coraje y esperanza, y otorgar valor a quienes lo portaban para resistir la opresión y la desesperación."], 300, 1, "Assets/armas-lotr2/narya.png"),
  new Arma("Nenya", 50, 0, 0, 70, 30, ["El Anillo del Agua. Sus poderes residen en la preservación, la protección y la ocultación del mal."], 300, 1, "Assets/armas-lotr2/nenya.png"),
  new Arma("Vilya", 50, 0, 70, 0, 30, ["El Anillo del Agua. Sus poderes residen la curación y preservación, la capacidad de resguardar y rejuvenecer un lugar, y se especula que poseía control sobre ciertos elementos."], 300, 1, "Assets/armas-lotr2/vilya.png"),
];