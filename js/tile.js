(function() {
  'use strict';
  if (typeof Game === 'undefined'){
    window.Game = {};
  }

  var Tile = function(board, pos, value){
    this.board = board;
    this.pos = pos || this.board.findEmpty();
    this.value = value || this.assignValue();
  };

  Tile.prototype.assignValue = function(){
    rand = Math.random();
    if (rand > 0.9){
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

  Tile.prototype.moveStep = function(direction){
    var newPos = [[this.pos[0] + direction[0]], [this.pos[1] + direction[1]]];
    if (this.board.isOnBoard(newPos)){
      if (this.board.isEmptySquare(newPos)){
        this.pos = newPos;
      }else if(this.equals(this.board.grid(newPos))){
        var match = this.board.grid(newPos);
        this.mergeInto(match);
      }
    };

  Tile.prototype.mergeInto = function(other){
    other.value += this.value;
    this.board.clearSquare(this.pos);
  }

  Tile.prototype.addToBoard = function(){
    this.board.place(this.pos, this);
  };

  Tile.prototype.equals = function(other) {
    return this.value === other.value;
  };

  Tile.prototype.equalAdjacent = function() {
  var dirs = Object.keys(Tile.DIRS);
  for (var i = 0; i < 4; i++) {
    var newPos = this.pos.plus(Tile.DIRS[dirs[i]]);
    if (this.board.onBoard(newPos)) {
      var tile = this.board.get([newPos.x, newPos.y]);
      if (tile && this.equals(tile)) {
        return true;
      }
    }
  }
  return false;
};


}());
