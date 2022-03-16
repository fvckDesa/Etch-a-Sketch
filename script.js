//HTML elements
const container = document.querySelector(".container");
const penColor = document.querySelector("#pen-color");
const background = document.querySelector("#background-color");
const pen = document.querySelector("#pen-card");
const rainbow = document.querySelector("#rainbow-card");
const random = document.querySelector("#random-card");
const btnClear = document.querySelector(".clear");
const gridTemplate = document.querySelector("#grid-template");
const gridSizeDisplay = document.querySelector("h3");
const penAnimation = document.querySelector("#behind-pen");
const rainbowAnimation = document.querySelector("#behind-rainbow");
const randomAnimation = document.querySelector("#behind-random");
const info = document.querySelector("#info-btn");
const reference = document.querySelector(".reference");
const gridBtn = document.querySelector("#grid-card");
const gridAnimation = document.querySelector("#behind-grid");
const rubber = document.querySelector("#rubber-card");
const rubberAnimation = document.querySelector("#behind-rubber");
const lighten = document.querySelector("#lighten-card");
const lightenAnimation = document.querySelector("#behind-lighten");

//global var
let gridSize = +JSON.parse(localStorage.getItem("num")) || 16;
let smallSquares;
let color = JSON.parse(localStorage.getItem("color")) || "#000";
let bkgColor = JSON.parse(localStorage.getItem("bkgColor")) || "#fff";
let actionItem = JSON.parse(localStorage.getItem("actionItem")) || "pen";
let mousedown = false;

//active local storage
gridSizeDisplay.innerHTML = `${gridSize}x${gridSize}`;
document.querySelector('input[type="range"]').value = gridSize;
penColor.value = color;
background.value = bkgColor;
container.style.backgroundColor = bkgColor;

createGrid();
randomBkgColor();



penColor.addEventListener("input", changePenColor);
background.addEventListener("input", changeBkgColor);

pen.addEventListener("click", switchItem.bind(this, ["pen"]));
rainbow.addEventListener("click", switchItem.bind(this, ["rainbow"]));
random.addEventListener("click", switchItem.bind(this, ["random"]));
lighten.addEventListener("click", switchItem.bind(this, ["lighten"]));
rubber.addEventListener("click", switchItem.bind(this, ["rubber"]));



gridTemplate.addEventListener("input", changeGridTemplate);

btnClear.addEventListener("click", clear);

info.addEventListener("mouseover", removeClass);

info.addEventListener("mouseleave", addClass);

gridBtn.addEventListener("click", toggleGrid);



function createGrid() {
  const squares = JSON.parse(localStorage.getItem("squares")) || [];
  container.style.cssText += `grid-template-columns: repeat(${gridSize}, 1fr); grid-template-rows: repeat(${gridSize}, 1fr)`;
  for (let i = 0; i < gridSize ** 2; i++) {
    const smallSquare = document.createElement("div");
    smallSquare.classList.add("small-square");
    if (squares[i] && squares[i] !== "#0") {
      smallSquare.style.backgroundColor = squares[i];
    }
    if (
      gridAnimation.classList.length > 1 ||
      JSON.parse(localStorage.getItem("grid")) === true
    ) {
      gridAnimation.classList.add("option-active");
      smallSquare.classList.add("border-top-left");
    }
    container.appendChild(smallSquare);
    smallSquare.addEventListener("mousedown", (e) => {
      mousedown = true;
      action(e.target);
    });
    smallSquare.addEventListener("mouseup", () => {
      mousedown = false;
    });
    smallSquare.addEventListener("mouseenter", (e) => {
      if (mousedown) {
        action(e.target);
      }
    });
  }
  smallSquares = document.querySelectorAll(".small-square");
}

function action(smallSquare) {
  const squareStyle = smallSquare.style;
  switch (actionItem) {
    case "pen":
      squareStyle.backgroundColor = color;
      break;
    case "rainbow":
      squareStyle.backgroundColor = rainbowColor();
      break;
    case "random":
      squareStyle.backgroundColor = randomRGB();
      break;
    case "lighten":
      squareStyle.backgroundColor = LightenDarkenColor(RGBToHex(squareStyle.backgroundColor), 30);
      break;
    case "rubber":
      squareStyle.backgroundColor = "transparent";
      break;
  }
  localStorage.setItem("squares", JSON.stringify(squaresToArrOfHex()));
}

function randomColor() {
  let colors = [];
  for (let i = 0; i < 3; i++) {
    colors[i] = Math.floor(Math.random() * 255);
  }
  return colors;
}

function randomRGB() {
  const [red, blue, green] = randomColor();
  return `rgb(${red}, ${blue}, ${green})`;
}

function rainbowColor() {
  const rainbowColors = [
    "rgb(255,0,0)",
    "rgb(255,165,0)",
    "rgb(255,255,0)",
    "rgb(0,255,0)",
    "rgb(0,0,255)",
    "rgb(63,15,183)",
    "rgb(128,0,128)",
  ];
  return rainbowColors[Math.floor(Math.random() * 6)];
}

function randomBkgColor() {
  random.children[1].style.cssText = `background: linear-gradient(-45deg, ${randomRGB()}, ${randomRGB()}, ${randomRGB()}, ${randomRGB()}, ${randomRGB()}, ${randomRGB()}, ${randomRGB()});`;
}

function addClass() {
  setTimeout(() => {
    reference.classList.add("visibility");
  }, 300);
}

function removeClass() {
  reference.classList.remove("visibility");
}

function rubberFun() {
  rubberAnimation.classList.toggle("option-active");
  if (rubberAnimation.classList.contains("option-active")) {
    localStorage.setItem("rubber", JSON.stringify(true));
    penAnimation.classList.remove("color-active");
    randomAnimation.classList.remove("color-active");
    rainbowAnimation.classList.remove("color-active");
    smallSquares.forEach((smallSquare) => {
      smallSquare.removeEventListenerWithName("printMouseDown");
      smallSquare.removeEventListenerWithName("printMouseEnter");
      smallSquare.addEventListenerWithName("rubberClick", "click", (e) => {
        e.target.style.backgroundColor = "transparent";
        localStorage.setItem("squares", JSON.stringify(squaresToArrOfHex()));
      });
    });
  } else {
    localStorage.setItem("rubber", JSON.stringify(false));
    switchColor();
    smallSquares.forEach((smallSquare) => {
      smallSquare.removeEventListenerWithName("rubberClick");
      smallSquare.addEventListenerWithName("printMouseDown");
      smallSquare.addEventListenerWithName("printMouseEnter");
    });
  }
}

function RGBToHex(RGB) {
  if (!RGB.match("rgb")) return "#0";
  if (RGB.match("#")) return RGB;
  return RGB.slice(4, RGB.length - 1)
    .split(",")
    .reduce(
      (hex, color) => (hex += Number(color).toString(16).padStart(2, "0")),
      "#"
    );
}

function squaresToArrOfHex() {
  return [...document.querySelectorAll(".small-square")].map((el) =>
    RGBToHex(el.style.backgroundColor)
  );
}

function LightenDarkenColor(col, amt) {
  let usePound = false;
  if (col[0] == "#") {
    col = col.slice(1);
    usePound = true;
  }

  let num = parseInt(col, 16);

  let r = (num >> 16) + amt;

  if (r > 255) r = 255;
  else if (r < 0) r = 0;

  let b = ((num >> 8) & 0x00ff) + amt;

  if (b > 255) b = 255;
  else if (b < 0) b = 0;

  let g = (num & 0x0000ff) + amt;

  if (g > 255) g = 255;
  else if (g < 0) g = 0;

  return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
}

function switchItem([item]) {
  actionItem = item;

  penAnimation.classList.remove("color-active");
  rainbowAnimation.classList.remove("color-active");
  randomAnimation.classList.remove("color-active");
  lightenAnimation.classList.remove("option-active");
  rubberAnimation.classList.remove("option-active");

  switch (item) {
    case "pen":
      penAnimation.classList.add("color-active");
      break;
    case "rainbow":
      rainbowAnimation.classList.add("color-active");
      break;
    case "random":
      randomAnimation.classList.add("color-active");
      break;
    case "lighten":
      lightenAnimation.classList.add("option-active");
      break;
    case "rubber":
      rubberAnimation.classList.add("option-active");
      break;
    default:
      console.log("error");
      break;
  }
}

function clear() {
  smallSquares.forEach((smallSquare) => {
    smallSquare.style.backgroundColor = "transparent";
  });
  container.style.backgroundColor = bkgColor;
  localStorage.removeItem("squares");
}

function changePenColor(e) {
  e.stopImmediatePropagation();
  color = e.target.value;
  localStorage.setItem("color", JSON.stringify(color));
}

function changeBkgColor(e) {
  bkgColor = e.target.value;
  container.style.backgroundColor = bkgColor;
  localStorage.setItem("bkgColor", JSON.stringify(bkgColor));
}

function changeGridTemplate(e) {
  gridSize = e.target.value;
  localStorage.setItem("num", JSON.stringify(gridSize));
  localStorage.removeItem("squares");
  gridSizeDisplay.innerText = `${gridSize}x${gridSize}`;
  container.replaceChildren([]);
  createGrid();
}

function toggleGrid() {
  gridAnimation.classList.toggle("option-active");
  smallSquares.forEach((smallSquare) => {
    smallSquare.classList.toggle("border-top-left");
  });
  localStorage.setItem(
    "grid",
    gridAnimation.classList.contains("option-active")
  );
}