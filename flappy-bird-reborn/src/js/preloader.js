(function() {
  'use strict';

  function Preloader() {
    this.asset = null;
    this.ready = false;
  }

  Preloader.prototype = {
    preload: function () {
      this.asset = this.add.sprite(this.game.width/2, this.game.height/2, 'preloader');
      this.load.setPreloadSprite(this.asset);

      // this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
      // this.loadResources();

      this.load.image('instructions', 'assets/instructions.png');  
      this.load.image('getReady', 'assets/get-ready.png');
      this.load.image('background', 'assets/background.png');
      this.load.image('ground', 'assets/ground.png');
      this.load.image('title', 'assets/title.png');
      this.load.image('startButton', 'assets/start-button.png');
      
      this.load.image('scoreboard', 'assets/scoreboard.png');
      this.load.image('gameover', 'assets/gameover.png');
      this.load.spritesheet('medals', 'assets/medals.png', 44, 46, 2);
      this.load.image('particle', 'assets/particle.png');

      this.load.spritesheet('pipe', 'assets/pipes.png', 54,320,2); 
      this.load.spritesheet('bird', 'assets/bird.png', 34, 24, 3);

      this.load.bitmapFont('flappyfont', 'assets/fonts/flappyfont/flappyfont.png', 'assets/fonts/flappyfont/flappyfont.fnt');

      this.load.audio('score', 'assets/score.wav');
      this.load.audio('flap', 'assets/flap.wav');
      this.load.audio('pipeHit', 'assets/pipe-hit.wav');
      this.load.audio('groundHit', 'assets/ground-hit.wav');

      this.ready = true;
    },

    loadResources: function () {
      // load your assets here
    },

    create: function () {

    },

    update: function () {
      if (!!this.ready) {
        this.game.state.start('game');
      }
    },

    onLoadComplete: function () {
      // this.ready = true;
    }
  };

  window['flappy-bird-reborn'] = window['flappy-bird-reborn'] || {};
  window['flappy-bird-reborn'].Preloader = Preloader;
}());
