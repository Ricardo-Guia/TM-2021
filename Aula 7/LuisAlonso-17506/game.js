let game;
let gameOptions = {
    defaultSize: {
        width: 750,
        height: 1334,
        maxRatio: 4 / 3
    },
    // distancia em pixeis entre plataformas
    platformGapRange: [200, 400],
    // array com a largura das plataformas em pixeis
    platformWidthRange: [50, 150],
    // tempo de scroll, em milisegundos
    scrollTime: 250,
    // altura da plataforma, relativa a altura do jogo
    platformHeight: 0.6,
    // largura da DangerZone, em pixeis
    dangerZoneWidth: 20,
    // largura do pole, em pixeis
    poleWidth: 8,
    // tempo que demora a "crescer" ate ao maximo, em milisegundos
    poleGrowTime: 400,
    // tempo de rotacao ao cair , em milisegundos
    poleRotateTime: 500,
    // tempo , em milisegundos, para mover o ninja.
    heroWalkTime: 2,
    // tempo que o ninja demora ao cair, em milisegundos
    heroFallTime: 500,
    // mostrar a GUI
    showGUI: true,
    // bonus ao acertar na zona, em segundos
    bonusTime: 3,
    // melhor score
    localStorageName: "irresponsible",
    // tempo inicial sem bonus
    initialTime: 30,
    // som
    soundOn: true
}

const POLE_SUCCESSFUL = 0;
const POLE_TOO_SHORT = 1;
const POLE_TOO_LONG = 2;
// o ninja esta a mexer-se
const IDLE = 0;
// jogo esta a espera do input do utilizador
const WAITING_FOR_INPUT_START = 1;
// espera que a açao previa termine
const WAITING_FOR_INPUT_STOP = 2;

// scene "PreloadGame"
class preloadGame extends Phaser.Scene{

    // contrutor da classe
    constructor(){
        super("PreloadGame");
    }

    // metodo executado pelo phaser ao realizar o preload
    preload(){

        // carregar a imagem de fundo e associa-la a variavel "background"
        this.load.image("background", "assets/sprites/background.png");
        // carregar as plataformas e a dangerZone
        this.load.image("tile", "assets/sprites/tile.png");
        this.load.image("dangertile", "assets/sprites/dangertile.png");
        this.load.image("title", "assets/sprites/title.png");
        this.load.image("info", "assets/sprites/info.png");
        this.load.image("playbutton", "assets/sprites/playbutton.png");
        this.load.image("logo", "assets/sprites/logo.png");
        // carregar a sprite das nuvens e atribuir a "cloud" key
        this.load.spritesheet("cloud", "assets/sprites/cloud.png", {
            // largura, pixels
            frameWidth: 256,
            // altura, pixels
            frameHeight: 256
        });
        //sprite do ninja
        this.load.spritesheet("hero", "assets/sprites/hero.png", {
            frameWidth: 77,
            frameHeight: 97
        });
        //sprite dos icons
        this.load.spritesheet("icons", "assets/sprites/icons.png", {
            frameWidth: 150,
            frameHeight: 150
        });
        // bitmap font
        this.load.bitmapFont("font", "assets/fonts/font.png", "assets/fonts/font.fnt");
        // audio
        this.load.audio("death", ["assets/sounds/death.mp3", "assets/sounds/death.ogg"]);
        this.load.audio("run", ["assets/sounds/run.mp3", "assets/sounds/run.ogg"]);
        this.load.audio("stick", ["assets/sounds/stick.mp3", "assets/sounds/stick.ogg"]);
        this.load.audio("grow", ["assets/sounds/grow.mp3", "assets/sounds/grow.ogg"]);
        this.load.audio("pick", ["assets/sounds/pick.mp3", "assets/sounds/pick.ogg"]);
        this.load.audio("click", ["assets/sounds/click.mp3", "assets/sounds/click.ogg"]);

    }

    //metodo executado a seguir ao preload
    create(){
        // cria uma animacao
        this.anims.create({
            // referimo-nos a animacao como "idle"
            key: "idle",
            // frames da sprite a usar
            frames: this.anims.generateFrameNumbers("hero", {
                start: 0,
                end: 11
            }),
            frameRate: 15,
            //repetir indefinidamente
            repeat: -1
        });
        // mesmo conceito mas agora para o ninja correr
        this.anims.create({
            key: "run",
            frames: this.anims.generateFrameNumbers("hero", {
                start: 12,
                end: 19
            }),
            frameRate: 15,
            repeat: -1
        });
        // executar a scene "PlayGame"
        this.scene.start("PlayGame");
    }
}
// scense "playGame"
class playGame extends Phaser.Scene{

    // constructor
    constructor(){
        super("PlayGame");
    }

    create(){
        // le o melhor score
        this.bestScore = localStorage.getItem(gameOptions.localStorageName);
        // se nao houver um score guardado
        if(this.bestScore == null){
            // comecar do 0
            this.bestScore = 0;
        }
        // score em si
        this.mountains = 0;
        // tempo que falta para terminar o jogo.
        this.timeLeft = gameOptions.initialTime;
        // adiciona sons
        this.addSounds();
        // instanciar metodo para adicionar a imagem de fundo
        this.addBackground();
        //adicionar as plataformas
        this.addPlatforms();
        //adiciona a dangerZone
        this.addDangerZone();
        //adiciona o pole
        this.addPole();
        //adiciona o ninja
        this.addPlayer();
        //adicionar as nuvens
        this.addClouds();

        // mostrar a GUI?
        if(gameOptions.showGUI){
            this.addGameTitle();
            this.gameMode = IDLE;
        }
        // ou voltar para o jogo
        else{
            this.addGameInfo();
        }
        // gestao do input do utilizador
        this.input.on("pointerdown", this.handlePointerDown, this);
        this.input.on("pointerup", this.handlePointerUp, this);
    }
    //adiciona sons
    addSounds(){

        // todos os sons
        this.sounds = {
            // adicionar os sons
            death: this.sound.add("death"),
            run: this.sound.add("run"),
            stick: this.sound.add("stick"),
            grow: this.sound.add("grow"),
            pick: this.sound.add("pick"),
            click: this.sound.add("click")
        }
    }

    //adiciona a gameTile
    addGameTitle(){
        this.guiGroup = this.add.group();
        let blackOverlay = this.add.sprite(0, 0, "tile");
        blackOverlay.setOrigin(0, 0);
        blackOverlay.displayWidth = game.config.width;
        blackOverlay.displayHeight = game.config.height;
        blackOverlay.alpha = 0.8;

        this.guiGroup.add(blackOverlay);
        //titulo
        let title = this.add.sprite(game.config.width / 2, 50, "title");
        title.setOrigin(0.5, 0);
        //adiciona o titulo
        this.guiGroup.add(title);

        // adiciona o botao play
        let playButtonX = game.config.width / 2;
        let playButtonY = game.config.height / 2 - 20;
        let playButton = this.add.sprite(playButtonX, playButtonY, "playbutton");

        // triggers ao carregar no botao
        playButton.setInteractive();

        // quando o botao é "released"
        playButton.on("pointerup", function(){

            // tornar o menu invisivel
            this.guiGroup.toggleVisible();

            // torna-lo inativo
            this.guiGroup.active = false;

            // efeito de flash da camara
            this.cameras.main.flash();
            // reproduz o som
            this.playSound(this.sounds.click);
            // metodo addGameInfo
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
        // icone dos sons
        let soundButton = this.add.sprite(playButtonX, playButtonY + 300, "icons");
        // define o frame correto
        soundButton.setFrame(gameOptions.soundOn ? 2 : 3);

        // torna o botao interativo
        soundButton.setInteractive();
        // quando o botao é libertado
        soundButton.on("pointerup", function(){
            // inverte a opcao
            gameOptions.soundOn = !gameOptions.soundOn;
            // atualiza de acordo
            soundButton.setFrame(gameOptions.soundOn ? 2 : 3);
            // reproduz o som
            this.playSound(this.sounds.click)
        }, this);

        // sound button is also part of GUI group
        this.guiGroup.add(soundButton);
    }
    //som
    playSound(sound, options){

        // som ON
        if(gameOptions.soundOn){
            // Play
            sound.play("", options);
        }
    }
    //para os sons
    stopSound(sound){
        // para
        sound.stop();
    }
    //informacao do jogo
    addGameInfo(){
        this.info = this.add.sprite(game.config.width / 2, game.config.height / 4, "info");
        this.gameMode = WAITING_FOR_INPUT_START;
        //primeiro turno
        this.firstMove = true;
    }

    // metodo para adiconar o fundo
    addBackground(){

        // adiciona o fundo como uma sprite, nas coordenadas x: -50, y: - 50
        let background = this.add.sprite(-50, -50, "background");

        // define a origem como o canto superior esquerdo
        background.setOrigin(0, 0);

        // largura é igual a largura do jogo +100
        background.displayWidth = game.config.width + 100;

        // altura igual a do jogo +100
        background.displayHeight = game.config.height + 100;
    }

    //metodo para adicionar as nuvens
    addClouds(){

        // quantidade de nuvens para ocupar toda a largura do jogo
        let clouds = Math.ceil(game.config.width / 128);

        // array para guardar as nuvens
        let cloudsArray = [];

        // executado duas vezes porque queremos 2 filas de nuvens
        for(let i = 0; i <= 1; i ++){
            // executado por cada nuvem
            for(let j = 0; j <= clouds; j ++){
                // adiciona a nuvem aleatoria
                let cloud = this.add.sprite(128 * j + Phaser.Math.Between(-10, 10), game.config.height + i * 32 + Phaser.Math.Between(-10, 10), "cloud");
                // frames das nuvens
                cloud.setFrame(i);
                // adiciona a nuvem ao array
                cloudsArray.push(cloud);
            }
        }
        // duplica as nuvens
        this.tweens.add({

            // array com as nuvens a duplicar
            targets: cloudsArray,

            // propriedades a duplicar
            props: {
                // x posicao horizontal
                x: {
                    //alterar o valor de x
                    value: {
                        // determinar a posicao final
                        getEnd: function(target, key, value){

                            // subir a imagem ligeiramente
                            return target.x + Phaser.Math.Between(-10, 10)
                        }
                    }
                },

                // aplicar da mesma forma ao y
                y: {
                    value: {
                        getEnd: function(target, key, value){
                            return target.y + Phaser.Math.Between(-10, 10)
                        }
                    }
                }
            },
            // duracao
            duration: 3000,
            // para repetir sempre usa-se "repeat: -1"
            repeat: -1,
            // efeito yo-yo
            yoyo: true
        });
    }
    //adiciona as plataformas
    addPlatforms(){

        // plataforma principal
        this.mainPlatform = 0;

        this.platforms = [
            this.addPlatform((game.config.width - gameOptions.defaultSize.width) / 2),
            this.addPlatform(game.config.width)
        ];

        // duplicar
        this.tweenPlatform();
    }
    //adicionar a plataforma na posicao x
    addPlatform(posX){

        let platform = this.add.sprite(posX, game.config.height * gameOptions.platformHeight, "tile");

        let width = (gameOptions.platformWidthRange[0] + gameOptions.platformWidthRange[1]) / 2;

        platform.displayWidth = width;

        //  50 + pixeis por causa do shakeeffect
        platform.displayHeight = game.config.height * (1 - gameOptions.platformHeight) + 50

        // origem no topo esquerdo
        platform.setOrigin(0, 0);
        return platform
    }
    //duplicar e repetir
    tweenPlatform(){

        // recebe as coordenadas
        let rightBound = this.platforms[this.mainPlatform].getBounds().right;

        let minGap = gameOptions.platformGapRange[0];
        let maxGap = gameOptions.platformGapRange[1];

        // determina o random
        let gap = Phaser.Math.Between(minGap, maxGap);

        let destination = rightBound + gap;
        let minWidth = gameOptions.platformWidthRange[0];
        let maxWidth = gameOptions.platformWidthRange[1];

        let width = Phaser.Math.Between(minWidth, maxWidth)

        this.platforms[1 - this.mainPlatform].displayWidth = width;

        this.tweens.add({
            targets: [this.platforms[1 - this.mainPlatform]],
            x: destination,
            duration: gameOptions.scrollTime,

            callbackScope: this,

            onComplete: function(){
                this.placeDangerZone();
            }
        })
    }
    //cria a dangerZone
    addDangerZone(){

        // adiciona o sprite
        this.dangerZone = this.add.sprite(0, this.platforms[this.mainPlatform].y, "dangertile");

        // define para o canto superior esquerdo
        this.dangerZone.setOrigin(0, 0);

        // ajustar altura e largura
        this.dangerZone.displayWidth = gameOptions.dangerZoneWidth;
        this.dangerZone.displayHeight = 10;

        // tornar a zona invisivel
        this.dangerZone.visible = false;
        // adiciona contador tempo
        this.extraTime = this.add.sprite(0, 0, "clock");
        // torna o contado invisivel
        this.extraTime.visible = false;
    }
    //coloca a zona
    placeDangerZone(){

        // mostrar a zona
        this.dangerZone.visible = true;

        // determina o limite
        let platformBound = this.platforms[1 - this.mainPlatform].getBounds().right;

        // 50% probabilidade de ser no limite esquerdo ou direito
        if(Phaser.Math.Between(0, 1) == 0){
            //lado esquerdo
            this.dangerZone.x = this.platforms[1 - this.mainPlatform].x;
        }
        else{
            //lado direito
            this.dangerZone.x = platformBound - gameOptions.dangerZoneWidth;
        }
        // coloca o contador na dangerZone
        this.extraTime.x = this.dangerZone.getBounds().centerX;
        // alpha -1 -> completamente opaco
        this.extraTime.alpha = 1;
        this.extraTime.y = this.platforms[this.mainPlatform].y - 30
        // invisivel
        this.extraTime.visible = false;
    }
    //plataforma seguinte
    nextPlatform(){
        this.hero.anims.play("idle");
        //coloca o ninja na plataforma
        this.hero.y = this.platforms[this.mainPlatform].getBounds().top;
        // esconde a dangerZone da plataforma atual
        this.dangerZone.visible = false;
        // posicao da nova plataforma
        let rightPlatformPosition =  this.platforms[1 - this.mainPlatform].x
        // determina distancia
        let distance = this.platforms[1 - this.mainPlatform].x - this.platforms[this.mainPlatform].x;
        // tween para mover tudo
        this.tweens.add({
            targets: [this.hero, this.pole, this.platforms[0], this.platforms[1]],
            props: {
                x: {

                    // subtrair distancia da posicao x
                    value: "-= " + distance
                },
                // transparencia
                alpha: {
                    value: {
                        getEnd: function(target, key, value){
                            if(target.x < rightPlatformPosition){
                                // alpha = 0: completamente transparente
                                return 0
                            }
                            // alpha = 1: completamente opaco
                            return 1
                        }
                    }
                }
            },
            duration: gameOptions.scrollTime,
            callbackScope: this,
            onComplete: function(){

                // chama o metodo prepareNextMove
                this.prepareNextMove();
            }
        })
    }
    //prepara o proximo turno do player
    prepareNextMove(){
        // aumenta o score
        this.mountains ++;
        // update do score
        this.updateScore();
        this.platforms[this.mainPlatform].x = game.config.width;
        this.platforms[this.mainPlatform].alpha = 1;
        this.mainPlatform = 1 - this.mainPlatform;
        // chama a proxima plataforma
        this.tweenPlatform();
        // reset nos status do pole
        this.pole.angle = 0;
        this.pole.alpha = 1;
        this.pole.x = this.platforms[this.mainPlatform].getBounds().right - gameOptions.poleWidth;
        this.pole.displayHeight = gameOptions.poleWidth;
        // muda o gamemode para poder voltar a executar açoes de input
        this.gameMode = WAITING_FOR_INPUT_START;

    }
    //adicionar o Pole
    addPole(){

        // limite da plataforma da esquerda
        let bounds = this.platforms[this.mainPlatform].getBounds();

        // adiciona o pole perto da borda direita
        this.pole = this.add.sprite(bounds.right - gameOptions.poleWidth, bounds.top, "tile");

        // anchor point no inferior direito
        this.pole.setOrigin(1, 1);

        // ajusta o tamanho. comeca pequeno
        this.pole.displayWidth = gameOptions.poleWidth;
        this.pole.displayHeight = gameOptions.poleWidth;
    }
    //adicionar o ninja
    addPlayer(){

        // limites das plataformas
        let platformBounds = this.platforms[this.mainPlatform].getBounds();

        // posicao do ninja em largura
        let heroPosX = platformBounds.right - gameOptions.poleWidth;

        // posicao em cima da plataforma
        let heroPosY = platformBounds.top;

        // adiciona a sprite do ninja
        this.hero = this.add.sprite(heroPosX, heroPosY, "hero");

        // atribui o canto inferior esquerdo como origem
        this.hero.setOrigin(1, 1);

        // inicia a animacao "idle"
        this.hero.anims.play("idle");
    }
    //acoes a realizar no pointerDown
    handlePointerDown(){
        // so executa se estiver a espera do input
        if(this.gameMode == WAITING_FOR_INPUT_START) {
            this.gameMode = WAITING_FOR_INPUT_STOP;
            // define os limites
            let maxPoleWidth = gameOptions.platformGapRange[1] + gameOptions.platformWidthRange[1];
            // som "grow"
            this.playSound(this.sounds.grow);
            //o tween é usado para fazer o pole aumentar.
            this.growTween = this.tweens.add({
                targets: [this.pole],
                displayHeight: maxPoleWidth + 50,
                duration: gameOptions.poleGrowTime,
                //onComplete para parar o som
                callbackScope: this,
                onComplete: function(){
                    // para o som
                    this.stopSound(this.sounds.grow);
                }
            });
            // é o primeiro move do jogador?
            if(this.firstMove){
                // esconde a informaçao do jogo
                this.info.visible = false;
                // mostra o score
                this.showGameScore();
                // adiciona o timer
                this.addGameTimer();
            }
        }
    }
    //acoes no pointerUp
    handlePointerUp(){
        // we only execute the code if gameMode is WAITING_FOR_INPUT_STOP
        if(this.gameMode == WAITING_FOR_INPUT_STOP) {
            this.gameMode = IDLE;
            // stop "grow" sound
            this.stopSound(this.sounds.grow);

            // try to play "stick" sound
            this.playSound(this.sounds.stick);
            // para de aumentar o pole
            this.growTween.stop();

            // tween para fazer o pole "cair"
            this.tweens.add({
                targets: [this.pole],
                // rotacao em si
                angle: 90,
                duration: gameOptions.poleRotateTime,
                //fazer bounce na acao de cair
                ease: "Bounce.easeOut",
                // quando para de pousar o pole, inicia o metodo para mover o ninja
                callbackScope: this,
                onComplete: function () {
                    // limite do pole
                    let poleBounds = this.pole.getBounds();
                    // limite da DangerZone
                    let dangerBounds = this.dangerZone.getBounds();
                    // se o fim do pole esta na zona
                    if(poleBounds.right >= dangerBounds.left && poleBounds.right <= dangerBounds.right){
                        // try to play "pick" sound
                        this.playSound(this.sounds.pick);
                        // mostra contador
                        this.extraTime.visible = true;
                        // tempo atual + tempo bonus
                        let actualTime = this.timeLeft + gameOptions.bonusTime;
                        this.timeLeft = Math.min(actualTime, gameOptions.initialTime);
                        // fade e subir do contador
                        this.timeTween = this.tweens.add({
                            targets: [this.extraTime],
                            y: this.extraTime.y - 100,
                            alpha: 0,
                            duration: 500
                        })
                        // update do timer
                        this.updateTimer();
                    }

                    // limite da plataforma da direita
                    let platformBounds = this.platforms[1 - this.mainPlatform].getBounds();
                    // assumir sucesso
                    let poleStatus = POLE_SUCCESSFUL;
                    // se o limite do pole for inferior a distancia
                    if (poleBounds.right < platformBounds.left) {
                        // pole demasiado curto
                        poleStatus = POLE_TOO_SHORT;
                    } else {
                        // se for maior que a distancia ate a plataforma seguinte
                        if (poleBounds.right > platformBounds.right) {
                            // pole demasiado longo
                            poleStatus = POLE_TOO_LONG;
                        }
                    }
                    // o heroi move-se de acordo com o status
                    this.moveHero(poleStatus);
                }
            })
        }
    }
    //cair do pole
    poleFallDown() {
        // fazer o pole cair debaixo dos pes do ninja
        this.tweens.add({
            // o target da acao e o pole
            targets: [this.pole],
            // rodar o pole 180 graus
            angle: 180,
            // duracao em milisegundos da rotacao
            duration: gameOptions.poleRotateTime,
            // efeito
            ease: "Cubic.easeIn"
        })
    }
    //cair e morrer
    fallAndDie(){
        // remove Time event
        this.gameTimer.remove();
        // try to play "death" sound with some delay
        this.playSound(this.sounds.death, {
            delay: gameOptions.heroFallTime / 2000
        });
        // ninja cair
        this.tweens.add({
            // o target da acao e o ninja
            targets: [this.hero],
            //ninja cai
            y: game.config.height + this.hero.displayHeight * 2,
            // roda 180 graus
            angle: 180,
            // duracao
            duration: gameOptions.heroFallTime,
            // efeito
            ease: "Cubic.easeIn",
            callbackScope: this,
            // quando acaba
            onComplete: function(){
                // abanar a camara
                this.cameras.main.shake(200, 0.01);

                // GameOver
                this.showGameOver();
            }
        })
    }

    //metodo para mover o ninja entre plataformas de acordo com o poleStatus
    moveHero(poleStatus){
        // obter limites
        let platformBounds = this.platforms[1 - this.mainPlatform].getBounds();
        let heroBounds = this.hero.getBounds();
        let poleBounds = this.pole.getBounds();
        // armazena a posicao final do ninja
        let heroDestination;
        // verificar opcoes
        switch(poleStatus){
            case POLE_SUCCESSFUL:
                //sucesso nao esta na danger zone e pode continuar
                heroDestination = platformBounds.right - gameOptions.poleWidth;
                break;
            case POLE_TOO_SHORT:
                //demasiado curto e nao chega
                heroDestination = poleBounds.right;
                break;
            case POLE_TOO_LONG:
                //demasiado grande e o ninja cai ao ultrapassar o fim do pole
                heroDestination = poleBounds.right + heroBounds.width / 2;
                break;
        }
        this.hero.anims.play("run");
        // try to play "run" sound
        this.playSound(this.sounds.run)
        this.walkTween = this.tweens.add({
            targets: [this.hero],
            // destino do heroi
            x: heroDestination,
            duration: gameOptions.heroWalkTime * this.pole.displayHeight,
            callbackScope: this,
            onComplete: function(){
                // stop "run" sound
                this.stopSound(this.sounds.run)
                // verifica o status da acao do pole
                switch(poleStatus){
                    case POLE_TOO_SHORT:
                        // executa o falldown e o die
                        this.poleFallDown();
                        this.fallAndDie();
                        break;
                    // when the pole is too long, we still call fallAndDie method
                    case POLE_TOO_LONG:
                        this.fallAndDie();
                        break;
                    // se foi bem sucediso
                    case POLE_SUCCESSFUL:
                        // proxima plataforma
                        this.nextPlatform();
                        break;
                }
            },
            onUpdate: function(){
                let heroBounds = this.hero.getBounds();
                let poleBounds = this.pole.getBounds();
                let platformBounds = this.platforms[1 - this.mainPlatform].getBounds();

                // se o ninja esta a caminhar no pole
                if(heroBounds.centerX > poleBounds.left && heroBounds.centerX < poleBounds.right){
                    // colocar o ninja em cima do pole
                    this.hero.y = poleBounds.top;
                }
                else{
                    // senao colocar o ninja em cima da plataforma
                    this.hero.y = platformBounds.top;
                }
            }
        });
    }
    // gameOver
    showGameOver(){
        let halfGameWidth = game.config.width / 2;

        // botao restart
        let restartIcon = this.add.sprite(halfGameWidth - 120, game.config.height + 150, "icons");

        // tornar o restart interativo
        restartIcon.setInteractive();

        // quando o botao é libertado
        restartIcon.on("pointerup", function(){
            // try to play "click" sound
            this.playSound(this.sounds.click);
            gameOptions.showGUI = false;
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
    //score do jogo
    showGameScore(){
        // deixa de ser o primeiro move
        this.firstMove = false;
        // adiciona a barra de energia
        let energyBar = this.add.sprite(game.config.width / 2, game.config.height / 5, "energybar");
        // limites da barra de energia
        let energyBounds = energyBar.getBounds();
        // adiciona o texto do score
        this.scoreText = this.add.bitmapText(energyBounds.right, energyBounds.top - 40, "font", 	"DISTANCE: " + this.mountains.toString());
        this.scoreText.setOrigin(1, 0);
        // texto com o melhor score
        this.bestScoreText = this.add.bitmapText(energyBounds.left, energyBounds.bottom + 10, "font", 	"MAX DISTANCE: " + this.bestScore.toString());
        this.bestScoreText.setOrigin(0, 0);
        // preenche a energy bar com uma barra branca
        this.energyStatus = this.add.sprite(energyBounds.left + 5, energyBounds.top + 5, "whitetile");
        this.energyStatus.setOrigin(0, 0);
        this.energyStatus.displayWidth = 500;
        this.energyStatus.displayHeight = energyBounds.height - 10;
    }
    //update score
    updateScore(){
        // update texto
        this.scoreText.setText("DISTANCE: " + this.mountains)
        // se o score for superior ao anterior
        if(this.mountains > this.bestScore){
            // update melhor score
            this.bestScore = this.mountains;
            // guarda
            localStorage.setItem(gameOptions.localStorageName, this.bestScore);
            // update texto
            this.bestScoreText.setText("MAX DISTANCE: " + this.bestScore.toString());
        }
    }
    //temporizador
    addGameTimer(){
        // cria o "time event"
        this.gameTimer = this.time.addEvent({
            // delay
            delay: 1000,
            callback: function(){
                // diminui o tempo
                this.timeLeft --;
                // faz update do timer
                this.updateTimer();
            },
            callbackScope: this,
            // executar indefinidamente
            loop: true
        });
    }
    //update do temporizador
    updateTimer(){
        // atualiza a energy bar
        this.energyStatus.displayWidth = 500 * this.timeLeft / gameOptions.initialTime;
        // o tempo acabou?
        if(this.timeLeft == 0){
            // para o heroi
            this.tweens.killTweensOf(this.hero);
            // para o pole
            this.tweens.killTweensOf(this.pole);
            // cai e morre
            this.fallAndDie();
        }
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

        //array com as game scenes
        scene: [preloadGame, playGame]
    }
    game = new Phaser.Game(gameConfig);
    window.focus();
}
