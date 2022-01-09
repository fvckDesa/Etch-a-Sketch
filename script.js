const container = document.querySelector('.container');

let n = 16 ** 2;

for (let i = 0; i < n; i++) {
    const smallSquare = document.createElement('div');
    smallSquare.classList.add('small-square');
    container.appendChild(smallSquare);
}