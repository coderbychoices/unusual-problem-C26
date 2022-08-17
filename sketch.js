const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world,ground;
var backgroundImg
var tower,towerImg
var cannon,angle
var cannonBall
var balls = []
var boats = []

function preload() {
  backgroundImg = loadImage("./assets/background.gif")
  towerImg = loadImage("./assets/tower.png")
}
function setup() {

  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  
 options={
 isStatic:true
 }
 
 ground= Bodies.rectangle(0,height-1, width*2,1,options);
 World.add(world,ground);

 tower= Bodies.rectangle(160,350,160,310,options)
 World.add(world,tower)

 angle = 15
 angleMode(DEGREES)
 cannon = new Cannon(180,110,130,100,angle)
 
}

function draw() {
  background(189);
  Engine.update(engine);
  
  image(backgroundImg,0,0,width,height)

  push()
  imageMode(CENTER)
  image(towerImg,tower.position.x,tower.position.y,160,310)
  pop()
  
  rect(ground.position.x, ground.position.y,width*2,1);

  
  for(var i = 0 ; i < balls.length ; i++){
    showCannonBalls(balls[i],i)
    collisionWithBoat(i)
  }
  
  cannon.display()
  showBoats()

}

function keyReleased(){
  if(keyCode === DOWN_ARROW){
    balls[balls.length -1 ].shoot()
  }
}

function keyPressed(){
  if(keyCode === DOWN_ARROW){
    var cannonBall= new CannonBall(cannon.x,cannon.y)
    cannonBall.trajectory =[]
    balls.push(cannonBall)
  }
}

function showCannonBalls(ball,index){
  if(ball){
    if(ball.body.position.x >= width || ball.body.position.y >= height -50){
      ball.remove(index)

    }
    ball.display()
  }
}

function showBoats(){
  if(boats.length > 0){
    if(boats[boats.length -1] === undefined || boats[boats.length -1].body.position.x < width -300){
      var positions = [-40,-20,-60,-70]
      var position = random(positions)

      var boat = new Boat(width,height -60,170,170,position)
      boats.push(boat)
    }
    
    for(var i = 0 ; i < boats.length ; i++){
      if(boats[i]){
        Matter.Body.setVelocity(boats[i].body,{x: -0.9 , y: 0})
        boats[i].display()
      }
    }
  }
  else{

    var boat= new Boat(width,height -60 ,170,170,-60)
    boats.push(boat)
  }
}

function collisionWithBoat(index){
  for(var i =0 ; i < boats.length; i++){
    if(balls[index] !== undefined && boats[i] !== undefined){
      var collision = Matter.SAT.collides(boats[i].body,balls[index].body)
      
      if(collision.collided){
        boats[i].remove(i)
        Matter.World.remove(world,balls[index].body)
        delete balls(index)
      }
    }
  }
}