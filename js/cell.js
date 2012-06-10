function Cell(row, column) {
    var cellX = 15;
    var cellY = 15;
    this.row = row;
    this.x = row - (row % cellX);
    this.y = column - (column % cellY);;
    this.column = column;
    
    this.highlighted = false;
    this.selected = false;
    this.test = "Test " + row;
function hash_id() {
  return this.x + '-' + this.y;
}    
    this.hashId = hash_id;
    
    this.city = false;
    this.troops = false;
}

var TOWN = 1;
var CITY = 2;
var METROPOL = 3;
var DESTROYED = 4;

function City(cell, name) {
    this.location = cell;
    cell.city = this;
    this.name = "new city";
    if (name) {
        this.name = name;
    }
    
    this.size = TOWN;
    
    function draw_city(context) {
      var icon = new Image();
      icon.src = "../img/city.png";
      context.drawImage(icon, cell.x, cell.y);

        context.font = "bold 16px sans-serif";
        context.fillText(name, cell.x, cell.y);

    }
    this.draw = draw_city;
}

function Troop(curcell, name) {
    this.location = curcell;
    this.location.troop = this;
    curcell.troop = this;
    this.name = "new troop";
    if (name) {
        this.name = name;
    }
    
    this.size = TOWN;
    
    function draw_troop(context) {
      var icon = new Image();
      icon.src = "../img/troop.png";
      context.drawImage(icon, this.location.x, this.location.y);
        alert("Drawing new troop image on x:" + this.location.x +"y:"+  this.location.y);
        context.font = "bold 16px sans-serif";
        context.fillText(name, this.location.x, this.location.y);

    }
    function draw_troop_to_cell(context, dest) {
      var icon = new Image();
      icon.src = "../img/troop.png";
      context.drawImage(icon, dest.x, dest.y);
        alert("Drawing new troop image on x:" + dest.x +"y:"+  dest.y);
        context.font = "bold 16px sans-serif";
        context.fillText(name, dest.x, dest.y);

    }

this.draw = draw_troop;
    
    function move_troop(context, newCell) {
        context.clearRect(this.location.x,this.location.y,25,25);
        
        this.location.troop = false;
        newCell.troop = this;
        this.location = newCell;
        alert ("setting new location x:" + this.location.x +"y:"+  this.location.y);
        this.location.troop = this;
        draw_troop_to_cell(context, this.location);
    }
    
    this.moveTo = move_troop;
    
}