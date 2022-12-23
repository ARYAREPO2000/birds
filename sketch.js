var groundImg, ground;
var ghost, ghostImg;
var invisibleBlock;
var PLAY = 1
var END=0
var gameState = PLAY;
var score
var obstacle, obstacleImg, obstaclesG;
var gameOver, gameOverImg

function preload(){
  groundImg = loadImage("background0.png");  
  ghostImg  = loadImage("bird.png");
  obstacleImg = loadImage("birds-clipart-png.png")
  gameOverImg = loadImage("gameOver.png")
}

function setup() {
  createCanvas(600, 600);
  ground = createSprite(300,300);
  ground.addImage(groundImg);
  ground.velocityX = -1;
  ground.scale = 2

  invisibleBlock = createSprite(300,599,599,100);
  invisibleBlock.visible = false;

  gameOver = createSprite(300,300);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.5;
  gameOver.visible = false;


  ghost = createSprite(300,300);
  ghost.addImage(ghostImg);
  ghost.scale=0.1;

  obstaclesG = new Group();
  score = 0

  imageMode(CENTER)

}

function draw() {
  background(200);
  
  
 
  if (gameState === PLAY){ 
  
   if (keyDown("space")) {
    ghost.velocityY = -5
  }

  ghost.velocityY = ghost.velocityY + 0.8

  
  text("score: "+ score,300,30);
  score = score + Math.round(getFrameRate()/60);
    

if (ground.x < 200){
  ground.x = 300;}

  
  
  if(obstaclesG.isTouching(ghost)){ 
    gameState  =  END
  }

  if(obstaclesG.isTouching(invisibleBlock)){
    gameState  =  END
  }

}

  if (gameState===END) {
    score = 0
    gameOver.visible = true;
    ground.velocityX = 0;
    ghost.velocityY = 800
    obstaclesG.destroyEach()
    



    }
    
    spawnObstacles();
    drawSprites(); 
  
}

  

  function spawnObstacles(){
    if (frameCount % 60 === 0){
      var obstacle = createSprite(700,300,10,40);
      obstacle.velocityX = -(6 + score/100);
      obstacle.addImage(obstacleImg);
      obstacle.scale = 0.2;
     obstacle.lifetime = 500;
    obstaclesG.add(obstacle);
    
    }

    

  }

