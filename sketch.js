let snowTile, sprite1Still, sprite2Still;

function preload() {
    snowTile = loadImage("assets/Snow_Tile1.png");
    sprite1Still = loadImage("assets/Sprite_1.png");
    sprite2Still = loadImage("assets/Sprite_2_stoodstill.png");
}

class Sprite1 {
    //movement
    xDir;
    yDir;
    //position
    x;
    y;
    //actions
    still;
    breathe;
    walkLeft;
    walkRight;
    throwLeft;
    throwRight;
    build;

    constructor() {
        this.xDir = 0;
        this.yDir = 0;
        this.x = 900;
        this.y = 500;
        this.still = sprite1Still;
    }
}

function setup() {
    createCanvas(1000, 1000);
}

function draw() {
    background(255);
    imageMode(CENTER);
    //image(Sprite1.still, Sprite1.x, Sprite1.y);
    image(sprite1Still, width/2+20, height/2+2);
    image(sprite2Still, width/2-20, height/2);
}

function ground() {

}

