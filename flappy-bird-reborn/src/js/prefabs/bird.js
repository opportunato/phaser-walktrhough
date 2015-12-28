(function() {
  'use strict';

  var Bird = function(game, x, y, frame) {  
    // The super call to Phaser.Sprite
    Phaser.Sprite.call(this, game, x, y, 'bird', frame);

    // set the sprite's anchor to the center
    this.anchor.setTo(0.5, 0.5);

    // add and play animations
    this.animations.add('flap');
    this.animations.play('flap', 12, true);

    this.game.physics.arcade.enableBody(this);
  };

  Bird.prototype = Object.create(Phaser.Sprite.prototype);  
  Bird.prototype.constructor = Bird;

  Bird.prototype.flap = function() { 
    this.body.velocity.y = -400;

    this.game.add.tween(this).to({angle: -40}, 100).start();
  };

  Bird.prototype.update = function() {
    if (this.angle < 90) {
      this.angle += 2.5;
    }
  };

  window['flappy-bird-reborn'] = window['flappy-bird-reborn'] || {};
  window['flappy-bird-reborn'].Bird = Bird;
}());