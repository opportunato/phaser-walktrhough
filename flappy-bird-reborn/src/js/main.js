window.addEventListener('load', function () {
  'use strict';

  var ns = window['flappy-bird-reborn'];
  var game = new Phaser.Game(288, 505, Phaser.AUTO, 'flappy-bird-reborn-game');
  game.state.add('boot', ns.Boot);
  game.state.add('preloader', ns.Preloader);
  game.state.add('menu', ns.Menu);
  game.state.add('game', ns.Game);
  /* yo phaser:state new-state-files-put-here */
  game.state.start('boot');
}, false);
