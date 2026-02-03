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
    toggleNextValue();
}

function toggleNextValue() {
    const winnerPattern = checkWinner();
    if(winnerPattern){
        winnerPattern.forEach(id => {
            document.getElementById(id).classList.add('winner');
        });
        document.querySelectorAll('.square').forEach(s => s.removeEventListener('click', handleMove));
        return;
    }
    nextValue = nextValue === values[0] ? values[1] : values[0];
    passValueToCSS();
}

// 0  1  2
// 3  4  5
// 6  7  8

function checkWinner(){
    const boardState = getBoardState();    
    const winningPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for(let pattern of winningPatterns){
        const [a, b, c] = pattern;

        if(boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]){
            return pattern;
        }
    }
    return null;
}



function getBoardState(){
    return [...document.querySelectorAll('.square')].map(s => {
        if(s.classList.contains('cross')) return 'cross';
        if(s.classList.contains('circle')) return 'circle';
        return null;
    })
}

function passValueToCSS() {
    const root = document.documentElement;
    root.style.setProperty('--curr-value', nextValue);
}

function reset() {
    nextValue = values[0];
    board.replaceChildren()
    passValueToCSS();
    printBoard();
}