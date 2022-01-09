const container = document.querySelector(".container");
const pen = document.querySelector("#pen-color");
const background = document.querySelector("#background-color");

let n = 16 ** 2;

let color = '#000';

pen.addEventListener('input', (e) => {
        color = e.target.value;
    });

for (let i = 0; i < n; i++) {
  const smallSquare = document.createElement("div");
  smallSquare.classList.add("small-square");
  container.appendChild(smallSquare);
  ['mousedown', 'mouseenter'].forEach( event => {
      smallSquare.addEventListener(event, () => {
          smallSquare.style.backgroundColor = color;
      })
  })
}


