let game;
let gameOptions = {
    defaultSize: {
        width: 750,
        height: 1334,
        maxRatio: 4 / 3
    }
}
window.onload = function() {
    let width = gameOptions.defaultSize.width;
    let height = gameOptions.defaultSize.height;
    let perfectRatio = width / height;
    let innerWidth = window.innerWidth;
    let innerHeight = window.innerHeight;
    let actualRatio = Math.min(innerWidth / innerHeight, gameOptions.defaultSize.maxRatio);
    if(perfectRatio > actualRatio){
        height = width / actualRatio;
    }
    else{
        width = height * actualRatio;
    }
    let gameConfig = {
        type: Phaser.AUTO,
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH,
            parent: "thegame",
            width: width,
            height: height
        },
        backgroundColor: 0x132c43,
        scene: [preloadGame, playGame]
    }
    game = new Phaser.Game(gameConfig);
    window.focus();
}
class preloadGame extends Phaser.Scene{
    constructor(){
        super("PreloadGame");
    }
    preload(){
        this.load.image("background", "assets/sprites/background.png");
        this.load.spritesheet("cloud", "assets/sprites/cloud.png", {

            // frame width, in pixels
            frameWidth: 256,

            // frame height, in pixels
            frameHeight: 256
        });
    }
    create(){
        this.scene.start("PlayGame");
    }
}
class playGame extends Phaser.Scene{
    constructor(){
        super("PlayGame");
    }
    create(){
        this.addBackground();
        this.addClouds();


    }
    addBackground(){
        let background = this.add.sprite(-50, -50, "background");
        background.setOrigin(0, 0);
        background.displayWidth = game.config.width + 100;
        background.displayHeight = game.config.height + 100;
    }
    addClouds(){

        // clouds is the amount of cloud images needed to cover the entire game width
        let clouds = Math.ceil(game.config.width / 128);

        // we store clouds in cloudsArray array
        let cloudsArray = [];

        // this loop is executed twice because we want two rows of clouds
        for(let i = 0; i <= 1; i ++){

            // this loop is executed "cloud" times
            for(let j = 0; j <= clouds; j ++){

                // add cloud image to the game with a bit of randomization in its position
                let cloud = this.add.sprite(128 * j + Phaser.Math.Between(-10, 10), game.config.height + i * 32 + Phaser.Math.Between(-10, 10), "cloud");

                // set cloud frame
                cloud.setFrame(i);

                // insert the cloud in cloudsArray array
                cloudsArray.push(cloud);
            }
        }

        // tween the clouds
        this.tweens.add({

            // array containing game objects to tween: all clouds
            targets: cloudsArray,

            // properties to tween
            props: {

                // x property (horizontal position)
                x: {

                    // how do we change the value?
                    value: {

                        // once we have the position at the end of the tween...
                        getEnd: function(target, key, value){

                            // ... move it for a little amount of pixels
                            return target.x + Phaser.Math.Between(-10, 10)
                        }
                    }
                },

                // same concept applied to y property (vertical position)
                y: {
                    value: {
                        getEnd: function(target, key, value){
                            return target.y + Phaser.Math.Between(-10, 10)
                        }
                    }
                }
            },

            // duration of the tween, in milliseconds
            duration: 3000,

            // how many times are we repeating the tween? -1 = repeat forever
            repeat: -1,

            // yoyo effect: execute the tween back and forth
            yoyo: true
        });
    }

}
