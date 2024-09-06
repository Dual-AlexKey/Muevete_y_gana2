document.addEventListener('DOMContentLoaded', () => {
    const centerBox = document.getElementById('center');
    const livesDisplay = document.getElementById('lives');
    const statusDisplay = document.getElementById('status');

    const positions = {
        top: { left: '160px', top: '10px' },
        bottom: { left: '160px', top: '310px' },
        left: { left: '10px', top: '160px' },
        right: { left: '310px', top: '160px' }
    };

    let currentPos = { left: '160px', top: '160px' };
    let lives = 3;
    let gameOver = false;

    const directions = {
        ArrowUp: positions.top,
        ArrowDown: positions.bottom,
        ArrowLeft: positions.left,
        ArrowRight: positions.right,
        top: positions.top,
        bottom: positions.bottom,
        left: positions.left,
        right: positions.right
    };

    const characteristics = ["Rizado", "Elegante", "Guapo", "Delgado"];
    const targetPositions = ["top", "bottom", "left", "right"];
    let remainingCharacteristics = [...characteristics];

    function setRandomCharacteristic() {
        if (remainingCharacteristics.length === 0) {
            statusDisplay.textContent = "¡Has ganado el juego!";
            centerBox.textContent = "O";
            gameOver = true;
            return;
        }

        const randomIndex = Math.floor(Math.random() * remainingCharacteristics.length);
        const characteristic = remainingCharacteristics[randomIndex];
        centerBox.textContent = characteristic;
        centerBox.setAttribute('data-target', targetPositions[characteristics.indexOf(characteristic)]);
    }

    function checkWin() {
        const targetPosition = centerBox.getAttribute('data-target');
        if (positions[targetPosition].left === currentPos.left && positions[targetPosition].top === currentPos.top) {
            remainingCharacteristics = remainingCharacteristics.filter(char => char !== centerBox.textContent);
            if (remainingCharacteristics.length > 0) {
                alert("¡Correcto! Continúa...");
                setRandomCharacteristic();
                resetPosition();
            } else {
                statusDisplay.textContent = "¡Has ganado el juego!";
                centerBox.textContent = "O";
                gameOver = true;
            }
        } else {
            lives--;
            livesDisplay.textContent = `Vidas: ${lives}`;
            if (lives === 0) {
                alert("¡Has perdido! Fin del juego.");
                centerBox.textContent = "X";
                statusDisplay.textContent = "Juego Terminado";
                gameOver = true;
            } else {
                alert("¡Incorrecto! Pierdes una vida.");
                setRandomCharacteristic();
                resetPosition();
            }
        }
    }

    function resetPosition() {
        currentPos = { left: '160px', top: '160px' };
        centerBox.style.left = currentPos.left;
        centerBox.style.top = currentPos.top;
    }

    function resetGame() {
        lives = 3;
        gameOver = false;
        livesDisplay.textContent = `Vidas: ${lives}`;
        remainingCharacteristics = [...characteristics];
        statusDisplay.textContent = "";
        setRandomCharacteristic();
        resetPosition();
    }

    function handleDirection(direction) {
        if (!gameOver && directions[direction]) {
            currentPos = directions[direction];
            centerBox.style.left = currentPos.left;
            centerBox.style.top = currentPos.top;
            checkWin();
        }
    }

    // Evento de teclado
    document.addEventListener('keydown', (e) => {
        handleDirection(e.key);
    });

    // Eventos táctiles
    document.getElementById('topButton').addEventListener('touchstart', () => handleDirection('top'));
    document.getElementById('bottomButton').addEventListener('touchstart', () => handleDirection('bottom'));
    document.getElementById('leftButton').addEventListener('touchstart', () => handleDirection('left'));
    document.getElementById('rightButton').addEventListener('touchstart', () => handleDirection('right'));

    setRandomCharacteristic();
});
