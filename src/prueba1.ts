type Animal = "🦁" | "🦉" | "🐶"|"🐔"|"🐷"|"🐝";

const arrayAnimales : Animal[] = [
    "🦁",
    "🦉",
    "🐶",
    "🐔",
    "🐷",
    "🐝"
]

// randomize array:
function shuffleArray<T>(array: T[]) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

shuffleArray<Animal>(arrayAnimales)
console.log(arrayAnimales)
