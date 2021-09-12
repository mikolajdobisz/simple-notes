import { getRandomInt } from "./Randoms";

const Colors = {
  byteToHex: (d) => {
    if(d < 0 ) {return "00";}
    if(d > 255 ) {return "FF";}
    return  ("0"+(Number(d).toString(16))).slice(-2).toUpperCase();
  },
  getContrast: ({r, g, b}) => {
    var yiq = ((r*299)+(g*587)+(b*114))/1000;
    return (yiq >= 128) ? 'black' : 'white';
  },
  getRandom: () => {
    const r = getRandomInt(0, 255)
    const g = getRandomInt(0, 255)
    const b = getRandomInt(0, 255)
    const toHex = this.numberToHex;

    return toHex(r) + toHex(g) + toHex(b);
  },
  getRandomGray: (min, max) => {
    const c = getRandomInt(min, max)
    const toHex = this.numberToHex;
  
    return toHex(c)+toHex(c)+toHex(c);
  }
}

export default Colors;