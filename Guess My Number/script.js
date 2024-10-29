'use strict';

let secratNumber = Math.trunc(Math.random() * 20) + 1;

let score = Number(document.querySelector('.score').textContent);

let highScore = 0;

document.querySelector(`.check`).addEventListener('click', () => {
  const guess = Number(document.querySelector(`.guess`).value);

  //No Input
  if (!guess) {
    messageDoc('⛔No Number');
    return;
  }
  //Out of Chanse
  if (score <= 1) messageDoc('Game Over!');
  if (score > 0) {
    // When Player Win
    if (guess === secratNumber) {
      messageDoc('🎉Correct Number');
      bodyDoc('#60b347');
      numberDisplay('30rem');
      numberDoc(secratNumber);

      // Update the HighScore
      if (score > highScore) {
        highScore = score;
        document.querySelector('.highscore').textContent = score;
      }
    } else {
      guess < secratNumber
        ? wrongeNumber('📉 Too Low!')
        : wrongeNumber('📈 Too High!');
    }
  }
});

document.querySelector('.again').addEventListener('click', () => {
  // location.reload();
  resetGame();
});

function resetGame() {
  score = 20;
  scoreDoc(score);
  messageDoc('Start guessing...');
  guessDoc('');
  bodyDoc('#222');
  numberDisplay('15rem');
  secratNumber = Math.trunc(Math.random() * 20) + 1;
  numberDoc('?');
}
function messageDoc(stringText) {
  document.querySelector('.message').textContent = stringText;
}
function scoreDoc(stringText) {
  document.querySelector('.score').textContent = stringText;
}
function numberDoc(stringText) {
  document.querySelector('.number').textContent = stringText;
}
function numberDisplay(stringText) {
  document.querySelector('.number').style.width = stringText;
}
function guessDoc(stringText) {
  document.querySelector('.guess').value = stringText;
}
function bodyDoc(stringText) {
  document.querySelector('body').style.backgroundColor = stringText;
}
function wrongeNumber(stringText) {
  messageDoc(stringText);
  score--;
  scoreDoc(score);
}
