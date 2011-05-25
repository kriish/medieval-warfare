function calcTrans(longSide) {
     var shortSide = longSide / Math.sqrt(2); 
     return shortSide;
}
  
 
function honeycombTilted(context) {
    var sideLength = 50;
    var xMove = calcTrans(sideLength); 
    var y = 0;
    var x = 25;
    context.moveTo(x + 0, y);
    context.lineTo(x + sideLength, y);
    
    context.moveTo(x + sideLength, y);
    context.lineTo(x + sideLength + xMove, y + xMove);
    
    context.moveTo(x + sideLength + xMove, y + xMove);
    context.lineTo(x + sideLength, y + xMove + xMove);
    
    context.moveTo(x + sideLength, y + xMove + xMove);
    context.lineTo(x, y + xMove + xMove);

    context.moveTo(x, y + xMove + xMove);
    context.lineTo(x - xMove, y + xMove);

    context.moveTo(x - xMove, y + xMove);
    context.lineTo(x + 0, y);
    
    context.strokeStyle = "#f00";
    context.stroke();
}


function honeycomb(context) {
    var sideLength = 50;
    var xMove = calcTrans(sideLength); 
    var y = 0;
    var x = 25;
    context.moveTo(x + xMove, y);
    context.lineTo(x + xMove + xMove, y + xMove);
    
    //vertical
    context.moveTo(x + xMove + xMove, y + xMove);
    context.lineTo(x + xMove + xMove, y + xMove + sideLength);
    
    // diagonal
    context.moveTo(x + xMove + xMove, y + xMove + sideLength);
    context.lineTo(x + xMove, y + xMove + sideLength + xMove);
    
    // diagonal up left from bottom point
    context.moveTo(x + xMove, y + xMove + sideLength + xMove);
    context.lineTo(x, y + xMove + sideLength);

   // vertical
    context.moveTo(x, y + xMove + sideLength);
    context.lineTo(x, y + xMove);

    // diagonal to start point
    context.moveTo(x, y + xMove);
    context.lineTo(x + xMove, y);
    
    context.strokeStyle = "#f00";
    context.stroke();
}

// objectify the honeycomb...
// http://stackoverflow.com/questions/3990343/3d-drawing-in-canvas-with-htmljs
var selected = 0;
function selectHoneycomb(context) {
    var sideLength = 50;
    var xMove = calcTrans(sideLength); 
    var y = 0;
    var x = 25;
    
    if (selected == 1) {
        context.fillStyle = "rgba(0, 0, 200, 0.0)";
        selected = 0;
    }
    else {
        selected = 1;
        context.fillStyle = "rgba(0, 0, 200, 0.5)";
    }
    context.beginPath();

    context.moveTo(x + xMove, y);
    context.lineTo(x + xMove + xMove, y + xMove);
    
    //vertical
    context.lineTo(x + xMove + xMove, y + xMove + sideLength);
    
    // diagonal
    context.lineTo(x + xMove, y + xMove + sideLength + xMove);
    
    // diagonal up left from bottom point
    context.lineTo(x, y + xMove + sideLength);

   // vertical
    context.lineTo(x, y + xMove);

    // diagonal to start point
    context.lineTo(x + xMove, y);
    
      context.fill();

}
