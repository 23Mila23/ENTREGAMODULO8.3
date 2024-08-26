const newCardContainer = document.getElementById('card-container');
const front1 = document.getElementById('front1') as HTMLElement;
const front2 = document.getElementById('front2') as HTMLElement;
const card1 = document.getElementById('card1') as HTMLElement;
const card2 = document.getElementById('card2') as HTMLElement;
let isCard1Flipped = false;
let isCard2Flipped = false;

const areCardsFlipped = () => {
  if (isCard1Flipped && isCard2Flipped) {
    setTimeout(() => {
    newCardContainer?.classList.remove('flipped1');
      newCardContainer?.classList.remove('flipped2');
      isCard1Flipped = false;
      isCard2Flipped = false;
    }, 3000); 
  }
};

card1.addEventListener('click', () => {
    newCardContainer?.classList.toggle('flipped1');
  front1.style.backgroundImage =
    'url(https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/6.png)';
  isCard1Flipped = true;
  areCardsFlipped();
});

card2.addEventListener('click', () => {
    newCardContainer?.classList.toggle('flipped2');
  front2.style.backgroundImage =
    'url(https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/2.png)';
  isCard2Flipped = true;
  areCardsFlipped();
});
