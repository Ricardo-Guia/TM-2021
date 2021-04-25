var Options = function(game) {};

Options.prototype = {

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

    var textInst = this.game.add.text(250, 300,  'Select your rocket to play',  { font: '30px Arial', fill: '#fff', align: 'center' });
    
    var btn_play = this.game.add.button(300 , 400, 'object', this.objeto1, this );
        btn_play.anchor.setTo(0.5);

    var btn_play2 = this.game.add.button(500 , 380, 'object2', this.objeto2, this );
        btn_play.anchor.setTo(0.5);

        this.addMenuOption('Main Menu', function () {
          game.state.start("GameMenu");
        });
    
  },

  objeto1: function(){
    gameOptions.carater=0;
    game.state.start("GameMenu");
  },

  objeto2: function(){
    gameOptions.carater=1;
    game.state.start("GameMenu");
  }
};

Phaser.Utils.mixinPrototype(Options.prototype, mixins);
