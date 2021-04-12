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
    dangerZoneWidth: 20,
    // width of the pole, in pixels
    poleWidth: 8,
    // time to make pole reach its full length, in milliseconds
    poleGrowTime: 400,
    // time to make the pole rotate once released, in milliseconds
    poleRotateTime: 500,
    // milliseconds needed to move the ninja by a pixel
    heroWalkTime: 2,
    // time needed for the ninja to fall down, in milliseconds
    heroFallTime: 500,
    // do we have to show the GUI?
    showGUI: true,
    // amount of seconds you get for hitting the danger zone with the pole
    bonusTime: 3,
    // string to refer the local storage object which saves the best score
    localStorageName: "irresponsible",
    // initial time, if you don't get any bonus, game ends in 30 seconds
    initialTime: 30,
    // do we have to play sounds?
    soundOn: true
}

const POLE_SUCCESSFUL = 0;
const POLE_TOO_SHORT = 1;
const POLE_TOO_LONG = 2;
// idle state: the ninja is moving due to latest player action
const IDLE = 0;
// waiting for input start state: the game is waiting for player input
const WAITING_FOR_INPUT_START = 1;
// waiting for input stop state: the game is waiting for the player to release the input
const WAITING_FOR_INPUT_STOP = 2;

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

        scene:[preloadGame, playGame]
    }
    game = new Phaser.Game(gameConfig);
    window.focus();
}
