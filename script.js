const container = document.querySelector(".container");
const penColor = document.querySelector("#pen-color");
const background = document.querySelector("#background-color");
const pen = document.querySelector("#pen-card");
const rainbow = document.querySelector('#rainbow-card');
const random = document.querySelector("#random-card");
const btnClear = document.querySelector(".clear");
const gridTemplate = document.querySelector("#grid-template");
const h3 = document.querySelector("h3");
const penAnimation = document.querySelector("#behind-pen");
const rainbowAnimation = document.querySelector('#behind-rainbow');
const randomAnimation = document.querySelector("#behind-random");
const info = document.querySelector("#info-btn");
const reference = document.querySelector(".reference");
const gridBtn = document.querySelector("#grid-card");
const gridAnimation = document.querySelector("#behind-grid");

let n = 16;

let smallSquares;

let color = "#000",
  bkgColor = "#fff";

let checkPrint = "pen";
let mousedown = false;

function switchColor() {
  penAnimation.classList.remove("color-active");
  randomAnimation.classList.remove("color-active");
  rainbowAnimation.classList.remove("color-active");
  switch(checkPrint) {
    case 'pen':
      penAnimation.classList.add('color-active');
      break;
    case 'rainbow':
      rainbowAnimation.classList.add('color-active');
      break;
    case 'random':
      randomAnimation.classList.add('color-active');
      break;
  }
}

function randomRGB() {
  const [red, blue, green] = randomColor();
  return `rgb(${red}, ${blue}, ${green})`;
}

function rainbowColor() {
  const rainbowColors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
  return rainbowColors[Math.floor(Math.random() * 6)];
}

function draw(smallSquare) {
  switch(checkPrint) {
    case 'pen':
      smallSquare.style.backgroundColor = color;
      break;
    case 'rainbow':
      smallSquare.style.backgroundColor = rainbowColor();
      break;
    case 'random':
      smallSquare.style.backgroundColor = randomRGB();
      break;
  }
}

const createGrid = () => {
  container.style.cssText = `grid-template-columns: repeat(${n}, 1fr); grid-template-rows: repeat(${n}, 1fr)`;
  for (let i = 0; i < n ** 2; i++) {
    const smallSquare = document.createElement("div");
    smallSquare.classList.add("small-square");
    if (gridAnimation.classList.length > 1) {
      smallSquare.classList.add("border-top-left");
    }
    container.appendChild(smallSquare);
    smallSquare.addEventListener("mousedown", () => {
      mousedown = true;
      draw(smallSquare);
    });
    smallSquare.addEventListener("mouseup", () => {
      mousedown = false;
    });
    smallSquare.addEventListener("mouseenter", () => {
      if (mousedown) {
        draw(smallSquare);
      }
    });
  }
  smallSquares = document.querySelectorAll(".small-square");
};

createGrid();

penColor.addEventListener("input", (e) => {
  e.stopImmediatePropagation()
  color = e.target.value;
});

pen.addEventListener("click", () => {
  checkPrint = 'pen';
  switchColor();
});

rainbow.addEventListener("click", () => {
  checkPrint = 'rainbow';
  switchColor();
});

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

function randomBckColor() {
  random.children[1].style.cssText = `background: linear-gradient(-45deg, ${randomRGB()}, ${randomRGB()}, ${randomRGB()}, ${randomRGB()}, ${randomRGB()}, ${randomRGB()}, ${randomRGB()});`;
}

randomBckColor();

random.addEventListener("click", () => {
  checkPrint = 'random';
  switchColor();
  randomBckColor();
});

btnClear.addEventListener("click", () => {
  smallSquares.forEach((smallSquare) => {
    smallSquare.style.backgroundColor = "transparent";
  });
  container.style.backgroundColor = bkgColor;
});

function addClass() {
  setTimeout(() => {
    reference.classList.add("visibility");
  }, 300);
}

function removeClass() {
  reference.classList.remove("visibility");
}

info.addEventListener("mouseover", removeClass);

info.addEventListener("mouseleave", addClass);

gridBtn.addEventListener("click", () => {
  gridAnimation.classList.toggle("grid-active");
  smallSquares.forEach((smallSquare) => {
    smallSquare.classList.toggle("border-top-left");
  });
});
