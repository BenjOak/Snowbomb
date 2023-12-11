let snowTile, sprite1Still, sprite2Still;


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


    constructor() {
        this.x = 100;
        this.y = 500;
        this.xDir = 0;
        this.yDir = 0;


    }


    draw(x, y) {
        x = this.x;
        y = this.y;
        this.still = sprite1Still;
        image(this.still, this.x, this.y);
    }


    move() {
        this.x += this.xDir;
        this.y += this.yDir;
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


    constructor() {
        this.x = 900;
        this.y = 500;
        this.xDir = 0;
        this.yDir = 0;
    }


    /**draws the player stood still */
    draw(x, y) {
        x = this.x;
        y = this.y;
        this.still = sprite2Still;
        image(this.still, this.x, this.y);
    }


    move(xDir, yDir) {
        xDir = this.xDir;
        yDir = this.yDir;
        this.x + xDir;
        this.y + yDir;
    }
}


let player1 = new Sprite1();
let player2 = new Sprite2();


function setup() {
    createCanvas(1000, 1000);
}


function draw() {
    background(255);
    imageMode(CENTER);
    player1.draw(player1.x, player1.y);
    player2.draw(900, 500);
    player1.move();
    player2.move();
    console.log(player1.x);
    console.log(player2.x);
}


function keypressed() {
    if (key === "a") {
        player1.xDir -= 1;
    }
}


function ground() {


}




