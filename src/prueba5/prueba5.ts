interface InfoCarta {
  idFoto: number;
  imagen: string;
}

const cartas: InfoCarta[] = [
  {
    idFoto: 1,
    imagen:
      'https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/1.png',
  },
  {
    idFoto: 2,
    imagen:
      'https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/2.png',
  },
  {
    idFoto: 3,
    imagen:
      'https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/3.png',
  },
  {
    idFoto: 4,
    imagen:
      'https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/4.png',
  },
  {
    idFoto: 5,
    imagen:
      'https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/5.png',
  },
  {
    idFoto: 6,
    imagen:
      'https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/6.png',
  },
];

// Duplicar cartas
const cartasDuplicadas = [...cartas, ...cartas];

const divCartasContainer = document.getElementById(
  'cards-container'
) as HTMLDivElement;

const crearDivs = (cartas: InfoCarta[]) => {
  cartas.forEach((carta, index) => {
    const cardContainer = document.createElement('div');
    cardContainer.setAttribute('data-indice-id', index.toString());
    cardContainer.classList.add('cardContainer');
    divCartasContainer.appendChild(cardContainer);

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

    cardContainer.addEventListener('click', () => {
      cardContainer?.classList.toggle('flipped');
    });
  });
};

crearDivs(cartasDuplicadas);
