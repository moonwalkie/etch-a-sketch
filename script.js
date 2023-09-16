const sketch = document.querySelector('.sketch');
let isDrawing = false; // Flag to track drawing state
let isRainbow = false; // Flag to track rainbow mode

// Function to create the grid
function createGrid(rows, columns) {
    for (let i = 0; i < rows * columns; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        sketch.appendChild(cell);

        // Mouseover event for coloring cells when drawing
        cell.addEventListener('mouseover', (event) => {
            if ((isDrawing || isRainbow) && event.buttons === 1) {
                const selectedColor = isRainbow ? getRandomColor() : document.getElementById('setcolor').value;
                event.target.style.backgroundColor = selectedColor;
            }
        });

        // Mousedown event to start drawing
        cell.addEventListener('mousedown', (event) => {
            if (isDrawing || isRainbow) {
                event.preventDefault(); // Prevent text selection
                const selectedColor = isRainbow ? getRandomColor() : document.getElementById('setcolor').value;
                event.target.style.backgroundColor = selectedColor;
            }
        });
    }
}

createGrid(16, 16);

const btnDraw = document.querySelector('.btn.draw');
const btnRainbow = document.querySelector('.btn.rainbow');
const btnClear = document.querySelector('.btn.clear');

btnDraw.addEventListener('click', () => {
    isDrawing = !isDrawing; // Toggle drawing state
    btnDraw.classList.toggle('active');
    btnRainbow.classList.remove('active');
    isRainbow = false;
});

btnRainbow.addEventListener('click', () => {
    isRainbow = !isRainbow;
    btnRainbow.classList.toggle('active');
    btnDraw.classList.remove('active');
    isDrawing = false;
});

btnClear.addEventListener('click', () => {
    const cells = document.querySelectorAll('.cell');

    // Reset the background color of all cells to the default color
    cells.forEach((cell) => {
        cell.style.backgroundColor = '#d6fff1';
    });
});

function getRandomColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}