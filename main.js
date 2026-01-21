const board = document.querySelector('section');
const fragment = document.createDocumentFragment();
const values = ["cross", "circle"];
let nextValue = values[0];

printBoard();
passValueToCSS();

function printBoard() {
    for (let i = 0; i < 9; i++) {
        const div = document.createElement('div');
        div.id = i;
        div.addEventListener('click', handleMove);
        div.className = 'square';
        fragment.appendChild(div);
    }
    board.append(fragment);
}

function handleMove(e) {
    const div = e.target;
    if (div.classList.contains('selected')) return;
    div.classList.add(nextValue);
    div.classList.add('selected');
    toggleNextValue()
}

function toggleNextValue() {
    nextValue = nextValue === values[0] ? values[1] : values[0];
    passValueToCSS()
}

function passValueToCSS() {
    const root = document.documentElement;
    root.style.setProperty('--curr-value', nextValue);
}

function reset() {
    board.replaceChildren()
    printBoard();
}