(function() {
  'use strict';

  var ns = window['flappy-bird-reborn'];

  function Game() {}

  Game.prototype = {
    create: function () {
      this.game.physics.startSystem(Phaser.Physics.ARCADE);
      this.game.physics.arcade.gravity.y = 1200;

      this.background = this.game.add.sprite(0,0,'background');

      // Create a new bird object
      this.bird = new ns.Bird(this.game, 100, this.game.height/2);
      this.game.add.existing(this.bird);

      // create and add a group to hold our pipeGroup prefabs
      this.pipes = this.game.add.group();

      this.ground = new ns.Ground(this.game, 0, 400, 335, 112);
      this.game.add.existing(this.ground);

      // keep the spacebar from propogating up to the browser
      this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);

      // add keyboard controls
      var flapKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
      flapKey.onDown.add(this.bird.flap, this.bird);

      // add mouse/touch controls
      this.input.onDown.add(this.bird.flap, this.bird);

      this.pipeGenerator = this.game.time.events.loop(Phaser.Timer.SECOND * 1.25, this.generatePipes, this);
      this.pipeGenerator.timer.start();
    },

    update: function () {
      this.game.physics.arcade.collide(this.bird, this.ground);
      this.pipes.forEach(function(pipeGroup) {
        this.game.physics.arcade.collide(this.bird, pipeGroup, this.handleDeath, null, this);
      }, this);
    },

    generatePipes: function() {
      var pipeY = this.game.rnd.integerInRange(-100, 100);
      var pipeGroup = this.pipes.getFirstExists(false);
      if (!pipeGroup) {
        pipeGroup = new ns.PipeGroup(this.game, this.pipes);  
      }
      pipeGroup.reset(this.game.width + pipeGroup.width/2, pipeY);
    },

    handleDeath: function() {
      this.game.state.start('gameover');
    },

    shutdown: function() {
      this.game.input.keyboard.removeKey(Phaser.Keyboard.SPACEBAR);
      this.bird.destroy();
      this.pipes.destroy();
    },
  };

  window['flappy-bird-reborn'] = window['flappy-bird-reborn'] || {};
  window['flappy-bird-reborn'].Game = Game;
}());
