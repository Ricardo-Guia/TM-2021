//cria a nossa "main" que vai conter o jogo
var Game = function(game){
    var object;
    var jumpSound;
    var score;
    var labelScore;
    var timer;
    var enemys;
    var score;
    var labelScore;
    var labelLife;
    var jumpSound;
    var x;
    var vidas;
    var sobeNivel;
};

Game.prototype= {
    preload: function() { 
        // É a função que é executada no inicio
        // Onde carregamos as imagens e o som
        //som para ser executado sempre que o objeto salta
    
        this.game.load.audio('jump', 'assets/jump.wav');
        //carrega a imagem do objeto a controlar
        this.game.load.image('object', 'assets/object.png'); 
        //carrega a imagem dos "inimigos"
        this.game.load.image('enemy', 'assets/enemy.png');        
    },

    create: function() { 
        this.stage.disableVisibilityChange = false;
         game.add.sprite(0, 0, 'stars');

        this.jumpSound = game.add.audio('jump'); 
        this.sobeNivel = 1;
        this.vidas = 40;
        this.score = 0;
        //text(width,height)
        var nomeScore = game.add.text(20, 20, "Score", { font: "30px Arial", fill: "#ffffff" });
        this.labelScore = game.add.text(20, 50, "0", { font: "30px Arial", fill: "#ffffff" });

        var nomeLife = game.add.text(20, 520, "Lives", { font: "30px Arial", fill: "#ffffff" });
        this.labelLife = game.add.text(20, 550, "40", { font: "30px Arial", fill: "#ffffff" });  

        this.enemys = game.add.group(); 

        // Define o sistema das físicas
        game.physics.startSystem(Phaser.Physics.ARCADE);

        if(gameOptions.carater == 0){
        // Coloca o objeto na posicao x=100, y=245
        this.object = game.add.sprite(100, 245, 'object');
        }else{
            this.object = game.add.sprite(100, 245, 'object2');
        }

        /// Adiciona as fisicas ao objeto
        game.physics.arcade.enable(this.object);

        this.timer = game.time.events.loop(gameOptions.velJogo, this.addRowOfEnemys, this);

         // Adicionar gravidade ao objeto para ele poder cair
        this.object.body.gravity.y = 1000;  

        // chama a função "Jump" quando o espaço é carregado
        spaceKey = game.input.keyboard.addKey(
                        Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(this.jump, this);   

        this.object.anchor.setTo(-0.2, 0.5); 

    },

    update: function() {
        // contêm a lógica do jogo
        // se o objeto sair fora do ecrâ, chama a função "restartGame"
        if (this.object.y < 0 || this.object.y > 600){
            this.restartGame();
        } 
        //sempre que o objeto colide com os inimigos, sao retirados um certo numeros de vidas
        if(this.game.physics.arcade.overlap(this.object, this.enemys, null, null, this)){
            this.vidas--;
            if(this.vidas <= 0){
                this.labelLife.text= 0;
            }else{
                this.labelLife.text= this.vidas;
            }
        }
        //quando as vidas forem menor que 0, gameOver
        if( this.vidas <= 0 ){
            this.game.physics.arcade.overlap(this.object, this.enemys, this.hitEnemy, null, this)
        }
        //angulo do objeto
        if (this.object.angle < 20){
            this.object.angle += 1; 
        }     
        if(this.score > gameOptions.pont){
            gameOptions.pont = this.score;
            localStorage.setItem('BestScore', JSON.stringify(gameOptions.pont));
        }
        //igual as variáveis para quando acontecer gameover, mostrar o score
        gameOptions.scoreAtual = this.score;
    },

    // faz com que o objeto salte
jump: function() {
    //dá este som sempre que o objeto salta
    this.jumpSound.play();
    //se o objeto estiver morto, nao poderá saltar
    if (this.object.alive == false){
        return;  
    }  
    // adiciona velocidade vertical ao objeto
    this.object.body.velocity.y = -350;
    // cria uma animacao no objeto
    var animation = this.game.add.tween(this.object);
    // altera o angulo do objeto para -20° em 100 milisegundos
    animation.to({angle: -20}, 100);
    // dá start á animação
    animation.start(); 
    
  },
  // recomeça o jogo
  restartGame: function() {
    // dá start da main, oo que faz que tudo recomece
    game.state.start('GameOver');
  },

  addOneEnemy: function(x, y) {
    // cria um inimigo na posição x, y
    var enemy = game.add.sprite(x, y, 'enemy');

    // adiciona o inimigo ao grupo criado
    this.enemys.add(enemy);

    // Adiciona as fisicas ao inimigo
    game.physics.arcade.enable(enemy);

    // adiciona velocidade ao inimigo para se mudar para a esquerda
    enemy.body.velocity.x = gameOptions.velocidade; 

    // remove o inimigo quando ele já não é visivel
    enemy.checkWorldBounds = true;
    enemy.outOfBoundsKill = true;
},

addRowOfEnemys: function() {
    // faz random de um numero entre 0 e 7
        // é a posição do buraco para o objeto passar
        //acrescento +1 para o output ser entre 1 e 8
    var hole = Math.floor(Math.random() * 7) + 1;
    console.log("teste:" +hole);
//incrementa um no "score" sempre que é criado um inimigo
    this.score += 1;
    this.labelScore.text = this.score;  

    // Add the 6 pipes 
    // adiciona 6 inimigos com um buraco na posicao 'hole' e na posicao 'hole+1'
    for (var i = 0; i < 10; i++){
        if (i != hole && i != hole + 1) {
            this.addOneEnemy(800, i * 60 + 2 ); 
        }
    }  
},
  
    hitEnemy: function() {
        // se o objeto já bateu num inimigo nao faz nada
        if (this.object.alive == false){
            return;
        }
        // coloca a propriedade 'alive' do objeto a falso
        this.object.alive = false;
        // faz com que nao apareçam mais inimigos
        this.game.time.events.remove(this.timer);
        // vai a todos os inimigos e para o movimento deles
        this.enemys.forEach(function(p){
            p.body.velocity.x = 0;
        }, this);
    }, 

  hitDie: function(){
    
  }
  
  
    
};

Phaser.Utils.mixinPrototype(Game.prototype, mixins);




