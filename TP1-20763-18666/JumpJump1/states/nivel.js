var Nivel = function(game) {};

Nivel.prototype = {

  menuConfig: {
    startY: 500,
    startX: "center"
  },

  init: function () {
    this.titleText = game.make.text(game.world.centerX, 100, "JumpJump", {
      font: 'bold 60pt TheMinion',
      fill: '#FDFFB5',
      align: 'center'
    });
    this.titleText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
    this.titleText.anchor.set(0.5);
    this.optionCount = 1;
  },
  create: function () {
    game.add.sprite(0, 0, 'options-bg');
    game.add.existing(this.titleText);

    var textInst = this.game.add.text(275, 150,  'Select the game mode',  { font: '30px Arial', fill: '#fff', align: 'center' });
    
    var btn_level1 = this.game.add.button(300 , 300, 'nivel1', this.nivel1, this );
    btn_level1.anchor.setTo(0.5);
    
    var btn_level2 = this.game.add.button(550 , 300, 'nivel2', this.nivel2, this );
    btn_level2.anchor.setTo(0.5);

    

        this.addMenuOption('Main Menu', function () {
          game.state.start("GameMenu");
        });
    
  },

  nivel1: function(){
    gameOptions.velocidade= -200;
    gameOptions.velJogo = 1500;
    game.state.start("Game");
  },

  nivel2: function(){
    gameOptions.velocidade = -500;
    gameOptions.velJogo = 1000;
    game.state.start("Game");
  }
};

Phaser.Utils.mixinPrototype(Nivel.prototype, mixins);