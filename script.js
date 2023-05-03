const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const blockSize = 25;
const rows = 20;
const cols = 20;
let speed = 10;

let headX = (blockSize * rows) / 2;
let headY = (blockSize * cols) / 2;
let xVel = 0;
let yVel = 0;
class SnakePart {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
}
let = snakeParts = [new SnakePart(headX, headY), new SnakePart(headX, headY)];

let foodX = blockSize * getRandomNum();
let foodY = blockSize * getRandomNum();

let gamePaused = false;
let gameOver = false;
let score = 0;

function setStart() {
	gameOver = false;
	gamePaused = false;
	headX = (blockSize * rows) / 2;
	headY = (blockSize * cols) / 2;
	xVel = 0;
	yVel = 0;
	score = 0;
	snakeParts = [new SnakePart(headX, headY), new SnakePart(headX, headY)];
	speed = 10;
	placeFood();
	drawGame();
}

function drawGame() {
	if (gameOver) return showGameOver(gameOver);
	if (!gamePaused) {
		drawBoard();
		drawFood();
		drawSnake();
		checkWallsCollision();
		checkFoodCollision();
		checkTailCollision();
		drawScore();
	}
	setTimeout(() => drawGame(), 1000 / speed);
}

drawGame();

function drawBoard() {
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, blockSize * rows, blockSize * cols);
}

function drawSnake() {
	headX += xVel * blockSize;
	headY += yVel * blockSize;
	ctx.fillStyle = "lime";
	ctx.fillRect(headX, headY, blockSize, blockSize);

	ctx.fillStyle = "yellow";
	for (let i = 0; i < snakeParts.length; i++) {
		const part = snakeParts[i];
		ctx.fillRect(part.x, part.y, blockSize, blockSize);
	}

	for (let i = snakeParts.length - 1; i > 0; i--) {
		snakeParts[i] = snakeParts[i - 1];
	}
	if (snakeParts.length) {
		snakeParts[0] = new SnakePart(headX, headY);
	}
}

function drawFood() {
	ctx.fillStyle = "red";
	ctx.fillRect(foodX, foodY, blockSize, blockSize);

	ctx.fillStyle = "green";
	ctx.fillRect(foodX + 10, foodY - 5, 3, 6);
}

function placeFood() {
	foodX = blockSize * getRandomNum();
	foodY = blockSize * getRandomNum();
}

function checkFoodCollision() {
	if (foodX === headX && foodY === headY) {
		score++;
		placeFood();
		snakeParts.push(new SnakePart(foodX, foodY));
		speed += 0.3;
	}
}

function checkWallsCollision() {
	if (headX < 0 || headY < 0 || headX >= blockSize * rows || headY >= blockSize * cols) {
		gameOver = "lost";
	}
	console.log(headY);
}
function checkTailCollision() {
	for (let i = snakeParts.length - 1; i > 1; i--) {
		const part = snakeParts[i];
		if (headX === part.x && headY === part.y) {
			gameOver = "lost";
		}
	}
}

function drawScore() {
	ctx.fillStyle = "white";
	ctx.font = "18px Comic Sans MS";
	ctx.fillText("scor:  " + score, (blockSize * cols) / 2 - 18, 30);

	if (score === 50) {
		gameOver = "won";
	}
}
function showGameOver(motive) {
	drawBoard();
	const msg = motive === "won" ? "congratz! u snekd gud" : "u snekd";
	ctx.fillStyle = "white";
	ctx.font = "30px Comic Sans MS";
	ctx.fillText(msg, (blockSize * rows) / 2 - blockSize * 3, (blockSize * cols) / 2);
	ctx.font = "20px Comic Sans MS";
	ctx.fillText(
		"press spece to snek again",
		(blockSize * rows) / 2 - blockSize * 3,
		(blockSize * cols) / 2 + blockSize * 2
	);
}

document.addEventListener("keydown", (e) => moveSnake(e));
function moveSnake(e) {
	console.log(e.key);
	if (e.key === " ") {
		if (!gameOver) {
			gamePaused = !gamePaused;
		} else {
			setStart();
		}
	}
	if (e.key === "ArrowUp" && yVel != 1) {
		xVel = 0;
		yVel = -1;
	}

	if (e.key === "ArrowDown" && yVel != -1) {
		xVel = 0;
		yVel = 1;
	}

	if (e.key === "ArrowLeft" && xVel != 1) {
		xVel = -1;
		yVel = 0;
	}

	if (e.key === "ArrowRight" && xVel != -1) {
		xVel = 1;
		yVel = 0;
	}
}

//utils
function getRandomNum() {
	return Math.floor(Math.random() * 20);
}
