const container = document.querySelector('.container');

for (let i = 0; i < (16 * 16); i++) {
    const smallSquare = document.createElement('div');
    smallSquare.classList.add('small-square');
    container.appendChild(smallSquare);
}