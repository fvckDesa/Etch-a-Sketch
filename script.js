const container = document.querySelector(".container");
const pen = document.querySelector("#pen-color");
const background = document.querySelector("#background-color");
const raimbow = document.querySelector(".raimbow");
const btnClear = document.querySelector(".clear");



let n = 16 ** 2;

let color = "#000",
  bkgColor = "#fff";

pen.addEventListener("input", (e) => {
  color = e.target.value;
});

background.addEventListener("input", (e) => {
  bkgColor = e.target.value;
  container.style.backgroundColor = bkgColor;
});



for (let i = 0; i < n; i++) {
  const smallSquare = document.createElement("div");
  smallSquare.classList.add("small-square");
  container.appendChild(smallSquare);
  ["click", "mousemove"].forEach((event) => {
    smallSquare.addEventListener(event, () => {
      smallSquare.style.backgroundColor = color;
    });
  });
}

const smallSquares = document.querySelectorAll(".small-square");

const randomColor = () => {
    let colors = [];
    for (let i = 0; i < 3; i++) {
        colors[i] = Math.floor(Math.random() * 255);
    }
    return colors;
}

raimbow.addEventListener("click", () => {
    smallSquares.forEach(smallSquare => {
        smallSquare.addEventListener('mouseover', () => {
            const [red, green, blue] = randomColor();
            color = `rgb(${red}, ${green}, ${blue})`;
            smallSquare.style.backgroundColor = color;
        })
    })
});

btnClear.addEventListener("click", () => {
  smallSquares.forEach( smallSquare => {
    smallSquare.style.backgroundColor = 'transparent';
  });
  container.style.backgroundColor = bkgColor;
});



