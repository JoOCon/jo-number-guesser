// variables
var max = 100;
var min = 0;
var user = document.querySelector('.user');
var guessButton = document.querySelector('.guess');
var clearButton = document.querySelector('.clear');
var resetButton = document.querySelector('.reset');
var lastGuess = document.querySelector('.last-guess');
var guessResult = document.querySelector('.answer-results');
var changeRange = document.querySelector('.change-range');
var minimumGuess = document.querySelector('.minimum-guess');
var maximumGuess = document.querySelector('.maximum-guess');
var answer = generateRandomNum(min,max);

// gametest
console.log(answer,min,max);

// user input, enable buttons to start game
user.addEventListener('keyup', toggleButton);

// button to clear out user input
clearButton.addEventListener('click', function() {
  user.value = '';
});

// reset/reload game
resetButton.addEventListener('click', function() {
  location.reload();
});

// guess display/record value
guessButton.addEventListener('click', function(){
  validation();
  user.value = '';
});

// Challenge values adjustment
changeRange.addEventListener('click', challengeValues);

// Creats the random number at start of game and after winning for new game
// The maximum is inclusive and the minimum is inclusive 
function generateRandomNum(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  changePlaceholder();
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// toggle buttons
function toggleButton () {
  var disabled;
  if (user.value === '') {
    disabled = true;
  } else {
    disabled = false;
  } 
  guessButton.disabled = disabled;
  clearButton.disabled = disabled;
  resetButton.disabled = disabled;
};

// answer validate
function validation () {
  var userGuess = parseInt(user.value);
  if (isNaN(userGuess)) {
    alert('You Must Enter A Number');
  } else if (userGuess > max || userGuess <= min) {
    alert('Enter Number Between ' + min + ' and ' + max);
  } else {
    displayAnswer (userGuess);
    checkVictory (userGuess);
  }
}

// answer display in box
function displayAnswer (userGuess) {
  lastGuess.innerText = userGuess;
}

// check if the user has guessed correct
function checkVictory (userGuess) {
  if (userGuess === answer) {
      guessResult.innerText = 'BOOM You Win!';
      gameWin ();
  } else if (userGuess < answer) {
      guessResult.innerText = 'That is too low';
  } else {
      guessResult.innerText = 'That is too high';
  }
}

// once user has won the game
function gameWin () {
  // min = min - 10;
  min -= 10;
  max = max + 10;
  answer = generateRandomNum(min,max);
}

// user entry values
function challengeValues () {
  min = minimumGuess.value;
  max = maximumGuess.value;
  answer = generateRandomNum(min,max);
}

// message generator in input field that tells user the current number range
function changePlaceholder () {
  document.querySelector('.user').placeholder = 'Enter Number Between ' + min +
   ' and ' + max;
}

//// Make my bonus game so that it keeps track of points, you can
//// score at most 100. based on points remaining you will get a grade
//// (A,B,C,D,F) and a message for that.
