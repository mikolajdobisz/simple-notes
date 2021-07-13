export class Vector2{
  constructor(_x, _y){
    this.x = _x;
    this.y = _y;
  }

  log = () => {
    console.log({
      x: this.x,
      y: this.y,
    });
  }

  add = (v2) => {
    this.x += v2.x
    this.y += v2.y
  }

  multiplyByScalar = (num) => {
    this.x *= num
    this.y *= num
  }

  normalize = () => {
    const len = this.getLength()
    this.x /= len
    this.y /= len
  }

  getClone = () => {
    return new Vector2(this.x, this.y)
  }

  getOpposite = () => {
    const v = this.getClone()
    v.x = -v.x
    v.y = -v.y
    return v
  }

  getDistance = (v2) => {
    return Math.sqrt((v2.x - this.x)*(v2.x - this.x) + (v2.y - this.y)*(v2.y - this.y))
  }

  getDirectionalVector = (v2) => {
    return new Vector2(v2.x - this.x, v2.y - this.y)
  }

  getLength = () => {
    return Math.sqrt(this.x * this.x + this.y * this.y)
  }
}