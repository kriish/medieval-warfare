var currentlySelectedCell;
var currentlyHighlightedCell;
var mapCells=new Array();
var cellX = 15; 
var cellY = 15;
var troopMoving = false;
var troopCallback = false;

// x and y are the coordinates clicked based on which we choose the tile
function chooseTile(context, x,y) {
    var fillColor = "rgba(0, 0, 200, 0.5)";
    var troopColor = "rgba(0, 200, 0, 0.5)";
    x = x - (x % cellX);
    y = y - (y % cellY);
    context.fillStyle = fillColor;
    if (troopMoving) {
        context.fillStyle = troopColor;
    }
   context.fillRect(0.5 + x, 0.5 + y,cellX + 0.5, cellY + 0.5);
   
//   context.strokeStyle = "#ff0";
//   context.stroke();
}
 
// x and y are the coordinates clicked based on which we choose the tile
function unchooseTile(context, x,y) {
    x = x - (x % cellX);
    y = y - (y % cellY);
   context.clearRect (0.5 + x, 0.5 + y, cellX + 0.5, cellY + 0.5);
}

function findCellFromCache(cell) {
    if (mapCells[cell.hashId()]) {
        console.log("Found cell " + cell.hashId() + ", " + cell.x + ", " + cell.y + ", selected = " + cell.selected);
        return mapCells[cell.hashId()];
    } else {
        console.log("New cell, saving... " + cell.hashId() + ", "+ cell.x + ", " + cell.y + ", selected = " + cell.selected);
        
        mapCells[cell.hashId()] = cell;
        return cell;
    }
}
function findCellFromCacheById(cellid) {
    var foundCell = mapCells[cellid];
    if (foundCell) {
        console.log("Found cell " + foundCell.hashId() + ", " + foundCell.x + ", " + foundCell.y + ", selected = " + foundCell.selected);
        return foundCell;
    } else {
	return;
    }
}

function getCursorPosition(e) {
    var x;
    var y;
    if (e.pageX != undefined && e.pageY != undefined) {
    x = e.pageX;
    y = e.pageY;
    }
    else {
	x = e.clientX + document.body.scrollLeft +
            document.documentElement.scrollLeft;
	y = e.clientY + document.body.scrollTop +
            document.documentElement.scrollTop;
    }
     var canvas = document.getElementById("top");
     x -= canvas.offsetLeft;
    y -= canvas.offsetTop;
//     var cell = new Cell(Math.floor(y/kPieceHeight),
//                        Math.floor(x/kPieceWidth));
    return new Cell(x,y);
    
}
// return the cell from the cache if exists, otherwise return new
function getCell(e) {
    var cell = getCursorPosition(e);
    console.log("Cursor position cell: " + cell.hashId() + ", " + cell.test + " " + cell.x + ", " + cell.y + ", selected = " + cell.selected);
    return findCellFromCache(cell);
}

// return the cell from the cache if exists, otherwise return new
function getCellByPosition(x,y) {
    var cell = new Cell(x,y);
    //console.log("Cursor position cell: " + cell.hashId() + ", " + cell.test + " " + cell.x + ", " + cell.y + ", selected = " + cell.selected);
    return findCellFromCache(cell);
}
    
//Highlight a game square on click
function selectSquare(event) {
  
  // TODO some problem with getcell
    var cell = getCell(event); //getCursorPosition(event);
    // ignore right click when tile is already selected
    if (! (event.button != 1 && cell.selected))
    //if (!cell.selected))
      select(cell);
    
}

function select(cell) {
          var canvas = document.getElementById("top");
  var context = canvas.getContext("2d");
  
  if (cell.selected) {
    cell.selected = false;
    currentlySelectedCell = false;
    unchooseTile(context, cell.row, cell.column);
  } else {
      if (currentlySelectedCell) {
          
        unchooseTile(context, currentlySelectedCell.row, currentlySelectedCell.column);
        currentlySelectedCell.selected = false;
        currentlySelectedCell = false;
      }
    cell.selected = true;
    currentlySelectedCell = cell;
    chooseTile(context, cell.row, cell.column);
    if (troopCallback) {
        troopCallback(cell);
    }
  }
  if (currentlyHighlightedCell) {
    currentlyHighlightedCell.highlighted = false;
    currentlyHighlightedCell = false;
}
}

var hackCity = false;
function highlight(cell) {
          var canvas = document.getElementById("top");
  var context = canvas.getContext("2d");
  /*
  if (cell.city) {
    alert("cell has city");
    hackCity = true;
  } else {
    hackCity = false;
  }
  */
  if (cell.selected) {
      // do nothing
      if (hackCity) {
        alert("Not highlightinc city, is selected");
        }
  } else if (cell.highlighted) {
     // do nothing, already highlighted
           if (hackCity) {
        alert("Not highlightinc city, is highlighted");
        }

  } else { // not highlighted, could be selected
      // unhighlight previous highlight, unless it is also selected
      if (currentlyHighlightedCell && (currentlyHighlightedCell != currentlySelectedCell)) {
        unchooseTile(context, currentlyHighlightedCell.row, currentlyHighlightedCell.column);
      }
            if (hackCity) {
        alert("highlighting");
        }

      // highlight pointed one
      cell.highlighted = true;
      currentlyHighlightedCell = cell;
      chooseTile(context, cell.row, cell.column);
  }
}

function highlightTile(x,y) {
   var cell = getCellByPosition(x,y);
   highlight(cell);
}

function drawGrid(context) {
    var cellSize = cellX;
  for (var x = 0.5; x < canvasWidth(); x += cellSize) {
    context.moveTo(x, 0);
    context.lineTo(x, canvasHeight());
  }
 
  for (var y = 0.5; y < (canvasHeight()); y += cellSize) {
    context.moveTo(0, y);
    context.lineTo(canvasWidth(), y);
  }    
  
    context.strokeStyle = "#999966";//"#FFCC99";
  context.stroke();
  
//  chooseTile(context, 0, 0);
}

