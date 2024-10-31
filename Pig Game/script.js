'use strict';

// select elements
const score0 = document.querySelector('#score--0');
const score1 = document.getElementById('score--1');

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// first values
const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;
let dice = Math.trunc(Math.random() * 6 + 1);

diceEl.classList.add('hidden');

btnRoll.addEventListener('click', () => {
  if (playing) {
    dice = Math.trunc(Math.random() * 6 + 1);

    diceEl.src = `dice-${dice}.png`;
    diceEl.classList.remove('hidden');
    if (dice !== 1) {
      currentScore = currentScore + dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer(activePlayer);
    }
  }
});

btnHold.addEventListener('click', () => {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      playing = false;
    } else switchPlayer(activePlayer);
  }
});

btnNew.addEventListener('click', () => {
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');

  document.querySelector(`.player--0`).classList.add('player--active');

  scores[0] = 0;
  scores[1] = 0;
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  dice = Math.trunc(Math.random() * 6 + 1);

  diceEl.classList.add('hidden');
  score0.textContent = 0;
  score1.textContent = 0;

  current0El.textContent = 0;
  current1El.textContent = 0;
});

function switchPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 1 ? 0 : 1;

  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
}
