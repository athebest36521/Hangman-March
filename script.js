//alert('Final Touches are being made to the Game! Please be patient!');

const wordList = [
  'gold',
  'luck',
  'clover',
  'rain',
  'charm',
  'parade',
  'leprechaun',
  'treasure',
  'celebration',
  'greenery',
  'shenanigans',
  'tradition',
  'pinch'
]

//setting Game Variables
let selectedWord = ''
let displayedWord = ''
let wrongGuesses = 0
let guessedLetters = []
let winsnumber = 0
let lossnumber = 0
const maxMistakes = 6
const winSound = new Audio('audios/mixkit-winning-chimes-2015.wav'); 
const loseSound = new Audio('audios/mixkit-funny-fail-low-tone-2876.wav');

document.addEventListener("keydown", function(event) {
  if (event.key === 'Enter') {
    guessLetter()
  }
});
function startGame(level) {
  selectedWord = getRandomWord(level);

  // Update Difficulty Display Div
  updateDifficultyDisplay(level);

  // Create the placeholder's for the selected word
  displayedWord = '_'.repeat(selectedWord.length);

  // Display the updated Word
  document.getElementById('wordDisplay').textContent = displayedWord
    .split('')
    .join(' ');

  // Hide Difficulty Selection and Show Game Area & Difficulty Box
  document.getElementById('difficultySelection').classList.add('d-none');
  document.getElementById('gameArea').classList.remove('d-none');
  document.getElementById('difficultyBox').classList.remove('d-none');
  document.getElementById('gameArea').classList.add('d-block');
  document.getElementById('difficultyBox').classList.add('d-block');

  // Show the Restart Game button
  document.getElementById('restartBtn').style.display = 'block';
}

function getRandomWord(level) {
  let filteredWords = wordList.filter(word => {
    if (level === 'easy') return word.length <= 4 // Easy: 4 or fewer letters
    if (level === 'medium') return word.length >= 5 && word.length <= 7 // Medium: 5-7 letters
    if (level === 'hard') return word.length >= 8 // Hard: 8+ letters
  })
  //Select and return a random word from the filtered list
  return filteredWords[Math.floor(Math.random() * filteredWords.length)]
}

function updateDifficultyDisplay(level) {
  let difficultyBox = document.getElementById('difficultyBox')

  //Remove any previous difficulty classes ('easy', 'medium', 'hard')
  difficultyBox.classList.remove('easy', 'medium', 'hard')

  //Set text & apply class dynamically using template literals
  difficultyBox.textContent = `Difficulty: ${level.charAt(0).toUpperCase() + level.slice(1)
    }`

  //apply the appropriate CSS style for chosen Difficulty
  difficultyBox.classList.add(level)
}

function guessLetter() {
  let inputField = document.getElementById('letterInput')
  let guessedLetter = inputField.value.toLowerCase()
  //Check if the input is a valid letter(A-Z)
  if (!guessedLetter.match(/^[a-z]$/)) {
    document.getElementById('messages').textContent = 'Please enter a valid letter (A-Z)';
    inputField.value = '' //Clear the input field
    return //Exit the function
  }

  //Check if the letter has already been guessed
  if (guessedLetters.includes(guessedLetter)) {
    document.getElementById('messages').textContent = `You have already guessed ${guessedLetter}, Try a different letter!`;
    inputField.value = '' //Clear the input field
    return //Exit the function
  }
  else {
    //Add the guessed letter to the guessedLetters array
    guessedLetters.push(guessedLetter)
  }

  //Check if the guessed letter is in the selected word
  if (selectedWord.includes(guessedLetter)) {
    //Update the displayed word with the correctly guessed letter
    correctGuess(guessedLetter)
  }
  else {
    wrongGuess(guessedLetter)
  }
  inputField.value = '' //Clear the input field
  inputField.focus() //Focus the input field
}
function wrongGuess(guessedLetter) {
  //Increment the number of wrongGuess counter
  // Increment the number of wrong guesses
  wrongGuesses++;

  // Update the hangman image based on the number of wrong guesses
  document.getElementById('hangman').src = `imgs/Hangman${wrongGuesses}.png`;

  // Add the guessed letter to the HTML div
  document.getElementById('wrongLetters').textContent += ` ${guessedLetter}`;

  // Check if the number of wrong guesses is equal to the maxMistakes
  if (wrongGuesses === maxMistakes) {
    document.getElementById('hangman').src = `imgs/FinalHangman6.png`; // Final hangman image
    endGame(false); // End the game with a loss
  }
}
//Create a function to update the displayed word with the correctly guessed letter
function correctGuess(guessedLetter) {
  //Convert the displayed word to an array
  newDisplayedWord = ''
  //Create a for loop to iterate over the selected word
  for (let i = 0; i < selectedWord.length; i++) {
    //Check if the letter at the current index matches the guessed letter
    if (selectedWord[i] === guessedLetter) {  
      //Update the displayed word with the correctly guessed letter
      newDisplayedWord += guessedLetter
    }
    else {
      //Update the displayed word with the correctly guessed letter
      newDisplayedWord += displayedWord[i]
    }
  }
  //Update the displayed word
  displayedWord = newDisplayedWord
  document.getElementById('wordDisplay').textContent = displayedWord
    .split('')
    .join(' ')
  //Check if the displayed word is equal to the selected word
  if (!displayedWord.includes('_')) {
    endGame(true)
  }
}
function endGame(won) {
  // Disable further input
  
  document.getElementById('letterInput').disabled = true;
  document.getElementById('guessBtn').disabled = true;
  

  // Display the end game message
  if (won) {
    winSound.play();
    winsnumber++
    setTimeout(() => {
      document.getElementById('messages').textContent = 'Congratulations! You have won the game!';
    }, 500);
  } else {
    loseSound.play();
    lossnumber++
    document.getElementById('messages').textContent = `Sorry! You have lost the game! The word was "${selectedWord}".`;
  }
document.getElementById('guessnbr').textContent = `You have won ${winsnumber},and have lost ${lossnumber}.` 
selectedWord = ''
displayedWord = ''
wrongGuesses = 0
guessedLetters = [];
restart().addEventListener
}

const toggleDarkMode = () => {
  document.body.classList.toggle("dark-mode");
  document.querySelectorAll('button').forEach(button => {
      button.classList.toggle("dark-mode");
  });
  document.querySelector('header').classList.toggle("dark-mode");
  document.querySelector('footer').classList.toggle("dark-mode");
};
//add the restartBtn to reload the page

function restart() {
  document.getElementById('restartBtn').addEventListener('click', () => {
    // Redirect to the home page (index.html)
    window.location.href = 'index.html';
  });

    // Reset game variables
    selectedWord = '';
    displayedWord = '';
    wrongGuesses = 0;
    guessedLetters = [];
    winsnumber = 0; // Reset win count
    lossnumber = 0; // Reset loss count
    // Reset UI elements
    document.getElementById('wordDisplay').textContent = '';
    document.getElementById('wrongLetters').textContent = '';
    document.getElementById('messages').textContent = '';
    document.getElementById('guessnbr').textContent = '';
    document.getElementById('letterInput').value = '';
    document.getElementById('letterInput').disabled = false;
    document.getElementById('guessBtn').disabled = false;
    document.getElementById('hangman').src = 'imgs/Hangman.png'; // Reset hangman image

    // Reset visibility of game areas
    document.getElementById('difficultySelection').classList.remove('d-none');
    document.getElementById('gameArea').classList.add('d-none');
    document.getElementById('difficultyBox').classList.add('d-none');
    document.getElementById('gameArea').classList.remove('d-block');
    document.getElementById('difficultyBox').classList.remove('d-block');
  };
