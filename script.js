let currentPlayer; // Variable to track current player
let player1Score = 0;
let player2Score = 0;
const diceImages = ["1.png", "2.png", "3.png", "4.png", "5.png", "6.png"];

function initializeGame() {
  currentPlayer = Math.round(Math.random()) + 1; // Randomly set starting player (1 or 2)
  document.getElementById("roll-btn1").disabled =
    currentPlayer === 1 ? false : true;
  document.getElementById("roll-btn2").disabled =
    currentPlayer === 2 ? false : true;
  document.getElementById("reset-btn").disabled = true;

  // Remove any existing dice images from the dice container
  const diceContainer = document.getElementById("dice-container");
  diceContainer.innerHTML = "";

  // Add dice images to the dice container
  for (let i = 0; i < diceImages.length; i++) {
    const diceImage = document.createElement("img");
    diceImage.src = diceImages[i];
    diceImage.alt = `Dice ${i + 1}`;
    diceContainer.appendChild(diceImage);
  }
}

function rollDice(player) {
  const diceValue = Math.floor(Math.random() * 6) + 1; // Generate random dice value (1-6)
  const diceImage = document.getElementById("dice-image");
  diceImage.src = diceImages[diceValue - 1]; // Subtract 1 because array index starts from 0
  diceImage.classList.add("rolled");

  let playerScore;
  let rollBtn1;
  let rollBtn2;

  if (player === "player1") {
    playerScore = player1Score;
    rollBtn1 = document.getElementById("roll-btn1");
    rollBtn2 = document.getElementById("roll-btn2");
  } else {
    playerScore = player2Score;
    rollBtn1 = document.getElementById("roll-btn2");
    rollBtn2 = document.getElementById("roll-btn1");
  }

  playerScore += diceValue;
  document.getElementById(`${player}-score`).textContent = playerScore;
  if (player === "player1") {
    player1Score = playerScore;
  } else {
    player2Score = playerScore;
  }

  rollBtn1.disabled = true;
  rollBtn2.disabled = false;

  if (playerScore >= 30) {
    let winner = player === "player1" ? "Player 1" : "Player 2";
    endGame(winner);
  }
}

function endGame(winner) {
  alert(`${winner} wins the game!`);
  document.getElementById("roll-btn1").disabled = true;
  document.getElementById("roll-btn2").disabled = true;
  document.getElementById("reset-btn").disabled = false;
}

function resetGame() {
  player1Score = 0;
  player2Score = 0;
  document.getElementById("player1-score").textContent = 0;
  document.getElementById("player2-score").textContent = 0;
  document.getElementById("reset-btn").disabled = true;
  initializeGame();
}

initializeGame(); // Initialize game when page loads
