/*global Phaser*/


var game = new Phaser.Game(800, 600, Phaser.AUTO, '');
var game_state = {}


game_state.main = function() {};
game_state.main.prototype = {


    preload: function() {

        game.load.image('sky', 'assets/sky.png');
        game.load.image('ground', 'assets/platform.png');
        game.load.image('star', 'assets/star.png');
        game.load.spritesheet('dude', 'assets/zak (2).png', 160, 160);

    },


    create: function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.add.sprite(0, 0, 'star');
        //background
        game.add.sprite(0, 0, 'sky');
        this.platforms = game.add.group();
        this.platforms.enableBody = true;
        var ground = this.platforms.create(0, game.world.height - 64, 'ground');
        ground.scale.setTo(2, 2);
        ground.body.immovable = true;
        var ledge = this.platforms.create(200, 420, 'ground');
        ledge.body.immovable = true;
        
        var ledge = this.platforms.create(200, 200, 'ground');
        ledge.body.immovable = true;
        var ledge = this.platforms.create(-300, 333, 'ground');
        ledge.body.immovable = true;
        var ledge = this.platforms.create(700, 100, 'ground');
        ledge.body.immovable = true;
        
        
        this.player = game.add.sprite(32, game.world.height - 300, 'dude');
        game.physics.arcade.enable(this.player);
        this.player.body.bounce.y = 0.6;
        this.player.body.gravity.y = 450;
        this.player.body.collideWorldBounds = true;
        this.player.animations.add('left', [1, 2, 3, 4], 5, true);
        this.player.animations.add('right', [6, 5, 6, 7], 5, true);
        this.player.scale.setTo(0.5, 0.5);
        this.player.body.setSize(125,116 ,12 ,22 );
        
        
        // our controls.
        this.cursor = game.input.keyboard.createCursorKeys();
        
        this.stars = game.add.group();
        this.stars.enableBody = true;
        
        for (var i = 0; i < 30; i++) {
            var star = this.stars.create(i * 50, 0, 'star');
            
            star.body.gravity.y = 200;
            star.body.bounce.y = 0.7 + Math.random() *0.2;
            
            
            
            
        }
        this.scoreText = game.add.text(16, 16, 'score: 0', {
                fontSize: '32px',
                fill: '#000'
            });
            this.score = 0;

    },
       

    update: function() {
        // collide the player and the platforms..
        game.physics.arcade.collide(this.player, this.platforms);
        // Reset the this.players velocity 
        this.player.body.velocity.x = 0;
        
        if (this.cursor.left.isDown) {
            this.player.body.velocity.x = -150;

            this.player.animations.play('left');

        }
        else if (this.cursor.right.isDown) {
            this.player.body.velocity.x = 150;

            this.player.animations.play('right');
        }
        else {
            // stand still
            this.player.animations.stop();

            this.player.frame = 0;
        }
        game.debug.body(this.player);

        // Allow this.player to jump if they are touching the ground.
        if (this.cursor.up.isDown && this.player.body.touching.down) {
            this.player.body.velocity.y = -350;
        }
        game.physics.arcade.collide(this.stars, this.platforms);
        game.physics.arcade.overlap(this.player, this.stars, this.collectStar, null, this);
        
        
        
        
    },
    
    collectStar: function(player, star) {
        star.kill();
    this.score ++ ;
    this.scoreText.text = this.score;
    }


}
game.state.add('main', game_state.main);
game.state.start('main');