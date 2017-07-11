/* jshint esversion: 6 */
/* jshint devel: true */
/* jshint node: true */
/* jshint browser: true */

'use strict';

document.addEventListener('DOMContentLoaded', function() {
  let guessBtn = document.getElementById('guess');
  let guessBox = document.querySelector('.guess-box');

  let wordToGuess = '';
  let wrongAttempts = 0;

  // adds event listeners to the guess text box and button
  guessBtn.addEventListener('click', checkLetter);

  guessBox.focus();
  guessBox.addEventListener('keyup', function(event) {
    if (event.keyCode === 13) checkLetter();
  });

  wordToGuess = selectWord(words);

  // gets, validates, and checks for guessed letter
  function checkLetter() {
    let guess = '';
    let letter = document.querySelector('.guess-box').value;

    document.querySelector('.guess-box').value = '';

    if (letter.length) {
      if ((letter.charCodeAt(0) > 96 && letter.charCodeAt(0) < 123) ||
        (letter.charCodeAt(0) > 64 && letter.charCodeAt(0) < 91)) {
          console.log(letter.toLowerCase());
          updateAttempt(letter.toLowerCase());
      }
    }
  }

  function updateAttempt(letter) {
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
        if (wordToGuess[i] === letter) {
          trackProgress[i] = letter;
        }
      }
      
      document.getElementsByTagName('h1')[0].innerText = trackProgress.join('');
    }
  }



});


// MAIN - game loop

// function to re-initialize game:
  // draw scaffold
  // show blanks for word to be guessed
  // show location for incorrect letters
  // show remaining number of guesses as zero
  // show form for entering guesses

// function to select random word and display placeholder
function selectWord(array) {
  let index = Math.floor(Math.random() * (words.length - 1));
  let word = words[index];
  let progress = '';

  for (let i = 0; i < word.length; i++) {
    progress += '_';
  }

  let h1Ele = document.getElementsByTagName('h1')[0];
  console.log(word);
  h1Ele.innerText = progress;
  return word;
}


// function to check guesses

// function to update game state:
  // remaining guesses?
  // word correctly guessed?

// function to update DOM:
  // scaffold
  // incorrect letter list
  // remaining number of guesses
