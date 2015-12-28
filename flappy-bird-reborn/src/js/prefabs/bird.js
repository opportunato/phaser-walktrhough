(function() {
  'use strict';

  var Bird = function(game, x, y, frame) {  
    Phaser.Sprite.call(this, game, x, y, 'bird', frame);

    // initialize your prefab here

  };

  Bird.prototype = Object.create(Phaser.Sprite.prototype);  
  Bird.prototype.constructor = Bird;

  Bird.prototype.update = function() {

    // write your prefab's specific update code here

  };

  window['flappy-bird-reborn'] = window['flappy-bird-reborn'] || {};
  window['flappy-bird-reborn'].Bird = Bird;
}());