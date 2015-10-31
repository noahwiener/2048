(function() {
  'use strict';
  if (typeof JSGame === 'undefined'){
    window.JSGame = {};
  }

  var Board = JSGame.Board = function(){
    this.newEmptyGrid();
    this.addStartingTiles();
    this.score = 0;
    this.moved = false;
    this.won = false;
    this.lose = false;
  };

  Board.prototype.placeRandomTile = function(){
    var pos = this.findEmpty();
    var tile = new JSGame.Tile(this, pos);
    tile.render();
    this.addTile(pos, tile);
  };

  Board.prototype.addStartingTiles = function(){
    this.placeRandomTile();
    this.placeRandomTile();
  };

  Board.prototype.newEmptyGrid = function(){
    this.grid = [];
    for (var i = 0; i < 4; i++) {
      var row = [];
      for (var j = 0; j < 4; j++) {
        row.push([]);
      }
      this.grid.push(row);
    }
  };

  Board.prototype.isOnBoard = function (pos){
    if(pos[0] >= 0 && pos[0] < 4 && pos[1] >= 0 && pos[1] < 4){
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
    var row = Math.floor(Math.random() * 4);
    var col =  Math.floor(Math.random() * 4);
    return [row, col];
  };

  Board.prototype.findEmpty = function(){
    var random = this.randomPos();
    while (!this.isEmptySquare(random)){
      random = this.randomPos();
    }
    return random;
  };

  Board.prototype.checkOver = function(){
    this.lose = true;
    for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 4; j++) {
        if (this.isEmptySquare([i, j])){
          this.lose = false;
          return;
        }else if (this.grid[i][j].canBeMoved()){
          this.lose = false;
          return;
        }
      }
    }
  };

  Board.prototype.addTile = function(pos, tile){
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
    for (var j = 1; j < 4; j++) {
      for (var i = 0; i < 4; i++) {
        if (this.grid[i][j].value) {
          (this.grid[i][j]).move([0, -1]);
        }
      }
    }
  };


  Board.prototype.right = function(){
    for (var j = 2; j >= 0; j--) {
      for (var i = 0; i < 4; i++) {
        if (this.grid[i][j].value) {
          (this.grid[i][j]).move([0, 1]);
        }
      }
    }
  };

  Board.prototype.up = function(){
    for (var i = 1; i < 4; i++) {
      for (var j = 0; j < 4; j++) {
        if (this.grid[i][j].value) {
          (this.grid[i][j]).move([-1, 0]);
        }
      }
    }
  };

  Board.prototype.down = function(){
    for (var i = 2; i >= 0; i--) {
      for (var j = 0; j < 4; j++) {
        if (this.grid[i][j].value) {
          (this.grid[i][j]).move([1, 0]);
        }
      }
    }
  };
}());
