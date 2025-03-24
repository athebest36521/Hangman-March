alert('This game is under construction!');

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
let wrongGuess = 0
let guessedLetters = []
const maxMistakes = 6

function startGame(level) {
  selectedWord = getRandomWord(level)

  //Update Difficulty Display Div
  updateDifficultyDisplay(level)

  //Create the placeholder's for the selected word
  displayedWord = '_'.repeat(selectedWord.length)
  //display the updated Word
  document.getElementById('wordDisplay').textContent = displayedWord
    .split('')
    .join(' ')

  //Hide Difficulty Selection and Show Game Area & Difficulty Box
  //Add d-none to the #difficultySelection div
  document.getElementById('difficultySelection').classList.add('d-none')

  //remove d-none from #difficultyBox & #gameArea
  document.getElementById('gameArea').classList.remove('d-none')
  document.getElementById('difficultyBox').classList.remove('d-none')

  //add d-block to #difficultyBox & #gameArea
  document.getElementById('gameArea').classList.add('d-block')
  document.getElementById('difficultyBox').classList.add('d-block')
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
    alert('Please enter a valid letter between A-Z!')
    inputField.value = '' //Clear the input field
    return //Exit the function
  }

  //Check if the letter has already been guessed
  if (guessedLetters.includes(guessedLetter)) {
    alert(`You have already guessed ${guessedLetter}, Try a different letter!`)
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
