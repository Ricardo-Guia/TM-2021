// Global Variables
var game = new Phaser.Game(800, 600, Phaser.AUTO , "game"),
  Main = function () {},
  //opcoes de jogo
  gameOptions = {
    playSound: true,
    playMusic: true,
    pont: 0,
    carater: 0,
    velocidade: 0,
    velJogo: 0,
    scoreAtual: 0
  },
  
  musicPlayer;


Main.prototype = {

  init: function(){
    
  },

  //faz preload de imagens e scripts
  preload: function () {
    game.load.image('stars',    'assets/images/stars.jpg');
    game.load.image('loading',  'assets/images/loading.png');
    game.load.image('brand',    'assets/images/logo.png');
    game.load.script('polyfill',   'lib/polyfill.js');
    game.load.script('utils',   'lib/utils.js');
    game.load.script('splash',  'states/Splash.js');
    
  },

  //chama o ecrâ "splash"
  create: function () {
    game.state.add('Splash', Splash);
    game.state.start('Splash');
  }

};

//chama o ecrã "Main"
game.state.add('Main', Main);
game.state.start('Main');
