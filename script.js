const sketch = document.querySelector('.sketch');

function createGrid(rows, columns) {
    for (let i = 0; i < rows * columns; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        sketch.appendChild(cell);

        cell.addEventListener('mouseover', (event) => {
            const selectedColor = document.getElementById('setcolor').value;
            event.target.style.backgroundColor = selectedColor;
        });
    }
}

createGrid(16, 16);

const colorPicker = document.getElementById('setcolor');

colorPicker.addEventListener('input', (event) => {
    const selectedColor = event.target.value;

    cell.style.backgroundColor = selectedColor;
});