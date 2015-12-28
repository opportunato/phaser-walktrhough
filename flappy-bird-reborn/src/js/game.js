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
      this.flapKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
      this.flapKey.onDown.addOnce(this.startGame, this);
      this.flapKey.onDown.add(this.bird.flap, this.bird);

      // add mouse/touch controls
      this.game.input.onDown.addOnce(this.startGame, this);
      this.input.onDown.add(this.bird.flap, this.bird);

      this.instructionGroup = this.game.add.group();
      this.instructionGroup.add(this.game.add.sprite(this.game.width/2, 100,'getReady'));
      this.instructionGroup.add(this.game.add.sprite(this.game.width/2, 325,'instructions'));
      this.instructionGroup.setAll('anchor.x', 0.5);
      this.instructionGroup.setAll('anchor.y', 0.5);

      this.score = 0;
      this.scoreText = this.game.add.bitmapText(this.game.width/2, 10, 'flappyfont',this.score.toString(), 24);
      this.scoreText.visible = false;

      this.scoreSound = this.game.add.audio('score');
    },

    update: function () {
      this.game.physics.arcade.collide(this.bird, this.ground);
      this.pipes.forEach(function(pipeGroup) {
        this.checkScore(pipeGroup);
        this.game.physics.arcade.collide(this.bird, pipeGroup, this.handleDeath, null, this);
      }, this);
    },

    startGame: function() {
      this.bird.body.allowGravity = true;
      this.bird.alive = true;

      // add a timer
      this.pipeGenerator = this.game.time.events.loop(Phaser.Timer.SECOND * 1.25, this.generatePipes, this);
      this.pipeGenerator.timer.start();

      this.instructionGroup.destroy();

      this.scoreText.visible = true;
    },

    generatePipes: function() {
      var pipeY = this.game.rnd.integerInRange(-100, 100);
      var pipeGroup = this.pipes.getFirstExists(false);
      if (!pipeGroup) {
        pipeGroup = new ns.PipeGroup(this.game, this.pipes);  
      }
      pipeGroup.reset(this.game.width + pipeGroup.width/2, pipeY);
    },

    checkScore: function(pipeGroup) {  
      if (pipeGroup.exists && !pipeGroup.hasScored && pipeGroup.topPipe.world.x <= this.bird.world.x) {
        pipeGroup.hasScored = true;
        this.score++;
        this.scoreText.setText(this.score.toString());
        this.scoreSound.play();
      }
    },

    handleDeath: function() {
      this.bird.alive = false;
      this.pipes.callAll('stop');
      this.pipeGenerator.timer.stop();
      this.ground.stopScroll();
      this.scoreboard = new ns.Scoreboard(this.game);
      this.game.add.existing(this.scoreboard);
      this.scoreboard.show(this.score);
    },

    shutdown: function() {
      this.game.input.keyboard.removeKey(Phaser.Keyboard.SPACEBAR);
      this.bird.destroy();
      this.pipes.destroy();
      this.scoreboard.destroy();
    },
  };

  window['flappy-bird-reborn'] = window['flappy-bird-reborn'] || {};
  window['flappy-bird-reborn'].Game = Game;
}());
