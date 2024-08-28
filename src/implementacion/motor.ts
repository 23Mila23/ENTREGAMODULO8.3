import { Carta, Tablero } from "./model";
/*
En el motor nos va a hacer falta un método para barajar cartas
*/


const barajarCartas = (cartas : Carta[]): Carta[] => {

    const cartasBarajadas = [...cartas]

    for(var i = cartasBarajadas.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = cartasBarajadas[i];
        cartasBarajadas[i] = cartasBarajadas[j];
        cartasBarajadas[j] = temp;
    }
    return cartasBarajadas
}
  
  /*
    Una carta se puede voltear si no está encontrada y no está ya volteada, o no hay dos cartas ya volteadas
  */
  const sePuedeVoltearLaCarta = (tablero: Tablero, indice: number ): boolean => {
    //PARA MAÑANA: el indice es mirar que posicion del array de cartas se puede voltear tipo: mira si la  posicion uno se puede voltear o no. Las cartas están dentro del tablero. 
    //tendria que ser tablero.cartas y coger la posicion del array que seria el indice

  }
  
  const voltearLaCarta = (tablero: Tablero, indice: number) : void => {
    //...
  }
  
  /*
    Dos cartas son pareja si en el array de tablero de cada una tienen el mismo id
  */
  export const sonPareja = (indiceA: number, indiceB: number, tablero: Tablero): boolean => {
    //...
  }
  
  /*
    Aquí asumimos ya que son pareja, lo que hacemos es marcarlas como encontradas y comprobar si la partida esta completa.
  */
  const parejaEncontrada = (tablero: Tablero, indiceA: number, indiceB: number) : void => {
    //...
  }
  
  /*
    Aquí asumimos que no son pareja y las volvemos a poner boca abajo
  */
  const parejaNoEncontrada = (tablero: Tablero, indiceA :number, indiceB : number) : void => {
    // ...
  }
  
  /*
    Esto lo podemos comprobar o bien utilizando every, o bien utilizando un contador (cartasEncontradas)
  */
  export const esPartidaCompleta(tablero: Tablero) : boolean => {
    //...
  }
  
  /*
  Iniciar partida
  */
  
  export const iniciaPartida = (tablero: Tablero): void => {
    //...Aqui actualizamos la carta de tableros con el array barajar cartas