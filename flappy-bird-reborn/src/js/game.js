(function() {
  'use strict';

  var ns = window['flappy-bird-reborn'];

  function Game() {}

  Game.prototype = {
    create: function () {
      this.game.physics.startSystem(Phaser.Physics.ARCADE);
      this.game.physics.arcade.gravity.y = 500;

      this.background = this.game.add.sprite(0,0,'background');

      // Create a new bird object
      this.bird = new ns.Bird(this.game, 100, this.game.height/2);
      // and add it to the game
      this.game.add.existing(this.bird);

      this.ground = new ns.Ground(this.game, 0, 400, 335, 112);
      this.game.add.existing(this.ground);
    },

    update: function () {
      this.game.physics.arcade.collide(this.bird, this.ground);
    },
  };

  window['flappy-bird-reborn'] = window['flappy-bird-reborn'] || {};
  window['flappy-bird-reborn'].Game = Game;
}());
