var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function preload ()
{

    //Carrega imagnes e frames para o jogo

    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.spritesheet('dude',
        'assets/dude.png',
        { frameWidth: 32, frameHeight: 48 }
    );

}

//Vars globais
var platforms; //Obstaculos
var player; //boneco
var score = 0; //TotalScore
var scoreText;


function create ()
{
//backgroud
    this.add.image(400, 300, 'sky');
//obstaculos
    platforms = this.physics.add.staticGroup(); //Criar um grupo fisico de plataformas
    platforms.create(400, 568, 'ground').setScale(2).refreshBody(); //posiçoes
    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');

    //Player
    player = this.physics.add.sprite(100, 450, 'dude'); //posicçao inical do boneco
    player.setBounce(0.2); //Bounce de saltar
    player.setCollideWorldBounds(true); //embata nas bordas do jogo

    //mover os frames do dude
    this.anims.create({ //animacao do frame
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', {start: 0, end:3}),
        frameRate : 10,
        repeat: -1
    });
    this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20
    });
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    //criar keys
    cursors = this.input.keyboard.createCursorKeys();

    //criar estrelas
    stars = this.physics.add.group({
        key: 'star',
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 } //Estrlas cair
    });
    stars.children.iterate(function (child) { //Bounce das estrelas
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    //Para colidir, nao passar o chao
    this.physics.add.collider(stars, platforms);
    this.physics.add.collider(player, platforms);


    //Apanhar estrelas
    this.physics.add.overlap(player, stars, collectStar, null, this);

    //Score
    scoreText = this.add.text(16, 16, 'score: 0', {
        fontSize: '32px', fill: '#000' });

    //Bombas
    bombs = this.physics.add.group();
    this.physics.add.collider(bombs, platforms);
    this.physics.add.collider(player, bombs, hitBomb, null, this);

}



function update ()
{
    //Mover funcs
    if (cursors.left.isDown)
    {
        player.setVelocityX(-160);

        player.anims.play('left', true);
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(160);

        player.anims.play('right', true);
    }
    else
    {
        player.setVelocityX(0);

        player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.touching.down)
    {
        player.setVelocityY(-330);
    }
}

//Fucnao de coletar
function collectStar (player, star)
{
    star.disableBody(true, true);
    score += 10;
    scoreText.setText('Score: ' + score);
    if (stars.countActive(true) === 0) //Se apanahr todas as estrelas
    {
        stars.children.iterate(function (child) {
            child.enableBody(true, child.x, 0, true, true);
        });
        var x = (player.x < 400) ? Phaser.Math.Between(400, 800) :
            Phaser.Math.Between(0, 400);
        var bomb = bombs.create(x, 16, 'bomb');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
    }

}
//Funao que verifica se o player e bomba tocam
//jogo para, e fica vermelho
function hitBomb (player, bomb)
{
    this.physics.pause();
    player.setTint(0xff0000);
    player.anims.play('turn');
    gameOver = true;
}
