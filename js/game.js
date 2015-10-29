(function() {
  'use strict';
  if (typeof JSGame === 'undefined'){
    window.JSGame = {};
  }

  var Game = JSGame.Game = function($el){
    this.$el = $el;
    this.board = new JSGame.Board();
    // this.setupGrid();
  };



}());
