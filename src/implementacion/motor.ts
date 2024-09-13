import { Carta, Tablero } from "./model";
import { pintarDivs, reiniciarEstadoCarta } from "./ui";

const barajarCartas = (cartas: Carta[]): Carta[] => {
  const cartasBarajadas = [...cartas];

  for (var i = cartasBarajadas.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = cartasBarajadas[i];
    cartasBarajadas[i] = cartasBarajadas[j];
    cartasBarajadas[j] = temp;
  }
  return cartasBarajadas;
};

const sePuedeVoltearLaCarta = (tablero: Tablero, indice: number): boolean => {
  const carta = tablero.cartas[indice];
  console.log(carta) //esto creo que lo hemos puesto aqui para probar cosas
  if (carta.encontrada) {
    return false;
  }

  if (carta.estaVuelta) {
    return false;
  }

  console.log(tablero.estadoPartida) //esto creo que lo hemos puesto aqui para probar cosas

  if (tablero.estadoPartida === "DosCartasLevantadas") {
    return false;
  }

  if (tablero.estadoPartida === "PartidaNoIniciada") {
    return false;
  }

  if (tablero.estadoPartida === "PartidaCompleta") {
    return false;
  }

  return true;
};

export const sonPareja = (
  indiceA: number,
  indiceB: number,
  tablero: Tablero
): boolean => {
  const cartaA = tablero.cartas[indiceA];
  const cartaB = tablero.cartas[indiceB];

  if (cartaA.idFoto === cartaB.idFoto) {
    return true;
  }

  return false;
};

const voltearLaCarta = (tablero: Tablero, indice: number): void => {
  const carta = tablero.cartas[indice];

  if (!sePuedeVoltearLaCarta(tablero, indice)) {
    return;
  }
  console.log("HERE") //TEST TEST

  const cartasDOM = document.getElementsByClassName("cardContainer");
  cartasDOM[indice].classList.toggle("flipped");

  carta.estaVuelta = true;

  if (tablero.estadoPartida === "CeroCartasLevantadas") {
    tablero.estadoPartida = "UnaCartaLevantada";
    tablero.indiceCartaVolteadaA = indice;
  } else if (tablero.estadoPartida === "UnaCartaLevantada") {
    tablero.estadoPartida = "DosCartasLevantadas";
    tablero.indiceCartaVolteadaB = indice;

    if (
      sonPareja(
        tablero.indiceCartaVolteadaA!, 
        tablero.indiceCartaVolteadaB,
        tablero
      )
    ) {
      parejaEncontrada(
        tablero,
        tablero.indiceCartaVolteadaA!,
        tablero.indiceCartaVolteadaB
      );
    } else {
      parejaNoEncontrada(
        tablero,
        tablero.indiceCartaVolteadaA!,
        tablero.indiceCartaVolteadaB
      );
    }

    tablero.estadoPartida = "CeroCartasLevantadas";
    tablero.indiceCartaVolteadaA = undefined;
    tablero.indiceCartaVolteadaB = undefined;
  }
};

export const esPartidaCompleta = (tablero: Tablero): boolean => {
  const cartas = tablero.cartas;
  const todasEncontradas = cartas.every((carta) => {
    return carta.encontrada; 
  });
  return todasEncontradas;
};

const parejaEncontrada = (
  tablero: Tablero,
  indiceA: number,
  indiceB: number
): void => {
  const cartaA = tablero.cartas[indiceA];
  const cartaB = tablero.cartas[indiceB];
  cartaA.encontrada = true;
  cartaB.encontrada = true;
  const partidaCompleta = esPartidaCompleta(tablero); 
  if(partidaCompleta){
    alert("You win") // DE MOMENTO LUEGO YA TOQUETEAMOS CSS PARA QUE SALGA BONITO CON DIVS ETC Z-INDEX PARA PONER EL YOU WIN POR ENCIMA DE TODO POR EJEMPLO
  }
};

const parejaNoEncontrada = (
  tablero: Tablero,
  indiceA: number,
  indiceB: number
): void => {
  const cartaA = tablero.cartas[indiceA];
  const cartaB = tablero.cartas[indiceB];
  setTimeout(() => {
    reiniciarEstadoCarta(indiceA)
    cartaA.estaVuelta = false;
    reiniciarEstadoCarta(indiceB)
    cartaB.estaVuelta = false;
  }, 2000)
  
};

export const iniciaPartida = (tablero: Tablero): void => {
  tablero.estadoPartida = "CeroCartasLevantadas";
  tablero.cartas = barajarCartas(tablero.cartas); 
  pintarDivs(tablero.cartas);
  //FALTAN HCER FUNCION DEL CLICK DENTRO IRIA LO SIGUIENTE:
  const cardContainers = document.getElementsByClassName("cardContainer");

  Array.from(cardContainers).forEach((container) => { 
    container.addEventListener("click", () => {
      voltearLaCarta(tablero, parseInt(container.getAttribute("data-indice-id")!));
    });
  });
};

//aparte de ponerlo bonito hay que crear un event listener del boton nueva partida que llame a la funcion iniciarPartida y haga todo lo demas. voltearLaCarta comprueba todo. 