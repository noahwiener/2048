(function() {
  'use strict';
  if (typeof JSGame === 'undefined'){
    window.JSGame = {};
  }

  var Board = JSGame.Board = function(size){
    this.size = size || 4;
    this.newEmptyGrid();
    this.addStartingTiles();
    this.score = 0;
  };

  Board.prototype.newEmptyGrid = function(){
    this.grid = [];
    for (var i = 0; i < this.size; i++) {
      var row = [];
      for (var j = 0; j < this.size; j++) {
        row.push([]);
      }
      this.grid.push(row);
    }
  };

  Board.prototype.isOnBoard = function (pos){
    if(pos[0] > 0 && pos[0] < this.size && pos[1] > 0 && pos[1] < this.size){
      return true;
    }else{
      return false;
    }
  };

  Board.prototype.isEmptySquare = function(pos){
    return !this.grid[pos[0]][pos[1]];
  };

  Board.prototype.randomPos = function(){
    var row = Math.floor(Math.random() * this.size);
    var col =  Math.floor(Math.random() * this.size);
    return [row, col];
  };

  Board.prototype.findEmpty = function(){
    var random = this.randomPos();
    while (!this.isEmptySquare(random)){
      random = this.randomPos();
    }
    return random;
  };

  Board.prototype.place = function(pos, tile){
    this.grid[pos[0]][pos[1]] = tile;
  };

  Board.prototype.clearSquare = function(pos){
    this.grid[pos[0]][pos[1]] = null;
  };

  Board.prototype.addStartingTiles = function(){
    var pos = this.randomPos();
    var tile = new JSGame.Tile(this, pos);
    this.place(pos, tile);

    pos = this.randomPos();
    tile = new JSGame.Tile(this, pos);
    this.place(pos, tile);
  };

  Board.prototype.up = function(callback){
    for (var i = 0; i < this.size; i++) {
      for (var j = 0; j < this.size; j++) {
        if (this.grid[pos[i]][pos[j]]) {
          callback(this.grid[pos[i]][pos[j]]);
        }
      }
    }
  };

  Board.prototype.down = function(callback){
    for (var i = this.size - 1; i >= 0; i--) {
      for (var j = 0; j < this.size; j++) {
        if (this.grid[pos[i]][pos[j]]) {
          callback(this.grid[pos[i]][pos[j]]);
        }
      }
    }
  };

  Board.prototype.left = function(callback){
    for (var i = 0; i < this.size; i++) {
      for (var j = 0; j < this.size; j++) {
        if (this.grid[pos[j]][pos[i]]) {
          callback(this.grid[pos[j]][pos[i]]);
        }
      }
    }
  };

  Board.prototype.right = function(callback){
    for (var i = this.size - 1; i >= 0; i--) {
      for (var j = 0; j < this.size; j++) {
        if (this.grid[pos[j]][pos[i]]) {
          callback(this.grid[pos[j]][pos[i]]);
        }
      }
    }
  };
}());
