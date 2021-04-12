// the scene is just a JavaScript class, so we are going to extend it
class preloadGame extends Phaser.Scene{

    // class constructor
constructor(){
    super("PreloadGame");
}
preload(){
    this.load.image("background", "assets/sprites/background.png");
    this.load.image("tile", "assets/sprites/tile.png");
    this.load.image("dangertile", "assets/sprites/dangertile.png");
    this.load.image("title", "assets/sprites/title.png");
    this.load.image("info", "assets/sprites/info.png");
    this.load.image("playbutton", "assets/sprites/playbutton.png");
    this.load.image("logo", "assets/sprites/logo.png");
    this.load.image("clock", "assets/sprites/clock.png");
    this.load.image("energybar", "assets/sprites/energybar.png");
    this.load.image("whitetile", "assets/sprites/whitetile.png");
    this.load.spritesheet("cloud", "assets/sprites/cloud.png", {
        frameWidth: 256,
        frameHeight: 256
    });
    this.load.spritesheet("hero", "assets/sprites/hero.png", {
        frameWidth: 77,
        frameHeight: 97
    });
    this.load.spritesheet("icons", "assets/sprites/icons.png", {
        frameWidth: 150,
        frameHeight: 150
    })
    // this is how we preload a bitmap font
    this.load.bitmapFont("font", "assets/fonts/font.png", "assets/fonts/font.fnt");
    // this is how we preload an audio file
    this.load.audio("death", ["assets/sounds/death.mp3", "assets/sounds/death.ogg"]);
    this.load.audio("run", ["assets/sounds/run.mp3", "assets/sounds/run.ogg"]);
    this.load.audio("stick", ["assets/sounds/stick.mp3", "assets/sounds/stick.ogg"]);
    this.load.audio("grow", ["assets/sounds/grow.mp3", "assets/sounds/grow.ogg"]);
    this.load.audio("pick", ["assets/sounds/pick.mp3", "assets/sounds/pick.ogg"]);
    this.load.audio("click", ["assets/sounds/click.mp3", "assets/sounds/click.ogg"]);
}

// method automatically executed by Phaser once the scene has been created,
// often immediately after "preload" method
create(){
// create an animation
    this.anims.create({
        // we refer to this animation with "idle" key
        key: "idle",
        // frames of the sprite sheet to use
        frames: this.anims.generateFrameNumbers("hero", {
            start: 0,
            end: 11
        }),
        // frame rate, in frames per second
        frameRate: 15,
        // animation is be repeated endlessly
        repeat: -1
    });
    // same concept is applied to run animation
    this.anims.create({
        key: "run",
        frames: this.anims.generateFrameNumbers("hero", {
            start: 12,
            end: 19
        }),
        frameRate: 15,
        repeat: -1
    });

    // launch "PlayGame" scene
    this.scene.start("PlayGame");
}
}