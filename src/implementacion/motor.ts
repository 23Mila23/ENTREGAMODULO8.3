import { Carta, Tablero } from "./model";


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

  if (carta.encontrada) {
    return false;
  }

  if (carta.estaVuelta) {
    return false;
  }

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
  const partidaCompleta = esPartidaCompleta(tablero); // hacer cosas para terminar el juego
};


const parejaNoEncontrada = (
  tablero: Tablero,
  indiceA: number,
  indiceB: number
): void => {
  const cartaA = tablero.cartas[indiceA];
  const cartaB = tablero.cartas[indiceB];

  cartaA.estaVuelta = false;
  cartaB.estaVuelta = false;
  //AQUI SE PUEDE HACER UN SET TIMEOUT PARA HACER QUE SE GIREN EN LA UI CON .REMOVE("CLASE")
};


export const iniciaPartida = (tablero: Tablero): void => {
 tablero.cartas = barajarCartas(tablero.cartas);
 //FALTA UI PARA PINTAR CARTAS
 //FALTAN LISTENERS DEL CLICK DENTRO IRIA LO SIGUIENTE:
 voltearLaCarta(tablero,indice)



};

