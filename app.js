/* jshint esversion: 6 */
/* jshint devel: true */
/* jshint node: true */
/* jshint browser: true */

'use strict';

document.addEventListener('DOMContentLoaded', function() {
  let wordToGuess = selectWord(words);
  let wrongAttempts = 0;

  let guessBtn = document.getElementById('guess');
  let guessBox = document.querySelector('.guess-box');
  let playBtn = document.getElementById('play-again');

  // adds event listeners to the guess text box and button
  guessBtn.addEventListener('click', main);

  guessBox.focus();
  guessBox.addEventListener('keyup', keyUpHandler(event));

  playBtn = document.addEventListener('click', function(event) {
    if (event.target.value === 'Play again!') {
      event.preventDefault();
      location.reload();
    }
  });

  // handler for keyup event
  function keyUpHandler(event) {
    if (event.keyCode === 13) main();
  }

  // controls flow of game
  function main() {
    let letter = getLetter();
    updateGameStatus(letter);
    checkEndOfGame();
  }

  // gets and validates guessed letter
  function getLetter() {
    let letter = document.querySelector('.guess-box').value;

    // clears guess field
    document.querySelector('.guess-box').value = '';

    if (letter.length) {
      if ((letter.charCodeAt(0) > 96 && letter.charCodeAt(0) < 123) ||
        (letter.charCodeAt(0) > 64 && letter.charCodeAt(0) < 91)) {
          return letter.toLowerCase();
      }
    }

    else main(); // this is not an optimal way to handle invalid input
  }

  // updates game status for guess attempt
  function updateGameStatus(letter) {
    if (wordToGuess.indexOf(letter) === -1) {
      wrongAttempts++;

      let wlEle = document.querySelector('.wrong-list');
      let wrongList = wlEle.innerText;
      wlEle.innerText = wrongList + ' ' + letter + ' ';

      let siEle = document.getElementById('status-img');
      siEle.children[0].setAttribute('src',"assets/h" + wrongAttempts + ".jpg");
    } else {
      let trackProgress = document.getElementsByTagName('h1')[0].innerText.split('');

      for (var i = 0; i < wordToGuess.length; i++) {
        if (wordToGuess[i] === letter) trackProgress[i] = letter;
      }

      document.getElementsByTagName('h1')[0].innerText = trackProgress.join('');
    }
  }

  // checks for the end of the game, reports result, and removes event listeners
  // from guess field
  function checkEndOfGame() {
    if (wrongAttempts === 7 || wordToGuess === document.getElementsByTagName('h1')[0].innerText) {
      let resultEle = document.getElementById('result');
      let messageEle = document.getElementsByTagName('p')[0];

      if (wrongAttempts === 7) {
        resultEle.classList.add('lost');
        messageEle.innerText = 'Game Over! The word was: ' + wordToGuess + '.';
      }

      if (wordToGuess === document.getElementsByTagName('h1')[0].innerText) {
        resultEle.classList.add('won');
        messageEle.innerText = 'Congrats! You figured it out!';
      }

      guessBtn.removeEventListener('click', main);
      guessBox.removeEventListener('keyup', keyUpHandler);
    }
  }
});

// function to select random word and display placeholder based on length of word
function selectWord(array) {
  let index = Math.floor(Math.random() * (words.length - 1));
  let word = words[index];
  let progress = '';

  for (let i = 0; i < word.length; i++) {
    progress += '_';
  }

  let h1Ele = document.getElementsByTagName('h1')[0];
  h1Ele.innerText = progress;

  return word;
}
