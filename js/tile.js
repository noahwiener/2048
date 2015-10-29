(function() {
  'use strict';
  if (typeof JSGame === 'undefined'){
    window.JSGame = {};
  }

  var Tile = JSGame.Tile = function(board, pos, value){
    this.board = board;
    this.pos = pos || board.findEmpty();
    this.value = value || this.assignValue();
    this.merged = false;
  };

  Tile.prototype.assignValue = function(){
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
        newPos = this.addDirection(direction);
        this.board.moved = true;
      }else if(!this.merged && this.equals(this.board.grid[newPos[0]][newPos[1]])){
        var match = this.board.grid[newPos[0]][newPos[1]];
        this.mergeInto(match);
        newPos = this.addDirection(direction);
        this.board.moved = true;
      }else{
        newPos = [newPos[0] + direction[0], newPos[1] + direction[1]];
      }
    }
    this.board.place(this.pos, this);
    this.merged = false;
  };

  Tile.prototype.mergeInto = function(other){
    this.board.score += this.value;
    this.value += other.value;
    this.board.clearSquare(this.pos);
    this.pos = other.pos;
    this.merged = true;
  };

  Tile.prototype.addToBoard = function(){
    this.board.place(this.pos, this);
  };

  Tile.prototype.equals = function(other) {
    return this.value === other.value;
  };

  Tile.prototype.canBeMerged = function(){
    var directions = [
      [0, -1],
      [0, 1],
      [-1, 0],
      [1, 0]
    ];

    var testSquare;
    for (var i = 0; i < directions.length; i++) {
      testSquare = this.addDirection(directions[i]);
      if (this.equals(testSquare)){
        return true;
      }
    }
    return false;
  };


})();
