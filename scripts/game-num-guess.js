let randomNumber = Math.floor(Math.random() * 100) + 1;
let guessCount = 1;

const guessField = document.querySelector(".guessesField");
const guessSubmit = document.querySelector(".submitField");

const guessHistory = document.querySelector(".guessHistory");
const guessResult = document.querySelector(".guessResult");

guessSubmit.addEventListener("click", checkGuess);

guessField.focus();

function checkGuess() {
  userValue = Number(guessField.value);
  if (userValue > 100 || userValue <= 0) {
    guessResult.textContent = "只能是1到100内的数哦! ";
    guessResult.style.backgroundColor = "red";
    return;
  }
  if (guessCount === 1) {
    guessHistory.textContent = "猜测记录： ";
  }
  if (guessCount >= 10) {
    guessResult.textContent = "游戏结束! ";
    guessResult.style.backgroundColor = "red";
    setGameOver();
    return;
  }
  if (userValue === randomNumber) {
    guessResult.textContent = "恭喜你！猜对啦！";
    guessResult.style.backgroundColor = "green";
    setGameOver();
  } else if (userValue > randomNumber) {
    guessResult.textContent = "稍微大了一些哦";
    guessResult.style.backgroundColor = "red";
  } else {
    guessResult.textContent = "稍微小了一些哦";
    guessResult.style.backgroundColor = "red";
  }

  guessHistory.textContent += userValue + " ";

  guessCount += 1;
}

function setGameOver() {
  guessField.disabled = true;
  guessSubmit.disabled = true;

  resetButton = document.createElement("button");
  resetButton.textContent = "再来一局";
  document.body.appendChild(resetButton);
  resetButton.addEventListener("click", resetGame);
}
function resetGame() {
  guessCount = 1;
  guessField.disabled = false;
  guessSubmit.disabled = false;
  guessHistory.textContent = "";
  guessResult.textContent = "";
  guessField.value = "";
  guessResult.style.backgroundColor = "white";
  guessField.focus();
<<<<<<< HEAD

=======
  // hahhahah
>>>>>>> test_site_fix
  randomNumber = Math.floor(Math.random() * 100) + 1;
  resetButton.parentNode.removeChild(resetButton);
}
