class CannonBall{
    constructor(x,y){
        this.r = 30
        this.trajectory = []
        
        var options = {
            isStatic: true            
        }

        this.body = Bodies.circle(x,y,this.r,options)
        World.add(world,this.body)
        
        this.image = loadImage("./assets/cannonball.png")
    }
    display(){
        push()
        imageMode(CENTER)
        image(this.image,this.body.position.x,this.body.position.y,this.r,this.r)
        pop()

        if(this.body.position.x > 100 && this.body.velocity.x > 0){
            var position = [this.body.position.x,this.body.position.y]
            this.trajectory.push(position)
        }
        
        for(var i = 0 ; i < this.trajectory.length ; i++ ){
            image(this.image,this.trajectory[i][0],this.trajectory[i][1],5,5)
        }
    }

    shoot(){
        var newAngle = cannon.angle -28
        newAngle = newAngle * (3.14/180)

        var velocity = p5.Vector.fromAngle(newAngle)
        velocity.mult(0.5)                
            
        Matter.Body.setStatic(this.body,false)
        Matter.Body.setVelocity(this.body,{x:velocity.x * (180/3.14),y:velocity.y * (180/3.14)})      
    }

    remove(index){
        Matter.Body.setVelocity(balls[index].body,{x: 0 , y: 0})

        setTimeout(()=>{           
            World.remove(world,this.body)
            delete balls[index]
        },1000)
    }
}
