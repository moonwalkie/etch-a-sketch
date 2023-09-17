const sketch = document.querySelector('.sketch');
let isDrawing = false; // Flag to track drawing state
let isRainbow = false; // Flag to track rainbow mode
let isBorderEnabled = false; // Flag to track border toggle state
let isRadiusEnabled = false; // Flag to track radius toggle state

// Function to create the grid
function createGrid(rows, columns) {
    // Clear the existing grid
    sketch.innerHTML = '';

    for (let i = 0; i < rows * columns; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        sketch.appendChild(cell);

        // Apply border and radius styles based on toggle states
        if (isBorderEnabled) {
            cell.classList.add('border');
        }
        if (isRadiusEnabled) {
            cell.classList.add('radius');
        }
    }

    const cellWidth = sketch.clientWidth / columns; // Calculate cell width
    const cellHeight = sketch.clientHeight / rows; // Calculate cell height

    const cells = document.querySelectorAll('.cell');

    cells.forEach((cell) => {
        cell.style.width = `${cellWidth}px`; // Set cell width
        cell.style.height = `${cellHeight}px`; // Set cell height

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
    });
}

createGrid(16, 16);

const btnDraw = document.querySelector('.btn.draw');
const btnRainbow = document.querySelector('.btn.rainbow');
const btnClear = document.querySelector('.btn.clear');
const gridSizeSlider = document.querySelector('#setgrid');
const gridSizeText = document.querySelector('#gridSizeText');
const borderToggle = document.getElementById('borderToggle');
const radiusToggle = document.getElementById('radiusToggle');

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

// Event listener for grid size slider
gridSizeSlider.addEventListener('input', () => {
    const gridSize = parseInt(gridSizeSlider.value, 10); // Get the selected grid size
    const rows = gridSize; // Use the selected grid size directly
    const columns = gridSize;

    // Update the grid size
    createGrid(rows, columns);

    // Update the grid size text
    gridSizeText.textContent = `${rows}x${columns}`;
});

// Event listener for border toggle switch
borderToggle.addEventListener('change', () => {
    isBorderEnabled = borderToggle.checked; // Update the border toggle state

    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell) => {
        if (isBorderEnabled) {
            cell.classList.add('border');
            cell.style.borderColor = '#112720'; // Set border color
            cell.style.opacity = '1'; // Set opacity to fully visible
        } else {
            cell.classList.remove('border');
            cell.style.borderColor = 'transparent'; // Set border color to transparent
            cell.style.opacity = '1'; // Set opacity to fully visible
        }
    });
});

// Event listener for radius toggle switch
radiusToggle.addEventListener('change', () => {
    isRadiusEnabled = radiusToggle.checked; // Update the radius toggle state

    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell) => {
        if (isRadiusEnabled) {
            cell.classList.add('radius');
        } else {
            cell.classList.remove('radius');
        }
    });
});

function getRandomColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}