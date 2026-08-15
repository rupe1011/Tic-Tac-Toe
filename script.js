function Gameboard() {
    const board = ["", "", "", "", "", "", "", "", ""];

    function placeMark(position, mark) {
        if (board[position] === "") {
            board[position] = mark;
        }
    }

    function getBoard() {
        return board;
    }

    function resetBoard() {
        board.fill("");
    }

    return {
        board,
        placeMark,
        getBoard,
        resetBoard
    };
}


function Player(name, mark) {
    return {
        name,
        mark
    };
}


function Game(name1, name2) {
    const gameboard = Gameboard();

    const player1 = Player(name1, "X");
    const player2 = Player(name2, "O");

    let currentPlayer = player1;
    let gameOver = false;
    let result = "";

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];


    function playRound(position) {

        if (gameOver) {
            return;
        }

        gameboard.placeMark(position, currentPlayer.mark);

        const winner = checkWinner();

        if (winner) {
            gameOver = true;
            result = winner;
            return;
        }

        if (checkTie()) {
            gameOver = true;
            result = "tie";
            return;
        }

        if (currentPlayer === player1) {
            currentPlayer = player2;
        } else {
            currentPlayer = player1;
        }
    }


    function checkWinner() {
        const board = gameboard.getBoard();

        for (const combination of winningCombinations) {
            const [a, b, c] = combination;

            if (
                board[a] !== "" &&
                board[a] === board[b] &&
                board[a] === board[c]
            ) {
                return board[a];
            }
        }

        return null;
    }


    function checkTie() {
        const board = gameboard.getBoard();

        return board.every(cell => cell !== "");
    }


    function getBoard() {
        return gameboard.getBoard();
    }


    function getResult() {
        return result;
    }


    function getCurrentPlayer() {
        return currentPlayer;
    }


    function restart() {
        gameboard.resetBoard();

        currentPlayer = player1;
        gameOver = false;
        result = "";
    }


    return {
        playRound,
        getBoard,
        getResult,
        getCurrentPlayer,
        restart
    };
}


// DOM

let game = null;

const cells = document.querySelectorAll(".cell");

const message = document.querySelector("#message");

const startButton = document.querySelector("#start");

const restartButton = document.querySelector("#restart");

const player1Input = document.querySelector("#player1-name");

const player2Input = document.querySelector("#player2-name");


// START

startButton.addEventListener("click", () => {

    const name1 = player1Input.value || "Jugador 1";

    const name2 = player2Input.value || "Jugador 2";

    game = Game(name1, name2);

    render();
});


// CELLS

cells.forEach(cell => {

    cell.addEventListener("click", () => {

        if (!game) {
            return;
        }

        const index = Number(cell.dataset.index);

        game.playRound(index);

        render();
    });
});


// RENDER

function render() {

    if (!game) {
        return;
    }

    const board = game.getBoard();

    cells.forEach((cell, index) => {
        cell.textContent = board[index];
    });


    const result = game.getResult();

    if (result === "X") {
        message.textContent = "Ganó X";
    }

    else if (result === "O") {
        message.textContent = "Ganó O";
    }

    else if (result === "tie") {
        message.textContent = "Empate";
    }

    else {
        const currentPlayer = game.getCurrentPlayer();

        message.textContent = `Turno de ${currentPlayer.name} (${currentPlayer.mark})`;
    }
}


// RESTART

restartButton.addEventListener("click", () => {

    if (!game) {
        return;
    }

    game.restart();

    render();
});

console.log("JS FUNCIONANDO");