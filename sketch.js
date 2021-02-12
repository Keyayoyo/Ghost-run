var tower , towerimg;
var doors, doorimg,doorGroup;
var railings,railingsimg,railingsGroup;
var ghost,ghostimg;
var invisibleBlock,invisibleBlockGroup;
var gameState = "play";


function preload ()
{
 towerimg = loadImage("tower.png");

 doorimg = loadImage("door.png");

 railingsimg = loadImage("climber.png");

 ghostimg = loadImage("Ghost.png");

 
}

function setup()
{
  createCanvas(600,600);

 
  tower = createSprite(300,300);
  tower.addImage(towerimg);
  tower.velocityY = 4;

  doorGroup = new Group();

  railingsGroup = new Group ();

  invisibleBlockGroup= new Group();

  ghost = createSprite(300,500,50,50);
  ghost.scale = 0.3;
  ghost.addImage(ghostimg);

  
}

function draw ()
{
    background(0);
 

    if(gameState == "play")
    {
        if(keyDown("space"))
        {
          ghost.velocityY = -5;      
        }


        if(keyDown("left"))
        {
            ghost.x = ghost.x - 5;
        }
    
        if(keyDown("right"))
        {
            ghost.x = ghost.x + 5;
        }

        if(tower.y > 600)
        {
            tower.y = 600/2; 
        }

        ghost.velocityY = ghost.velocityY + 0.8;

        if(railingsGroup.isTouching(ghost))
        {
            ghost.velocityY = 0; 
        }

        if(invisibleBlockGroup.isTouching(ghost)||ghost.y > 600)
        {
            ghost.destroy();
            
            gameState = "end";
        }
    }

    if(gameState == "end")
    {
        textSize(30);
        fill("red")
        text("Game Over",200,200);
        
        doorGroup.destroyEach();
            railingsGroup.destroyEach();
            invisibleBlockGroup.destroyEach();
    }
   
   
    
   

    spawnDoors();

    drawSprites();
}

function spawnDoors ()
{
    if(frameCount % 240 === 0)
    {
        door = createSprite(200,-50);
        door.addImage(doorimg);
        
        railings = createSprite(200,10);
        railings.addImage(railingsimg);

        invisibleBlock = createSprite(200,15);
        invisibleBlock.height = 2;
        invisibleBlock.width = railings.width;

        door.x = Math.round(random(120,400));
        railings.x = door.x;
        invisibleBlock.x = door.x; 

        door.velocityY = 4;
        railings.velocityY = 4;
        invisibleBlock.velocityY = 4;
        
        door.lifetime = 800;
        railings.lifetime = 800;

        railings.depth = ghost.depth;
        door.depth = ghost.depth;
        ghost.depth = ghost.depth + 1;

        invisibleBlock.visible = false; 

        doorGroup.add(door);
        railingsGroup.add(railings); 
        invisibleBlockGroup.add(invisibleBlock);

    }

}

