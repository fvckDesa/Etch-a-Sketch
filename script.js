const container = document.querySelector(".container");
const penColor = document.querySelector("#pen-color");
const background = document.querySelector("#background-color");
const pen = document.querySelector("#pen-card");
const rainbow = document.querySelector("#rainbow-card");
const btnClear = document.querySelector(".clear");
const gridTemplate = document.querySelector("#grid-template");
const h3 = document.querySelector("h3");
const penAnimation = document.querySelector("#behind-pen");
const rainbowAnimation = document.querySelector("#behind-rainbow");
const info = document.querySelector('#info-btn');
const reference = document.querySelector('.reference');

let n = 16;

let smallSquares;

let color = "#000",
  bkgColor = "#fff";

let checkRainbow = false;
let mousedown = false;

function switchColor() {
  penAnimation.classList.toggle("color-active");
  rainbowAnimation.classList.toggle("color-active");
  !checkRainbow ? (checkRainbow = true) : (checkRainbow = false);
}

function draw(smallSquare) {
  if (!checkRainbow) {
    smallSquare.style.backgroundColor = color;
  } else {
    const [red, blue, green] = randomColor();
    smallSquare.style.backgroundColor = `rgb(${red}, ${blue}, ${green})`;
  }
}

const createGrid = () => {
  container.style.cssText = `grid-template-columns: repeat(${n}, 1fr); grid-template-rows: repeat(${n}, 1fr)`;
  for (let i = 0; i < n ** 2; i++) {
    const smallSquare = document.createElement("div");
    smallSquare.classList.add("small-square");
    smallSquare.classList.add("border-top-left");
    container.appendChild(smallSquare);
    smallSquare.addEventListener('mousedown', () => {
      mousedown = true;
      draw(smallSquare);
    });
    smallSquare.addEventListener('mouseup', () => {
      mousedown = false;
    });
    smallSquare.addEventListener("mouseenter", () => {
      if(mousedown){
        draw(smallSquare);
      }
      console.log(mousedown);
    });
  }
  smallSquares = document.querySelectorAll(".small-square");
};

createGrid();

penColor.addEventListener("input", (e) => {
  color = e.target.value;
});

pen.addEventListener("click", switchColor);

background.addEventListener("input", (e) => {
  bkgColor = e.target.value;
  container.style.backgroundColor = bkgColor;
});

gridTemplate.addEventListener("input", (e) => {
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
};

rainbow.addEventListener("click", switchColor);

btnClear.addEventListener("click", () => {
  smallSquares.forEach((smallSquare) => {
    smallSquare.style.backgroundColor = "transparent";
  });
  container.style.backgroundColor = bkgColor;
});

function addClass() {
  setTimeout(() => {
    reference.classList.add('visibility');
  }, 100);
}

function removeClass() {
  reference.classList.remove('visibility');
}

info.addEventListener('mouseover', removeClass);

info.addEventListener('mouseleave', addClass);