(function() {
  'use strict';
  if (typeof JSGame === 'undefined'){
    window.JSGame = {};
  }

  var Tile = JSGame.Tile = function(board, pos, value){
    this.board = board;
    this.pos = pos || board.findEmpty();
    this.value = value || this.assignStartingValue();
    this.merged = false;
    this.new = true;
  };

  Tile.prototype.assignStartingValue = function(){
    var rand = Math.random();
    if (rand < 0.8){
      return 2;
    }else{
      return 4;
    }
  };

  Tile.prototype.addDirection = function(direction){
    return([this.pos[0] + direction[0], this.pos[1] + direction[1]]);
  };

  Tile.prototype.move = function(direction){
    var newPos = this.addDirection(direction);
    while (this.board.isOnBoard(newPos)){
      if (this.board.isEmptySquare(newPos)){
        this.board.clearSquare(this.pos);
        this.pos = newPos;
        this.board.moved = true;
      }else if(!this.merged && this.match(this.board.grid[newPos[0]][newPos[1]]) && !this.board.grid[newPos[0]][newPos[1]].merged ){
        var match = this.board.grid[newPos[0]][newPos[1]];
        this.mergeInto(match);
        this.board.moved = true;
      }else if (!this.match(this.board.grid[newPos[0]][newPos[1]])){
        break;
      }
      newPos = [newPos[0] + direction[0], newPos[1] + direction[1]];
    }
    this.new = false;
    this.resetKlass();
    this.board.addTile(this.pos, this);
    this.merged = false;
  };

  Tile.prototype.mergeInto = function(other){
    this.board.score += this.value;
    this.value += other.value;
    if (this.value === 2048){
      this.board.won = true;
    }
    this.board.clearSquare(this.pos);
    other.$el.remove();
    this.pos = other.pos;
    this.merged = true;
  };

  Tile.prototype.match = function(other) {
    return this.value === other.value;
  };


  Tile.prototype.canBeMoved = function(){
    var directions = [
      [0, -1],
      [0, 1],
      [-1, 0],
      [1, 0]
    ];
    var testSquare;
    var pos;
    for (var i = 0; i < directions.length; i++) {
      pos = this.addDirection(directions[i]);
      if (this.board.isOnBoard(pos)){
        testSquare = this.board.grid[pos[0]][pos[1]];
        if (this.board.isEmptySquare(pos) || this.match(testSquare)){
          return true;
        }
      }
      }
    return false;
  };

  Tile.prototype.render = function(){
    var klass = this.klass();
    var display = $("<div></div>");
    display.addClass(klass);
    $(".game div").eq(0).append(display);
    this.$el = display;
  };

  Tile.prototype.klass = function(){
    var klass = "tile tile_" + this.pos[0] + this.pos[1];
    klass += " value_" + this.value;
    if (this.merged){
      klass += " merged";
    }else if (this.new){
      klass += " new"
    }
    return klass;
  };

  Tile.prototype.resetKlass = function(){
    this.$el.removeClass();
    this.$el.addClass(this.klass());
  };


})();
