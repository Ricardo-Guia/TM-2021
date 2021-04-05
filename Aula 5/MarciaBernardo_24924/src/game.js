// create a new scene named "Game"
let gameScene = new Phaser.Scene('Game');




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
    this.add.sprite(0, 0, 'background');
  };

// executed once, after assets were loaded
gameScene.create = function() {
  // background
  let bg = this.add.sprite(0, 0, 'background');

  // change origin to the top-left of the sprite
  bg.setOrigin(0,0);

  // player
  this.player = this.add.sprite(40, this.sys.game.config.height / 2, 'player');
  // scale down
  this.player.setScale(0.5);

};

// executed on every frame (60 times per second)
gameScene.update = function() {
  // check for active input
  if (this.input.activePointer.isDown) {

    console.log
    // player walks
    this.player.x += this.playerSpeed;
  }
};

// some parameters for our scene (our own customer variables - these are NOT part of the Phaser API)
gameScene.init = function() {
  this.playerSpeed = 1.5;
  this.enemyMaxY = 280;
  this.enemyMinY = 80;
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
