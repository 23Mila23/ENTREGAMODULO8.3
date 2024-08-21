const cardContainer = document.getElementById("card-container");
const front = document.getElementById("front")  as HTMLElement

cardContainer?.addEventListener("click", () => {
    cardContainer.classList.toggle("flipped")
    front.style.backgroundImage = "url(https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/1.png)";
})




