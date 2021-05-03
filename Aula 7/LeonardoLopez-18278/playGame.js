class playGame extends Phaser.Scene{

    // class constructor
    constructor(){
        super("PlayGame");
    }

    // method automatically executed by Phaser once the scene has been created
    create(){
        // read best score from local storage
        this.bestScore = localStorage.getItem(gameOptions.localStorageName);
        // if there is no best score saved...
        if(this.bestScore == null){
            // set it to zero
            this.bestScore = 0;
        }
        // mountains is the score itself: the more platforms you cross, the higher the score
        this.mountains = 0;
        // set time left
        this.timeLeft = gameOptions.initialTime;
        this.addSounds();
        this.addBackground();
        this.addPlatforms();
        this.addDangerZone();
        this.addPole();
        this.addPlayer();
        this.addClouds();
        // do we have to show the GUI?
        if(gameOptions.showGUI){
            this.addGameTitle();
            this.gameMode = IDLE;
        }
        // or should we rather jump straight to the game?
        else{
            this.addGameInfo();
        }
        // input management
        this.input.on("pointerdown", this.handlePointerDown, this);
        this.input.on("pointerup", this.handlePointerUp, this);
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
        // add clock sprite...
        this.extraTime = this.add.sprite(0, 0, "clock");
        // ... and make it invisible
        this.extraTime.visible = false;
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
        // place clock icon a little above the danger zone
        this.extraTime.x = this.dangerZone.getBounds().centerX;
        // with the alpha set to 1 - fully opaque
        this.extraTime.alpha = 1;
        this.extraTime.y = this.platforms[this.mainPlatform].y - 30
        // not visible
        this.extraTime.visible = false;
    }
    addPole(){
        // get left platform bounds
        let bounds = this.platforms[this.mainPlatform].getBounds();
        // add the pole close to the right edge of the left platform
        this.pole = this.add.sprite(bounds.right - gameOptions.poleWidth, bounds.top, "tile");
        // set pole anchor point to bottom right
        this.pole.setOrigin(1, 1);
        // adjust pole size. The pole starts very short.
        this.pole.displayWidth = gameOptions.poleWidth;
        this.pole.displayHeight = gameOptions.poleWidth;
    }
    handlePointerDown(){
    // we only execute the code if gameMode is WAITING_FOR_INPUT_START
        if(this.gameMode == WAITING_FOR_INPUT_START) {
            // then gameMode is set to WAITING_FOR_INPUT_STOP
            this.gameMode = WAITING_FOR_INPUT_STOP;
            // we have to set a max width. Maximum platform distance + maximum platform width should be enough
            let maxPoleWidth = gameOptions.platformGapRange[1] + gameOptions.platformWidthRange[1];
            // try to play "grow" sound
            this.playSound(this.sounds.grow);
            // a simple tween, much simpler than the one used to animate clouds
            this.growTween = this.tweens.add({
                targets: [this.pole],
                // we tween display height. We also add 50 extra pixels
                displayHeight: maxPoleWidth + 50,
                duration: gameOptions.poleGrowTime,
                // we need to fire an onComplete event
                // to stop the sound
                callbackScope: this,
                onComplete: function(){
                    // stop "grow" sound
                    this.stopSound(this.sounds.grow);
                }
            });
            // is this the first move?
            if(this.firstMove){

                // hide game information
                this.info.visible = false;

                // method to show the score
                this.showGameScore();

                // method to add the timer
                this.addGameTimer();
            }
        }
    }
    handlePointerUp() {
        // we only execute the code if gameMode is WAITING_FOR_INPUT_STOP
        if(this.gameMode == WAITING_FOR_INPUT_STOP){
            // then gameMode is set to IDLE
            this.gameMode = IDLE;
            // stop "grow" sound
            this.stopSound(this.sounds.grow);
            // try to play "stick" sound
            this.playSound(this.sounds.stick);
        // stop grow tween
        this.growTween.stop();
        // add a tween to make the pole rotate by 90 degrees.
        this.tweens.add({
            targets: [this.pole],
            // this is how we tween sprite rotation
            angle: 90,
            duration: gameOptions.poleRotateTime,

            // tween easing
            ease: "Bounce.easeOut",
            // once the tween which rotates the pole has been completed,
            // call moveHero method
            callbackScope: this,
            onComplete: function () {
                // get pole bounds
                let poleBounds = this.pole.getBounds();
                // get danger zone bounds
                let dangerBounds = this.dangerZone.getBounds();
                // if the right end of the pole is inside the danger zone...
                if(poleBounds.right >= dangerBounds.left && poleBounds.right <= dangerBounds.right){
                    // try to play "pick" sound
                    this.playSound(this.sounds.pick);
                    // show clock icon
                    this.extraTime.visible = true;
                    // the actual time would be remaining time + bonus time...
                    let actualTime = this.timeLeft + gameOptions.bonusTime;
                    // ... but we do not want time left to be greater than initial time
                    this.timeLeft = Math.min(actualTime, gameOptions.initialTime);
                    // tween to make the clock fade away and move up
                    this.timeTween = this.tweens.add({
                        targets: [this.extraTime],
                        y: this.extraTime.y - 100,
                        alpha: 0,
                        duration: 500
                    })
                    // call updateTimer method to visually update time bar
                    this.updateTimer();
                }
                // get right platform bounds
                let platformBounds = this.platforms[1 - this.mainPlatform].getBounds();
                // we assume the landing was successful, but...
                let poleStatus = POLE_SUCCESSFUL;
                // if the right bound of the pole is less than left bound of the platform...
                if (poleBounds.right < platformBounds.left) {
                    // the pole was too short
                    poleStatus = POLE_TOO_SHORT;
                } else {
                    // if the right bound of the pole is greater than right bound of the platform...
                    if (poleBounds.right > platformBounds.right) {
                        // the pole was too long
                        poleStatus = POLE_TOO_LONG;
                    }
                }
                // poleStatus is passed to moveHero method as argument
                this.moveHero(poleStatus);
            }
        })
    }
    }
    addPlayer(){

        // get bounds of main platforms
        let platformBounds = this.platforms[this.mainPlatform].getBounds();

        // determine horizontal hero position subtracting pole width from right main platform bound
        let heroPosX = platformBounds.right - gameOptions.poleWidth;

        // vertical hero position is the same as top bound of main platform
        let heroPosY = platformBounds.top;

        // add hero sprite
        this.hero = this.add.sprite(heroPosX, heroPosY, "hero");

        // set hero registration point to right bottom corner
        this.hero.setOrigin(1, 1);

        // play "idle" animation
        this.hero.anims.play("idle");
    }
    moveHero(poleStatus){
        // get hero, pole and right platform bounds
        let platformBounds = this.platforms[1 - this.mainPlatform].getBounds();
        let heroBounds = this.hero.getBounds();
        let poleBounds = this.pole.getBounds();
        // heroDestination stores hero's final horizontal position
        let heroDestination;
        // checking various values:
        switch(poleStatus){
            case POLE_SUCCESSFUL:
                // successful: the ninja moves until the end of the right platform, leaving some space
                // for the pole to be used in next move
                heroDestination = platformBounds.right - gameOptions.poleWidth;
                break;
            case POLE_TOO_SHORT:
                // pole too short: the ninja moves until the end of the pole
                // ninja's feet are still on the pole
                heroDestination = poleBounds.right;
                break;
            case POLE_TOO_LONG:
                // pole too long: the ninja moves until a bit more than the end of the pole.
                // ninja's feet are in mid air
                heroDestination = poleBounds.right + heroBounds.width / 2;
                break;
        }
        // play "run" animation
        this.hero.anims.play("run");
        // try to play "run" sound
        this.playSound(this.sounds.run)
        // tween the hero until the end of the pole
        this.walkTween = this.tweens.add({
            targets: [this.hero],
            x: heroDestination,
            duration: gameOptions.heroWalkTime * this.pole.displayHeight,
            // define scope and function to execute onche the tween is complete
            callbackScope: this,
            onComplete: function(){
                // stop "run" sound
                this.stopSound(this.sounds.run)
                // checking polestatus values, we'll add more later
                switch(poleStatus){
                    case POLE_TOO_SHORT:
                        // pole too short: execute poleFallDown and fallAndDie methods
                        this.poleFallDown();
                        this.fallAndDie();
                        break;
                    // when the pole is too long, we still call fallAndDie method
                    case POLE_TOO_LONG:
                        this.fallAndDie();
                        break;
                    // if it was a successful landing...
                    case POLE_SUCCESSFUL:
                        // ...call nextPlatform method
                        this.nextPlatform();
                        break;
                }
            },
            // functon to be executed each frame the tween updates
            onUpdate: function(){
                // get ninja bounds
                let heroBounds = this.hero.getBounds();
                // get pole bounds
                let poleBounds = this.pole.getBounds();
                // get right platform bound
                let platformBounds = this.platforms[1 - this.mainPlatform].getBounds();
                // if the ninja is moving along the pole...
                if(heroBounds.centerX > poleBounds.left && heroBounds.centerX < poleBounds.right){
                    // ...then place the ninja over the pole
                    this.hero.y = poleBounds.top;
                }
                else{
                    // ... otherwise the ninja is placed over the platform
                    this.hero.y = platformBounds.top;
                }
            }
        });
    }
    poleFallDown() {
        // tween to make pole fall under ninja's feet
        this.tweens.add({
            // the pole is the target of this tween
            targets: [this.pole],
            // pole is being rotated by 180 degrees
            angle: 180,
            // tween duration: poleRotateTime milliseconds
            duration: gameOptions.poleRotateTime,
            // tween easing function
            ease: "Cubic.easeIn"
        })
    }
    fallAndDie(){
        // remove Time event
        this.gameTimer.remove();
        // try to play "death" sound with some delay
        this.playSound(this.sounds.death, {
            delay: gameOptions.heroFallTime / 2000
        });
        // tween to make ninja fall down
        this.tweens.add({
            // the ninja is the target of this tween
            targets: [this.hero],
            // the ninja falls down off the bottom of the screen
            y: game.config.height + this.hero.displayHeight * 2,
            // ninja also rotates by 180 degrees
            angle: 180,
            // tween duration: heroFallTime mmilliseconds
            duration: gameOptions.heroFallTime,
            // tween easing function
            ease: "Cubic.easeIn",
            callbackScope: this,
            // when the tween ends...
            onComplete: function(){
                // ... shake the camera
                this.cameras.main.shake(200, 0.01);
                // at this time call showGameOver method
                this.showGameOver();
            }
        })
    }
    nextPlatform(){

        // play idle animation
        this.hero.anims.play("idle");

        // place the ninja on top of the platform, if not already
        this.hero.y = this.platforms[this.mainPlatform].getBounds().top;

        // hide danger zone
        this.dangerZone.visible = false;

        // get right platform position
        let rightPlatformPosition =  this.platforms[1 - this.mainPlatform].x

        // determine distance between left and righ platforms
        let distance = this.platforms[1 - this.mainPlatform].x - this.platforms[this.mainPlatform].x;

        // tween to move  hero, pole and platforms
        this.tweens.add({

            // look how different game objects can be tweened as long as they are in targets array
            targets: [this.hero, this.pole, this.platforms[0], this.platforms[1]],
            props: {

                // tween x property
                x: {

                    // subtract distance from their x position
                    value: "-= " + distance
                },

                // tween alpha property. The transparency
                alpha: {
                    value: {

                        // look at this: alpha is tweened to zero only if horizontal position
                        // of the target is less than right platform horizontal position.
                        // This way, the right platform and the ninja aren't affected
                        getEnd: function(target, key, value){
                            if(target.x < rightPlatformPosition){

                                // alpha = 0: completely transparent
                                return 0
                            }

                            // alpha = 1: completely opaque
                            return 1
                        }
                    }
                }
            },
            duration: gameOptions.scrollTime,
            callbackScope: this,
            onComplete: function(){

                // at the end of the tween, call prepareNextMove method
                this.prepareNextMove();
            }
        })
    }
    prepareNextMove(){
// increase mountains
        this.mountains ++;
        // call updateScore method
        this.updateScore();
        // left platform now is moved to the right of the screen
        this.platforms[this.mainPlatform].x = game.config.width;
        // set platform alpha to 1
        this.platforms[this.mainPlatform].alpha = 1;
        // setting mainPlatform from 0 to 1 - or from 1 to 0 - switches platforms array
        // index for main platform
        this.mainPlatform = 1 - this.mainPlatform;
        // call tweenPlatform method to make the right platform - former left platform - enter the game
        this.tweenPlatform();
        // reset pole angle, alpha, position and height
        this.pole.angle = 0;
        this.pole.alpha = 1;
        this.pole.x = this.platforms[this.mainPlatform].getBounds().right - gameOptions.poleWidth;
        this.pole.displayHeight = gameOptions.poleWidth;
        // reset gameMode to WAITING_FOR_INPUT_START
        this.gameMode = WAITING_FOR_INPUT_START;
    }
    addGameTitle(){

        // guiGroup is the group which contains all GUI elements
        this.guiGroup = this.add.group();

        // a black overlay is added to cover the entire game area, in the same way
        // we previously added the sky background gradient
        let blackOverlay = this.add.sprite(0, 0, "tile");
        blackOverlay.setOrigin(0, 0);
        blackOverlay.displayWidth = game.config.width;
        blackOverlay.displayHeight = game.config.height;
        blackOverlay.alpha = 0.8;
        // then the black overlay is added to guiGroup
        this.guiGroup.add(blackOverlay);
        // add the title
        let title = this.add.sprite(game.config.width / 2, 50, "title");
        title.setOrigin(0.5, 0);
        // add the title to guiGroup
        this.guiGroup.add(title);
        // add play button
        let playButtonX = game.config.width / 2;
        let playButtonY = game.config.height / 2 - 20;
        let playButton = this.add.sprite(playButtonX, playButtonY, "playbutton");

        // set play button interactive, so it triggers input
        playButton.setInteractive();
        // callback function to execute when the button is released
        playButton.on("pointerup", function(){
            // make the entire guiGroup invisible
            this.guiGroup.toggleVisible();
            // make the entire group inactive
            this.guiGroup.active = false;
            // make the camera flash
            this.cameras.main.flash();
            // playSound method handles sound reproduction.
            // the sound to be played is passed as argument
            this.playSound(this.sounds.click);
            // call addGameInfo method
            this.addGameInfo();
        }, this);

        // the button too is added to guiGroup
        this.guiGroup.add(playButton);

        // then the button is animated with a yoyo tween
        this.tweens.add({
            targets: [playButton],
            y: game.config.height / 2 + 20,
            duration: 5000,
            yoyo: true,
            repeat: -1
        })
        // add the sound icon
        let soundButton = this.add.sprite(playButtonX, playButtonY + 300, "icons");
        // set the proper frame according to soundOn value
        soundButton.setFrame(gameOptions.soundOn ? 2 : 3);
        // make sound button interactive
        soundButton.setInteractive();
        // when the player released the input...
        soundButton.on("pointerup", function(){
            // invert soundOn value
            gameOptions.soundOn = !gameOptions.soundOn;
            // set the proper frame according to soundOn value
            soundButton.setFrame(gameOptions.soundOn ? 2 : 3);
            // playSound method handles sound reproduction.
            // the sound to be played is passed as argument
            this.playSound(this.sounds.click)
        }, this);
        // sound button is also part of GUI group
        this.guiGroup.add(soundButton);
    }
    addGameInfo(){
        this.info = this.add.sprite(game.config.width / 2, game.config.height / 4, "info");
        this.gameMode = WAITING_FOR_INPUT_START;
        // it's the first move
        this.firstMove = true;
    }
    showGameOver(){
        let halfGameWidth = game.config.width / 2;
        // add restart icon, outside the screen off the bottom
        let restartIcon = this.add.sprite(halfGameWidth - 120, game.config.height + 150, "icons");

        // set restart icon interactive
        restartIcon.setInteractive();
        // when the input is released...
        restartIcon.on("pointerup", function(){
            // try to play "click" sound
            this.playSound(this.sounds.click);
            // set showGUI to false
            gameOptions.showGUI = false;
            // restart the scene
            this.scene.start("PlayGame");
        }, this);

        // add home icon, outside the screen off the bottom
        let homeIcon = this.add.sprite(halfGameWidth + 120, game.config.height + 150, "icons");

        // set frame number to show the proper icon
        homeIcon.setFrame(1)

        // set home icon interactive
        homeIcon.setInteractive();

        // when the input is released...
        homeIcon.on("pointerup", function(){
            // try to play "click" sound
            this.playSound(this.sounds.click);
            // set showGUI to true
            gameOptions.showGUI = true;

            // restart the scene
            this.scene.start("PlayGame");
        }, this);

        // tween to turn transparent the danger zone, the pole, and the platforms
        this.tweens.add({
            targets: [this.dangerZone, this.pole, this.platforms[0], this.platforms[1]],
            alpha: 0,
            duration: 800,
            ease: "Cubic.easeIn"
        })

        // tween to make home and menu icons enter the screen from the bottom
        this.tweens.add({
            targets: [restartIcon, homeIcon],
            y: game.config.height / 2,
            duration: 800,
            ease: "Cubic.easeIn"
        })

        // add developer logo - yes, it's me - outside the screen off the bottom
        let logo = this.add.sprite(game.config.width / 2, game.config.height + 150, "logo");

        // set the logo interactive
        logo.setInteractive();

        // when the input is released...
        logo.on("pointerup", function(){

            // open my blog
            window.location.href = "https://www.emanueleferonato.com/"
        }, this);

// tween to make logo enter the screen from the bottom
        this.tweens.add({
            targets: [logo],
            y: game.config.height / 4 * 3,
            duration: 800,
            ease: "Cubic.easeIn"
        })
    }
    showGameScore(){
        // not the first move anymore
        this.firstMove = false;
        // add the energy bar in the horizontal center, vertical 1/5 of game height
        let energyBar = this.add.sprite(game.config.width / 2, game.config.height / 5, "energybar");
        // get energyBar bounds
        let energyBounds = energyBar.getBounds();
        // add the bitmap text representing the score
        this.scoreText = this.add.bitmapText(energyBounds.right, energyBounds.top - 40, "font", 	"DISTANCE: " + this.mountains.toString());
        this.scoreText.setOrigin(1, 0);
        // add the bitmap text representing the best score
        this.bestScoreText = this.add.bitmapText(energyBounds.left, energyBounds.bottom + 10, "font", 	"MAX DISTANCE: " + this.bestScore.toString());
        this.bestScoreText.setOrigin(0, 0);
        // fill energy bar with a white tile
        this.energyStatus = this.add.sprite(energyBounds.left + 5, energyBounds.top + 5, "whitetile");
        this.energyStatus.setOrigin(0, 0);
        this.energyStatus.displayWidth = 500;
        this.energyStatus.displayHeight = energyBounds.height - 10;
    }
    addGameTimer(){
        // create a time event
        this.gameTimer = this.time.addEvent({
            // event delay, in milliseconds
            delay: 1000,
            // callback function
            callback: function(){
                // decrease timeLeft property
                this.timeLeft --;
                // method to update the timer on the screen
                this.updateTimer();
            },
            // scope of callback function
            callbackScope: this,
            // execute the event forever
            loop: true
        });
    }
    updateTimer(){
        // resize energy according to time left
        this.energyStatus.displayWidth = 500 * this.timeLeft / gameOptions.initialTime;
        // did we run out of time?
        if(this.timeLeft == 0){
            // stop tweening the hero
            this.tweens.killTweensOf(this.hero);
            // stop tweening the pole
            this.tweens.killTweensOf(this.pole);
            // call fallAndDie method
            this.fallAndDie();
        }
    }
    updateScore(){
        // update text score
        this.scoreText.setText("DISTANCE: " + this.mountains)
        // if current score is higher than best score...
        if(this.mountains > this.bestScore){
            // update best score
            this.bestScore = this.mountains;
            // save best score to local storage
            localStorage.setItem(gameOptions.localStorageName, this.bestScore);
            // update best text score
            this.bestScoreText.setText("MAX DISTANCE: " + this.bestScore.toString());
        }
    }
    addSounds(){

        // creation of an object with all sounds
        this.sounds = {

            // this is how we add a sound to the game
            death: this.sound.add("death"),
            run: this.sound.add("run"),
            stick: this.sound.add("stick"),
            grow: this.sound.add("grow"),
            pick: this.sound.add("pick"),
            click: this.sound.add("click")
        }
    }
    playSound(sound, options){

        // if we have to play a sound...
        if(gameOptions.soundOn){

            // ... let's play it
            sound.play("", options);
        }
    }
    stopSound(sound){

        // just stop the sound
        sound.stop();
    }
}