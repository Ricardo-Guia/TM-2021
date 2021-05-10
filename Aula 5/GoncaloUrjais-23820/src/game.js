// In Phaser v3.16+ you probably want to use the ScaleManager instead.

console.clear();

console.clear();

document.getElementById("version").textContent = "Phaser v" + Phaser.VERSION;

var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: 'play',
  loader: {
    baseURL: "https://labs.phaser.io",
    crossOrigin: "anonymous"
  },
  scene: {
    init: init,
    preload: preload,
    create: create
  }
};

var fullscreenFunc = null;

new Phaser.Game(config);

document.querySelector('#play').addEventListener('click', function() {
  if(fullscreenFunc !== null) fullscreenFunc()
});

function init ()
{
  var canvas = this.sys.game.canvas;
  var fullscreen = this.sys.game.device.fullscreen;

  if (!fullscreen.available)
  {
    return;
  }

  canvas[fullscreen.request]();
}

function preload ()
{
  this.load.image('space', 'assets/background.png');
}

function create ()
{
  this.add.sprite(400, 300, 'space');
  logo.setInteractive()
  logo.on('pointerover', function() {
    var canvas = this.sys.game.canvas;
    var fullscreen = this.sys.game.device.fullscreen;
    fullscreenFunc = function() {
      canvas[fullscreen.request]()
    }
  }, this)
  logo.on('pointerout', function() {
    fullscreenFunc = null
  })
}