(function () {
  'use strict';

  function Gameover() {}

  Gameover.prototype = {
    create: function () {
      var text = this.game.add.text(this.game.width/2, this.game.height/2, 'Game Over', { fontSize: '32px', fill: '#fff' });
      text.anchor.setTo(0.5, 0.5);
    }
  };

  window['flappy-bird-reborn'] = window['flappy-bird-reborn'] || {};
  window['flappy-bird-reborn'].Gameover = Gameover;
}());

