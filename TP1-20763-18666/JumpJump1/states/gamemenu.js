var GameMenu = function() {};


GameMenu.prototype = {

  menuConfig: {
    startY: 200,
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

  preload: function(){
    if (music.name !== "dangerous" && playMusic) {
      music.stop();
      music = game.add.audio('dangerous');
      music.loop = true;
      music.play();
    }
  },

  create: function () {
    game.stage.disableVisibilityChange = true;
    game.add.sprite(0, 0, 'menu-bg');
    game.add.existing(this.titleText);

    this.addMenuOption('Start', function () {
      music.stop();
      game.state.start("Nivel");
    });
    this.addMenuOption('Options', function () {
      game.state.start("Options");
    });
    this.addMenuOption('Instructions', function () {
      game.state.start("Credits");
    });
    this.addMenuOption('Best Score', function () {
      game.state.start("Score");
    });
  },

 
};

Phaser.Utils.mixinPrototype(GameMenu.prototype, mixins);
