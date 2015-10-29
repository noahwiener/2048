(function() {
  'use strict';
  if (typeof JSGame === 'undefined'){
    window.JSGame = {};
  }

  var Game = JSGame.Game = function($el){
    this.$el = $el;
    this.board = new JSGame.Board();
    this.setupGrid();
  };


  Game.prototype.setupGrid = function () {
    var html = "";

    for (var i = 0; i < this.board.size; i++) {
      html += "<ul class=row" + i + ">";
      for (var j = 0; j < this.board.size; j++) {
        var value = "";
        if (this.board.grid[i][j].value){
          value = this.board.grid[i][j].value;
        }
        html += "<li class=col" + j + ">" + value + "</li>";
      }
      html += "</ul>";
    }
    this.$el.html(html);
  };



}());
