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
const rubberBtn = document.querySelector("#rubber-card");
const rubberAnimation = document.querySelector("#behind-rubber");
const lightenBtn = document.querySelector("#lighten-card");
const lightenAnimation = document.querySelector("#behind-lighten");

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
      gridAnimation.classList.add("option-active");
      smallSquare.classList.add("border-top-left");
    }
    container.appendChild(smallSquare);
    smallSquare.addEventListenerWithName("printMouseDown", "mousedown", () => {
      mousedown = true;
      draw(smallSquare);
    });
    smallSquare.addEventListenerWithName("dontPrintMouseUp", "mouseup", () => {
      mousedown = false;
    });
    smallSquare.addEventListenerWithName("printMouseEnter", "mouseenter", () => {
      if (mousedown) {
        draw(smallSquare);
      }
    });
  }
  smallSquares = document.querySelectorAll(".small-square");
};

createGrid();

if(JSON.parse(localStorage.getItem("rubber"))){
  rubber();
} else {
  switchColor();
}

penColor.addEventListener("input", (e) => {
  e.stopImmediatePropagation();
  color = e.target.value;
  localStorage.setItem("color", JSON.stringify(color));
});

pen.addEventListener("click", () => {
  checkPrint = "pen";
  localStorage.setItem("checkPrint", JSON.stringify(checkPrint));
  localStorage.setItem("rubber", JSON.stringify(false));
  switchColor();
  rubberAnimation.classList.remove("option-active");
  smallSquares.forEach(smallSquare => {
    smallSquare.removeEventListenerWithName("rubberClick");
    smallSquare.addEventListenerWithName("printMouseDown");
    smallSquare.addEventListenerWithName("printMouseEnter");
  });
});

rainbow.addEventListener("click", () => {
  checkPrint = "rainbow";
  localStorage.setItem("checkPrint", JSON.stringify(checkPrint));
  localStorage.setItem("rubber", JSON.stringify(false));
  switchColor();
  rubberAnimation.classList.remove("option-active");
  smallSquares.forEach(smallSquare => {
    smallSquare.removeEventListenerWithName("rubberClick");
    smallSquare.addEventListenerWithName("printMouseDown");
    smallSquare.addEventListenerWithName("printMouseEnter");
  });
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
  localStorage.setItem("rubber", JSON.stringify(false));
  switchColor();
  randomBckColor();
  rubberAnimation.classList.remove("option-active");
  smallSquares.forEach(smallSquare => {
    smallSquare.removeEventListenerWithName("rubberClick");
    smallSquare.addEventListenerWithName("printMouseDown");
    smallSquare.addEventListenerWithName("printMouseEnter");
  });
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
  gridAnimation.classList.toggle("option-active");
  smallSquares.forEach((smallSquare) => {
    smallSquare.classList.toggle("border-top-left");
  });
  localStorage.setItem("grid", gridAnimation.classList.contains("option-active"));
});

rubberBtn.addEventListener("click", rubber);

function rubber(){
  rubberAnimation.classList.toggle("option-active");
  if(rubberAnimation.classList.contains("option-active")){
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
    smallSquares.forEach(smallSquare => {
      smallSquare.removeEventListenerWithName("rubberClick");
      smallSquare.addEventListenerWithName("printMouseDown");
      smallSquare.addEventListenerWithName("printMouseEnter");
    });
  }
}

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

lightenBtn.addEventListener("click", () => {
  lightenAnimation.classList.toggle("option-active");
  if(lightenAnimation.classList.contains("option-active")){
    smallSquares.forEach(smallSquare => {
      smallSquare.removeEventListenerWithName("rubberClick");
      smallSquare.removeEventListenerWithName("printMouseDown");
      smallSquare.removeEventListenerWithName("printMouseEnter");
      smallSquare.addEventListenerWithName("lightenClick", "click", (e) => {
        const elStyle = e.target.style;
        let bgColor = elStyle.backgroundColor;
        elStyle.backgroundColor = LightenDarkenColor(RGBToHex(bgColor), 30);
        localStorage.setItem("squares", JSON.stringify(squaresToArrOfHex()));
      });
    });
  } else {

  }
});

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