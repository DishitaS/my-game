var bg;
var plane1, plane;
var start, playImg;
var gameState=1;
var title, titleimg;
var gold, silver, bronze;
var level, levelImg;
var med, beg, dif;
var boat, boatimg, parachuteImg;
var parachuteGroup;
var score=0;
var lives= 1;
var ground;
var button, home, homeImg;

function preload(){
  bg=loadImage("background.jpg");
  plane= loadImage("plane1.png");
  button=loadImage("start.png");
  titleimg=loadImage("title.png");
  playImg=loadImage("play2.png");
  bronze=loadImage("bronze1.png");
  silver=loadImage("silver1.png");
  gold=loadImage("gold1.png");
  levelImg=loadImage("levels1.png");
  boatimg=loadImage("boat.png");
  parachuteImg=loadImage("parachute.png");
  homeImg=loadImage("home.png");
}

function setup(){
  createCanvas(displayWidth, displayHeight);
  start=createSprite(displayWidth-200, displayHeight-200);
  start.addImage(button);
  start.scale=0.2;

  play=createSprite(displayWidth-150, displayHeight-250);
  play.addImage(playImg);
  play.scale=0.05;
  play.visible=false;

  title=createSprite(displayWidth/2, 200);
  title.addImage(titleimg);
  title.scale=1;

  plane1=createSprite(displayWidth/2, displayHeight/2);
  plane1.addImage(plane);
  plane1.scale=0.3;

  beg=createSprite(displayWidth/2, displayHeight/2-220, 100, 50 );
  beg.addImage(bronze);
  beg.scale=0.5;
  beg.visible=false;

  med=createSprite(displayWidth/2, displayHeight/2-110, 100, 50);
  med.addImage(silver);
  med.scale=0.5;
  med.visible=false;


  dif=createSprite(displayWidth/2, displayHeight/2, 100, 50);
  dif.addImage(gold);
  dif.scale=0.5;
  dif.visible=false;

  level=createSprite(displayWidth/2, 140, 100, 50)
  level.addImage(levelImg);
  level.scale=0.08;
  level.visible=false;  

  boat=createSprite(displayWidth/2, displayHeight-200);
  boat.addImage(boatimg);
  boat.scale=0.6;
  boat.visible=false;

  parachuteGroup=createGroup();
  
  ground=createSprite(displayWidth/2, displayHeight-100, displayWidth,20);
  ground.visible=false;

  home=createSprite(displayWidth-200, 100);
  home.addImage(homeImg);
  home.scale=0.2;
  home.visible=false;

  button=createSprite(displayWidth-200, 350);
  button.visible=false;

}

function draw(){
  background(bg);

  if(gameState === 1){
    home.visible=false;
    button.visible=false;

    title.visible=true;
    plane1.visible=true;
    start.visible=true;

    plane1.x=displayWidth/2;
    plane1.y=displayHeight/2;
    plane1.scale=0.3

    if(mousePressedOver(start)){
      gameState=2;
    }
  }
  
  

  if(gameState === 2){
    plane1.visible=false;
    start.visible=false;
    play.visible=true;

    strokeWeight(5);
    stroke("white")
    fill(0)
    rect(100, 100, displayWidth-200, displayHeight-300);
    
    textSize(30);
    fill("white");
    strokeWeight(0);
    stroke("white");
    text("The helicopter E8 654 is going to crash.", 110,150);
    text("It is hovering above the sea for some time.",650, 150);
    text("The passengers are going to dive down with parachutes.", 110, 200);
    text("You have to save them from drowning in the sea.", 110, 250);
    text("You have to do this by making the land on a boat which you can move left and right ", 110, 300);
    text("using the respective arrow keys.",110, 350 ),
    text("But remember that if you drop 3 passengers into the sea you will loose the game.",110, 400);
    text("Best of luck !! Click on the play button to continue.", 110, 450);

    if(mousePressedOver(play)&& gameState === 2){
      gameState = 3;
    }
  }

  if(gameState === 3){
    play.visible=false;
    strokeWeight(5);
    fill(119, 89, 17);
    stroke(71, 53, 10);
    rect(displayWidth/2-150, 100, 300, 400 );
    
    level.visible=true;
    beg.visible=true;
    med.visible=true;
    dif.visible=true;


    //textSize(35);
    //fill(0);
    //stroke(0);
    //strokeWeight(0);
    //text("Levels:", displayWidth/2-50, 150);

    
    if(mousePressedOver(beg)){
      gameState = 4;
    }

    if(mousePressedOver(med)){
      gameState = 5;
    }

  }

  if(gameState === 4){
    hide();
    plane1.visible=true;
    plane1.scale=0.2;
    plane1.y=30;
    boat.visible=true;
    if(keyDown("left")){
      boat.x-=7;
    }
  
    if(keyDown("right")){
      boat.x+=7;
    }
 
    spawnParachute();
    if(boat.isTouching(parachuteGroup)){
      parachuteGroup.destroyEach();
      score=score+2
    }
    
    textSize(30);
    fill("black");
    text("Score:"+score, displayWidth-200, 50);
    text("Lives:"+lives, 50,50);

    if(ground.isTouching(parachuteGroup)){
      lives-=1
      parachuteGroup.destroyEach();
    }

    if(lives === 0){
      boat.visible=false;
      plane1.visible=false;
      parachuteGroup.setVelocityYEach(0);
      parachuteGroup.destroyEach();
      background(0);

      textSize(50);
      fill("yellow");
      text("GAME OVER !", displayWidth/2-120, displayHeight/2-100);

      textSize(35)
      text("Your Score:"+score, displayWidth/2-100, displayHeight/2)
      
      home.visible=true;
      button.visible=true;

      if(mousePressedOver(home)){
        gameState = 1
        background(bg);
       
      }

    }

  }

   
function hide(){
  title.visible=false;
  level.visible=false;
  beg.visible=false;
  med.visible=false;
  dif.visible=false;
}

function spawnParachute(){
  if(frameCount % 150 === 0){
    var parachute=createSprite(displayWidth/2, 160);
    parachute.x= Math.round(random(30,displayWidth-50));
    parachute.addImage(parachuteImg);
    parachute.scale=0.7
    parachute.velocityY=5;
    plane1.x=parachute.x;
    plane1.depth=parachute.depth;
    plane1.depth+=1
    parachuteGroup.add(parachute);
  }
}