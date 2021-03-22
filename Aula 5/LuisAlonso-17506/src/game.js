// create a new scene named "Game"
let gameScene = new Phaser.Scene('Game');

gameScene.init = function () {
  this.playerSpeed = 1.5;
  this.enemyMaxY = 280;
  this.enemyMinY = 80;
}

//finalizar o jogo
gameScene.gameOver = function () {
  //indicador que o player esta morto
  this.isPlayerAlive = false;

  //abana a camara
  this.cameras.main.shake(500);

  //fade camara
  this.time.delayedCall(250, function (){
    this.cameras.main.fade(250);
  }, [], this);

  //reinicia o jogo
  this.time.delayedCall(500, function(){
    this.scene.restart();
  }, [], this);
}


// load asset files for our game
gameScene.preload = function() {
  // load images
  this.load.image('background', 'assets/background.png');
  this.load.image('player', 'assets/player.png');
  this.load.image('dragon', 'assets/dragon.png');
  this.load.image('treasure', 'assets/treasure.png');
};

// executed once, after assets were loaded
gameScene.create = function() {
  // background
  let bg = this.add.sprite(0, 0, 'background');
  // muda a origem para o top lef do sprite
  bg.setOrigin(0,0);
  //player
  this.player = this.add.sprite(40, this.sys.game.config.height / 2, 'player');
  //diminui o tamanho do player sprite
  this.player.setScale(0.5);

  //Objetivo
  this.treasure = this.add.sprite(this.sys.game.config.width - 80, this.sys.game.config.height / 2, 'treasure');
  this.treasure.setScale(0.6);

  //Grupo de enemigos
  this.enemies = this.add.group({
    key: 'dragon',
    repeat: 5,
    setXY: {
      x: 110,
      y: 100,
      stepX: 80,
      stepY: 20
    }
  });
  //diminui o tamanho dos enemigos
  Phaser.Actions.ScaleXY(this.enemies.getChildren(), -0.5, -0.5);

  //atribuir velocidade aleatoria aos enemigos (entre 1 e 2)
  Phaser.Actions.Call(this.enemies.getChildren(), function (enemy){
    enemy.speed = Math.random() * 2 + 1;
  }, this);

  //o player esta vivo
  this.isPlayerAlive = true;

  //reset aos efeitos da camera
  this.cameras.main.resetFX();
};

//executado em todos os frames (60 vezes por segundo)
gameScene.update = function () {

  //so se o jogador esta vivo
  if (!this.isPlayerAlive){
    return;
  }

  //verifica o active input
  if (this.input.activePointer.isDown){
    //player mexe-se para a frente
    this.player.x += this.playerSpeed;
  }

  //colisão com o tesouro
  if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), this.treasure.getBounds())){
    this.gameOver();
  }

  //movimento dos enemigos
  let enemies = this.enemies.getChildren();
  let numEnemies = enemies.length;

  for (let i = 0; i < numEnemies; i++){
    //movimenta os enemigos
    enemies[i].y += enemies[i].speed;
    //reverter o movimentos dos enemigos ao chegar ao limite
    if (enemies[i].y >= this.enemyMaxY && enemies[i].speed > 0){
      enemies[i].speed *= -1;
    }else if (enemies[i].y <= this.enemyMinY && enemies[i].speed < 0){
      enemies[i].speed *= -1;
    }

    //colisão com os enemigos
    if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), enemies[i].getBounds())){
      this.gameOver();
      break;
    }
  }
}




// our game's configuration
let config = {
  type: Phaser.AUTO,
  width: 640,
  height: 360,
  scene: gameScene
};

// create the game, and pass it the configuration
let game = new Phaser.Game(config);
