
var GRAVITY = - 0.6;
var player;
var platforms = [];
var points;
var bg;
var buttonPressed = false;
var gameOver = false;
var img;
var img2;
var score = 0;
var song;
let myname;
function setup(){
  myname = prompt("player name: ");
  createCanvas(400,600);
  img = loadImage("images/logo.png");
  img2 = loadImage("images/doodleenemy.png");
  bg = loadImage("images/background.png");
  button = createButton("Play");
  button.mousePressed(play);
  button.addClass("button");
  song = loadSound("sounds/gameover.wav");

}

function entryInfo(){
  if(gameOver){
  image(img,50,100,300,100);
  textAlign(CENTER);
  textSize(50);
  noStroke();
  fill("rgb(41,134,204)");
  text(`Name: ${myname}`, width / 2, height / 2);
  textAlign(CENTER);
  textSize(30);
  noStroke();
  fill("rgb(169,40,34)");
  text(`Score : ${score}`,width / 2 , height / 2 +35)
  button = createButton("Play");
  button.mousePressed(play);
  button.addClass("button");
  }
}

function play(){
  createCanvas(400,600);
  bg = loadImage("images/background.png");
  player = new Doodler(width/2,height/2,false);
  platforms = generatePlatforms();
  points = 0;
  frameRate(30);
  buttonPressed=true;
}


function draw(){
  if (buttonPressed){
    background(bg);
    handlePlatforms();
    handlePlayer();
    drawScore();
    handleKeys();
  }else{
  background(bg);
  entryInfo();
  }
}


function handlePlayer() {
	player.update();
  player.draw();
  if (player.maxA + player.loc.y < -height / 2) {
    endGame();
  }
}


function handlePlatforms() {

  for (var i = platforms.length - 1; i >= 0; i--) {
    if (platforms[i].onScreen) {
      platforms[i].draw(player.loc.y);
			if (platforms[i] instanceof Doodler)
				platforms[i].update();
      if (platforms[i].collidesWith(player)) {
        player.jump();
        if (platforms[i] instanceof Doodler) {
          points += 100;
          platforms.splice(i, 1);
        }
      }
    } else {
      platforms.splice(i, 1);
      var x = noise(player.maxA, frameCount) * width;
      var y = player.maxA + height;
      if (random() < 0.9) {
        platforms.push(new Platform(x, y));
      } else {
        if (random() > 0.5) {
					platforms.push(new Doodler(x, y, true));
				}
      }
    }
  }
}


function generatePlatforms() {

	var field = []; 
  var x_arr = [];
  var y_arr =  [];
	for (var y = 0; y < height * 2; y += 40) {

    for (var i = 0; i < 3; i++) { 
      var x = noise(i, y) * width;
      while (x_arr.includes(x)){
        x = noise(i, y) * width;
      }

      if (noise(y, i) > 0.5){ 
        field.push(new Platform(x, y));
      }
        x_arr <<  x ;

    }
  }

	return field;
}

function handleKeys() {

  if (keyIsDown(LEFT_ARROW)) {

    player.applyForce(-1, 0);
  } else if (keyIsDown(RIGHT_ARROW)) {

    player.applyForce(1, 0);
  }
}

function drawScore() {

  textSize(20);
  textAlign(LEFT);
  fill("#000000");
  noStroke();
  score = (player.maxA + points - 300).toFixed(0)
  text(`Score : ${(player.maxA + points - 300).toFixed(0)}`,10,25);

}

function endGame() {
  gameOver = true ;
  buttonPressed = false;
  song.play();
}
