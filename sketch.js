let sprite1Still, sprite2Still, song, pixelFont, title, snowman,
    stage, startButton, victorySound, snowBallHit, restartButton;
let moveSpeed = 2;
let isGameStarted = false;
let gameIsWon = false;
let timeUp = true;
let snowmanIsBuilt1 = false, snowmanIsBuilt2 = false;
let pointsAwarded1 = false, pointsAwarded2 = false;
let gameRestarted = false;



function preload() {
    //swapped the image numbers around for the actual gameplay
    sprite1Still = loadImage("assets/Sprite_2_stoodstill.png");
    sprite2Still = loadImage("assets/Sprite_1.png");
    song = loadSound("assets/Snowbomber Theme_01.mp3");
    victorySound = loadSound("assets/Victory.wav");
    snowBallHit = loadSound("assets/snowBallHit_01.mp3");
    pixelFont = loadFont("assets/PixelifySans-VariableFont_wght.ttf");
    title = loadImage("assets/Snowbomber Title.png");
    snowman = loadImage("assets/Snowman.png");
    stage = loadImage("assets/Stage.png");
    startButton = loadImage("assets/StartGameButton2.png");
    restartButton = loadImage("assets/RestartButton.png");
}

class Timer {
    time;
    constructor() {
        this.time = [];
    }

    draw() {
        this.countdown();
    }

    countdown() {
        if (frameCount % 60 === 0 && this.time[0] > 0) {
            this.time[0] -= 1;
        }
        if (this.time[0] === 0) {
            timeUp = true;
        }
    }

}

class Sprite1 {
    xDir;
    yDir;
    x;
    y;
    snowPosX;
    snowPosY;
    score;


    constructor() {
        this.x = 100;
        this.y = 500;
        this.xDir = 0;
        this.yDir = 0;
        this.snowPosX;
        this.snowPosY;
        this.score = [0];
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
    // keyPressed() {
    //     if (key === "i") {
    //         square(this.x, this.y, 20);
    //     }
    // }
}


class Sprite2 {
    xDir;
    yDir;
    x;
    y;
    snowPosX;
    snowPosY;
    score;

    constructor() {
        this.x = 900;
        this.y = 500;
        this.xDir = 0;
        this.yDir = 0;
        this.snowPosX;
        this.snowPosY;
        this.score = [0];
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
        this.x = x;
        this.y = y;
        this.speedX = speedX;
    }

    draw() {
        fill(255);
        circle(this.x += this.speedX, this.y, 20);
    }
}

class Snowman {
    x;
    y;
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

let player1 = new Sprite1();
let player2 = new Sprite2();
let snowBall1 = [new SnowBall()];
let snowBall2 = [new SnowBall()];
let newTimer1 = new Timer();
let newTimer2 = new Timer();
let newTimer3 = new Timer();
let newTimer4 = new Timer();
let snowman1, snowman2;

function setup() {
    createCanvas(1000, 1000);
    imageMode(CENTER);
    rectMode(CENTER);
    snowman1 = new Snowman(random(70, width/2-70), random(70, height-70));
    snowman2 = new Snowman(random(width/2+70, width-70), random(70, height-70));
}

function draw() {
    background(255);
    image(stage, width/2, height/2);
    strokeWeight(4);
    buildSnowman();
    playerActions();
    snowBalls();
    scores();
    middleLine();
    image(title, width/2, 90, 500, 200);
    startGame();
    music();
    victory();
    snowmanPoints();
}

/**sprite stops if player releases movement key
 * @returns xDir or yDir as 0 if true.
 * @pushes values to snowBall array.
 */
function keyReleased() {
    if (isGameStarted) {
        if (!gameIsWon) {
            if (key === "a") {
                if (!keyIsDown("d")) {
                    player1.xDir = 0;
                }
            }
            if (key === "d") {
                if (!keyIsDown("a")) {
                    player1.xDir = 0;
                }
            }
            if (key === "w") {
                if (!keyIsDown("a") || !keyIsDown("d")) {
                    player1.yDir = 0;
                }
            }
            if (key === "s") {
                if (!keyIsDown("a") || !keyIsDown("d")) {
                    player1.yDir = 0;
                }
            }
            if (key === " ") {
                if (!keyIsDown("a") || !keyIsDown("d") || !keyIsDown("w")|| (!keyIsDown("s"))); {
                    player1.snowPosX = player1.x;
                    player1.snowPosY = player1.y;
                    snowBall1.push(new SnowBall(player1.snowPosX, player1.snowPosY, 10));
                }
            }
            if (keyCode === LEFT_ARROW) {
                if (!keyIsDown(RIGHT_ARROW)) {
                    player2.xDir = 0;
                }
            }
            if (keyCode === RIGHT_ARROW) {
                if (!keyIsDown(LEFT_ARROW)) {
                    player2.xDir = 0;
                }
            }
            if (keyCode === UP_ARROW) {
                player2.yDir = 0;
            }
            if (keyCode === DOWN_ARROW) {
                player2.yDir = 0;
            }
            if (keyCode === ENTER) {
                if (!keyIsDown(RIGHT_ARROW) || !keyIsDown(LEFT_ARROW)) {
                    player2.snowPosX = player2.x;
                    player2.snowPosY = player2.y;
                    snowBall2.push(new SnowBall(player2.snowPosX, player2.snowPosY, -10));
                } 
            }
        }
    }
}

/**modifies xDir or yDir by 1. 
 * 
 * this affects the class.move method, effectively enabling the player to move
 * @returns (xDir or yDir) as (-1 or 1).
 */
function keyPressed() {
    if (isGameStarted) {
        if (!gameIsWon) {
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
        }
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
    }
}

function playerActions () {
    player1.draw(player1.x, player1.y);
    player2.draw(player2.x, player2.y);
    player1.move();
    player2.move();
    player1.bounds();
    player2.bounds();
}

function snowBalls() {
    for (let ball of snowBall1) {
        ball.draw();
        if (ball.x >= player2.x-20 & ball.x <= player2.x+20 & ball.y <= player2.y+47
                & ball.y >= player2.y-47) {
            ball.x=-100000;
            ball.speedX=0;
            player1.score.unshift(player1.score[0]+1);
            snowBallHit.play();
        }
    }
    for (let ball of snowBall2) {
        ball.draw();
        if (ball.x <= player1.x+20 & ball.x >= player1.x-20 & ball.y <= player1.y+49
                & ball.y >= player1.y-41) {
            ball.x=100000;
            ball.speedX=0;
            player2.score.unshift(player2.score[0]+1);
            snowBallHit.play();
        }
    }
}

function scores() {
    textAlign(CENTER);
    textFont(pixelFont);
    textSize(40);
    stroke(8);
    fill(100, 100, 200);
    text(player1.score[0], 50, 50);
    text(player2.score[0], width-50, 50);
}

function startGame() {
    if (!isGameStarted) {
        if (!gameIsWon) {
            fill(0, 0, 255, 50);
            rect(width/2, height/2, width, height);
            image(startButton, width/2, height/2);
            if (mouseX >= width/2-100 & mouseX <= width/2+100 
                & mouseY >= height/2-50 & mouseY <= height/2+50) {
                    rect(width/2, height/2, 200, 100);
            }
            gameRules();
        }
    }
}

function mouseClicked() {
    if (mouseX >= width/2-100 & mouseX <= width/2+100 
        & mouseY >= height/2-50 & mouseY <= height/2+50) {
            isGameStarted = true;
    }
    if (gameIsWon === true) {
        if (mouseX >= width/2-75 & mouseX <= width/2+75
        & mouseY >= height/2+60 & mouseY <= height/2+140) {
            gameRestarted = true;
        }
    }
}

function music() {
    if (isGameStarted && song.isPlaying() === false) {
            song.play();
    } else if (gameIsWon) {
        isGameStarted = false;
        song.stop();
    }
}

function middleLine() {
    stroke(0, 80)
    line(width/2, 0, width/2, height);
}

function buildSnowman() {
    if (isGameStarted === true) {
        newTimer3.time.push(20);
        newTimer3.draw();
    }
    ellipseMode(CENTER);
    if (newTimer3.time[0] === 0) {
        if (player1.x >= snowman1.x-40 & player1.x <= snowman1.x+40 
            & player1.y >= snowman1.y-40 & player1.y <= snowman1.y+40) {
                fill(0, 0, 255);
                newTimer1.time.push(5);
                newTimer1.draw();
            } else fill(255);
            if (!snowmanIsBuilt1) {
                circle(snowman1.x, snowman1.y, 80);
            }
            if (snowmanIsBuilt1 === true) {
                image(snowman, snowman1.x, snowman1.y);
            }
        if (player1.x >= snowman1.x-40 & player1.x <= snowman1.x+40 
            & player1.y >= snowman1.y-40 & player1.y <= snowman1.y+40 & newTimer1.time[0] === 0) {
                snowmanIsBuilt1 = true;
            }
    
        if (player2.x >= snowman2.x-40 & player2.x <= snowman2.x+40 
            & player2.y >= snowman2.y-40 & player2.y <= snowman2.y+40) {
                fill(0, 0, 255);
                newTimer2.time.push(5);
                newTimer2.draw();
            } else fill(255);
        if (!snowmanIsBuilt2) {
            circle(snowman2.x, snowman2.y, 80);
        }
        if (snowmanIsBuilt2 === true) {
            image(snowman, snowman2.x, snowman2.y);
        }
        if (player2.x >= snowman2.x-40 & player2.x <= snowman2.x+40 
            & player2.y >= snowman2.y-40 & player2.y <= snowman2.y+40 & newTimer2.time[0] === 0) {
                snowmanIsBuilt2 = true;
        }
    }
}

function snowmanPoints() {
    if (snowmanIsBuilt1 && !pointsAwarded1) {
        player1.score.unshift(player1.score[0]+20);
        pointsAwarded1 = true;
    }
    if (snowmanIsBuilt2 && !pointsAwarded2) {
        player2.score.unshift(player2.score[0]+20);
        pointsAwarded2 = true;
    }
}

function victory() {
    if (player1.score[0] >= 60 || player2.score[0] >= 60) {
        gameIsWon = true;
        player1.xDir = 0;
        player1.yDir = 0;
        player2.xDir = 0;
        player1.xDir = 0;
        snowBall1.speedX = 0;
        snowBall2.speedX = 0;
        newTimer4.time.push(3);
        newTimer4.draw();
        if (victorySound.isPlaying() === false & newTimer4.time[0] > 0) {
            victorySound.play();
            if (newTimer4.time[0] === 0) {
                victorySound.stop();
            }
        }
        victoryScreenText();
        restart();
    }
}

function restart() {
    image(restartButton, width/2, height/2+100);
    if (mouseX >= width/2-75 & mouseX <= width/2+75
        & mouseY >= height/2+60 & mouseY <= height/2+140) {
            fill(0, 255, 0, 150);
            rect(width/2, height/2+100, 150, 80);
    }
    if (gameRestarted === true) {
        player1.x = 100;
        player1.y = 500;
        player2.x = 900;
        player2.y = 500;
        player1.score.unshift(0);
        player2.score.unshift(0);
        newTimer3.time.unshift(30);
        isGameStarted = false;
        gameIsWon = false;
        timeUp = false;
        snowmanIsBuilt1 = false;
        snowmanIsBuilt2 = false;
        pointsAwarded1 = false, pointsAwarded2 = false;
    }
}

function victoryScreenText() {
    fill(0, 0, 255, 50);
    rect(width/2, height/2, width, height);
    fill(255);
    textAlign(CENTER);
    textSize(100);
    if (player1.score[0] > player2.score[0]) {
        text("Player 1 Wins!", width/2, height/2-50);
    } else if (player2.score[0] > player1.score[0]) {
        text("Player 2 Wins!", width/2, height/2-50);
    } else if (player1.score[0] === player2.score[0]) {
        text("It's a Draw!", width/2, height/2-50);
    }
    noStroke();
    fill(0);
    textSize(20)
    text("Made by Bennie Watson", width/2, 200);
    text("Music composed by Bennie on BeepBox", width/2, 230);
}

function gameRules() {
    fill(255);
    strokeWeight(10);
    strokeJoin(ROUND);
    stroke(0, 100, 150);
    rect(width/2+10, height-175, 910, 200);
    noStroke();
    fill(0);
    textAlign(CENTER);
    textSize(20)
    text("Player 1: WASD keys to move and Space Bar to throw Snow Balls\n Player 2: Arrow keys to move and Enter to throw Snow Balls. \n One point is scored for each snow ball that hits, and 20 for each snowman built.\n To build a snowman, stand in the circle that will appear 20 seconds after the game begins.\n The first player to reach 60 points will win the game.\n Good luck, and happy holidays!", width/2, height-230);
    text("Made by Bennie Watson", width/2, 200);
}