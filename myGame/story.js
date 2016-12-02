/* global game phaser game_state */
game_state.story = function () {};

game_state.story.prototype ={
    
    preload: function () {
        // game.load.image('scene1', 'assets/New Piskel.png');
        // game.load.image('scene2', 'assets/New Piskel.png');
         game.load.image('sky', 'assets/sky.png');   
        
    },
    create: function(){
        //   game.add.sprite(0, 0, 'scene1');
        game.add.sprite(0, 0, 'sky');
    },
    update: function(){
        
    }
}

game.state.add('story', game_state.story);
// game.state.start('story');