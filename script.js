const container = document.querySelector(".container");
const pen = document.querySelector("#pen-color");
const background = document.querySelector("#background-color");
const rainbow = document.querySelector(".rainbow");
const btnClear = document.querySelector(".clear");
const gridTemplate = document.querySelector('#grid-template');
const h3 = document.querySelector('h3');

let n = 16;

let smallSquares;

let color = "#000",
  bkgColor = "#fff";

pen.addEventListener("input", (e) => {
  color = e.target.value;
});

background.addEventListener("input", (e) => {
  bkgColor = e.target.value;
  container.style.backgroundColor = bkgColor;
});


const createGrid = () => {
    container.style.cssText = `grid-template-columns: repeat(${n}, 1fr); grid-template-rows: repeat(${n}, 1fr)`;
    for (let i = 0; i < n ** 2; i++) {
      const smallSquare = document.createElement("div");
      smallSquare.classList.add("small-square");
      smallSquare.classList.add("border-top-left");
      container.appendChild(smallSquare);
        smallSquare.addEventListener('mousemove', () => {
          smallSquare.style.backgroundColor = color;
        });
    }
    smallSquares = document.querySelectorAll(".small-square");
}

createGrid();

gridTemplate.addEventListener('input', (e) => {
    n = e.target.value;
    h3.innerText = `${n}x${n}`;
    container.replaceChildren([]);
    createGrid();
});

const randomColor = () => {
    let colors = [];
    for (let i = 0; i < 3; i++) {
        colors[i] = Math.floor(Math.random() * 255);
    }
    return colors;
}

rainbow.addEventListener("click", () => {
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



