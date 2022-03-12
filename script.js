const container = document.querySelector(".container");
const penColor = document.querySelector("#pen-color");
const background = document.querySelector("#background-color");
const pen = document.querySelector("#pen-card");
const rainbow = document.querySelector("#rainbow-card");
const random = document.querySelector("#random-card");
const btnClear = document.querySelector(".clear");
const gridTemplate = document.querySelector("#grid-template");
const h3 = document.querySelector("h3");
const penAnimation = document.querySelector("#behind-pen");
const rainbowAnimation = document.querySelector("#behind-rainbow");
const randomAnimation = document.querySelector("#behind-random");
const info = document.querySelector("#info-btn");
const reference = document.querySelector(".reference");
const gridBtn = document.querySelector("#grid-card");
const gridAnimation = document.querySelector("#behind-grid");

let n = +JSON.parse(localStorage.getItem("num")) || 16;
h3.innerHTML = `${n}x${n}`;
document.querySelector('input[type="range"]').value = n;

let smallSquares;

let color = JSON.parse(localStorage.getItem("color")) || "#000";
penColor.value = color;

let bkgColor = JSON.parse(localStorage.getItem("bkgColor")) || "#fff";
background.value = bkgColor;
container.style.backgroundColor = bkgColor;

let checkPrint = JSON.parse(localStorage.getItem("checkPrint")) || "pen";
switchColor();
let mousedown = false;

function switchColor() {
  penAnimation.classList.remove("color-active");
  randomAnimation.classList.remove("color-active");
  rainbowAnimation.classList.remove("color-active");
  switch (checkPrint) {
    case "pen":
      penAnimation.classList.add("color-active");
      break;
    case "rainbow":
      rainbowAnimation.classList.add("color-active");
      break;
    case "random":
      randomAnimation.classList.add("color-active");
      break;
  }
}

function randomRGB() {
  const [red, blue, green] = randomColor();
  return `rgb(${red}, ${blue}, ${green})`;
}

function rainbowColor() {
  const rainbowColors = [
    "red",
    "orange",
    "yellow",
    "green",
    "blue",
    "indigo",
    "violet",
  ];
  return rainbowColors[Math.floor(Math.random() * 6)];
}

function draw(smallSquare) {
  switch (checkPrint) {
    case "pen":
      smallSquare.style.backgroundColor = color;
      break;
    case "rainbow":
      smallSquare.style.backgroundColor = rainbowColor();
      break;
    case "random":
      smallSquare.style.backgroundColor = randomRGB();
      break;
  }
  localStorage.setItem("squares", JSON.stringify(squaresToArrOfHex()));
}

const createGrid = () => {
  const squares = JSON.parse(localStorage.getItem("squares")) || [];
  container.style.cssText += `grid-template-columns: repeat(${n}, 1fr); grid-template-rows: repeat(${n}, 1fr)`;
  for (let i = 0; i < n ** 2; i++) {
    const smallSquare = document.createElement("div");
    smallSquare.classList.add("small-square");
    if(squares[i] && squares[i] !== "#0"){
      smallSquare.style.backgroundColor = squares[i];
    }
    if (
      gridAnimation.classList.length > 1 ||
      JSON.parse(localStorage.getItem("grid")) === true
    ) {
      gridAnimation.classList.toggle("grid-active");
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
  e.stopImmediatePropagation();
  color = e.target.value;
  localStorage.setItem("color", JSON.stringify(color));
});

pen.addEventListener("click", () => {
  checkPrint = "pen";
  localStorage.setItem("checkPrint", JSON.stringify(checkPrint));
  switchColor();
});

rainbow.addEventListener("click", () => {
  checkPrint = "rainbow";
  localStorage.setItem("checkPrint", JSON.stringify(checkPrint));
  switchColor();
});

background.addEventListener("input", (e) => {
  bkgColor = e.target.value;
  container.style.backgroundColor = bkgColor;
  localStorage.setItem("bkgColor", JSON.stringify(bkgColor));
});

gridTemplate.addEventListener("input", (e) => {
  n = e.target.value;
  localStorage.setItem("num", JSON.stringify(n));
  localStorage.removeItem("squares");
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
  checkPrint = "random";
  localStorage.setItem("checkPrint", JSON.stringify(checkPrint));
  switchColor();
  randomBckColor();
});

btnClear.addEventListener("click", () => {
  smallSquares.forEach((smallSquare) => {
    smallSquare.style.backgroundColor = "transparent";
  });
  container.style.backgroundColor = bkgColor;
  localStorage.removeItem("squares");
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
  localStorage.setItem("grid", gridAnimation.classList.contains("grid-active"));
});

function RGBToHex(RGB) {
  if (!RGB.match("rgb")) return "#0";
  if(RGB.match("#")) return RGB;
  return RGB.slice(4, RGB.length - 1)
    .split(",")
    .reduce((hex, color) => (hex += Number(color).toString(16).padStart(2, "0")), "#");
}

function squaresToArrOfHex() {
  return [...document.querySelectorAll(".small-square")].map((el) => 
    RGBToHex(el.style.backgroundColor)
  );
}