var Credits = function(game) {
  var optionCount;
  var creditCount;
};

Credits.prototype = {

  preload: function () {
  },

  init: function () {
    this.titleText = game.make.text(game.world.centerX, 50, "JumpJump", {
      font: 'bold 60pt TheMinion',
      fill: '#FDFFB5',
      align: 'center'
    });
    this.titleText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
    this.titleText.anchor.set(0.5);
    this.optionCount = 0;
  },


  create: function () {

    game.stage.disableVisibilityChange = true;
    game.add.sprite(0, 0, 'menu-bg');
    game.add.existing(this.titleText);

     this.addMenuOption('Start Game', function () {
      game.state.start("Game");
    });
    this.addMenuOption('Main Menu', function () {
      game.state.start("GameMenu");
    });

    var textInst = this.game.add.text(200, 130,  'You have to pass the asteroids through the hole between them,',  { font: '16px Arial', fill: '#fff', align: 'center' });
    var textInst2 = this.game.add.text(200, 150, 'For that you will have to jump, clicking in the SPACEBAR.',  { font: '16px Arial', fill: '#fff', align: 'center' });
    var textInst3 = this.game.add.text(200, 170, 'Avoid collide with asteroids, you have only 40 lives, after that is game over.',  { font: '16px Arial', fill: '#fff', align: 'center' });



  },

  addMenuOption: function(text, callback) {
    var optionStyle = { font: '30pt TheMinion', fill: 'white', align: 'left', stroke: 'rgba(0,0,0,0)', srokeThickness: 4};
    var txt = game.add.text(300, (this.optionCount * 80) + 450, text, optionStyle);

    txt.stroke = "rgba(0,0,0,0";
    txt.strokeThickness = 4;
    var onOver = function (target) {
      target.fill = "#FEFFD5";
      target.stroke = "rgba(200,200,200,0.5)";
      txt.useHandCursor = true;
    };
    var onOut = function (target) {
      target.fill = "white";
      target.stroke = "rgba(0,0,0,0)";
      txt.useHandCursor = false;
    };
    //txt.useHandCursor = true;
    txt.inputEnabled = true;
    txt.events.onInputUp.add(callback, this);
    txt.events.onInputOver.add(onOver, this);
    txt.events.onInputOut.add(onOut, this);

    this.optionCount ++;
  },

};

Phaser.Utils.mixinPrototype(GameMenu.prototype, mixins);

