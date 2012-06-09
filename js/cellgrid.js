var currentlySelectedCell;
var currentlyHighlightedCell;
var mapCells=new Array();


// x and y are the coordinates clicked based on which we choose the tile
function chooseTile(context, x,y) {
    x = x - (x % 50);
    y = y - (y % 50);
    context.fillStyle = "rgba(0, 0, 200, 0.5)";
   context.fillRect(0.5 + x, 0.5 + y,50.5,50.5);
//   context.strokeStyle = "#ff0";
//   context.stroke();
}
 
// x and y are the coordinates clicked based on which we choose the tile
function unchooseTile(context, x,y) {
    x = x - (x % 50);
    y = y - (y % 50);
   context.clearRect (0.5 + x, 0.5 + y,50.5,50.5);
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
    console.log("Cursor position cell: " + cell.hashId() + ", " + cell.test + " " + cell.x + ", " + cell.y + ", selected = " + cell.selected);
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
        currentlySelectedCell = false;
      }
    cell.selected = true;
    currentlySelectedCell = cell;
    chooseTile(context, cell.row, cell.column);
  }
}

function highlight(cell) {
          var canvas = document.getElementById("top");
  var context = canvas.getContext("2d");
  
  if (cell.selected) {
      // do nothing
  } else if (cell.highlighted) {
     // do nothing, already highlighted
  } else { // not highlighted, could be selected
      // unhighlight previous highlight, unless it is also selected
      if (currentlyHighlightedCell && (currentlyHighlightedCell != currentlySelectedCell)) {
        unchooseTile(context, currentlyHighlightedCell.row, currentlyHighlightedCell.column);
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

