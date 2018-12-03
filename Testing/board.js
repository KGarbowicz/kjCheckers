
var tiles = [];
var currentPlayer= "black";
var waitingPlayer= "red";
var direction = -1;
var movesShown = false;
var currentPiece;
var moves = [];


for(var i = 0;i<8;i++){
    tiles[i]=[];
}

$(document).ready(function(){

    var space = 1;
for (var r=0; r<8; r++) {
  var col = "";
  for (var c=0; c<8; c++) { 
      col += "<td id='"+space+"T' onclick='tileClick(this)'></td>"; space++; 
    }
  $("#chessboard").append("<tr>"+col+"</tr>");
}	
space = 1;
for (var r=0; r<8; r++) {
    for (var c=0; c<8; c++) { 
        tiles[r][c]=document.getElementById(space+"T");
        tiles[r][c].tileY = r;
        tiles[r][c].tileX = c;
        if((r < 3 || r > 4) && ((r%2)+c)%2===0){
            if(r < 3){
            tiles[r][c].gameContent = "red";
            tiles[r][c].innerHTML = "<img src=\'../public/data/red.png\'/>";
        }   
            else if(r>4){
            tiles[r][c].gameContent = "black";
            tiles[r][c].innerHTML = "<img src=\'../public/data/black.png\'/>";
            }
            else{
                tiles[r][c].gameContent = "none";   
            }
        }
        else{
            tiles[r][c].gameContent = "none";
        }   
        space++;
}
}
}
);

function tileClick(e){
console.log("X value: "+e.tileX+"\nY Value: "+e.tileY);
if(!movesShown && currentPlayer === e.gameContent ){
    showmoves(e);
}
else if(movesShown){
    if(e.gameContent == "move"){
    movePiece(e);
    } else{
        removeMoves();
        movesShown = false;
    }

}
}

function showmoves(e){
    currentPiece = e;
    //right tile check
    checkFor(e, 1);
    checkFor(e, -1);
}

function checkFor(e, offset){
    if(isInBoard(e.tileX+offset,e.tileY+direction)){
        var checkTile = tiles[e.tileY+direction][e.tileX+offset];
        if(checkTile.gameContent === "none"){
            setMove(checkTile);
        } else if(checkTile.gameContent === waitingPlayer){
            if(isInBoard(checkTile.tileX+offset,checkTile.tileY+direction)){
            var secondCheck = tiles[checkTile.tileY+direction][checkTile.tileX+offset];
            console.log(secondCheck);
            if(secondCheck.gameContent === "none"){
                setMove(secondCheck);
            }
            }
        }
    }
}

function isInBoard(x,y){
if(x>=0 && x<=7 && y>=0 && y<=7){
    return true;
}
return false;
}

function setMove(e){
    e.innerHTML = "<img src=\'../public/data/pMove.png\'/>";
    e.gameContent = "move";
    movesShown = true;
    moves.push(e);
}

function movePiece(e){
    var piecetaken = Math.abs(Math.abs(e.tileX)-Math.abs(currentPiece.tileX))===2;
    if(piecetaken){
        //piece got taken
        var lostpiece =  tiles[(e.tileY+currentPiece.tileY)/2][(e.tileX+currentPiece.tileX)/2]
        lostpiece.gameContent = "none";
        lostpiece.innerHTML = "";
    }
    removeMoves();
    e.gameContent = currentPiece.gameContent;
    e.innerHTML = currentPiece.innerHTML;
    currentPiece.gameContent = "none";
    currentPiece.innerHTML = "";
    currentPiece = null;
    movesShown = false;
    //if(!piecetaken)
    turnEnding();
}

function removeMoves(){
    for(var i=moves.length-1; i>=0;i--){
        moves[i].gameContent = "none";
        moves[i].innerHTML = "";
        moves.pop();
    }
}

function turnEnding(){

    direction = direction*-1;
if(currentPlayer === "black"){
    currentPlayer = "red";
    waitingPlayer = "black"
} else{
    currentPlayer = "black";
    waitingPlayer = "red";
}
}