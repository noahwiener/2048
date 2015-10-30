(function() {
  'use strict';
  if (typeof JSGame === 'undefined'){
    window.JSGame = {};
  }

  var Game = JSGame.Game = function($el){
    this.$el = $el;
    this.board = new JSGame.Board();
    this.setupGrid();
    $(window).on("keydown", this.handleKeyPress.bind(this));
  };


  Game.prototype.setupGrid = function() {
    var html = $("<div class='board'></div>");
    for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 4; j++) {
        html.append("<div class='grid-square'></div>");
        var square = this.board.grid[i][j];
        if (square.value) {
          var tileDisplay = $("<div></div>");
          tileDisplay.addClass(square.klass());
          square.$el = tileDisplay;
          html.append(tileDisplay);
        }
      }
    }
    this.$el.html(html);
  };


  Game.KEYS = {
    38: "up",
    39: "right",
    40: "down",
    37: "left"
  };

  Game.prototype.handleKeyPress = function (event) {
    if (Game.KEYS[event.keyCode]) {
      var direction = Game.KEYS[event.keyCode];
      this.board.handleInput(direction);
      if (this.board.moved){
        this.board.placeRandomTile();
        this.setScore();
        this.board.moved = false;
        if (this.board.over){
          alert("you win");
          this.board.won = false;
        }
      }
    }
  };

  Game.prototype.setScore = function(){
    $(".score").html("Score:" + " " + this.board.score);
  };


}());
