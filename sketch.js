var drawingball;
var database, pos, piece;

var trajectory=[];

function setup(){
    createCanvas(500,500);

    database=firebase.database();

    piece=loadImage("piece.png");

    drawingball = createSprite(250,250,10,10);
    drawingball.shapeColor = "red";

    database.ref("drawingball/position").on("value",readPos, showErr);
}

function draw(){
    background("white");
    drawSprites();

    var position = [drawingball.x, drawingball.y];
    trajectory.push(position);

    for(var i=0; i<trajectory.length; i++){
        image(piece, trajectory[i][0], trajectory[i][1]);
    }
}

function changePosition(){
    database.ref("drawingball/position").set({
        x:mouseX,
        y:mouseY
    })
}

function mouseDragged(){
    drawingball.x=mouseX;
    drawingball.y=mouseY;

    database.ref("drawingball/position").set({
        x:mouseX,
        y:mouseY
    })
}

function mouseReleased(){
}

function readPos(data){
    pos=data.val();
    drawingball.x=pos.x;
    drawingball.y=pos.y;
}

function showErr(){
    console.log("Error OOCCUURREEDD");
}
