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




    // the scene is just a JavaScript class, so we are going to extend it
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
            this.load.spritesheet("cloud", "assets/sprites/cloud.png", {
                frameWidth: 256,
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
        create() {

            // custom method to add background image

            this.addBackground();
            this.addPlatforms();
            this.addDangerZone();
            this.addClouds();
        }

            addClouds(){

                // clouds is the amount of cloud images needed to cover the entire game width
                let clouds = Math.ceil(game.config.width / 128);

                // we store clouds in cloudsArray array
                let cloudsArray = [];

                // this loop is executed twice because we want two rows of clouds
                for (let i = 0; i <= 1; i++) {

                    // this loop is executed "cloud" times
                    for (let j = 0; j <= clouds; j++) {

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
                                getEnd: function (target, key, value) {

                                    // ... move it for a little amount of pixels
                                    return target.x + Phaser.Math.Between(-10, 10)
                                }
                            }
                        },

                        // same concept applied to y property (vertical position)
                        y: {
                            value: {
                                getEnd: function (target, key, value) {
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
    }

}
