import { Carta, Tablero } from './model';
import { closeModal, hideNuevaPartida, openModal, pintarDivs, reiniciarEstadoCarta, showTablero} from './ui';

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

  if (tablero.estadoPartida === 'DosCartasLevantadas') {
    return false;
  }

  if (tablero.estadoPartida === 'PartidaNoIniciada') {
    return false;
  }

  if (tablero.estadoPartida === 'PartidaCompleta') {
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

  const cartasDOM = document.getElementsByClassName('cardContainer');

  carta.estaVuelta = true;

  if (tablero.estadoPartida === 'CeroCartasLevantadas') {
    cartasDOM[indice].classList.toggle('flipped');
    tablero.estadoPartida = 'UnaCartaLevantada';
    tablero.indiceCartaVolteadaA = indice;
  } else if (tablero.estadoPartida === 'UnaCartaLevantada') {
    cartasDOM[indice].classList.toggle('flipped');
    tablero.estadoPartida = 'DosCartasLevantadas';
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
          tablero.indiceCartaVolteadaB!
        );
        tablero.estadoPartida = 'CeroCartasLevantadas';
     
    } else {
      setTimeout(() => {1
        parejaNoEncontrada(
          tablero,
          tablero.indiceCartaVolteadaA!,
          tablero.indiceCartaVolteadaB!
        );
        tablero.estadoPartida = 'CeroCartasLevantadas';
      }, 1000);
    }
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
  if (partidaCompleta) {
   openModal();
   const span = document.getElementsByClassName("close")[0] as HTMLButtonElement;
   span.addEventListener("click", () => {
    closeModal()
    resetGameLogic(tablero)
   })
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
    reiniciarEstadoCarta(indiceA);
    reiniciarEstadoCarta(indiceB);
  }, 500);
  cartaA.estaVuelta = false;
  cartaB.estaVuelta = false;
};

export const iniciaPartida = (tablero: Tablero): void => {
  tablero.estadoPartida = 'CeroCartasLevantadas';
  tablero.cartas = barajarCartas(tablero.cartas);
  pintarDivs(tablero.cartas);
  clickCartas(tablero);
};

export const clickCartas = (tablero: Tablero) => {
  const cardContainers = document.getElementsByClassName('cardContainer');
  Array.from(cardContainers).forEach((container) => {
    container.addEventListener('click', () => {
      voltearLaCarta(
        tablero,
        parseInt(container.getAttribute('data-indice-id')!)
      );
    });
  });
};



export const nuevaPartida = (tablero: Tablero) => {
  const botonNuevaPartida = document.getElementById(
    'botonNuevaPartida'
  ) as HTMLButtonElement;

  botonNuevaPartida.addEventListener('click', () => {
    iniciaPartida(tablero);
    hideNuevaPartida(); 
    showTablero()
  });
};

export const resetGameLogic = (tablero : Tablero) => {
  tablero.cartas = tablero.cartas.map((carta) => {
    carta.encontrada = false;
    carta.estaVuelta = false;
    return carta
  })
}
