(function() {
  'use strict';
  if (typeof Game === 'undefined'){
    window.Game = {};
  }

  var Tile = function(board, pos, value){
    this.board = board;
    this.pos = pos || board.findEmpty();
    this.value = value || this.assignValue();
    this.merged = false;
  };

  Tile.prototype.assignValue = function(){
    rand = Math.random();
    if (rand > 0.8){
      return 2;
    }else{
      return 4;
    }
  };

  Tile.DIRECTIONS = {
  "Up": [0, -1],
  "Down": [0, 1],
  "Left": [-1, 0],
  "Right": [1, 0]
};

  Tile.prototype.addDirection = function(direction){
    return([[this.pos[0] + direction[0]], [this.pos[1] + direction[1]]]);
  };

  Tile.prototype.move = function(direction){
    var newPos = this.addDirection(direction);
    while (this.board.isOnBoard(newPos)){
      if (this.board.isEmptySquare(newPos)){
        this.board.clearSquare(this.pos);
        this.pos = newPos;
        newPos = this.addDirection(direction);
      }else if(!this.merged && this.equals(this.board.grid(newPos))){
        var match = this.board.grid(newPos);
        this.mergeInto(match);
        newPos = this.addDirection(direction);
      }
    }
    this.board.place(this, this.pos);
    this.merged = false;
  };

  Tile.prototype.mergeInto = function(other){
    // needs to add some logic so that once it merges, it doesn't merge again
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
    var testSquare;
    for (var i = 0; i < 4; i++) {
      testSquare = this.addDirection(Tile.Directions[i]);
      if (this.equals(testSquare)){
        return true;
      }
    }
    return false;
  };


})();
