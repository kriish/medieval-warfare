function Cell(row, column) {
    this.row = row;
    this.x = row - (row % 50);
    this.y = column - (column % 50);;
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

function City(cell) {
    this.location = cell;
    cell.city = this;
    this.name = "new city";
    this.size = TOWN;
    
    function draw_city(context) {
      var icon = new Image();
      icon.src = "img/weather.jpg";
      context.drawImage(icon, cell.x, cell.y);
    }
    this.draw = draw_city;
}