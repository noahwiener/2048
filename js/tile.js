(function() {
  'use strict';
  if (typeof Game === 'undefined'){
    window.Game = {};
  }

  var Tile = function(board, pos, value){
    this.board = board;
    this.pos = pos || board.findEmpty();
    this.value = value || this.assignValue();
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

  Tile.prototype.moveStep = function(direction){
    var newPos = this.addDirection(direction);
    if (this.board.isOnBoard(newPos)){
      if (this.board.isEmptySquare(newPos)){
        this.board.clearSquare(this.pos);
        this.pos = newPos;
        this.board.place(this, this.pos);
      }else if(this.equals(this.board.grid(newPos))){
        var match = this.board.grid(newPos);
        this.mergeInto(match);
      }
    }
  };

  Tile.prototype.mergeInto = function(other){
    other.value += this.value;
    this.board.clearSquare(this.pos);
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
