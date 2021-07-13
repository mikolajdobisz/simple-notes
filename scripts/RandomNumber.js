export const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const getRandomFloat = (min, max, dp) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  let m = Math.pow(10, dp)
  return Math.floor((Math.random() * (max - min + 1) + min) * m) / m;
}

function toHex(d) {
  if(d < 0 ) {return "00";}
  if(d > 255 ) {return "FF";}
  return  ("0"+(Number(d).toString(16))).slice(-2).toUpperCase()
}

export const getRandomColor = () => {
  const r = getRandomInt(0, 255)
  const g = getRandomInt(0, 255)
  const b = getRandomInt(0, 255)

  return toHex(r)+toHex(g)+toHex(b);
}

export const getRandomGray = (min, max) => {
  const c = getRandomInt(min, max)

  return toHex(c)+toHex(c)+toHex(c);
}