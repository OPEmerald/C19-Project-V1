var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  ghost = createSprite(300,300);
  ghost.addImage("ghost", ghostImg);
  ghost.scale=.3
  
}

function draw() {
  background(200);

  if(gameState==="play"){

  
  //infinite background
  if(tower.y > 400){
      tower.y = 300
    }

  //controls for ghost
  if(keyDown("RIGHT_ARROW")){
    ghost.x=ghost.x +3
  }
  if(keyDown("LEFT_ARROW")){
    ghost.x=ghost.x -3
  }
  ghost.velocityY=ghost.velocityY +0.3
  if(keyDown("SPACE")){
    ghost.velocityY= -5
  }
  doors();
  
  if(climbersGroup.isTouching(ghost)){
    ghost.velocityY=0
  }
  if(invisibleBlockGroup.isTouching(ghost)||ghost.y>600){
    ghost.destroy();
    gameState="end"
  }
  drawSprites();
}
if(gameState==="end"){
  fill ("blue");
  textSize(35);
  text("Game Over", 250, 250);
}
}

function doors(){
  if(frameCount % 240===0){
    door = createSprite(300,0)
    climber = createSprite(300,70);
    invisibleBlock = createSprite(300,70);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2
    door.x=Math.round(random(120, 400));
    invisibleBlock.velocityY = +1;

    climber.addImage(climberImg);
    door.addImage(doorImg);
    climber.velocityY= +1
    climber.x = door.x;
    invisibleBlock.x = door.x;
    door.velocityY= +1

    door.lifetime = 600
    climber.lifetime = 600
    invisibleBlock.lifetime = 600

    doorsGroup.add(door)
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);

    ghost.depth=door.depth;
    door.depth+=1
  }
}