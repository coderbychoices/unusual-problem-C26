class Boat {
    constructor(x,y,w,h,boatPos){
         this.w = w
         this.h = h
         this.boatPos = boatPos

         this.body = Bodies.rectangle(x,y,w,h)
         World.add(world,this.body)

         this.image = loadImage("./assets/boat.png")
    }

    display(){
        push()
        translate(this.body.position.x,this.body.position.y)
        rotate(this.body.angle)
        imageMode(CENTER)
        image(this.image,0,this.boatPos,this.w,this.h)
        pop()        
    }

    remove(index){
        setTimeout(()=>{
            World.remove(world,boats[index].body)
            delete boats[index]
        },2000)

    }
}