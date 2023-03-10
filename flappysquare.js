var myGamePiece;
var myObstacles = [];
var myScore;

//Hey guys! Alex here as your comment guide through this code. Sorry I couldn't see you for the last session! Have fun!


/* This function initialises everything that will happen
in the game. It makes your sqare, your score, and starts
the board */
function startGame() {
    myGamePiece = new component(30, 30, "red", 10, 120);
    myGamePiece.gravity = 0.05;
    myScore = new component("30px", "Consolas", "black", 280, 40, "text");
    myGameArea.start();
}


/* This part uses canvas to create a board for the game 
to take place on. */
var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 480; //"this" is exactly what it sounds like. There are weird edge cases
        this.canvas.height = 270; //but for most intents and purposes this.width will be the same as saying variable.width
        this.context = this.canvas.getContext("2d"); //Or more precisely in this case, myGameArea.width
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

/* This function is used to initialise a new component 
for the board. This is used for both the score and the 
player character, as well as the obstacles.*/
function component(width, height, color, x, y, type) {
    this.type = type;
    this.score = 0;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;
    this.gravity = 0;
    this.gravitySpeed = 0;
    this.update = function() {
        ctx = myGameArea.context;
        if (this.type == "text") {  //This is a fun way of checking how to update the context! These are two entirely different mechanisms
            ctx.font = this.width + " " + this.height;  //But this part adds to the score, a text display
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        } else {
            ctx.fillStyle = color;                      //While this sets the location of your square and obstacles. Just by checking if it's text.
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function() {      //Function to increase your fall speed and move up or down, relative to your current speed
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
        this.hitBottom();
    }
    this.hitBottom = function() {   //Function so that if you are on the ground, you don't keep falling!
        var rockbottom = myGameArea.canvas.height - this.height;
        if (this.y > rockbottom) {
            this.y = rockbottom;
            this.gravitySpeed = 0;
        }
    }
    this.crashWith = function(otherobj) { //If you touch anything on the canvas, you die
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;        //Interesting variable names. This is the left and right of whatever it's checking against
        var otherright = otherobj.x + (otherobj.width); //Each update it'll check against everything on screen.
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;  //If there were overlap, something crashed.
        }
        return crash;
    }
}

/* A function for adding new walls as you move forward.
This function also checks where the walls are in relation 
to you, and runs the crash function to see if you've hit 
anything.*/
function updateGameArea() {
    var x, height, gap, minHeight, maxHeight, minGap, maxGap;
    for (i = 0; i < myObstacles.length; i += 1) {
        if (myGamePiece.crashWith(myObstacles[i])) {
            return;
        } 
    }
    myGameArea.clear(); //reset it before redrawing
    myGameArea.frameNo += 1;
    if (myGameArea.frameNo == 1 || everyinterval(150)) {
        x = myGameArea.canvas.width;
        minHeight = 20;
        maxHeight = 200;
        height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
        minGap = 50;
        maxGap = 200;
        gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
        myObstacles.push(new component(10, height, "green", x, 0)); //Wall generation! Uses the same method as our rectangle
        myObstacles.push(new component(10, x - height - gap, "green", x, height + gap));
    }
    for (i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].x += -1;
        myObstacles[i].update();
    }
    myScore.text="SCORE: " + myGameArea.frameNo;
    myScore.update();
    myGamePiece.newPos();
    myGamePiece.update();
}

/* This function determines how often updates are. 
Since we use 150 higher in the code, it updates 
every 150 frames.*/
function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
    return false;
}

/* This is the main gameplay element. You 
accelerate downward at 0.05 m/s/s. When you
flap your wings it goes upward by 0.2 m/s/s.
Keep it balanced! Try changing the values! */
function accelerate(n) {
    myGamePiece.gravity = n;
}