let game;
let gameOptions = {
    defaultSize: {
        width: 750,
        height: 1334,
        maxRatio: 4 / 3
    },
    // array with the distance range between two platforms, in pixels
    platformGapRange: [200, 400],

    // array with the width range of each platform, in pixels
    platformWidthRange: [50, 150],

    // scrolling time, in milliseconds
    scrollTime: 250,

    // platform height, as a ratio from game height
    platformHeight: 0.6,

    // danger zone width, in pixels
    dangerZoneWidth: 20
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

    // class constructor
    constructor(){
        super("PreloadGame");
    }

    // method automatically executed by Phaser when the scene preloads
    preload(){

        // load background image and assign it "background" key
        this.load.image("background", "assets/sprites/background.png");

        this.load.image("tile", "assets/sprites/tile.png");
        this.load.image("dangertile", "assets/sprites/dangertile.png");

        // load a sprite sheet and assign it "cloud" key
        this.load.spritesheet("cloud", "assets/sprites/cloud.png", {

            // frame width, in pixels
            frameWidth: 256,

            // frame height, in pixels
            frameHeight: 256
        });
    }

    // method automatically executed by Phaser once the scene has been created,
    // often immediately after "preload" method
    create(){

        // launch "PlayGame" scene
        this.scene.start("PlayGame");
    }
}



class playGame extends Phaser.Scene{

    // class constructor
    constructor(){
        super("PlayGame");
    }

    // method automatically executed by Phaser once the scene has been created
    create(){

        // custom method to add background image
        this.addBackground();
        this.addPlatforms();
        this.addDangerZone();
        this.addClouds();

    }

    // method to add background image
    addBackground(){

        // add background image as sprite, at coordinates x: -50, y: - 50
        let background = this.add.sprite(-50, -50, "background");

        // set background sprite origin - or registration point - to top left corner
        background.setOrigin(0, 0);

        // set background sprite display width to game width + 100 pixels
        background.displayWidth = game.config.width + 100;

        // set background sprite display height to game height + 100 pixels
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

    addPlatforms(){

        // main platform is platform zero...
        this.mainPlatform = 0;

        // ... of this array of two platforms created with addPlatform method.
        // the argument is the x position
        this.platforms = [
            this.addPlatform((game.config.width - gameOptions.defaultSize.width) / 2),
            this.addPlatform(game.config.width)
        ];

        // finally, another method to tween a platform
        this.tweenPlatform();
    }

    addPlatform(posX){

        // add the platform sprite according to posX and gameOptions.platformHeight
        let platform = this.add.sprite(posX, game.config.height * gameOptions.platformHeight, "tile");

        // platform width initially is the arithmetic average of gameOptions.platformWidthRange values
        let width = (gameOptions.platformWidthRange[0] + gameOptions.platformWidthRange[1]) / 2;

        // adjust platform display width
        platform.displayWidth = width;

        // height is determined by the distance from the platform and the bottom of the screen
        // remember to add 50 more pixels for the shake effect
        platform.displayHeight = game.config.height * (1 - gameOptions.platformHeight) + 50

        // set platform origin to top left corner
        platform.setOrigin(0, 0);

        // return platform variable to be used by addPlatforms method
        return platform
    }

    tweenPlatform(){

        // get the right coordinate of left platform
        let rightBound = this.platforms[this.mainPlatform].getBounds().right;

        let minGap = gameOptions.platformGapRange[0];
        let maxGap = gameOptions.platformGapRange[1];

        // determine the random gap between the platforms
        let gap = Phaser.Math.Between(minGap, maxGap);

        // right platform destination is determined by adding the right coordinate of the platform to the gap
        let destination = rightBound + gap;
        let minWidth = gameOptions.platformWidthRange[0];
        let maxWidth = gameOptions.platformWidthRange[1];

        // determine a random platform width
        let width = Phaser.Math.Between(minWidth, maxWidth)

        // adjust right platform width
        this.platforms[1 - this.mainPlatform].displayWidth = width;

        // tweening the right platform to destination
        this.tweens.add({
            targets: [this.platforms[1 - this.mainPlatform]],
            x: destination,
            duration: gameOptions.scrollTime,

            // scope of the callback function
            callbackScope: this,

            // callback function once tween is complete
            onComplete: function(){
                this.placeDangerZone();
            }
        })
    }

    addDangerZone(){

        // add danger zone sprite
        this.dangerZone = this.add.sprite(0, this.platforms[this.mainPlatform].y, "dangertile");

        // set danger zone registration point to top left corner
        this.dangerZone.setOrigin(0, 0);

        // adjust dangerzone width and height
        this.dangerZone.displayWidth = gameOptions.dangerZoneWidth;
        this.dangerZone.displayHeight = 10;

        // set danger zone invisible
        this.dangerZone.visible = false;
    }

    placeDangerZone(){

        // show danger zone
        this.dangerZone.visible = true;

        // determine right platform bound
        let platformBound = this.platforms[1 - this.mainPlatform].getBounds().right;

        // a random integer between 0 and 1 means 50% probability to place the
        // danger zone on the left or right edge
        if(Phaser.Math.Between(0, 1) == 0){

            // left edge
            this.dangerZone.x = this.platforms[1 - this.mainPlatform].x;
        }
        else{

            // right edge
            this.dangerZone.x = platformBound - gameOptions.dangerZoneWidth;
        }
    }
}
