
// Game Over, Press Any Key to Restart
// Level

var red = new Audio('assets/sounds/red.mp3');
var yellow = new Audio('assets/sounds/yellow.mp3');
var blue = new Audio('assets/sounds/blue.mp3');
var green = new Audio('assets/sounds/green.mp3');

const sounds = {
    red: red,
    green: green,
    yellow: yellow,
    blue: blue,
}

var colors = [];
var userInput = [];
var level = 0;

var started = false;

$(document).on('keydown', function (event) {
    if (!started) {
        $('#title').html(`Level ${level}`);
        nextColor();
        started = true;
    }

})

function gameOver() {
    $('body').addClass('game-over');
    setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);
    $('#title').html('Game Over, Press Any Key to Restart');
    var gameOverAudio = new Audio('assets/sounds/wrong.mp3');
    gameOverAudio.play();
    startOver();

}

function startOver(){
    colors = [];
    userInput = [];
    level = 0;
    started = false;

}

function nextColor() {
    userInput = [];
    level++;
    $('#title').html(`Level ${level}`);
    const gameColors = ['green', 'red', 'blue', 'yellow'];
    let rand = Math.floor(Math.random() * 4);
    $(`.${gameColors[rand]}`).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    sounds[gameColors[rand]].play();
    colors.push(gameColors[rand]);
}


$('button').on('click', function () {
    // $(this).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    btnClickAnimation($(this));
    sounds[$(this).data('color')].play();
    userInput.push($(this).data('color'));
    checkAns(userInput.length - 1)
})

function btnClickAnimation(btn) {
    $(btn).addClass('pressed')
    setTimeout(function () {
        $(btn).removeClass('pressed')
    }, 100);
}

function checkAns(currentLevel) {
    if (userInput[currentLevel] === colors[currentLevel]) {
        if (userInput.length === colors.length) {
            setTimeout(function () {

                nextColor();
            }, 1000);
        }
    } else {
        gameOver();
    }
}