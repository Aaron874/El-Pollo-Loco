let canvas;
let world;
let keyboard = new Keyboard();
let startScreen;
let ctx;
let endScreen;

function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    startScreen = new NewScreen('img/9_intro_outro_screens/start/startscreen_1.png', 0);
    startScreen.img.onload = () => { startScreen.draw(ctx) };
}

function startGame() {
    startScreen = "";
    world = new World(canvas, keyboard);
}

function gameOver() {
    endScreen = new NewScreen('img/You won, you lost/Game over A.png', 0);
    endScreen.draw(ctx);
}

function youWon() {

}

window.addEventListener("keydown", (event) => {
    if (event.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    if (event.keyCode == 37) {
        keyboard.LEFT = true;
    }
    if (event.keyCode == 38) {
        keyboard.UP = true;
    }
    if (event.keyCode == 40) {
        keyboard.DOWN = true;
    }
    if (event.keyCode == 32) {
        keyboard.SPACE = true;
    }
    if (event.keyCode == 68 && !event.repeat) {
        world.throwBottle();
    }
});

window.addEventListener("keyup", (event) => {
    if (event.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    if (event.keyCode == 37) {
        keyboard.LEFT = false;
    }
    if (event.keyCode == 38) {
        keyboard.UP = false;
    }
    if (event.keyCode == 40) {
        keyboard.DOWN = false;
    }
    if (event.keyCode == 32) {
        keyboard.SPACE = false;
    }
    if (event.keyCode == 68) {
        keyboard.D = false;
    }
});