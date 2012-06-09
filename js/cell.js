function Cell(row, column) {
    var cellX = 25;
    var cellY = 25;
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
      icon.src = "img/city.png";
      context.drawImage(icon, cell.x, cell.y);

        context.font = "bold 16px sans-serif";
        context.fillText(name, cell.x, cell.y);

    }
    this.draw = draw_city;
}