const guessInput = document.getElementById('guess');
const submitButton = document.getElementById('submit');
const resetButton = document.getElementById('reset');
const messages = document.getElementsByClassName('message');
const tooHighMessage = document.getElementById('too-high');
const tooLowMessage = document.getElementById('too-low');
const maxGuessesMessage = document.getElementById('max-guesses');
const numberOfGuessesMessage = document.getElementById('number-of-guesses');
const correctMessage = document.getElementById('correct');

let targetNumber;
let attempts = 0;
const maxNumberOfAttempts = 5;

// Generate a random number between 1 and 99 (inclusive)
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to check the player's guess
function checkGuess() {
  // Convert input to number
  const guess = parseInt(guessInput.value, 10);

  // Validate the input (ensure it's a number within range)
  if (isNaN(guess) || guess < 1 || guess > 99) {
    alert("Please enter a valid number between 1 and 99.");
    guessInput.value = "";
    return;
  }

  attempts += 1;
  hideAllMessages();

  if (guess === targetNumber) {
    numberOfGuessesMessage.style.display = 'block';
    numberOfGuessesMessage.textContent = `You made ${attempts} guesses.`;
    correctMessage.style.display = 'block';

    submitButton.disabled = true;
    guessInput.disabled = true;
  } else {
    if (guess < targetNumber) {
      tooLowMessage.style.display = 'block';
    } else {
      tooHighMessage.style.display = 'block';
    }

    const remainingAttempts = maxNumberOfAttempts - attempts;
    numberOfGuessesMessage.style.display = 'block';
    numberOfGuessesMessage.textContent = `You guessed ${guess}. ${remainingAttempts} guesses remaining.`;

    // If max attempts are reached, show Game Over message
    if (attempts === maxNumberOfAttempts) {
      submitButton.disabled = true;
      guessInput.disabled = true;
      maxGuessesMessage.style.display = 'block';
    }
  }

  guessInput.value = "";
  resetButton.style.display = 'block';
}

// Function to hide all messages
function hideAllMessages() {
  for (let i = 0; i < messages.length; i++) {
    messages[i].style.display = 'none';
  }
}

// Function to set up a new game
function setup() {
  targetNumber = getRandomNumber(1, 99);
  console.log(`Target Number: ${targetNumber}`); // Keep for debugging

  attempts = 0;

  submitButton.disabled = false;
  guessInput.disabled = false;
  guessInput.value = "";

  hideAllMessages();
  resetButton.style.display = 'none';
}

// Event listeners
submitButton.addEventListener('click', checkGuess);
resetButton.addEventListener('click', setup);

// Initialize game
setup();