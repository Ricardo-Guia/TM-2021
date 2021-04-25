var Score = function(game) {
    var optionCount;
    var creditCount;
    var score;
  };
  
  Score.prototype = {
  
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

      this.addMenuOption('Main Menu', function () {
        game.state.start("GameMenu");
      });
      
      var textInst = this.game.add.text(315, 130,  'Best Score',  { font: '50px Arial', fill: '#fff', align: 'center' });
      this.score = this.game.add.text(400, 180, '0',  { font: '100px Arial', fill: '#fff', align: 'center' });
      
    },

    update: function(){
        this.score.text = gameOptions.pont;
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
  
  Phaser.Utils.mixinPrototype(Score.prototype, mixins);