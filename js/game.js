(function() {
  'use strict';
  if (typeof JSGame === 'undefined'){
    window.JSGame = {};
  }

  var Game = JSGame.Game = function(){
    this.board = new JSGame.Board();
  };

}());
