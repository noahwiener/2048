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
    this.moved = false;
  };

  Board.prototype.placeRandomTile = function(){
    var pos = this.findEmpty();
    var tile = new JSGame.Tile(this, pos);
    this.place(pos, tile);
  };

  Board.prototype.addStartingTiles = function(){
    this.placeRandomTile();
    this.placeRandomTile();
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
    if(pos[0] >= 0 && pos[0] < this.size && pos[1] >= 0 && pos[1] < this.size){
      return true;
    }else{
      return false;
    }
  };

  Board.prototype.isEmptySquare = function(pos){
    if(this.grid[pos[0]][pos[1]].value){
      return false;
    }else{
      return true;
    }
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
    this.grid[pos[0]][pos[1]] = [];
  };

  Board.prototype.handleInput = function(input){
    switch (input) {
      case "up":
        this.up();
        break;
      case "down":
        this.down();
        break;
      case "left":
        this.left();
        break;
      case "right":
        this.right();
        break;
    }
  };

  Board.prototype.left = function(){
    for (var j = 1; j < this.size; j++) {
      for (var i = 0; i < this.size; i++) {
        if (this.grid[i][j].value) {
          (this.grid[i][j]).move([0, -1]);
        }
      }
    }
  };


  Board.prototype.right = function(){
    for (var j = this.size - 2; j >= 0; j--) {
      for (var i = 0; i < this.size; i++) {
        if (this.grid[i][j].value) {
          (this.grid[i][j]).move([0, 1]);
        }
      }
    }
  };

  Board.prototype.up = function(){
    for (var i = 1; i < this.size; i++) {
      for (var j = 0; j < this.size; j++) {
        if (this.grid[i][j].value) {
          (this.grid[i][j]).move([-1, 0]);
        }
      }
    }
  };

  Board.prototype.down = function(){
    for (var i = this.size - 2; i >= 0; i--) {
      for (var j = 0; j < this.size; j++) {
        if (this.grid[i][j].value) {
          (this.grid[i][j]).move([1, 0]);
        }
      }
    }
  };
}());
