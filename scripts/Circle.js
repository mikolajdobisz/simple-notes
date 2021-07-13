import { Vector2 } from "./Vector2";
import settings from '../scripts/settings.json';

export default class Circle{

  static divider = settings["circle-speedDivider"];
  static speedTreshold = settings["circle-speedFrictionTreshold"];
  static friction = settings["circle-friction"];

  constructor(_x, _y, _r, _color, _velocity){
    this.position = new Vector2(_x, _y)
    this.r = _r;
    this.color = _color;
    this.velocity = _velocity;
  }

  update = (mousePosition) => {
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y

    if(this.position.x < -this.r){
      this.position.x = window.innerWidth + this.r
    }
    if(this.position.y < -this.r){
      this.position.y = window.innerHeight + this.r
    }
    if(this.position.x > window.innerWidth + this.r){
      this.position.x = -this.r
    }
    if(this.position.y > window.innerHeight + this.r){
      this.position.y = -this.r
    }
    
    const dist = this.position.getDistance(mousePosition)
    if(dist <= this.r){
      let directionalVector = mousePosition.getDirectionalVector(this.position)
      directionalVector.normalize()
      directionalVector.multiplyByScalar((this.r - dist) / this.r / Circle.divider)
      this.velocity.add(directionalVector) 
    }

    this.applyFriction()
    //this.snapVelocityToValue(Circle.speedTreshold)
  }

  applyFriction(){
    if(this.velocity.getLength() > Circle.speedTreshold){
      const frictionVector = this.velocity.getOpposite()
      frictionVector.normalize()
      frictionVector.multiplyByScalar(Circle.friction)
      this.velocity.add(frictionVector)
    }
  }

  snapVelocityToValue(val){
    if(this.velocity.getLength() > val){
      this.velocity.normalize()
      this.velocity.multiplyByScalar(val)
    }
  }

  draw = (ctx) => {
    const {x, y} = this.position

    ctx.beginPath()
    ctx.fillStyle = this.color
    //ctx.fillStyle = "blue"
    ctx.arc(x, y, this.r, 0, 2 * Math.PI)
    ctx.fill()
    ctx.closePath()
  }
}