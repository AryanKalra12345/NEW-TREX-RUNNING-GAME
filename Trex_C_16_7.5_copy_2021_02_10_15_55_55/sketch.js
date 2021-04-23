var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided,trex;
var ground, invisibleGround, groundImage;
var bg,bg1,bg2,backgroundImg;

var cloudsGroup, cloudImage,bgImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var trex1;
var score;
var gameOverImg,restartImg
var jumpSound , checkPointSound, dieSound

function preload(){
 trex=loadImage("trex.png")
  bg= loadImage("bg2.jpg")
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("clouds2.png");
  
  obstacle1 = loadImage("cactus.png");
  obstacle2 = loadImage("cactus.png");
  obstacle3 = loadImage("cactus.png");
  obstacle4 = loadImage("cactus.png");
  obstacle5 = loadImage("cactus.png");
  obstacle6 = loadImage("cactus.png");
  
  restartImg = loadImage("reset.png")
  gameOverImg = loadImage("go.png")
  
  jumpSound = loadSound("jump.mp3")
  dieSound = loadSound("die.mp3")
  checkPointSound = loadSound("checkPoint.mp3")
  bg=loadImage("bg2.jpg");
}

function setup() {
  createCanvas(600, 200);

  var message = "This is a message";
 console.log(message)
 
 
  
  trex1 = createSprite(50,160,20,50);
 trex1.addImage(trex);
 trex1.scale=0.12;
  

  
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
 
  gameOver.scale = 0.6;
  restart.scale = 0.2;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  //create Obstacle and Cloud Groups
  obstaclesGroup = createGroup();
  cloudsGroup = createGroup();

  
 
  
  score = 0;
  
}

function draw() {
 background(bg);
  
  
  //displaying score
  text("Score: "+ score, 500,50);
  
  
  if(gameState === PLAY){

    gameOver.visible = false;
    restart.visible = false;
    
    ground.velocityX = -(4 + 3* score/100)
    //scoring
    score =score + Math.round(getFrameRate()/60); 
    
      if(score>0 && score%100 === 0){
       checkPointSound.play() 
    }
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //jump when the space key is pressed
    if(keyDown("SPACE")){
        trex1.velocityY = -12;
        jumpSound.play();
    }
    
    //add gravity
    trex1.velocityY = trex1.velocityY + 0.8
  
    //spawn the clouds
    spawnClouds();
  
    //spawn obstacles on the ground
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(trex1)){
        //trex.velocityY = -12;
        jumpSound.play();
        gameState = END;
        dieSound.play()
      
    }
  }
   else if (gameState === END) {
      gameOver.visible = true;
      restart.visible = true;
     
     //change the trex animation
      
    
     
     
      ground.velocityX = 0;
      trex1.velocityY = 0
      
     
      //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
     
     obstaclesGroup.setVelocityXEach(0);
     cloudsGroup.setVelocityXEach(0);    
   }
  
 
  //stop trex from falling down
  trex1.collide(invisibleGround);
  
  if(mousePressedOver(restart)) {
      reset();
    }


  drawSprites();
}

function reset(){
  gameState=PLAY
  //obstaclesGroup.setLifetimeEach(0);
  //cloudsGroup.setLifetimeEach(0);
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  score=0;
  }


function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(600,165,10,40);
   obstacle.velocityX = -(6 + score/100);
   
   
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
 }
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,150,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.2;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex1.depth;
    trex1.depth = trex1.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
}
async function getTime(){
  var response  = await fetch('http://worldtimeapi.org/api/timezone/Asia/Kolkata')
  var responceaz = await response.json()
  //console.log(responceaz)
  var responseaq = responceaz.datetime
  //console.log(responseaq)
  var responceq = responseaq.slice(11,19)
  //console.log(responceq)
  if(responceq>=06&&responceq<=19){
      bg = "bg2.jpg"
  }else{
      bg = "bg1.png"
  }
  backgroundImg = loadImage(bg);
}

