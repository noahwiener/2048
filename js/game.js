(function() {
  'use strict';
  if (typeof JSGame === 'undefined'){
    window.JSGame = {};
  }

  var Game = JSGame.Game = function($el){
    this.$el = $el;
    this.board = new JSGame.Board();
    this.setupGrid();
    $(window).on("keydown", this.handleKeyEvent.bind(this));
  };


  Game.prototype.setupGrid = function () {
    var html = "";

    for (var i = 0; i < this.board.size; i++) {
      html += "<ul>";
      for (var j = 0; j < this.board.size; j++) {
        var value = "";
        if (this.board.grid[i][j].value){
          value = this.board.grid[i][j].value;
        }
        html += "<li class=value_" + value + ">" + value + "</li>";
      }
      html += "</ul>";
    }
    this.$el.html(html);
  };

  Game.KEYS = {
    38: "up",
    39: "right",
    40: "down",
    37: "left"
  };

  Game.prototype.handleKeyEvent = function (event) {
    if (Game.KEYS[event.keyCode]) {
      var direction = Game.KEYS[event.keyCode];
      this.board.handleInput(direction);
      if (this.board.moved){
        this.board.placeRandomTile();
        this.board.moved = false;
      }
      this.setupGrid();
    }
  };


}());
