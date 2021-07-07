import { Vector2 } from "./Vector2";

export default class Circle{
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
    if(dist < this.r){
      let directionalVector = mousePosition.getDirectionalVector(this.position)
      directionalVector.normalize()
      directionalVector.multiplyByScalar((this.r - dist) / this.r / 100)
      this.velocity.add(directionalVector)
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