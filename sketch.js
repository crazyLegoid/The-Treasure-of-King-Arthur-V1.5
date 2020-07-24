var player, ground, door;
var jumpCase = 0;
var stage = 0;
var myTileArray = [];
var deathS, crashS, goodS, shootS, jumpS, walkS, winS;
var i = 1;
var block, block2, block3, block4;
var bullets = [];
var enemy1, enemy2, enemy3, enemy4, enemy5, enemy6;
var enemyT = "empty";
var spike1, spike2;
var fireballs = [];
var diamond;
var rock;
var levelD = 0;
var intro;
var dir = "right";
var introS = 1;
var foo, incoming;
var deathCounter = 0;
var font;

var mute = false;
//var speechRec;

function preload() {

  deathS = loadSound("sound/death.wav");
  crashS = loadSound("sound/crash.wav");
  goodS = loadSound("sound/good.wav");
  jumpS = loadSound("sound/jump.wav");
  shootS = loadSound("sound/shoot.wav");
  //wall = loadImage("images/background_stage21.PNG");
  wall = loadImage("images/Bg1.png");

  font = loadFont('Assets/Brigitte_Eigner.ttf')

}

//setup
function setup() {
  let myCanvas = createCanvas(800, 400);
  myCanvas.class("mycanvas");
  //myCanvas.addClass("canvas");

  player = new Player(20, 380);
  ground = new Ground(400, 390, 800, 20);
  block = new Block(200, 50, 50, 100, 0.6);
  block2 = new Block(350, 50, 50, 100, 1);
  block3 = new Block(500, 50, 50, 100, 1.5)
  block4 = new Block(650, 50, 50, 100, 2);
  door = new MagicDoor(780, 345);
  enemy1 = new Enemy(1,350);
  enemy2 = new Enemy(2,350)
  enemy3 = new Enemy(3,350)
  enemy4 = new Enemy(4,350)
  enemy5 = new Enemy(5,350)
  enemy6 = new Enemy(6,350)
  //fireballs = new Fireball(400, 50, 1)

  spike1 = new Spike(190, 360, 30, 40);
  spike2 = new Spike(340, 360, 30, 40);
  spike3 = new Spike(590, 360, 30, 40);

  diamond = new Diamond(400, 40, 40);
  // diamond.class("mycanvas")

  rock = new Rock(1500, 200, 350);

  intro = new Intro(400, 200);
  // let lang = navigator.language || 'en-US';
  // speechRec = new p5.SpeechRec(lang, gotSpeech)

  drawTiles();

}

//draw
function draw() {
  background(wall);


  if(stage != 4){
    
    push();
    textFont(font);
    fill("red");
    textSize(80);
    text("You died : " + deathCounter + " times", 400, 80);
    pop()

  }
  

  //all global functions


  if (stage === 0) {

    intro.display();
    level0();

  }

  //????? find tile ????????
  if (stage === 4) {

    level1();
    door.display();
    player.display();
    player.move();
    player.check(rock);

  }

  if (stage === 3) {

    level2();
    //Jump();
    door.display();
    player.display();
    player.move();
    player.check(rock);

  }

  if (stage === 2) {

    level3();
    door.display();
    player.display();
    player.move();
    player.check(rock);

  }

  if (stage === 1) {

    level4();
    door.display();
    player.display();
    player.move();
    player.check(rock);

  }

  if (stage === 5) {

    level5();
    player.display();
    player.move();
    player.check(rock);

  }

}

//Jump function
function keyPressed() {

  if (stage != 4) {

    if (key === " ") {
      //console.log(player.velY);
      if (jumpCase === 0) {

        player.up();
        jumpCase = 1;

      }

    }
    player.velY += 1

  }

  if (stage === 2) {

    if (keyIsDown(81)) {

      bullets.push(new Bullet(player.x, player.y));

      if (mute === false) {

        shootS.play();

      }

    }

    // if (keyIsDown(188)) {

    //   bullets[i].velX = -10;

    // }

  }

  if (stage === 0) {

    if (keyIsDown(73)) {

      intro.image = loadImage("images/Instruct.png");

    }

    if (keyIsDown(80)) {

      stage++;
      introS = 2;

    }

    if (keyIsDown(83)) {

      intro.image = loadImage("images/Story.png");
      storyVoice();

    }

  }

}

//stage5
function level5() {

  ground.display();
  player.grav = 0.6;
  player.update();
  player.upForce = -10;
  player.groundC();
  diamond.display();
  diamond.isTouching(player, rock);
  rock.display();
  rock.update();
  rock.isTouching(player);

  if(levelD === 1 && stage === 5){

    //Incoming();

  }

}

//stage4
function level4() {

  ground.display();
  player.grav = 0.6;
  player.update();
  player.upForce = -10;
  player.groundC();

  spike1.display();
  spike1.isTouching(player);

  spike2.display();
  spike2.isTouching(player);

  spike3.display();
  spike3.isTouching(player);

  if (levelD === 1) {

    rock.display();
    rock.update();
    rock.isTouching(player);

  }
  //fireballs.display();
  //fireballs.update();
  //speechRec.start();

  // for (var i = 0; i = fireballs.length; i++){

  //   fireballs.push(new Fireball());
  //   fireballs[i].display();
  //   fireballs[i].update();

  // }

}

//stage3
function level3() {

  ground.display();
  player.grav = 0.6;
  player.update();
  player.upForce = -10;
  player.display();

  if (levelD === 0) {

    enemy1.display();
    enemy1.move(player);

    enemy2.display();
    enemy2.move(player);

    enemy3.display();
    enemy3.move(player);

    enemy4.display();
    enemy4.move(player);

    enemy5.display();
    enemy5.move(player);

    enemy6.display();
    enemy6.move(player);

    if (enemy1.enemyT === 0) {

      enemy1.isTouching(player);

    }

    if (enemy2.enemyT === 0) {

      enemy2.isTouching(player);

    }

    if (enemy3.enemyT === 0) {

      enemy3.isTouching(player);

    }

    if (enemy4.enemyT === 0) {

      enemy4.isTouching(player);

    }

    if (enemy5.enemyT === 0) {

      enemy5.isTouching(player);

    }

    if (enemy6.enemyT === 0) {

      enemy6.isTouching(player);

    }

  }


  player.groundC();




  for (var i = bullets.length - 1; i >= 0; i--) {

    //console.log(bullets[i]);
    //var bullet = bullets[i];
    bullets[i].display();
    bullets[i].update();
    bullets[i].offset();
    bullets[i].isTouching(enemy1);
    bullets[i].isTouching(enemy2);
    bullets[i].isTouching(enemy3);
    bullets[i].isTouching(enemy4);
    bullets[i].isTouching(enemy5);
    bullets[i].isTouching(enemy6);

    // if (bullets[i].offset()) {
    //   //console.log("Offset")
    //   bullets.splice(i, 1);
    // }

  }

  if (levelD === 1) {

    rock.display();
    rock.update();
    rock.isTouching(player);

  }

}

//stage2
function level2() {
  ground.display();
  player.grav = 0.6;
  player.update();
  player.upForce = -10;
  //Jump();
  player.display();
  player.groundC();



  block.update();
  block.display();
  block.isTouching(player);

  block2.update();
  block2.display();
  block2.isTouching(player);

  block3.update();
  block3.display();
  block3.isTouching(player);

  block4.update();
  block4.display();
  block4.isTouching(player);
  //console.log(block.y);
  //console.log("js is broken")

  if (levelD === 1) {

    rock.display();
    rock.update();
    rock.isTouching(player);

  }

}

//stage detection
function level1() {

  textSize(25);
  stroke("red");
  textFont('Georgia');
  text("Find your path", 600, 70);
  //??level1??
  player.foward();
  player.groundC();

  player.grav = 0;

  stroke(255)
  //console.log(myTileArray.length)
  for (var i = 0; i < myTileArray.length; i++) {

    var tile = myTileArray[i];
    tile.display();

  }


  //??for loop??
  for (var i = 0; i < myTileArray.length; i++) {
    var tile = myTileArray[i]
    if (tile.isTouching(player)) {

      tile.tileColor = "green"
      player.display();

    } else {

      tile.tileColor = "#b06c49";

    }
  }

  if (levelD === 1) {

    rock.display();
    rock.update();
    rock.isTouching(player);

  }
}

function level0() {

  if (introS === 0 && levelD === 1 && stage === 0) {

    intro.image = loadImage("images/Good Ending.png");

  }

}



function drawTiles() {
  //Tiles
  var tile1, tile2, tile3, tile4, tile5, tile6, tile7, tile8, tile9, tile10, tile11, tile12, tile13, tile14, tile15, tile16, tile17, tile18, tile19;

  //making them tiles
  tile1 = new Tile(100, 70, 70, 70);

  myTileArray.push(tile1)
  tile2 = new Tile(100, 160, 70, 70);
  myTileArray.push(tile2)

  tile3 = new Tile(100, 250, 70, 70);
  myTileArray.push(tile3)

  tile4 = new gTile(190, 70, 70, 70);
  myTileArray.push(tile4)

  tile5 = new gTile(190, 160, 70, 70);
  //tile5.display();
  myTileArray.push(tile5)

  tile6 = new gTile(190, 250, 70, 70);
  //tile6.display();
  myTileArray.push(tile6)

  tile7 = new gTile(190, 340, 70, 70);
  //tile7.display();
  myTileArray.push(tile7)

  tile8 = new gTile(280, 70, 70, 70);
  //tile8.display();
  myTileArray.push(tile8)

  tile9 = new Tile(280, 160, 70, 70);
  //tile9.display();
  myTileArray.push(tile9)

  tile10 = new Tile(280, 250, 70, 70);
  //tile10.display();
  myTileArray.push(tile10)

  tile11 = new Tile(280, 340, 70, 70);
  //tile11.display();
  myTileArray.push(tile11)

  tile12 = new gTile(370, 70, 70, 70);
  //tile12.display();
  myTileArray.push(tile12)

  tile13 = new gTile(370, 160, 70, 70);
  //tile13.display();
  myTileArray.push(tile13)

  tile14 = new gTile(370, 250, 70, 70);
  //tile14.display();
  myTileArray.push(tile14)

  tile15 = new Tile(370, 340, 70, 70);
  //tile15.display();
  myTileArray.push(tile15)

  tile16 = new Tile(460, 70, 70, 70);
  //tile16.display();
  myTileArray.push(tile16)

  tile17 = new Tile(460, 160, 70, 70);
  //tile17.display();
  myTileArray.push(tile17)

  tile18 = new gTile(460, 250, 70, 70);
  //tile18.display();
  myTileArray.push(tile18)

  tile19 = new Tile(460, 340, 70, 70);
  //tile19.display();
  myTileArray.push(tile19);

}

function storyVoice() {

  foo = new p5.Speech();
  foo.speak('Rumors have spread about the hidden treasure of King Arthur the second. You, a talented adventurer have found the position of the pyrimid he hid it in. But to find it, you will need to go through the dangerous path that he had set. Good luck. Press p to start. Press I for instructions');

}

function Incoming(){

  incoming = new p5.Speech();
  incoming.speak('Boulder Incoming! Run back before its too late!');

}

// function gotSpeech() {

//   if (speechRec.resultValue) {

//     createP(speechRec.resultString)

//   }
//   console.log(speechRec);
// }