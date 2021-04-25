var GameOver = function(game) {
  var score;
  var sc;
};

GameOver.prototype = {

  preload: function () {
    this.optionCount = 1;
  },

  addMenuOption: function(text, callback) {
    var optionStyle = { font: '30pt TheMinion', fill: 'white', align: 'left', stroke: 'rgba(0,0,0,0)', srokeThickness: 4};
    var txt = game.add.text(game.world.centerX, (this.optionCount * 80) + 300, text, optionStyle);
    txt.anchor.setTo(0.5);
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

  create: function () {
    //desenha o titulo
    game.add.sprite(0, 0, 'gameover-bg');
    var titleStyle = { font: 'bold 60pt TheMinion', fill: '#FDFFB5', align: 'center'};
    var text = game.add.text(game.world.centerX, 100, "Game Over", titleStyle);
    text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
    text.anchor.set(0.5);

    //desenha o "score" e os pontos
    var textInst = this.game.add.text(340, 130,  'Score',  { font: '50px Arial', fill: '#fff', align: 'center' });
    this.score = this.game.add.text(380, 180, '0',  { font: '100px Arial', fill: '#fff', align: 'center' });

    //adiciona opcoes ao menu
    this.addMenuOption('Play Again', function (e) {
      //vai para o ecrâ nível
      this.game.state.start("Nivel");
    });
    this.addMenuOption('Main Menu', function (e) {
      this.game.state.start("GameMenu");
    })
  },

  //dá update de forma a mostrar o score do jogo 
  update: function(){
      this.sc = gameOptions.scoreAtual;
      this.score.text = this.sc;
  }
};