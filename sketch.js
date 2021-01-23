var monkey, monkey_animate, monkey_collided;
var banana, banana_image;
var ground, ground_image;
var jungle_image, jungle;
var gameOver_image, gameOver, restart_image, restart;
var bananaGroup, obstaclesGroup;
var stone, stone_image;
var count = 0;
var score = 0;
var life = 3;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
  
  banana_image = loadImage("Banana.png");
  jungle_image = loadImage("jungle.jpg");
  monkey_animate = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  gameOver_image = loadImage("gameOver.png");
  restart_image = loadImage("restart.png");
  ground_image = loadImage("ground.jpg");
  stone_image = loadImage("stone.png");
  monkey_collided = loadImage("Monkey_01.png");
}

function setup() {
  createCanvas(800, 400);
  
  jungle = createSprite(0, 0, 800, 400);
  jungle.addImage(jungle_image);
  jungle.scale = 1.5;
  jungle.velocityX = -4;
  jungle.x = jungle.width/2;
  
  monkey = createSprite(100, 310, 20, 50);
  monkey.addAnimation("running", monkey_animate);
  monkey.addAnimation("collided", monkey_collided);
  monkey.scale = 0.1;
  
  ground = createSprite(400, 350, 800, 100);
  ground.visible = false;
  
  gameOver = createSprite(400, 320, 10, 10);
  gameOver.addImage(gameOver_image);
  gameOver.visible = false;
  
  restart = createSprite(400, 280, 10, 10);
  restart.addImage(restart_image);
  restart.scale = 0.5;
  restart.visible = false;
  
  bananaGroup = new Group();
  obstaclesGroup = new Group();
}

function draw(){
 background(255); 
  
  if (gameState === PLAY){
      jungle.velocityX = -4;
      count = count+ Math.round(getFrameRate()/60);
    
      if(keyDown("space") && monkey.y > 100) {
         monkey.velocityY = -10;
       }
    
      monkey.velocityY = monkey.velocityY + 0.8;
      monkey.collide(ground);
    
      if (jungle.x < 0){
          jungle.x = jungle.width/2;
       }
    
      //Adding bananas
        banana();
  
      //Adding stones
        obstacles();
    
      
     if (bananaGroup.isTouching(monkey)){
         score = score + 2
         bananaGroup.destroyEach();
      }
    
    switch (banana) {
      case 10: monkey.scale = 0.12;
        break;
      case 20: monkey.scale = 0.14;
        break;
      case 30: monkey.scale = 0.16;
        break;
      case 40: monkey.scale = 0.18;
        break;
      default: break;
      }
    
    if (obstaclesGroup.isTouching(monkey)){
        monkey.scale = 0.1;
        life = life - 1;
        obstaclesGroup.destroyEach();
      }   
    
    if (life === 0){
        gameState = END;
      }
    }
      else if (gameState === END){
        monkey.velocityY = 0;
        bananaGroup.setVelocityXEach(0);
        obstaclesGroup.setVelocityXEach(0);
        jungle.velocityX = 0;
        monkey.changeAnimation("collided", monkey_collided);
        gameOver.visible = true;
        restart.visible = true;
        
        if (mousePressedOver(restart)){
            reset();
          }
        }
  
  drawSprites();

fill("white");
textSize(15);
text("Survival Time: " + count, 560, 25);
text("Life: " + life, 625, 45);
text("Score: " + score, 610, 65 );
}

function reset() {
  life = 3;
  count = 0;
  score = 0;
  gameState = PLAY;
  monkey.changeAnimation("running", monkey_animate);
  obstaclesGroup.destroyEach();
  bananaGroup.destroyEach();
  gameOver.visible = false;
  restart.visible = false;
}

function banana() {
   if (frameCount % 80 === 0) {
      var banana = createSprite(600, 120, 10, 10);
      banana.y = Math.round(random(120, 200));
      banana.addImage(banana_image);
      banana.velocityX = -8;
      banana.scale = 0.05;
      banana.lifetime = 120;
      bananaGroup.add(banana);
   }
}

function obstacles() {
  if (frameCount % 200 === 0){
      var stone = createSprite(600, 280, 10, 10);
      stone.addImage(stone_image);
      stone.velocityX = -7;
      stone.scale = 0.085;
      stone.lifetime = 120;
      obstaclesGroup.add(stone);
  }
}