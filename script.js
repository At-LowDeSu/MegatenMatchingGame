gameField = document.querySelector('#game-field');
gameItems = document.querySelectorAll('.game-item');
scoreMeter = document.querySelector('#score');
resetButton = document.querySelector('#replay-button');
victoryText = document.querySelector('#change-this-text');
highScore = document.querySelector('#highscore');

let tileOrder = [];
let x = 0;
let score = 0;
let clicks = 0;
let hit = 0;
let firstClickTarget;
let highscore = 0;
let improvement = 0;

initializeGame();

//Initialize Game
function initializeGame() {
  //Randomizes the order of the tiles
  gameItems.forEach(e => {
    randomNum = Math.floor(Math.random() * Math.floor(2));
    switch (randomNum) {
      case 0:
        tileOrder.push(e);
        break;

      case 1:
        tileOrder.unshift(e);
        break;
    }
  });
  //Adds a class to each game-item based on what it should be
  tileOrder.forEach(e => {
    x += 1;
    switch (x) {
      case 1: {
        e.className += ' jackFrost';
        break;
      }
      case 2: {
        e.className += ' jackFrost';
        break;
      }
      case 3: {
        e.className += ' blackFrost';
        break;
      }
      case 4: {
        e.className += ' blackFrost';
        break;
      }
      case 5: {
        e.className += ' demifiend';
        break;
      }
      case 6: {
        e.className += ' demifiend';
        break;
      }
      case 7: {
        e.className += ' flynn';
        break;
      }
      case 8: {
        e.className += ' flynn';
        break;
      }
      case 9: {
        e.className += ' itsuki';
        break;
      }
      case 10: {
        e.className += ' itsuki';
        break;
      }
      case 11: {
        e.className += ' joker';
        break;
      }
      case 12: {
        e.className += ' joker';
        break;
      }
      case 13: {
        e.className += ' kazuya';
        break;
      }
      case 14: {
        e.className += ' kazuya';
        break;
      }
      case 15: {
        e.className += ' pyroJack';
        break;
      }
      case 16: {
        e.className += ' pyroJack';
        break;
      }
    }
  });
}

//Update the picture for clicked icons
function updateItem(e) {
  if (e.className.includes('blackFrost')) {
    e.firstElementChild.src = '/img/blackFrost.png';
  }
  if (e.className.includes('demifiend')) {
    e.firstElementChild.src = '/img/demifiend.png';
  }
  if (e.className.includes('flynn')) {
    e.firstElementChild.src = '/img/flynn.png';
  }
  if (e.className.includes('itsuki')) {
    e.firstElementChild.src = '/img/itsuki.png';
  }
  if (e.className.includes('joker')) {
    e.firstElementChild.src = '/img/joker.png';
  }
  if (e.className.includes('kazuya')) {
    e.firstElementChild.src = '/img/kazuya.png';
  }
  if (e.className.includes('pyroJack')) {
    e.firstElementChild.src = '/img/pyroJack.png';
  }
  if (e.className.includes('jackFrost')) {
    e.firstElementChild.src = '/img/jackFrost.png';
  }
}

//Update Score
function updateScore() {
  scoreMeter.innerText = `Score: ${score}`;
}

//Click
function click(e) {
  if (firstClickTarget !== e) {
    victoryText.innerText = 'Keep it up!';
    if (e.className.includes('clicked')) {
      null;
    } else {
      switch (clicks) {
        case 0:
          clicks += 1;
          firstClick(e);
          break;
        case 1:
          clicks = 0;
          secondClick(e);
          break;
      }
    }
  }
}

//First Click
function firstClick(e) {
  firstClickTarget = e;
  updateItem(e);
  updateScore();
}

//Second Click
function secondClick(e) {
  secondClickTarget = e;

  updateItem(e);
  compareClicks(firstClickTarget, secondClickTarget);
  updateScore();
  if (hit >= 16) {
    gameOver();
  }
}

//Compare Clicks
function compareClicks(first, second) {
  let firstArr = first.className.split(' ');
  let secondArr = second.className.split(' ');
  firstType = firstArr[2];
  secondType = secondArr[2];
  if (firstType === secondType) {
    score += 1;
    hit += 2;
    first.className += ' clicked';
    second.className += ' clicked';
    victoryText.innerText = 'Nice Job!';
  } else {
    if (score > 0) {
      score -= 1;
    }
    victoryText.innerText = "Don't give up! Try again.";
    first.firstElementChild.src = '/img/atlus.png';
    second.firstElementChild.src = '/img/atlus.png';
  }
  //This will use the data saved to compare the two clicks to see if they are the same. If they are, add to the score and change the status of both clicks to 'cleared' and if not remove the 'clicked' status without adding cleared.
}

//Game Over
function gameOver() {
  victoryText.innerText = `You won! Your score was ${score}.`;
  if (score > highscore) {
    improvement = score - highscore;
    victoryText.innerText = `You won! Your score was ${score}, which is ${improvement} points higher than your previous highscore of ${highscore}!`;
    highscore = score;
    highScore.innerText = `High Score: ${highscore}`;
  }
}

//Replay game
function replay() {
  tileOrder.forEach(e => {
    e.firstElementChild.src = '/img/atlus.png';
    let temp = e.className.split(' ');
    e.className = temp[0] + ' ' + temp[1];
  });
  tileOrder = [];
  x = 0;
  score = 0;
  clicks = 0;
  hit = 0;
  firstClickTarget;
  initializeGame();
  updateScore();
  victoryText.innerText = 'Click a box to play.';
}

//Event Listeners

gameField.addEventListener('click', e => {
  let currentItem = e.target.parentElement;
  click(currentItem);
});

resetButton.addEventListener('click', e => {
  replay();
});
