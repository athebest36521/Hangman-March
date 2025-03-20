alert('This game is under construction!');

const wordList = [
];

let selectedWord = '';
let displayedWord = '';
let wrongGuess = 0;
let guessedLetters = [];
const maxMistakes = 6;














function startGame(level){
    selectedWord = getRandomWord(level);
    //Hide difficulty selection and show game area & difficulty box
    //Add d-none to the #difficultySelection div
    document.getElementById('difficultySelection').classList.add('d-none');
    //Remove d-none from the #gameArea div
    document.getElementById('gameArea').classList.remove('d-none');
    //Remove d-none from the #difficultyBox div
    document.getElementById('difficultyBox').classList.remove('d-none');
}

function getRandomWord(level){
    let filteredWords = wordList.filter(word => {
if (level === 'easy') return word.length <= 4;
if (level === 'medium') return word.length > 5 && word.length <= 7;
if (level === 'hard') return word.length > 8;
    });
    return filteredWords[Math.floor(Math.random() * filteredWords.length)];
}
