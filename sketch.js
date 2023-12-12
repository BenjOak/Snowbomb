let snowTile, sprite1Still, sprite2Still, song;
let moveSpeed = 2;


function preload() {
    snowTile = loadImage("assets/Snow_Tile1.png");
    //swapped the image numbers around for the actual gameplay
    sprite1Still = loadImage("assets/Sprite_2_stoodstill.png");
    sprite2Still = loadImage("assets/Sprite_1.png");
    song = loadSound("assets/Snowbomber Theme_01.mp3");
}


class Sprite1 {
    //movement
    xDir;
    yDir;
    //position
    x;
    y;
    // still;
    // breathe;
    // walkLeft;
    // walkRight;
    // throwLeft;
    // throwRight;
    // build;
    snowPosX;
    snowPosY;


    constructor() {
        this.x = 100;
        this.y = 500;
        this.xDir = 0;
        this.yDir = 0;
        this.snowPosX;
        this.snowPosY;
    }

    draw(x, y) {
        x = this.x;
        y = this.y;
        this.still = sprite1Still;
        image(this.still, this.x, this.y);
    }

    move() {
        this.x += moveSpeed * this.xDir;
        this.y += moveSpeed * this.yDir;
    }

    bounds() {
        if(this.x <= 50) {
            this.xDir = 0;
        }
        if (this.x >= width/2-50) {
            this.xDir = 0;
        }
        if (this.y <= 50) {
            this.yDir = 0;
        }
        if (this.y >= height-50) {
            this.yDir  = 0;
        }
    }

    /**this is just a test to try figure out if 
     *you can call event functions within a class
     
     yes you can! */
    keyPressed() {
        if (key === "i") {
            square(this.x, this.y, 20);
        }
    }
}


class Sprite2 {
    //movement
    xDir;
    yDir;
    //position
    x;
    y;
    // still;
    // breathe;
    // walkLeft;
    // walkRight;
    // throwLeft;
    // throwRight;
    // build;
    snowPosX;
    snowPosY;

    constructor() {
        this.x = 900;
        this.y = 500;
        this.xDir = 0;
        this.yDir = 0;
        this.snowPosX; //[];
        this.snowPosY; //[];
    }

    /**draws the player stood still */
    draw(x, y) {
        x = this.x;
        y = this.y;
        this.still = sprite2Still;
        image(this.still, this.x, this.y);
    }

    move() {
        this.x += moveSpeed * this.xDir;
        this.y += moveSpeed * this.yDir;
    }

    bounds() {
        if(this.x <= width/2+50) {
            this.xDir = 0;
        }
        if (this.x >= width-50) {
            this.xDir = 0;
        }
        if (this.y <= 50) {
            this.yDir = 0;
        }
        if (this.y >= height-50) {
            this.yDir  = 0;
        }
    }
}

class SnowBall {
    x;
    y;
    speedX;
    
    constructor(x, y, speedX) {
        this.x = x;//player1.snowPosX[0];
        this.y = y;//player1.snowPosY[0];
        this.speedX = speedX;
    }

    draw() {
        fill(255);
        circle(this.x += this.speedX, this.y, 20);
    }

    // move() {
    //     if (this.x >= player1.x || this.x <= width) {
    //         this.x += 10;
    //         this.y;    
    // }
    //     if (this.x <= player2.x || this.x >= 0) {
    //         this.x -= 10;
    //         this.y;
    //     }
    // }
}

let player1 = new Sprite1();
let player2 = new Sprite2();
let snowBall = [new SnowBall()];


function setup() {
    createCanvas(1000, 1000);
}

function draw() {
    background(255);
    imageMode(CENTER);
    playerActions();
    drawSnowBalls();
    line(width/2, 0, width/2, height);

    //player1.keyPressed();
    //circle(player1.snowPosX[0] += 10, player1.snowPosY[0], 20);
    //circle(player2.snowPosX[0] -= 10, player2.snowPosY[0], 20);
    // console.log(player1.x);
    // console.log(player2.x);
}

/**sprite stops if player releases movement key
 * @returns xDir or yDir as 0 if true.
 * @pushes values to snowBall array.
 */
function keyReleased() {
    if (key === "a") {
        if (!keyIsPressed/**PLEASE ASK ABI HOW TO FIX THIS */) {
            player1.xDir = 0;
        }
    }
    if (key === "d") {
        if (!keyIsPressed) {
            player1.xDir = 0;
        }
    }
    if (key === "w") {
        player1.yDir = 0;
    }
    if (key === "s") {
        player1.yDir = 0;
    }
    if (key === " ") {
        player1.snowPosX = player1.x;
        player1.snowPosY = player1.y;
        snowBall.push(new SnowBall(player1.snowPosX, player1.snowPosY, 10));
        //console.log(player1.snowPosX[0], player1.snowPosY[0]);

    }
    if (keyCode === LEFT_ARROW) {
        player2.xDir = 0;
    }
    if (keyCode === RIGHT_ARROW) {
        player2.xDir = 0;
    }
    if (keyCode === UP_ARROW) {
        player2.yDir = 0;
    }
    if (keyCode === DOWN_ARROW) {
        player2.yDir = 0;
    }
    if (keyCode === ENTER) {
        player2.snowPosX = player2.x;
        player2.snowPosY = player2.y;
        snowBall.push(new SnowBall(player2.snowPosX, player2.snowPosY, -10));
        //console.log(player2.snowPosX[0], player2.snowPosY[0]);
    }
}

/**modifies xDir or yDir by 1. 
 * 
 * this affects the class.move method, effectively enabling the player to move
 * @returns (xDir or yDir) as (-1 or 1).
 */
function keyPressed() {
    // if (!player1.outOfBounds()) {
        if (key === "a") {
            if (player1.x >= 50) {
                player1.xDir = -1;
            }
        }
        if (key === "d") {
            if (player1.x <= width/2 - 50) {
                player1.xDir = 1;
            }
        }
        if (key === "w") {
            if (player1.y >= 50) {
                player1.yDir = -1;
            }
        }
        if (key === "s") {
            if (player1.y <= height-50) {
                player1.yDir = 1;
            }
        }
    // }
    // if (!player2.outOfBounds()) {
        if (keyCode === LEFT_ARROW) {
            if (player2.x >= width/2+50) {
                player2.xDir = -1;
            }
        }
        if (keyCode === RIGHT_ARROW) {
            if (player2.x <= width-50) {
                player2.xDir = 1;
            }
        }
        if (keyCode === UP_ARROW) {
            if (player2.y >= 50) {
                player2.yDir = -1;
            }
        }
        if (keyCode === DOWN_ARROW) {
            if (player2.y <= height-50) {
                player2.yDir = 1;
            }
        }
    // }
}

function playerActions () {
    player1.draw(player1.x, player1.y);
    player2.draw(player2.x, player2.y);
    player1.move();
    player2.move();
    player1.bounds();
    player2.bounds();
}

function drawSnowBalls() {
    for (let ball of snowBall) {
        ball.draw();
        //ball.move();
    }
}

function ground() {


}




