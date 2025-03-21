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
    'tradition'
  ]
  
  //setting Game Variables
  let selectedWord = ''
  let displayedWord = ''
  let wrongGuess = 0
  let guessedLetters = []
  const maxMistakes = 6
  
  function startGame (level) {
    selectedWord = getRandomWord(level)
  
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
  
  function getRandomWord (level) {
    let filteredWords = wordList.filter(word => {
      if (level === 'easy') return word.length <= 4 // Easy: 4 or fewer letters
      if (level === 'medium') return word.length >= 5 && word.length <= 7 // Medium: 5-7 letters
      if (level === 'hard') return word.length >= 8 // Hard: 8+ letters
    })
    //Select and return a random word from the filtered list
    return filteredWords[Math.floor(Math.random() * filteredWords.length)]
  }