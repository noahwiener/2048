(function() {
  'use strict';
  if (typeof Game === 'undefined'){
    window.Game = {};
  }

  var Coord = Game.Coord = function(row, col){
    this.row = row;
    this.col = col;
  };

  Coord.prototype.add = function(otherCoord){
    return Coord.new(this.row + otherCoord.row, this.col + otherCoord.col);
  };

  Coord.prototype.subtract = function(otherCoord){
    return Coord.new(this.row - otherCoord.row, this.col - otherCoord.col);
  };

  Coord.prototype.equals = function(otherCoord){
    if (this.row === otherCoord.row && this.col === otherCoord.col){
      return true;
    }else{
      return false;
    }
  };



}());
