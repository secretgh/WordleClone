const gameBoard = document.getElementById('gameboard');
const guessInput = document.getElementById('guess');
const guessButton = document.getElementById('btnGuess');
let solutionWord = 'VxWorks';
const inputs = [];
const results = [];
const wordSize = solutionWord.length;
const attempts = 5;

document.documentElement.style.setProperty('--word-size', wordSize)
guessInput.maxLength = wordSize;

function validate(word) {
    let result = [];
    let tempSolution = solutionWord.toLowerCase();
    for (let index = 0; index < wordSize; index++) {
        if(word[index] === tempSolution[index])
        {
            result.push('yes')
            tempSolution = tempSolution.replace(word[index], ' ')
        }
        else if (tempSolution.includes(word[index]))
        {
            result.push('maybe')
            tempSolution = tempSolution.replace(word[index], ' ')
        }
        else{
            result.push(word[index])
        }

    }
    console.log(result)
    inputs.push(word);
    results.push(result);
    guessInput.value = "";
    refreshGame();
    if(result.toString().replaceAll(',','') === "yes".repeat(wordSize)){
        guessInput.disabled = true;
        guessButton.disabled = true;
    }
}
// update game UI
function refreshGame() {
  const cells = gameBoard.getElementsByClassName('cell');
    for (let i = 0; i < wordSize*attempts; i++) {
        let cell = cells[i];
        let y = Math.floor(i / wordSize);
        let x = i - y * wordSize;
        if(inputs.length > y && inputs[y][x]) {
            const result = results[y][x] === "yes" ? "correct" : results[y][x] === "maybe" ? "semi-correct" : "incorrect";
            cell.textContent = inputs[y][x].toUpperCase();
            cell.classList.add(result);
        }
    }
}
// Initialize game
function initializeGame() {
    for (let i = 0; i < wordSize*attempts; i++) { // 6 attempts, 5 letters each
        let cell = document.createElement('div');
        cell.classList.add('cell');
        let y = Math.floor(i / wordSize);
        let x = i - y * wordSize;
        if(inputs.length > y && inputs[y][x]) {
            const result = results[y][x] === "+" ? "correct" : results[y][x] === "x" ? "semi-correct" : "incorrect";
            cell.textContent = inputs[y][x].toUpperCase();
            cell.classList.add(result);
        }
        gameBoard.appendChild(cell);
    }
}
// Event listener for the guess button
guessButton.addEventListener('click', function() {
    let guess = guessInput.value.toLowerCase();
    if (guess.length === wordSize) {
        validate(guess)
    } else {
        alert('Please enter a '+wordSize+'-letter word.');
    }
});
initializeGame();