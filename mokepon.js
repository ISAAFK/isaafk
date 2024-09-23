// Variables globales

const sectionReiniciar = document.getElementById('reiniciar');
sectionReiniciar.style.display = 'none';

const botonMascotaJugador = document.getElementById('boton-mascota');
botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador);

const botonFuego = document.getElementById('boton-fuego');
botonFuego.addEventListener('click', ataqueFuego);

const botonAgua = document.getElementById('boton-agua');
botonAgua.addEventListener('click', ataqueAgua);

const botonTierra = document.getElementById('boton-tierra');
botonTierra.addEventListener('click', ataqueTierra);

const botonReiniciar = document.getElementById('boton-reiniciar');
botonReiniciar.addEventListener('click', reiniciarJuego);

const spanMascotaJugador = document.getElementById('mascota-jugador');

const spanMascotaEnemigo = document.getElementById('mascota-enemigo');

const spanVidasJugador = document.getElementById('vidas-jugador');
const spanVidasEnemigo = document.getElementById('vidas-enemigo');

const sectionMensajes = document.getElementById('resultado');
const ataquesDelJugador = document.getElementById('ataques-del-jugador');
const ataquesDelEnemigo = document.getElementById('ataques-del-enemigo');
const contenedorTarjetas = document.getElementById("contenedorTarjetas");

let Mokepones = []
let ataqueJugador
let ataqueEnemigo
let opcionDeMokepones
let inputAcuabot 
let inputFiretrom 
let inputLandser
let mascotaJugador
let vidasJugador = 3;
let vidasEnemigo = 3;

class Mokepon {
    constructor(nombre, foto, vida) {
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
    }
}

let acuabot = new Mokepon("Acuabot","acuabot.png", 5)

let firetrom = new Mokepon("Firetrom","firetrom.png", 5)

let landser = new Mokepon("Landser", "landser.png", 5)

acuabot.ataques.push(
    {nombre: "💧",id: "boton-agua"},
    {nombre:"💧", id: "boton-agua"},
    {nombre: "💧",id: "boton-agua"},
    {nombre:"🔥", id: "boton-fuego"},
    {nombre:"🌱", id: "boton-tierra"},
)
firetrom.ataques.push(
    {nombre:"🔥", id: "boton-fuego"},
    {nombre:"🔥", id: "boton-fuego"},
    {nombre:"🔥", id: "boton-fuego"},
    {nombre:"🌱", id: "boton-tierra"},
    {nombre:"💧", id: "boton-agua"},
)
landser.ataques.push(
    {nombre: "🌱",id: "boton-tierra"},
    {nombre:"🌱", id: "boton-tierra"},
    {nombre: "🌱",id: "boton-tierra"},
    {nombre:"🔥", id: "boton-fuego"},
    {nombre: "💧",id: "boton-agua"},
)

Mokepones.push(acuabot,firetrom,landser)

// Función principal para iniciar el juego
function iniciarJuego() {
    sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque');
    sectionSeleccionarAtaque.style.display = 'none';

    Mokepones.forEach((Mokepon) => {
        opcionDeMokepones =  `<input type="radio" name="mascota" id= ${Mokepon.nombre}  />
                <label class="tarjeta-de-mokepon" for= ${Mokepon.nombre} >
                    <p>${Mokepon.nombre} </p>
                    <img src=${Mokepon.foto}  alt="${Mokepon.nombre} ">
                </label>`
                contenedorTarjetas.innerHTML += opcionDeMokepones

                inputAcuabot = document.getElementById('Acuabot');
                inputFiretrom = document.getElementById('Firetrom');
                inputLandser = document.getElementById('Landser');
    });

}
function seleccionarMascotaJugador() {

    let sectionSeleccionarMascota = document.getElementById('seleccionar-mascota');
    sectionSeleccionarMascota.style.display = 'none';

    let sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque');
    sectionSeleccionarAtaque.style.display = 'flex';

    if (inputAcuabot.checked) {
        spanMascotaJugador.innerHTML = inputAcuabot.id
        mascotaJugador = inputAcuabot.id
    } else if (inputFiretrom.checked) {
        spanMascotaJugador.innerHTML = inputFiretrom.id
        mascotaJugador = inputFiretrom.id
    } else if (inputLandser.checked) {
        spanMascotaJugador.innerHTML = inputLandser.id
        mascotaJugador = inputLandser.id }
        else alert('Selecciona una mascota');
        
    }
    extraerAtaques(mascotaJugador)
    seleccionarMascotaEnemigo();

    function extraerAtaques(mascotaJugador) {
        let ataques = null; 
        for (let i = 0; i < Mokepones.length; i++) {
            if (mascotaJugador == Mokepones[i].nombre) {
                ataques = Mokepones[i].ataques;
            }
        }
    }
    

// Función para seleccionar la mascota del enemigo de manera aleatoria
function seleccionarMascotaEnemigo() {
    let mascotaAleatoria = aleatorio(0, Mokepones.length -1);

        spanMascotaEnemigo.innerHTML = Mokepones[mascotaAleatoria].nombre
}
// Funciones de ataque del jugador
function ataqueFuego() {
    ataqueJugador = 'FUEGO';
    ataqueAleatorioEnemigo();
}

function ataqueAgua() {
    ataqueJugador = 'AGUA';
    ataqueAleatorioEnemigo();
}

function ataqueTierra() {
    ataqueJugador = 'TIERRA';
    ataqueAleatorioEnemigo();
}

// Función para que el enemigo realice un ataque aleatorio

    
function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = aleatorio(1, 3);

    if (ataqueAleatorio === 1) {
        ataqueEnemigo = 'FUEGO';
    } else if (ataqueAleatorio === 2) {
        ataqueEnemigo = 'AGUA';
    } else {
        ataqueEnemigo = 'TIERRA';
    }

    combate();
}

// Función principal de combate
function combate() {
    if (ataqueEnemigo === ataqueJugador) {
        crearMensaje("EMPATE");
    } else if (ataqueJugador === 'FUEGO' && ataqueEnemigo === 'TIERRA' ||
            ataqueJugador === 'AGUA' && ataqueEnemigo === 'FUEGO' ||
            ataqueJugador === 'TIERRA' && ataqueEnemigo === 'AGUA') {
        crearMensaje("GANASTE");
        vidasEnemigo--;
        spanVidasEnemigo.innerHTML = vidasEnemigo;
    } else {
        crearMensaje("PERDISTE");
        vidasJugador--;
        spanVidasJugador.innerHTML = vidasJugador;
    }

    revisarVidas();
}

// Función para revisar las vidas restantes y determinar el resultado final
function revisarVidas() {
    if (vidasEnemigo === 0) {
        crearMensajeFinal("FELICITACIONES! Ganaste :)");
    } else if (vidasJugador === 0) {
        crearMensajeFinal("Lo siento, perdiste :(");
    }
}

// Función para crear mensajes de resultado durante el juego
function crearMensaje(resultado) {
    let nuevoAtaqueDelJugador = document.createElement('p');
    let nuevoAtaqueDelEnemigo = document.createElement('p');

    sectionMensajes.innerHTML = resultado;
    nuevoAtaqueDelJugador.innerHTML = ataqueJugador;
    nuevoAtaqueDelEnemigo.innerHTML = ataqueEnemigo;

    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador);
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo);
}

// Función para crear mensaje final cuando se acaba el juego
function crearMensajeFinal(resultadoFinal) {
    
    sectionMensajes.innerHTML = resultadoFinal;
    botonFuego.disabled = true;
    botonAgua.disabled = true;
    botonTierra.disabled = true;
    sectionReiniciar.style.display = 'block';
}
function reiniciarJuego() {
    location.reload();
}
// Función para generar números aleatorios entre min y max (incluidos)
function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
// Evento cuando la ventana se carga, inicia el juego
window.addEventListener('load', iniciarJuego);
