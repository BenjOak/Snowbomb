let snowTile, sprite1Still, sprite2Still;
let moveSpeed = 2;
let snowDot = [];


function preload() {
    snowTile = loadImage("assets/Snow_Tile1.png");
    //swapped the image numbers around for the actual gameplay
    sprite1Still = loadImage("assets/Sprite_2_stoodstill.png");
    sprite2Still = loadImage("assets/Sprite_1.png");
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
        this.snowPosX = [];
        this.snowPosY = [];
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
    moveSnowX;
    moveSnowY;
    snowPosX;
    snowPosY;


    constructor() {
        this.x = 900;
        this.y = 500;
        this.xDir = 0;
        this.yDir = 0;
        this.snowPosX = [];
        this.snowPosY = [];
        this.moveSnowX = this.snowPosX[0] -+ moveSpeed * 5;
        this.moveSnowY = this.snowPosY[0];
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
}

class Player1SnowBall {
    x;
    y;
    
    constructor() {
        this.x = player1.snowPosX[0] += moveSpeed*3;
        this.y = player1.snowPosY[0];
    }

    draw() {
        fill(255);
        circle(this.x, this.y, 20);
    }
}

let player1 = new Sprite1();
let player2 = new Sprite2();
let snowBall1 = new Player1SnowBall;


function setup() {
    createCanvas(1000, 1000);
}


function draw() {
    background(255);
    imageMode(CENTER);
    player1.draw(player1.x, player1.y);
    player2.draw(player2.x, player2.y);
    player1.move();
    player2.move();
    snowBall1.draw();

    // console.log(player1.x);
    // console.log(player2.x);

}

/**sprite stops if player releases movement key
 * @returns xDir or yDir as 0.
 */
function keyReleased() {
    if (key === "a") {
        player1.xDir = 0;
        snowDot.push()
    }
    if (key === "d") {
        player1.xDir = 0;
    }
    if (key === "w") {
        player1.yDir = 0;
    }
    if (key === "s") {
        player1.yDir = 0;
    }
    if (key === " ") {
        player1.snowPosX.unshift(player1.x);
        player1.snowPosY.unshift(player1.y);
        console.log(player1.snowPosX[0], player1.snowPosY[0]);
        throwSnowBall1();
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
        player2.snowPosX.unshift(player2.x);
        player2.snowPosY.unshift(player2.y);
        console.log(player2.snowPosX[0], player2.snowPosY[0]);
        circle(player2.snowPosX[0] -= moveSpeed*3, player2.snowPosY[0], 20);

    }
}

/**modifies xDir or yDir by 1. 
 * 
 * this affects the class.move method, effectively enabling the player to move
 * @returns (xDir or yDir) as (-1 or 1).
 */
function keyPressed() {
    if (key === "a") {
        player1.xDir = -1;
    }
    if (key === "d") {
        player1.xDir = 1;
    }
    if (key === "w") {
        player1.yDir = -1;
    }
    if (key === "s") {
        player1.yDir = 1;
    }
    if (keyCode === LEFT_ARROW) {
        player2.xDir = -1;
    }
    if (keyCode === RIGHT_ARROW) {
        player2.xDir = 1;
    }
    if (keyCode === UP_ARROW) {
        player2.yDir = -1;
    }
    if (keyCode === DOWN_ARROW) {
        player2.yDir = 1;
    }
}

function throwSnowBall1() {
    fill(255);
    circle(player1.snowPosX[0] += moveSpeed*3, player1.snowPosY[0], 20);
}


function ground() {


}




