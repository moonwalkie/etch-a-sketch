const sketch = document.querySelector('.sketch');
let isDrawing = false; // Flag to track drawing state

// Function to create the grid
function createGrid(rows, columns) {
    for (let i = 0; i < rows * columns; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        sketch.appendChild(cell);

        // Mouseover event for coloring cells when drawing
        cell.addEventListener('mouseover', (event) => {
            if (isDrawing) {
                const selectedColor = document.getElementById('setcolor').value;
                event.target.style.backgroundColor = selectedColor;
            }
        });

        // Mousedown event to start drawing
        cell.addEventListener('mousedown', () => {
            isDrawing = true; // Press to start drawing
        });

        // Mouseup event to stop drawing
        cell.addEventListener('mouseup', () => {
            isDrawing = false; // Release to stop drawing
        });
    }
}

createGrid(16, 16);

const btnDraw = document.querySelector('.btn.draw');
const btnClear = document.querySelector('.btn.clear');

btnDraw.addEventListener('click', () => {
    isDrawing = !isDrawing; // Toggle drawing state
    btnDraw.classList.toggle('active');
});

btnClear.addEventListener('click', () => {
    const cells = document.querySelectorAll('.cell');

    // Reset the background color of all cells to the default color
    cells.forEach((cell) => {
        cell.style.backgroundColor = '#d6fff1';
    });
});