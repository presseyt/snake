
function gameState(){
  this.snake = [[3,7]];
  this.vel = [[1,0]];
  this.food = [21,7];
  this.hunger = 100;
  this.paused = true;
  this.speed = 20;
  this.over = false;
  this.highscore = 1;

  this.reset = function(){
    this.snake = [[3,7]];
    this.vel = [[1,0]];
    this.food = [21,7];
    this.hunger = 100;
  };

  this.randomPos = function(){
    return [
      Math.floor(gridWidth * Math.random()),
      Math.floor(gridHeight * Math.random())
    ];
  };

  this.moveSnake = function(){
    if (this.vel.length > 1) this.vel.shift();

    this.snake.unshift([
      this.snake[0][0] + this.vel[0][0],
      this.snake[0][1] + this.vel[0][1],
    ]);
    this.snake.pop();
  };

  this.checkFood = function(){
    return this.snake[0][0] == this.food[0] && this.snake[0][1] == this.food[1];
  };

  this.checkDeath = function(){
    if (this.snake[0][0] < 0 || this.snake[0][1] < 0)
      return true;
    if (this.snake[0][0] >= gridWidth || this.snake[0][1] >= gridHeight)
      return true;
    for (let i = 1; i < this.snake.length; i++){
      if (this.snake[0][0] == this.snake[i][0] && this.snake[0][1] == this.snake[i][1])
        return true;
    }
    if (this.hunger < 0) return true;
    return false;
  };

  this.direction = function(newVelo){
    lastVelo = this.vel[this.vel.length - 1];
    if (lastVelo[0] != newVelo[0] && lastVelo[1] != newVelo[1])
      this.vel.push(newVelo);
  };

  this.update = function(){
    this.hunger--;
    this.moveSnake();
    if (this.checkFood()){
      this.hunger += 100;
      this.snake.push([-1,-1]);
      this.food = this.randomPos();
      game.highscore = game.snake.length > game.highscore ? game.snake.length : game.highscore;
    }
    if (this.checkDeath()){
      this.vel = [[0,0]];
      return this.snake.length;
    }
  };

  this.draw = function(){
    ctx.fillStyle = 'white';
    this.snake.forEach(pos=>{ctx.fillRect(pos[0] * gridSize, pos[1] * gridSize, gridSize, gridSize)});
    ctx.fillStyle = 'rgb(150,100,100)';
    ctx.fillRect(this.food[0] * gridSize, this.food[1] * gridSize, gridSize, gridSize);
    ctx.fillStyle = 'rgb(100,150,100)';
    ctx.fillText('Score:' + this.snake.length, 10,15);
    ctx.fillText('High Score:' + this.highscore, 400,15);
  };

}