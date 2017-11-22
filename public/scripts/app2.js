


const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const defautlt_font = '12px Verdana';
ctx.font = defautlt_font;

const gridSize = 20;
const gridWidth = canvas.width / gridSize;
const gridHeight = canvas.height / gridSize;

const game = new gameState;

document.addEventListener('keydown', function(event){
  switch(event.key){
    case 'ArrowRight':
      game.direction([1,0]);
      break;
    case 'ArrowLeft':
      game.direction([-1,0]);
      break;
    case 'ArrowUp':
      game.direction([0,-1]);
      break;
    case 'ArrowDown':
      game.direction([0,1]);
      break;
    case ' ':
      if (game.over){
        game.reset();
        game.over = false;
        game.paused = true;
        clearCanvas();
        game.draw();
        drawInstructions();
        break;
      }
      if (game.paused){
        game.paused = false;
        window.requestAnimationFrame(moveFrame);
      } else{
        game.paused = true;
        drawInstructions();
      }
      break;
    case '1':
      game.speed = 10;
      break;
    case '2':
      game.speed = 13;
      break;
    case '3':
      game.speed = 17;
      break;
    case '4':
      game.speed = 20;
      break;
    case '5':
      game.speed = 25;
      break;
    case '6':
      game.speed = 30;
      break;
    case '7':
      game.speed = 40;
      break;
    case '8':
      game.speed = 50;
      break;
    case '9':
      game.speed = 70;
      break;
  }
});

const drawInstructions = function(){
  ctx.fillStyle = 'white';
  ctx.fillText('space : start/pause', 200, 140);
  ctx.fillText('[1-9] : snake speed', 200, 160);
};

const clearCanvas = function(){
  ctx.fillStyle = 'rgb(50,50,70)';
  ctx.fillRect(0,0,canvas.width,canvas.height);
};

let i = 99;
function moveFrame(){
  if (game.paused) return;
  i += game.speed;
  if (i >= 100){
    i -= 100;
    clearCanvas();
    if (game.update()){
      //game.update returns the 'score' when you die
      game.over = true;
      game.draw();
      ctx.font = '20px Courier New';
      ctx.fillStyle = 'red';
      ctx.fillText('Game Over', 200, 150);
      ctx.font = '12px Courier New';
      ctx.fillText('press <space>', 207, 175);
      ctx.font = defautlt_font;
      if (game.snake.length == game.highscore){
        $.ajax({
          url: '/highscore/' + game.highscore,
          method: 'GET'
        });
      }
      return;
    }
    game.draw();
  }
  window.requestAnimationFrame(moveFrame);
}

game.highscore = canvas.dataset.highscore || 1;
clearCanvas();
game.draw();
drawInstructions();


