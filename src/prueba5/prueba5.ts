type Animals = "🦁" | "🦉" | "🐶" | "🐔" | "🐷" | "🐝";

const animales: Animals[] = [
  "🦁",
  "🦉",
  "🐶",
  "🐔",
  "🐷",
  "🐝",
  "🦁",
  "🦉",
  "🐶",
  "🐔",
  "🐷",
  "🐝",
];

const divCartasContainer = document.getElementById(
  "cards-container"
) as HTMLDivElement;

const crearFrontYBack = (divCarta: HTMLDivElement) => {
  const divFront = document.createElement("div");
  divFront.classList.add("front");
  const divBack = document.createElement("div");
  divBack.classList.add("back");
  divCarta.appendChild(divFront);
  divCarta.appendChild(divBack);
  return divFront;
};


//intentar hacer una función para crear img. Buscar access child from html node js.
const crearDivs = (arrayAnimales: Animals[]) => {
  for (let index = 0; index < arrayAnimales.length; index++) {
    const cardContainer = document.createElement("div");
    cardContainer.setAttribute("position", index.toString());
    cardContainer.classList.add("cardContainer");
    divCartasContainer.appendChild(cardContainer);

    const divCartas = document.createElement("div");
    divCartas.classList.add("card");
    cardContainer.appendChild(divCartas);
    const front = crearFrontYBack(divCartas);

    cardContainer.addEventListener("click", (event) => {
      cardContainer?.classList.toggle("flipped");
      const img = document.createElement("img");
      const animal = arrayAnimales[index];
      switch (animal) {
        case "🦁":
          img.src =
            "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/1.png";
          break;
        case "🦉":
          img.src =
            "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/2.png";
          break;
        case "🐶":
          img.src =
            "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/3.png";
          break;
        case "🐔":
          img.src =
            "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/4.png";
          break;
        case "🐷":
          img.src =
            "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/5.png";
          break;
        case "🐝":
          img.src =
            "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/6.png";
          break;
      }
      front.appendChild(img);
    });
  }
};

crearDivs(animales);
