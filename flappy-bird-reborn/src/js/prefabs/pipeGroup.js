(function() {
  'use strict';

  var ns = window['flappy-bird-reborn'];

  var PipeGroup = function(game, parent) {  
    Phaser.Group.call(this, game, parent);

    this.topPipe = new ns.Pipe(this.game, 0, 0, 0);
    this.add(this.topPipe);

    this.bottomPipe = new ns.Pipe(this.game, 0, 440, 1);
    this.add(this.bottomPipe);

    this.hasScored = false;

    this.setAll('body.velocity.x', -200);
  };

  PipeGroup.prototype = Object.create(Phaser.Group.prototype);  
  PipeGroup.prototype.constructor = PipeGroup;

  PipeGroup.prototype.reset = function(x, y) {
    this.topPipe.reset(0, 0); 
    this.bottomPipe.reset(0, 440);

    this.x = x; 
    this.y = y;

    this.setAll('body.velocity.x', -200);
    this.hasScored = false;
    this.exists = true;
  };

  PipeGroup.prototype.checkWorldBounds = function() {  
    if (!this.topPipe.inWorld) {
      this.exists = false;
    }
  };

  PipeGroup.prototype.update = function() {
    this.checkWorldBounds();
  };

  window['flappy-bird-reborn'] = window['flappy-bird-reborn'] || {};
  window['flappy-bird-reborn'].PipeGroup = PipeGroup;
}());