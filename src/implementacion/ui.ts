import { Carta } from "./model";

const allCardsContainer = document.getElementById("cards-container") as HTMLDivElement

export const pintarDivs = (cartas: Carta[]) => {
    cartas.forEach((carta, index) => {
      const cardContainer = document.createElement('div');
      cardContainer.setAttribute('data-indice-id', index.toString());
      cardContainer.classList.add('cardContainer');
      allCardsContainer.appendChild(cardContainer);
  
      const divCartas = document.createElement('div');
      divCartas.classList.add('card');
      cardContainer.appendChild(divCartas);
  
      const front = document.createElement('div');
      front.classList.add('front');
      const img = document.createElement('img');
      img.src = carta.imagen;
      front.appendChild(img);
  
      const back = document.createElement('div');
      back.classList.add('back');
  
      divCartas.appendChild(front);
      divCartas.appendChild(back);
    });
  };

  export const reiniciarEstadoCarta = (indice : number) => {
    const cartasDOM = document.getElementsByClassName("cardContainer");
    cartasDOM[indice].classList.remove("flipped");
  }
