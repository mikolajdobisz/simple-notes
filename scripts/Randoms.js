const Randoms = {
  int: (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  float: (min, max, dp) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    let m = Math.pow(10, dp)
    return Math.floor((Math.random() * (max - min + 1) + min) * m) / m;
  }
}

export default Randoms;