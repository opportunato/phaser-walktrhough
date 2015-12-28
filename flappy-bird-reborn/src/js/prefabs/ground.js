(function() {
  'use strict';

  var Ground = function(game, x, y, width, height) {  
    Phaser.TileSprite.call(this, game, x, y, width, height, 'ground');
    this.autoScroll(-200,0);

    // enable physics on the ground sprite
    // this is needed for collision detection
    this.game.physics.arcade.enableBody(this);

    // we don't want the ground's body
    // to be affected by gravity
    this.body.allowGravity = false;
    this.body.immovable = true;
  };

  Ground.prototype = Object.create(Phaser.TileSprite.prototype);  
  Ground.prototype.constructor = Ground;

  Ground.prototype.update = function() {

    // write your prefab's specific update code here

  };

  window['flappy-bird-reborn'] = window['flappy-bird-reborn'] || {};
  window['flappy-bird-reborn'].Ground = Ground;
}());